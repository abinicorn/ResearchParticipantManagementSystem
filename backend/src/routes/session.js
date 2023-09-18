import express from 'express';
import SessionDao from '../database/session/dao/SessionDao.js';
import ParticipantDao from '../database/participant/dao/ParticipantDao.js';

const router = express.Router();

import { HTTP_SUCCESS,
    HTTP_NOT_FOUND,
    HTTP_SERVER_ERROR,
    HTTP_BAD_REQUEST,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_LOGIN_ERROR} from "../enum.js";

// Retrieve all sessions by studyId
router.get('/list/:studyId', async (req, res) => {
    
    const { studyId } = req.params;

    try {
        const session = await SessionDao.retrieveSessionByStudyId(studyId);
        if (session) {
            res.status(HTTP_SUCCESS).json(session);
            //console.log(session)
        } else {
            res.status(HTTP_NOT_FOUND).json({message: 'Sessions not found'});
        }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
});

// Edit session button: display the session's info
router.get('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params;

    try {
        const session = await SessionDao.retrieveSessionById(sessionId);
        if (session) {
            res.status(HTTP_SUCCESS).json(session);
        } else {
            res.status(HTTP_NOT_FOUND).json({message: 'Session not found'});
        }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
});

// View participant list button: display session’s participants’ list
router.get('/participant/list/:sessionId', async (req, res) => {
    
    try {
        
        const { sessionId } = req.params;
        const session = await SessionDao.retrieveSessionById(sessionId);
        const participantList = session.participantList;
        let participantListInfo = [];

        for (let index = 0; index < participantList.length; index++) {
            const participantInfo = await ParticipantDao.getParticipantById(participantList[index]);
            if (!participantInfo) {
                console.warn(`Participant with ID ${studyParticipant.participantId} not found.`);
                return null;
            } else {
                participantListInfo.push(participantInfo);
            }
        }

        if (participantListInfo) {
            res.status(HTTP_SUCCESS).json(participantListInfo);
        }
        else {
            res.status(HTTP_NOT_FOUND).json({message: 'Participant list not found'});
        }

    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }

});

// Create a new session 
router.post('/:studyId', async (req, res) => {
    
    const { studyId } = req.params;
    const session = req.body;
    session.studyId = studyId;

    try {
        const newSession = await SessionDao.createSession(session);
        res.status(HTTP_CREATED).json(newSession);
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
})

// Edit a session
router.put('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params
    const updateData = req.body;
    
    try {
        const success = await SessionDao.updateSession(sessionId, updateData);
        res.status(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }

});

// Delete session button
router.delete('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params;
    
    try {
        const success = await SessionDao.deleteSession(sessionId);
        res.status(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND).json(success);
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
});

export default router;