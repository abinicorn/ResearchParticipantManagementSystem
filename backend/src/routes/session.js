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
            res.sendStatus(HTTP_SUCCESS).json(session);
        } else {
            res.sendStatus(HTTP_NOT_FOUND).json({message: 'Sessions not found'});
        }
    } catch (error) {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
});

// Edit session button: display the session's info
router.get('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params;

    try {
        const session = await SessionDao.retrieveSessionById(sessionId);
        if (session) {
            res.sendStatus(HTTP_SUCCESS).json(session);
        } else {
            res.sendStatus(HTTP_NOT_FOUND).json({message: 'Session not found'});
        }
    } catch {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
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
            participantListInfo.push(participantInfo);
        }

        if (participantListInfo) {
            res.sendStatus(HTTP_SUCCESS).json(participantListInfo);
        }
        else {
            res.sendStatus(HTTP_NOT_FOUND).json({message: 'Participant list not found'});
        }

    } catch {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }

});

// Create a new session 
router.post('/:studyId', async (req, res) => {
    
    const { studyId } = req.params;
    const session = req.body;
    session.studyId = studyId;

    try {
        const newSession = await SessionDao.createSession(session);
        res.status(HTTP_CREATED)
            .header('Location', `/${newSession._id}`)
            .json(newSession);
    } catch {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
})

// Edit a session
router.put('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params;
    const session = req.body;
    session._id = sessionId;
    
    try {
        const success = await SessionDao.updateSession(session);
        res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
    } catch {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }

});

// Delete session button
router.delete('/:sessionId', async (req, res) => {
    
    const { sessionId } = req.params;
    
    try {
        const success = await SessionDao.deleteSession(sessionId);
        res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
    } catch {
        res.sendStatus(HTTP_SERVER_ERROR).json({message: "An error occurred", error});
    }
    
});

export default router;