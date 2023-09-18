import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, DialogActions } from '@mui/material';
import ParticipantList from './StudyParticipantTable'

export default function StudyParticipantTable() {
    const [open, setOpen] = useState(false);
    // Convert the participants' emails into a comma-separated string

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* This button will open the mailing list dialog */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                open pop table
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl" fullScreen>
                <DialogContent style={{ height: '94h', width: '97vw' }}>
                    <ParticipantList />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
