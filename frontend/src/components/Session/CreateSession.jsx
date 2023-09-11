import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CreateSessionContext } from '../../pages/SessionManagePage';
import SessionParticipantSelection from './SessionParticipantSelection';

export default function CreateSession() {
  
  const [open, setOpen] = React.useContext(CreateSessionContext);
  const scroll ='paper';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>New Session</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth='true'      
      >
        <DialogTitle id="scroll-dialog-title">Create New Session</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            display={'flex'}
            flexDirection={'row'}
          >
            <Box display={'flex'} flexDirection={'column'} sx={{width: 400, marginLeft: 10, marginRight: 10}}>
              <TextField id="outlined-basic" label="Date" variant="outlined" margin="normal" fullWidth/>
              <TextField id="outlined-basic" label="Time" variant="outlined" margin="normal"/>
              <TextField id="outlined-basic" label="Location" variant="outlined" margin="normal"/>
              <TextField id="outlined-basic" label="Number of Participants" variant="outlined" margin="normal"/>
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
              <h3>Participant List</h3>
              <SessionParticipantSelection/>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Save</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
