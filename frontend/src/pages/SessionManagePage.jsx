import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateSession from '../components/Session/CreateSession';
import SessionActionButton from '../components/Button/SessionActionButton';
import { SessionContext } from './SessionContextProvider';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import {styled} from '@mui/material/styles'
/*
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
*/

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
      whiteSpace: 'pre-line',
      lineHeight: '1.4',
      textAlign: 'center'
  },
  '& .MuiDataGrid-cell:focus': {
      outline: 'none'
  }
}));

/*
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  }
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};
*/
/*
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  //window: PropTypes.func,
//}


export default function SessionManagePage() {
  
  const {sessions, studyInfo} = React.useContext(SessionContext);

  const columns = [
    { field: 'sessionCode', headerName: 'Session Code', width: 250, headerAlign: 'center', align:'center'},
    { field: 'date', headerName: 'Date', width: 250, headerAlign: 'center', align:'center', valueGetter: (params) => (params.value.slice(0,10)) },
    { field: 'time', headerName: 'Time', width: 250, headerAlign: 'center', align:'center'},
    { field: 'location', headerName: 'Location', width: 250, headerAlign: 'center', align:'center'},
    { field: 'participantNum', headerName: 'Participant Number', width: 250, headerAlign: 'center', align:'center' },
    { field: '_id', headerName: 'Action', width: 200, headerAlign: 'center', align:'center', renderCell: (params) => (<SessionActionButton pageItemId = {params.value}/>)},
  ]

    return (
        <div>
          <Box sx={{ display: 'flex'}}>
            <Navbar/>
            <Sidebar isSession={true}/>
          </Box>
          <Box marginLeft={35} marginRight={23}>
            <h1>Session Management</h1>
            <h1>{studyInfo.studyName} (Study Code: {studyInfo.studyCode})</h1>
            <CreateSession create={true}/>
            <StyledDataGrid
              sx={{
                marginTop: 2,
                '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' }
              }}
              getRowId={(row) => row._id}
              rows={sessions}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              slots={{
                toolbar: GridToolbar
              }}
              disableSelectionOnClick
              hideFooterSelectedRowCount
          />
          </Box>
        </div>       
    );
}