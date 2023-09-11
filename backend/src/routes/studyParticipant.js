import express from 'express';
import ParticipantDao from '../database/participant/dao/ParticipantDao.js';
import TagDao from '../database/tag/dao/TagDao.js';
import StudyParticipantDao from '../database/studyParticipant/dao/StudyParticipantDao.js'
import exp from 'constants';

import { HTTP_SUCCESS,
    HTTP_NOT_FOUND,
    HTTP_SERVER_ERROR,
    HTTP_BAD_REQUEST,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_LOGIN_ERROR} from "../enum.js";

const router = express.Router();


//Retrieve all related participants by studyId
router.get('/:studyId', async (req, res) => {
    try {
        const { studyId } = req.params;
        const studyParticipants = await StudyParticipantDao.findStudyParticipantsByStudyId(studyId);

        const participantsInfoPromises = studyParticipants.map(async studyParticipant => {
            const participantInfo = await ParticipantDao.getParticipantById(studyParticipant.participantId);

            if (!participantInfo) {
                console.warn(`Participant with ID ${studyParticipant.participantId} not found.`);
                return null;
            }

            const tagsInfoPromises = participantInfo.tag.map(async tagId => {
                console.log(`Fetching tag for ID: ${tagId}`);  // Log here
                try {
                    const tag = await TagDao.getTagById(tagId);
                    return tag.tagName;
                } catch (error) {
                    console.error(`Error fetching tag with ID ${tagId}:`, error);
                    return null;
                }
            });
            
            const tagsInfo = (await Promise.all(tagsInfoPromises)).filter(tagName => tagName !== null);
            
            participantInfo.tagsInfo = tagsInfo;  // 将tagsInfo字段添加到participantInfo中
            
            studyParticipant.participantInfo = participantInfo; // This might be redundant if participantInfo is already referenced, but it's a good way to ensure.
            
            return studyParticipant;
        });

        const participantsWithInfo = (await Promise.all(participantsInfoPromises)).filter(p => p !== null);

        if (participantsWithInfo.length > 0) {
            res.json(participantsWithInfo);
        } else {
            res.sendStatus(HTTP_NO_CONTENT);
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            res.status(HTTP_SERVER_ERROR).json({ error: "Internal server error." });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                error: "Failed to get study-participant list.",
                details: error.message
            });
        }
    }
});

// add participants to the study
router.post('/:studyId', async (req, res) => {
    const { studyId } = req.params;
    let participantIds = req.body.participantIds;

    if (!Array.isArray(participantIds)) {
        participantIds = [participantIds];
    }

    try {
        const result = await StudyParticipantDao.createMultipleStudyParticipants(studyId, participantIds);
        res.status(HTTP_CREATED).json(result);
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            res.status(HTTP_SERVER_ERROR).json({ error: "Internal server error." });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                error: "Failed to add study-participant.",
                details: error.message
            });
        }
    }
});

// update study-participant
router.put('/:studyParticipantId', async (req, res) => {
    const { studyParticipantId } = req.params;
    const updatedData = req.body;

    try {
        // Update StudyParticipant info
        const success = await StudyParticipantDao.updateStudyParticipantById(studyParticipantId, updatedData);

        res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);


    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            res.status(HTTP_SERVER_ERROR).json({ error: "Internal server error." });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                error: "Failed to update study-participant details.",
                details: error.message
            });
        }
    }
});

// delete study-participant
router.delete('/:studyParticipantId', async (req, res) => {
    const { studyParticipantId } = req.params;

    try {
        const success = await StudyParticipantDao.deleteStudyParticipantById(studyParticipantId);

        // check if successfully deleted
        res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);


    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            res.status(HTTP_SERVER_ERROR).json({ error: "Internal server error." });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                error: "Failed to delete study-participant.",
                details: error.message
            });
        }
        
    }
});


export default router;