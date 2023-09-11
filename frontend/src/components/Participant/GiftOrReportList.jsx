import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemSecondaryAction, Grid, Button, Typography, Box } from '@mui/material';
import CustomCheckbox from '../Button/CustomCheckbox';
import CloseCircleButton from '../Button/CloseCircleButton';
import '../../styles/GiftList.css';

export default function GiftList({ participants: initialParticipants, type = 'gift' }) {
    const [open, setOpen] = useState(false);
    const [participants, setParticipants] = useState(initialParticipants);

    const handleToggleGift = (serialNum) => {
        const updatedParticipants = participants.map(p => {
            if (p.serialNum === serialNum) {
                if (type === 'gift') {
                    return { ...p, isSentGift: !p.isSentGift };
                } else if (type === 'report') {
                    return { ...p, isSentReport: !p.isSentReport };
                }
            }
            return p;
        });
        setParticipants(updatedParticipants);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (serialNum) => {
        console.log(`Delete participant with serialNum: ${serialNum}`);
        // Here you can implement the logic to remove the participant from the list
    };

    const getTitle = () => {
        return type === 'gift' ? 'Gift List' : 'Report Recipients List';
    }

    const shouldIncludeParticipant = (participant) => {
        return type === 'gift' ? participant.isGift : participant.isWIllReceiveReport;
    }

    const getCheckboxState = (participant) => {
        return type === 'gift' ? participant.isSentGift : participant.isSentReport;
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                {type === 'gift' ? 'Show Gift List' : 'Show Report Recipients'}
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle align="center">
                    <Typography variant="h5" color="primary" style={{ marginBottom: '20px' }}><strong>{getTitle()}</strong></Typography>
                    <ListItem>
                            <Grid container>
                                <Grid item xs={3}><Typography color="primary"><strong>Serial No.</strong></Typography></Grid>
                                <Grid item xs={5}><Typography color="primary"><strong>Email</strong></Typography></Grid>
                                <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginLeft: '15%' }}>
                                        <Typography color="primary" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <strong>{type === 'gift' ? 'Sent Gift' : 'Sent Report'}</strong>
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{ marginLeft: '20%' }}>
                                        <Typography color="primary"><strong>Delete</strong></Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </ListItem>
                </DialogTitle>
                <DialogContent>
                    <List>
                        {participants.map((participant) => (
                            shouldIncludeParticipant(participant) && (
                                <ListItem key={participant.serialNum}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={3}>
                                            <Typography color="primary">{participant.serialNum}</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <div className="emailContainer">
                                                <Typography color="primary">{participant.participantInfo.email}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <CustomCheckbox checked={getCheckboxState(participant)} onChange={() => handleToggleGift(participant.serialNum)} />
                                        </Grid>
                                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <CloseCircleButton onClick={() => handleDelete(participant.serialNum)} size="25px"/>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        ))}
                    </List>
                </DialogContent>
                <Box display="flex" justifyContent="center" marginTop={2} style={{ padding: '20px'}}>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}



// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, Grid, Button, Typography, Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// export default function GiftList({ participants: initialParticipants, open, onClose, onDelete }) {
//     const [participants, setParticipants] = useState(initialParticipants);

//     const handleToggleGift = (serialNum) => {
//         const updatedParticipants = participants.map(p => {
//             if (p.serialNum === serialNum) {
//                 return { ...p, isSentGift: !p.isSentGift };
//             }
//             return p;
//         });
//         setParticipants(updatedParticipants);
//     };

//     return (
//         <Dialog open={open} onClose={onClose} fullWidth>
//             <DialogTitle align="center">
//                 <Typography variant="h5" color="primary">Gift List</Typography>
//             </DialogTitle>
//             <DialogContent>
//                 <List>
//                     <ListItem>
//                         <Grid container>
//                             <Grid item xs={3}><Typography color="primary"><strong>Serial No.</strong></Typography></Grid>
//                             <Grid item xs={5}><Typography color="primary"><strong>Email</strong></Typography></Grid>
//                             <Grid item xs={2}><Typography color="primary"><strong>Sent Gift</strong></Typography></Grid>
//                             <Grid item xs={2}></Grid> {/* This is for the delete icon space */}
//                         </Grid>
//                     </ListItem>
//                     {participants.map((participant) => (
//                         participant.isGift && (
//                             <ListItem key={participant.serialNum}>
//                                 <Grid container>
//                                     <Grid item xs={3}>
//                                         <ListItemText primary={participant.serialNum} primaryTypographyProps={{ color: 'primary' }} />
//                                     </Grid>
//                                     <Grid item xs={5}>
//                                         <ListItemText primary={participant.email} primaryTypographyProps={{ color: 'primary' }} />
//                                     </Grid>
//                                     <Grid item xs={2}>
//                                         <Checkbox checked={participant.isSentGift} onChange={() => handleToggleGift(participant.serialNum)} />
//                                     </Grid>
//                                     <Grid item xs={2}>
//                                         <ListItemSecondaryAction>
//                                             <IconButton edge="end" aria-label="delete" onClick={() => onDelete(participant.serialNum)}>
//                                                 <CloseIcon color="error" />
//                                             </IconButton>
//                                         </ListItemSecondaryAction>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         )
//                     ))}
//                 </List>
//             </DialogContent>
//             <Box display="flex" justifyContent="center" marginTop={2}>
//                     <Button variant="contained" color="primary" onClick={onClose}>
//                         Close
//                     </Button>
//                 </Box>
//         </Dialog>
//     );
// }

