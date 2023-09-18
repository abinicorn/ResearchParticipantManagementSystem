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

function transformDocument(originalDoc) {
    return {
        _id: originalDoc._id,
        serialNum: originalDoc.serialNum,
        isActive: originalDoc.isActive || false,  
        isComplete: originalDoc.isComplete || false,
        isGift: originalDoc.isGift || false,
        isSentGift: originalDoc.isSentGift || false,
        isWIllReceiveReport: originalDoc.isWIllReceiveReport || false,
        isSentReport: originalDoc.isSentReport || false,
        note: originalDoc.note || "",
        participantInfo: {
            _id: originalDoc.participantId._id,
            firstName: originalDoc.participantId.firstName,
            lastName: originalDoc.participantId.lastName,
            email: originalDoc.participantId.email,
            phoneNum: originalDoc.participantId.phoneNum,
            isWillContact: originalDoc.participantId.isWillContact,
            tagsInfo: originalDoc.participantId.tag.map(t => t.tagName)
        }
    };
}

router.get('/count/:studyId', async (req, res) => {
    try {
        const { studyId } = req.params;
        const count = await StudyParticipantDao.getActiveStudyParticipantsCountByStudyId(studyId);
        
        res.status(HTTP_SUCCESS).json({ count });

    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            res.status(HTTP_SERVER_ERROR).json({ error: "Internal server error." });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                error: "Failed to get the count of active study-participants.",
                details: error.message
            });
        }
    }
});

//Retrieve all related participants by studyId
router.get('/:studyId', async (req, res) => {
    try {
        const { studyId } = req.params;
        const studyParticipants = await StudyParticipantDao.findStudyParticipantsByStudyId(studyId);
        
        if (studyParticipants && studyParticipants.length > 0) {
            // transform
            const transformedParticipants = studyParticipants.map(transformDocument);
            res.status(HTTP_SUCCESS).json(transformedParticipants);
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
    console.log(participantIds);
    try {
        // check if some studyparticipants are existing
        const existingParticipants = await StudyParticipantDao.checkExistingStudyParticipants(studyId, participantIds);

        // filter existing studyparticipants
        const newParticipantIds = participantIds.filter(id => 
            !existingParticipants.some(p => p.participantId.toString() === id)
        );

        const insertedDocs = await StudyParticipantDao.createMultipleStudyParticipants(studyId, newParticipantIds);

        if (insertedDocs && insertedDocs.length > 0) {
            // transform
            const resultIds = insertedDocs.map(doc => doc._id);
            const newStudyParticipants = await StudyParticipantDao.findMultipleStudyParticipantsByIds(resultIds)
            const transformedStudyParticipants = newStudyParticipants.map(transformDocument);
            res.status(HTTP_CREATED).json(transformedStudyParticipants);
        } else {
            res.status(HTTP_CREATED).json(insertedDocs);
        }
        
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