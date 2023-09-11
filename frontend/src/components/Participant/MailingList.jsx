import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';

export default function MailingList({ participants}) {
    const [open, setOpen] = useState(false);
    // Convert the participants' emails into a comma-separated string
    const emails = participants.map(p => p.participantInfo.email).join(', ');

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
                Show Mailing List
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle align="center">
                    <Typography variant="h5" component="div" color="primary" style={{ marginBottom: '20px' }}>
                        <strong>Mailing List</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <textarea 
                        value={emails} 
                        readOnly 
                        style={{ width: '100%', height: '400px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }}
                    />
                    <Box display="flex" justifyContent="center" marginTop={2} style={{ padding: '20px'}}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}