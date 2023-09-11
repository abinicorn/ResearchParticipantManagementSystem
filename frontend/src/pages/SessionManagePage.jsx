import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateSession from '../components/Session/CreateSession';
import ActionButton from '../components/Button/ActionButton';

export const CreateSessionContext = React.createContext(undefined);

export default function SessionManagePage() {

  // New Session open set up
  const [open, setOpen] = React.useState(undefined);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
      
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
      
  function createData(sessionCode, date, time, location, participantNum) {
    return { sessionCode, date, time, location, participantNum };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];

    return (
        <div>
          <Box sx={{ display: 'flex' }}>
            <Navbar/>
            <Sidebar/>
          </Box>
          <Box component="main" marginLeft={35} marginRight={20}>
            <h1>Session Management</h1>
            <h1>Study Name</h1>
            <CreateSessionContext.Provider value={[open, setOpen]}>
              <CreateSession/>
            </CreateSessionContext.Provider>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Session Code</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Time</StyledTableCell>
                        <StyledTableCell align="right">Location</StyledTableCell>
                        <StyledTableCell align="right">Participant Number</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.sessionCode}>
                        <StyledTableCell component="th" scope="row">
                            {row.sessionCode}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.date}</StyledTableCell>
                        <StyledTableCell align="right">{row.time}</StyledTableCell>
                        <StyledTableCell align="right">{row.location}</StyledTableCell>
                        <StyledTableCell align="right">{row.participantNum}</StyledTableCell>
                        <StyledTableCell align="right">
                          <ActionButton pageCondition = "sessionBoard"/>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
          </Box>   
        </div>       
    );
}