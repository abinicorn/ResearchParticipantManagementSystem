import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useGet from '../hooks/useGet';
import EditStudyTemplate from '../components/Study/EditStudyTemplate';

export default function EditStudyPage() {
    const { studyId } = useParams();
    const researcherId = '64fe98fdae1ff28bdcd455a7';
    const { data, isLoading, refresh } = useGet(`/study/${studyId}`, []);
    const [studyData, setStudyData] = useState({
        studyCode: '',
        studyName: '',
        description: '',
        creator: researcherId,
        researcherList: [researcherId],
        studyType: '',
        participantNum: '',
        recruitmentStartDate: '',
        recruitmentCloseDate: '',
        location: [],
        surveyLink: '',
        driveLink: ''
    });
    useEffect(() => {
        setStudyData({
            ...studyData,
            studyCode: data.studyCode ?? "",
            studyName: data.studyName ?? "",
            description: data.description ?? "",
            researcherList: data.researcherList ?? [researcherId],
            studyType: data.studyType ?? "",
            participantNum: data.participantNum ?? "",
            recruitmentStartDate: data.recruitmentStartDate?.split("T")[0] ?? "",
            recruitmentCloseDate: data.recruitmentCloseDate?.split("T")[0] ?? "",
            location: data.location ?? [],
            surveyLink: data.surveyLink ?? "",
            driveLink: data.driveLink ?? ""
        })
    }, [data])

    const handleSubmit = (event) => {
        event.preventDefault();
        editStudy(studyData)
            .then((res) => {
                alert("Successfully edited study");
                refresh();
            })
    };

    const editStudy = async (studyData) => {
        try {
            const response = await axios.put(`/study/${studyId}`, studyData);
            return response.data;
        } catch (error) {
            alert(`Error editing study`);
            throw error;
        }
    }

    return (
        isLoading ? <div>Loading</div> :
            <EditStudyTemplate
                isEditMode={true}
                studyData={studyData}
                setStudyData={setStudyData}
                handleSubmit={handleSubmit}
            />
    );


}