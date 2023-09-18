import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ConfirmPopup from '../Popup/ConfirmPopup';
import OptionPopup from '../Popup/OptionPopup';
import { SessionContext } from '../../pages/SessionContextProvider';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function CreateSession({create, targetSessionId}) {
  
  const scroll ='paper';
  const randomNum = Math.round(Math.random()*9999)
  const randomSessionCode = `SE${randomNum.toString()}`
  const { sessions, studyParticipantInfo, addSession, updateSession, refreshSession} = React.useContext(SessionContext);
  const targetSession = sessions.find(s => s._id === targetSessionId)
  
  const [open, setOpen] = React.useState(false);
  const [sessionContent, setSessionContent] = React.useState({
    studyId: useParams(),
    sessionCode: randomSessionCode, //Pending unique check
    date:'', 
    time:'', 
    location:'', 
    participantNum: 0,
    //participantList: []
  })

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(studyParticipantInfo);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleSessionChange = (e) => {
    setSessionContent({...sessionContent, [e.target.name]: e.target.value})
  }

  const handleNewClickOpen = () => {
    setRight([])
    setLeft(studyParticipantInfo);
    setOpen(true);
  };

  const handleEditClickOpen = () => {
    //console.log(targetSession);
    setSessionContent({
      _id: targetSession._id,
      studyId: targetSession.studyId,
      sessionCode: targetSession.sessionCode,
      date: targetSession.date, 
      time: targetSession.time, 
      location: targetSession.location, 
      participantNum: targetSession.participantNum,
    })
    const editParticipantList = studyParticipantInfo.reduce(
      (result, item) =>
      targetSession.participantList.some(el => el._id === item.participantInfo._id)
          ? [...result, item]
          : result,
      []
    );
    //console.log(editParticipantList)
    setRight(editParticipantList);
    //setLeft(studyParticipantInfo);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    
    let participantInfo = []
    for (let index = 0; index < right.length; index++) {
      participantInfo.push(right[index].participantInfo);
    }
    sessionContent.participantList = participantInfo;
    const newSession = addSession(sessionContent);
    console.log(newSession);
    refreshSession();
  };

  const handleUpdate = () => {
    let updatedParticipantInfo = []
    for (let index = 0; index < right.length; index++) {
      updatedParticipantInfo.push(right[index].participantInfo);
    }
    sessionContent.participantList = updatedParticipantInfo;
    const updatedSession = updateSession(sessionContent);
    console.log(updatedSession);
    refreshSession();
  }

  React.useEffect(() => {
    //console.log(right)
    //console.log(left)
  }, [right])

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 400,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.participantId}-label`;

          return (
            <ListItem
              key={value._id}
              role="listitem"
              onClick={handleToggle(value)}             
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
                <ListItemText id={labelId} 
                  primary = {`Serial Number: ${value.serialNum}`}
                  secondary =  {`Email: ${value.participantInfo.email}`}
                />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div>      
      {create ? <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewClickOpen}>New Session</Button> 
              : <Typography textAlign="center" onClick={handleEditClickOpen}>Edit Session</Typography>}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth     
      >
        <DialogTitle id="scroll-dialog-title">{create ? 'Create New Session' : `Edit Session (Session Code: ${targetSession ? targetSession.sessionCode: null})`}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Box 
            component="form"
            noValidate
            autoComplete="off"
            display={'flex'}
            flexDirection={'row'}
          >
            <Box display={'flex'} flexDirection={'column'} sx={{marginLeft: 15, marginRight: 5}}>
              <TextField required id="outlined-required" type="date" name="date" variant="outlined" margin="normal" onChange={handleSessionChange} value={sessionContent.date.slice(0, 10)}/>
              <TextField required id="outlined-required" type='time' name="time" variant="outlined" margin="normal" onChange={handleSessionChange} value={sessionContent.time}/>
              <TextField required id="outlined-required" label="Location" name="location" variant="outlined" margin="normal" onChange={handleSessionChange} value={sessionContent.location}/>
              <TextField required id="outlined-required" label="Number of Participants" name="participantNum" variant="outlined" margin="normal" onChange={handleSessionChange} value={sessionContent.participantNum}/>
              <h3>Participant List</h3>
              <Box display={'flex'} flexDirection={'row'} >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item>{customList('Participant Choices', left)}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList('Chosen Participants', right)}</Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <ConfirmPopup 
            buttonText={'Save'} 
            popupText={create ? `Session ${sessionContent.sessionCode} created!`: `Session ${targetSession ? targetSession.sessionCode: null} changes saved!`}
            onClick={create ? handleCreate : handleUpdate} 
            onConfirm={handleClose} sx={{marginRight: 5}}/>
          <OptionPopup 
            buttonText={'Cancel'} 
            popupText={'Are you sure you want to discard the saving?'} 
            onClick={handleClose}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}
