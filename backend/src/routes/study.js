import express from 'express';
import StudyDao from '../database/study/dao/StudyDao.js';
import {ResearcherDao} from '../database/researcher/dao/ResearcherDao.js';

const router = express.Router();

import { HTTP_SUCCESS,
    HTTP_NOT_FOUND,
    HTTP_SERVER_ERROR,
    HTTP_BAD_REQUEST,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_LOGIN_ERROR} from "../enum.js";

// Route to retrieve study details by studyId
router.get('/:studyId', async (req, res) => {
    const studyId = req.params.studyId;
    try {
        const study = await StudyDao.retrieveStudy(studyId);
        if (!study) {
            return res.status(HTTP_NOT_FOUND).json({ message: 'Study not found' });
        }
        res.status(HTTP_SUCCESS).json(study);
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
});

// Create a new study and associate it with a researcher
router.post('/:researcherId', async (req, res) => {
    try {
        const researcherId = req.params.researcherId;
        const studyData = req.body; // Assuming you have the study data in the request body

        // Create a new study
        const newStudy = await StudyDao.createStudy(studyData);

        // Find the researcher and update their studyList
        //researcher
        const updatedResearcher = await ResearcherDao.updateResearcherByResearcherId(
            researcherId,
            newStudy._id
        );

        res.status(HTTP_CREATED).json({
            message: 'Study created and associated with researcher',
            study: newStudy,
            researcher: updatedResearcher
        });
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ error: 'Error creating study' });
        console.log(error);
    }
});

// Route to query existing researchers in a study by studyId
router.get('/researcher/list/:studyId', async (req, res) => {
    try {
        const studyId = req.params.studyId;
           // Query existing researcherId in the study
        const researcherIdList = await StudyDao.retrieveResearcherIdListByStudyId(studyId);
        res.status(HTTP_SUCCESS).json(researcherIdList);
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ message: 'Error querying researchers in study', error });
        }
    });


// Route to edit study details by studyId
router.put('/study/:studyId', async (req, res) => {
    const studyId = req.params.studyId;
    const updatedData = req.body;

    try {
        //updatedStudy variable will hold the updated study document with the latest changes as {new: true}
        //This can be useful for displaying or further processing the updated information.
        const updatedStudy = await StudyDao.updateStudy(studyId, updatedData, { new: true });
        if (!updatedStudy) {
            return res.status(HTTP_NOT_FOUND).json({ message: 'Study not found' });
        }
        res.status(HTTP_SUCCESS).json({ message: 'Study details updated successfully', updatedStudy });
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
});




export default router;