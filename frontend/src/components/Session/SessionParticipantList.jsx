import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SessionMailingList from './SessionMailingList';
import { SessionContext } from '../../pages/SessionContextProvider';

export default function SessionParticipantList({ targetSessionId }) {
    
    const [open, setOpen] = React.useState(false);
    const scroll ='paper';
    const { sessions } = React.useContext(SessionContext);
    const targetSession = sessions.find(s => s._id === targetSessionId);
    const participantInfo = targetSession.participantList
    /*
    const [targetSession, setTargetSession] = React.useState([]);
    const [participantInfo, setParticipantInfo] = React.useState([])
    try {
        if(targetSessionId) {
            setTargetSession(sessions.find(s => s._id === targetSessionId))
            setParticipantInfo(targetSession.participantList)
        }
    } catch (error) {
        console.log(error)
    }
    */
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography textAlign="center" onClick={handleClickOpen}>View participant</Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="lg"
                fullWidth      
            >
                <DialogTitle id="scroll-dialog-title">View Participants</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Serial Number</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {participantInfo.map((info) => (
                                <TableRow
                                key={info._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">{info.serialNum}</TableCell>
                                <TableCell align="right">{info.firstName}</TableCell>
                                <TableCell align="right">{info.lastName}</TableCell>
                                <TableCell align="right">{info.email}</TableCell>
                                <TableCell align="right">{info.phoneNum}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <SessionMailingList participants={participantInfo}/>
                    <Button variant="contained" onClick={handleClose} sx={{marginLeft: 1}}>Close</Button>
                </DialogActions>
            </Dialog>
    </div>
    );
}