import React, { useState, useEffect, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, FormControlLabel, 
    Grid, List, ListItem, ListItemText, Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import CustomCheckbox from '../Button/CustomCheckbox';
import CloseCircleButton from '../Button/CloseCircleButton';
import ConfirmPopup from '../Popup/ConfirmPopup';
import OptionPopup from '../Popup/OptionPopup';
// import usePost from '../../hooks/usePost';
// import useGet from '../../hooks/useGet'

import { StudyParticipantContext } from '../../providers/StudyPaticipantsProvider';

import Papa from 'papaparse';

export default function AddParticipant({ study_id }) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isWillContact, setIsWillContact] = useState(false);
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [csvData, setCsvData] = useState([]);

    const {studyParticipants, addStudyParticipants, fetchStudyParticipants, addParticipants} = useContext(StudyParticipantContext);
    // const dispatch = useDispatch();
    // const { 
    //     executePost: postParticipant, 
    //     data: participantData, 
    //     error: participantError 
    // } = usePost('http://localhost:3001/participant/add');
    
    // const { 
    //     executePost: postStudyParticipant, 
    //     data: studyParticipantData, 
    //     error: studyParticipantError 
    // } = usePost(`http://localhost:3001/study-participants/64fef4f7b921a503b17be43c`);

    // const { 
    //     data: updatedStudyParticipants, 
    //     refresh: refreshStudyParticipants 
    // } = useGet('http://localhost:3001/study-participants/64fef4f7b921a503b17be43c');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // read submitted csv files
    const parseFile = async (file, encounteredEmails) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    // filter existing email in the encounteredEmails
                    const uniqueRows = result.data.filter(row => {
                        if (encounteredEmails.has(row.Email)) {
                            return false;
                        }
                        encounteredEmails.add(row.Email);
                        return true;
                    });
                    resolve(uniqueRows);
                },
                error: (err) => {
                    reject(err.message);
                }
            });
        });
    };
    
    const parseUploadedFiles = async () => {
        const encounteredEmails = new Set();
        const results = await Promise.all(files.map(file => parseFile(file, encounteredEmails)));
        return results.flat();
    };

    const assembleParticipantsData = async () => {
        const csvData = await parseUploadedFiles();
        console.log(csvData);
    
        // participants in csv files
        const csvParticipants = csvData.map(data => ({
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            isWillContact: data.IsWillContact.toLowerCase() === 'true' ? true : false
        }));
    
        console.log(csvParticipants);
    
        // participant input by manual
        const manualParticipant = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            isWillContact: isWillContact
        };
    
        // Combine both
        const allParticipants = [manualParticipant, ...csvParticipants];
    
        return { participants: allParticipants };
    };

    const handleFileUpload = (event) => {
        let uploadedFiles = [...event.target.files];
        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    };

    const handleFileDelete = (fileToDelete) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
    };

    const handleSave = async () => {
        try {

            const newParticipants = await assembleParticipantsData();
            console.log(newParticipants);
    
            // use Redux thunk to add participants
            const actionResult1 = await addParticipants(newParticipants);
    
            if (actionResult1.payload) {
                console.log("Participant data received", actionResult1.payload);
                
                // extract all participants '_id'
                const participantIds = [...(actionResult1.payload.success || []), ...(actionResult1.payload.existing || [])].map(p => p._id);
                
                // use Redux thunk to add study participants
                const studyParticipantsPayload = {
                    study_id: study_id,
                    studyParticipants: { participantIds: participantIds }
                };
                const actionResult2 = await addStudyParticipants(studyParticipantsPayload);
    
                if (actionResult2.payload && actionResult2.payload.length > 0) {
                    console.log('StudyParticipant Response:', actionResult2.payload);
                    await fetchStudyParticipants();
                } else {
                    console.log('all imput study participants are existing!');
                }
            }
        } catch (error) {
            console.error("Error posting participant or study participant:", error);
        }
    };
    
    // useEffect(() => {
    //     if (participantData) {
    //         console.log("Participant data received", participantData);
            
    //         // 1. 提取所有的participant _id
    //         const participantIds = [...(participantData.success || []), ...(participantData.existing || [])].map(p => p._id);
        
    //         // 2. 使用usePost hook发送POST请求到StudyParticipant的路由
    //         postStudyParticipant({ participantIds: participantIds });
    //     }
    // }, [participantData]);
    
    // useEffect(() => {
    //     if (studyParticipantData) {
    //         console.log('StudyParticipant Response:', studyParticipantData);
    //         refreshStudyParticipants();
    //     }
    //     if (studyParticipantError) {
    //         console.error('StudyParticipant Error:', studyParticipantError);
    //     }
    // }, [studyParticipantData, studyParticipantError]);
    
    // useEffect(() => {
    //     if (updatedStudyParticipants) {
    //         // update Redux store
    //         dispatch(setStudyParticipants(updatedStudyParticipants));
    //     }
    // }, [updatedStudyParticipants]);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
                Add New Participant
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle align="center">
                    <Typography variant="h5" color="primary" style={{ marginBottom: '20px' }}><strong>Add New Participant</strong></Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        fullWidth 
                        label="FirstName"  
                        variant="outlined" 
                        value={firstName}  
                        onChange={(e) => setFirstName(e.target.value)} 
                        style={{ marginTop: '20px'}}
                    />
                    <TextField 
                        fullWidth 
                        label="LastName"   
                        variant="outlined" 
                        value={lastName}    
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ marginTop: '20px'}}
                    />
                    <TextField 
                        fullWidth 
                        label="Email" 
                        variant="outlined" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '20px', marginTop: '20px'}}
                    />
                    <FormControlLabel
                        control={
                            <CustomCheckbox 
                                checked={isWillContact}
                                onChange={() => setIsWillContact(!isWillContact)}
                            />
                        }
                        label="This participant is willing to join in the future studies."
                    />
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Uploaded Files:
                    </Typography>
                    <List>
                        {files.map((file, index) => (
                            <ListItem key={index}>
                                <Grid container alignItems="center" spacing={2} justifyContent="flex-end">
                                    <Grid item xs={1} container justifyContent="flex-end">
                                        <FileCopyIcon />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText primary={file.name} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CloseCircleButton onClick={() => handleFileDelete(file)} size="28px" />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Grid container direction="column" alignItems="center" style={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            >
                                Upload a CSV File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileUpload}
                                accept=".csv"
                            />
                        </Button>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ padding: '20px'}}>
                    <ConfirmPopup buttonText={'Add'} popupText={'The participants have been added'} open={popUpOpen} onClick={handleSave} onConfirm={handleClose}/>
                    <OptionPopup buttonText={'Cancel'} popupText={'Do you want to cancel?'} onClick={handleClose}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}
