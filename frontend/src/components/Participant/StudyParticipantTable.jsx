import React, {useState, useEffect, useContext} from 'react';
import {Chip, Typography, Box} from '@mui/material';
import {styled} from '@mui/material/styles'
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF, gridPageCountSelector,
GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';

import EditParticipant from './EditParticipant';
import CloseCircleButton from '../Button/CloseCircleButton';
import { StudyParticipantContext } from '../../providers/StudyPaticipantsProvider';

import '../../styles/DataGrid.css';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: theme.palette.primary.light,
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

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

export default function ParticipantsTable() {
    console.log("Start to render datagrid");

    const {studyParticipants} = useContext(StudyParticipantContext);

    const gridStyle = studyParticipants.length === 0
    ? { height: 400, width: '100%' }
    : { height: '90vh', width: '100%' };

    const handleUpdateParticipant = (updatedParticipant) => {
        // dispatch(updateStudyParticipant(updatedParticipant));
    };

    const handleDelete = (id) => {
        console.log(id);
        // dispatch(deleteStudyParticipant(id));
    };

    const columns = [
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            width: 50,
          },
        { 
            field: 'serialNum', 
            headerName: 'Serial No.', 
            flex: 1.5,
            headerAlign: 'center',
            align: 'center' 
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            flex: 1.5,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => `${params.row.participantInfo.firstName} ${params.row.participantInfo.lastName}`
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            flex: 3, 
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.participantInfo.email,
            renderCell: (params) => (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    overflow: 'hidden',
                    flexWrap: 'wrap',
                    wordBreak: 'break-all'
                }}>
                    <a href={`mailto:${params.value}`} style={{ padding: '8px' }}>
                    {params.value}
                    </a>
                </div>
            )
        },
        { 
            field: 'isComplete', 
            headerName: 'Status', 
            flex: 1.5, 
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => params.row.isComplete ? 
                <Chip label="Completed" color="success"/> : 
                <Chip label="Processing" color="success" variant="outlined" /> 
        },
        { 
            field: 'isGift', 
            headerName: 'Gift', 
            flex: 1, 
            headerAlign: 'center', 
            align: 'center',
            // valueGetter: (params) => params.row.isGift ? 'Yes' : 'No' 
            renderCell: (params) => {
                return params.row.isGift ? 
                    <Typography variant="body1" style={{ color: 'green', fontWeight: 'bold' }}>Yes</Typography> : 
                    <Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>No</Typography>;
            }
        },
        { 
            field: 'isWIllReceiveReport', 
            headerName: 'Report\nRequested', 
            flex: 1.5, 
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return params.row.isWIllReceiveReport ? 
                    <Typography variant="body1" style={{ color: 'green', fontWeight: 'bold' }}>Yes</Typography> : 
                    <Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>No</Typography>;
            }
        },
        { 
            field: 'isWillContact', 
            headerName: 'Future\nContact', 
            flex: 1, 
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.participantInfo.isWillContact,
            renderCell: (params) => {
                return params.row.participantInfo.isWillContact ? 
                    <Typography variant="body1" style={{ color: 'green', fontWeight: 'bold' }}>Yes</Typography> : 
                    <Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>No</Typography>;
            }
        },
        { 
            field: 'tags', 
            headerName: 'Tags', 
            flex: 2, 
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                const sortedTags = [...params.row.participantInfo.tagsInfo].sort();
                return sortedTags.join(', ');
            },
            renderCell: (params) => (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    overflow: 'hidden',
                    flexWrap: 'wrap'
                }}>
                    {params.value.split(', ').map((tag, index) => (
                        <Chip key={index} label={tag} size="small" style={{ margin: '0 2px' }} />
                    ))}
                </div>
            )
        },
        {
            field: 'note',
            headerName: 'Note',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.participantInfo.note,
            flex: 2,
            wrapText: true
        },
        {
            field: 'edit', 
            headerName: 'Edit', 
            flex: 1, 
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <EditParticipant 
                    participant={params.row} 
                    onSave={(updatedParticipant) => {
                        handleUpdateParticipant(updatedParticipant);
                    }}
                />
            )
        },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1, 
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <CloseCircleButton 
                    popupText={'Are you sure you want to delete this participant?'}
                    onClick={() => handleDelete(params.row._id)} 
                    size='25px'/>
            )
        }
    ];

    return (
        <div style={gridStyle}>
            <StyledDataGrid
                sx={{
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                }} 
                // autoHeight
                rows={studyParticipants}
                // rows={Array.isArray(studyParticipants) ? studyParticipants : []}
                columns={columns}
                // columnVisibilityModel={{
                //     // Hide column note at the beginning, the other columns will remain visible
                //     hidden: ['note']
                // }}
                // getRowHeight={() => 'auto'}
                getRowId={(row) => row._id}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                          // Hide columns status and traderName, the other columns will remain visible
                          note: false
                        },
                      },
                    pagination: { 
                        paginationModel:  
                        { pageSize: 200 } 
                    },
                }}
                pagination
                slots={{
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                    toolbar: GridToolbar
                }}
                pageSizeOptions={[25, 50, 100, 200, 500, 1000, 5000]}
                checkboxSelection
                // autoPageSize             
                // disableSelectionOnClick
                // hideFooterSelectedRowCount
            />
        </div>
    );
}

function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Participants</Box>
      </StyledGridOverlay>
    );
  }

  function Pagination(props) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    const [pageInput, setPageInput] = useState('');  // 用于存储用户输入的页码
  
    const handlePageInputChange = (e) => {
      setPageInput(e.target.value);
    };
  
    const handleGoButtonClick = () => {
      const pageNum = parseInt(pageInput, 10);
      if (pageNum >= 1 && pageNum <= pageCount) {
        props.onPageChange(null, pageNum - 1);
      } else {
        alert('Invalid page number');
      }
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '400px'}}>
        <MuiPagination
          color="primary"
          className={props.className}
          count={pageCount}
          page={props.page + 1}
          onChange={(event, newPage) => {
            props.onPageChange(event, newPage - 1);
          }}
        />
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          style={{ marginLeft: '10px', width: '50px' }}
          placeholder="Go to"
        />
        <button onClick={handleGoButtonClick} style={{ marginLeft: '5px' }}>Go</button>
      </div>
    );
  }
  
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }
