import express from 'express';
import StudyDao from '../database/study/dao/StudyDao.js';
import {ResearcherDao} from '../database/researcher/dao/ResearcherDao.js';
import Researcher from "../database/researcher/domain/ResearcherDomain.js";

const router = express.Router();

import { HTTP_SUCCESS,
    HTTP_NOT_FOUND,
    HTTP_SERVER_ERROR,
    HTTP_BAD_REQUEST,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_LOGIN_ERROR} from "../enum.js";
import Study from '../database/study/domain/StudyDomain.js';

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


// Route to edit study details by studyId
router.put('/:studyId', async (req, res) => {
    const studyId = req.params.studyId;
    const updatedData = req.body;

    try {
        const updatedStudy = await StudyDao.updateStudy(studyId, updatedData);
        if (!updatedStudy) {
            return res.status(HTTP_NOT_FOUND).json({ message: 'Study not found' });
        }
        else{
            res.status(HTTP_SUCCESS).json(updatedStudy);
        }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ message: 'An error occurred'});
    }
});

// Create a new study and associate it with a researcher
router.post('/:researcherId', async (req, res) => {
    console.log("connected");
    try {
        const researcherId= req.params.researcherId;
        const studyData = req.body; 
        // Create a new study
        const newStudy = await StudyDao.createStudy(studyData);

        // Find the researcher and update their studyList
        console.log("Researcher: " +studyData.creator);
        const updatedResearcher = await ResearcherDao.updateResearcherByResearcherId(
            studyData.creator,
            newStudy._id
        );

        res.status(HTTP_CREATED).json({
            message: 'Study created and associated with researcher',
            study: newStudy,
            researcher: updatedResearcher
        });
        console.log("passed");
    } catch (error) {
        console.log(error);
        res.status(HTTP_SERVER_ERROR).json({ error: 'Error creating study' });
    }
});

// Route to query existing researchers in a study by studyId
router.get('/researcher/list/:studyId', async (req, res) => {
    try {
        const studyId = req.params.studyId;
        console.log(studyId);
           // Query existing researcherId in the study
        const researcherList = await StudyDao.retrieveResearcherListByStudyId(studyId);
        console.log(researcherList);
        res.status(HTTP_SUCCESS).json(researcherList);
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


// Route to delete a study by studyId、
router.put('/removeResearcher/:studyId/:researcherId', async (req, res) => {

    const studyId = req.params.studyId;
    const researcherId = req.params.researcherId;
    const creator = await StudyDao.findCreator(studyId);
    if(creator.equals(researcherId)){
        res.status(HTTP_BAD_REQUEST).json({ message: 'Can not delete creator' });
    }
    else{
        try {
            const removeStudy = await ResearcherDao.removeStudyfromResearcher(studyId, researcherId);
            const removeResearcher = await StudyDao.removeResearherfromStudy(studyId, researcherId);

            // Check if both operations were successful
            if (removeStudy.success && removeResearcher.success) {
                res.status(HTTP_SUCCESS).json({ message: 'Researcher removed from study and study removed from researcher' });
            } else {
                res.status(HTTP_SERVER_ERROR).json({ message: 'Error removing researcher from study' });
            }
        } catch (error) {
            res.status(HTTP_SERVER_ERROR).json({ message: 'Error removing researcher from study', error });
        }
    }
});


//Route to update researcher's studylist and study's researcherlist
router.put('/associateResearcher/:studyId/:researcherId', async (req, res) => {
    const studyId = req.params.studyId;
    const researcherId = req.params.researcherId;

    try{
        const updatedStudy = await StudyDao.updateStudyByStudyId(studyId, researcherId);
        const updatedResearcher = await ResearcherDao.updateResearcherByResearcherId(researcherId, studyId);
        if(updatedStudy && updatedResearcher){
            res.status(HTTP_SUCCESS).json({ message: 'Researcher associated with study' });
        }
        else{ 
            res.status(HTTP_BAD_REQUEST).json({ message: 'Can not associate researcher with study' });
        }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({ message: 'Error associating researcher with study', error });

    }
});


//Route for adding a new researcher and associate with an existing study
router.post('/addResearcher/:studyId', async (req, res) => {
    const {firstName, lastName, email} = req.body;
    const studyId = req.params.studyId;

    try{
        const username = email.split('@')[0];
        const study = await StudyDao.retrieveStudy(studyId);
        if (!study) {
            return res.status(HTTP_NOT_FOUND).json({message: 'study not found'});
        }
        else{
            const newResearcher= new Researcher({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: '123456',
                studyList: []
            });

            const updateResearcher= await ResearcherDao.createResearcher(newResearcher); 
            const updateStudy=await StudyDao.updateStudyByStudyId(studyId, updateResearcher._id);
            const associateResearcher= await ResearcherDao.updateResearcherByResearcherId(updateResearcher._id, studyId);
            res.status(HTTP_SUCCESS).json({username : newResearcher.username, message: 'New researcher added & study updated successfully'});
        }
    }catch (err) {
        res.status(HTTP_SERVER_ERROR).json ({message: 'Adding researcher associating with study error'});
    }
});






export default router;