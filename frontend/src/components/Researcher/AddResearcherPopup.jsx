import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddResearcher( {setOpenDialog, handleAddResearcher}) {
    const [open, setOpen] = React.useState(true);


    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleClose = () => {
        setOpen(false);
        setOpenDialog(false);
    };

    

    const handleAdd = () => {
        // Validate input fields here if needed

        // Call the parent's function to add researcher
        // not finish the handle Add Researcher yet
        handleAddResearcher({ firstName, lastName, email });
        handleClose();
    };




    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Reseracher to the System</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the full name and the email address:
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                type="email"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                type="email"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAdd}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
