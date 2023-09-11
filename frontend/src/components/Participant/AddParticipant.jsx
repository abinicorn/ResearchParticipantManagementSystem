import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, FormControlLabel, 
    Grid, List, ListItem, ListItemText, Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CustomCheckbox from '../Button/CustomCheckbox';
import CloseCircleButton from '../Button/CloseCircleButton';
import ConfirmPopup from '../Popup/ConfirmPopup';
import OptionPopup from '../Popup/OptionPopup';

export default function AddParticipant() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [joinFutureStudies, setJoinFutureStudies] = useState(false);
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileUpload = (event) => {
        let uploadedFiles = [...event.target.files];
        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    };

    const handleFileDelete = (fileToDelete) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete));
    };

    const handleSave = () => {
        console.log('Saved!')
        // Handle saving the data here
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Participant
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle align="center">
                    <Typography variant="h5" color="primary" style={{ marginBottom: '20px' }}><strong>Add New Participant</strong></Typography>
                </DialogTitle>
                <DialogContent>
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
                                checked={joinFutureStudies}
                                onChange={() => setJoinFutureStudies(!joinFutureStudies)}
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
