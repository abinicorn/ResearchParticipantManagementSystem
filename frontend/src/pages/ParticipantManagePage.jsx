import React, { useState, useEffect, useContext } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
// import mockParticipants from '../TestData';
import ParticipantList from '../components/Participant/StudyParticipantTable';
import AddParticipant from '../components/Participant/AddParticipant';
import EditParticipant from '../components/Participant/EditParticipant';
import MailingList from '../components/Participant/MailingList';
import GiftOrReportList from '../components/Participant/GiftOrReportList';
import StudyPaticipantTablePopUp from '../components/Participant/StudyParticipantTablePopUp'

import { StudyParticipantContext } from '../providers/StudyPaticipantsProvider';


import SessionContextProvider from './SessionContextProvider';

export default function ParticipantManagePage() {
    const { fetchStudyParticipants, studyParticipants } = useContext(StudyParticipantContext);

    useEffect(() => {
        // 当组件加载时，获取数据
        fetchStudyParticipants();

        // 如果你想在组件卸载时进行一些清理操作，可以在这里返回一个函数
        // return () => {
        //     // 清理操作
        // };
    }, []);
    // const {studyParticipants} = useContext(StudyParticipantContext);

    // const dispatch = useDispatch();
    // const study_id = "64fef4f7b921a503b17be43c";// 5000 SP
    // // const study_id ='64fed03dd49623d718f09a77' // 0 SP
    // useEffect(() => {
    //     dispatch(fetchStudyParticipants(study_id)); // 调用 thunk action 来获取数据
    //     console.log('dispatched origion SP data');
    // }, [study_id]);
    // const studyParticipants = useSelector(state => state.studyParticipants);

    // useEffect(() => {
    //     dispatch(setStudyParticipants(mockParticipants));
    // }, [dispatch]);  // only dispatch when load
    console.log(studyParticipants)

    return (
        <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
            <Box sx={{ display: 'flex' }}>
                <Navbar/>
                {/* <SessionContextProvider><Sidebar/></SessionContextProvider> */}
            </Box>
            <Box component="main" marginLeft={35} marginRight={20} marginBottom={7}>
                <Typography color='primary'><h1>Study Name</h1></Typography>
                <Typography color='primary'><h1>Participants Management</h1></Typography>
            </Box>
            <Box marginLeft={37} marginRight={15}>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    >
                            <GiftOrReportList 
                                type='report'
                            />
                            <GiftOrReportList 
                                type='gift'
                            />
                            <MailingList/>
                            <AddParticipant />
                </Grid>
            </Box>
            <Box 
                marginLeft={35} marginRight={5} marginTop={7} marginBottom={10}
                // sx={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <StudyPaticipantTablePopUp/>
                {/* <ParticipantList /> */}
            </Box>
        </div>
    )
}
