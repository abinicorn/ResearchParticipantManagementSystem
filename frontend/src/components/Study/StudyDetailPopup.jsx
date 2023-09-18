import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function StudyDetailPopup({ study, onClose, open }) {
    const handleClosePopup = () => {
        onClose();
    };
    const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);

    const handleSessionButton = () => {
        setIsSessionDialogOpen(true);
    };

    const handleCloseSessionDialog = () => {
        setIsSessionDialogOpen(false);
    };

    const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);

    const handleParticipantButton = () => {
        setIsParticipantDialogOpen(true);
    };

    const handleCloseParticipantDialog = () => {
        setIsParticipantDialogOpen(false);
    };



    return (
        <Dialog
            open={open}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md" // 设置最大宽度，可以根据需要调整
            fullWidth // 使用窗口宽度
            maxHeight="80%"
        >


            <Paper sx={{ padding: '20px' }} elevation={3} className="study-info-popup">
                <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                    <Grid item xs={12} align="center">
                        <Typography variant="h4">{study.name} ({study.code})</Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h5">{study.creator}</Typography>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Typography variant="body1">ResearcherList:&nbsp;
                        {study.researcherList.map((researcher, index) => (
                            <span key={index}>{researcher}；</span>
                        ))}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Paper elevation={0} sx={{ padding: '10px' }}>
                            <Typography variant="body1">Description:</Typography>
                            <Box sx={{ backgroundColor: 'royalblue', padding: '10px', borderRadius: '4px' }}>
                                <Typography variant="body1">{study.description}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Typography variant="body1">Type: {study.experimentType}</Typography>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Typography variant="body1">Date: {study.date}</Typography>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Typography variant="body1">Location: {study.location}</Typography>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Button variant="contained" color="secondary" onClick={handleSessionButton}>Session List</Button>

                        <a href="/session" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">Session List</Button>
                        </a>
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Button variant="contained" color="secondary" onClick={handleParticipantButton}>Participant List</Button>

                        <a href="/session" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">Participant List</Button>
                        </a>
                    </Grid>
                    <Grid item xs={12} align="right">
                        <Button variant="contained" color="primary" onClick={handleClosePopup}>Close</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={isSessionDialogOpen} onClose={handleCloseSessionDialog}>
                {/* 弹窗内容 */}
                <Typography variant="h6">This is a dialog</Typography>
                <Typography variant="body1">You can put any content here.</Typography>
                <Button variant="contained" color="primary" onClick={handleCloseSessionDialog}>Close</Button>
            </Dialog>

            <Dialog open={isParticipantDialogOpen} onClose={handleCloseParticipantDialog}>
                {/* 弹窗内容 */}
                <Typography variant="h6">This is a dialog</Typography>
                <Typography variant="body1">You can put any content here.</Typography>
                <Button variant="contained" color="primary" onClick={handleCloseParticipantDialog}>Close</Button>
            </Dialog>

        </Dialog>
    );
}