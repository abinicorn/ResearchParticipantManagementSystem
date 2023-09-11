import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddRsearcherPopup from './AddResearcherPopup';
    
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    }));
    
    export default function ResearcherManagePopup() {
        const [open, setOpen] = React.useState(false);
        const [addPopupOpen, setAddPopupOpen] = React.useState(false);

        const handleAddClick = () => {
            setAddPopupOpen(true);
            <AddRsearcherPopup setOpenDialog={setAddPopupOpen} />
            setOpen(false); // Close the current dialog
        }
        
        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        
        return (
            <div>
            {/* This button is for testing, will be deleted later */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Manage Researchers
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                <Typography gutterBottom>
                    <h2> Current Reseracher </h2>
                    <Stack direction="row" spacing={2}>
                        <Avatar  />

                    </Stack>
                </Typography>

                <Typography gutterBottom>
                    <h2>Add New Researcher</h2>
                    Email Address: <input type="email"></input>
                    <Button onClick={handleAddClick}> Add </Button>
                    {/* {addPopupOpen && <AddRsearcherPopup setOpenDialog={setAddPopupOpen} />} */}

                </Typography>

                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
                </DialogActions>
            </BootstrapDialog>
            </div>
        );


}