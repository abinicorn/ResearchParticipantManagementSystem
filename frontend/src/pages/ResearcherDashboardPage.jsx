import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {CssBaseline, Grid} from "@mui/material";
import { Chip, Button} from '@mui/material';
import {useEffect, useState} from "react";
import '../styles/App.css';
import StudyDetailPopup from "../components/Study/StudyDetailPopup"
import {useCurrentUser} from "../hooks/useCurrentUser";
import {CurrentUserContext} from "../providers/CurrentUserProvider";
import HomeActionButton from '../components/Button/HomeActionButton';
import { useNavigate } from 'react-router-dom';





export default function ResearcherDashboardPage() {

    const {user} = useCurrentUser();
    const navigate= useNavigate();


    useEffect(() => {

        if (Array.isArray(user.studyList) && user.studyList.length > 0){
            const res = fetchStudyList(user.studyList);
            setStudyList(res);
        } else {
            setStudyList([]);
        }

    },[user])

    const fetchStudyList = (studyList) => {

    }

    const [studyList, setStudyList] = useState(null);


    const [selectedStudy, setSelectedStudy] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [study, setStudy] = useState();

    const handleNameClick = (study) => {

        fetchStudyDetail(study)

        study.name = 'A Study of Ice Cream';
        study.code = 'ICE001'
        study.creator = 'Dr Li';
        study.description = 'Ice cream, as a delicious dessert, is undoubtedly a summertime delight \n' +
            'and a favorite treat year-round. Its smooth texture and a multitude of flavor \n' +
            'options bring immense happiness and pleasure to those who indulge. \n' +
            'Whether it\'s classic flavors like chocolate and strawberry or imaginative \n' +
            'choices like matcha, mint chocolate chip, or salted caramel, each taste \n' +
            'offers a delectable adventure on the palate.';
        study.experimentType = 'Field Survey';
        study.date = '10/08/2023';
        study.location = 'Auckland';
        study.researcherList = ['Michale', 'Jack', 'Rose'];


        setStudy(study);
        setSelectedStudy(study);
        setIsPopupOpen(true);
    };

    const fetchStudyDetail = (studyId) => {

    }



    const handleClosePopup = () => {
        setSelectedStudy(null);
        setIsPopupOpen(false);
    };






    const columns = [
        { field: 'studyCode', headerName: 'Study Code', flex: 1, headerClassName: 'App-Font' },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerClassName: 'App-Font',
            renderCell: (params) => (
                <a href="#/" onClick={() => handleNameClick(params.row)}> {params.row.name} </a>
            ),
        },
        {
            field: 'participantProgress',
            headerName: 'Participant Progress',
            flex: 1,
            headerClassName: 'App-Font',
            renderCell: (params) => (
                <ProgressCell value={params.value.value} maxValue={params.value.maxValue} />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerClassName: 'App-Font',
            renderCell: (params) => (
                <div>
                    {params.value === 'Active' ? (
                        <Chip label="Active" color="primary" />
                    ) : (
                        <Chip label="Closed" color="secondary" />
                    )}
                </div>
            ),
        },
        {
            field: 'action',
            headerName: '',
            flex: 1,
            headerClassName: 'App-Font',
            renderCell: (params) =>
                    <HomeActionButton pageCondition={"dashboard"}/>

        },
    ];

    function ProgressCell({ value, maxValue }) {
        const progress = (value / maxValue) * 100;

        return (
            <div>
                <div style={{ display: 'flex', width: '300%', height: '20px', backgroundColor: '#eee' }}>
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: 'dodgerblue',
                            textAlign: 'center',
                            lineHeight: '20px',
                            color: 'black',
                            paddingLeft: '5px',
                            justifyContent: 'center',
                        }}
                    >
                        {`${value}/${maxValue}`}
                    </div>
                </div>
            </div>
        );
    }

    const handleCreateStudy = () =>{
        
        navigate('/studyDetail/create');

    }


    const rows = [
        { id:1, studyId: 1, studyCode: 'ABC123', name: 'Study 1', participantProgress: { value: 30, maxValue: 100 }, status: 'Active' },
        { id:2, studyId: 2, studyCode: 'DEF456', name: 'Study 2', participantProgress: { value: 60, maxValue: 70 }, status: 'Closed' },
    ];



    return (

            <div>
                <CssBaseline />

                <Grid container spacing={-20}
                      alignItems="center"
                      marginTop='0.5%'
                      marginBottom = '0.5%'
                      justifyContent="flex-end"
                >
                    <Button sx={{
                        marginLeft: '50%',
                    }} disableElevation
                            variant="contained"
                            aria-label="Disabled elevation buttons"
                            onClick={handleCreateStudy}

                    >Create Study</Button>
                </Grid>




                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />


                {isPopupOpen && (
                    <StudyDetailPopup study={selectedStudy} onClose={handleClosePopup} open={isPopupOpen}/>
                )}
            </div>

    );
}