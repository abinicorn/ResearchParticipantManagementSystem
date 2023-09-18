import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useGet from '../../hooks/useGet';


const StudyResearcherContext = React.createContext({
    researcherList: [],
    studyInfo: {}
});

function StudyResearcherContextProvider({children}) {

    const {studyId} =useParams();

    const { 
        data: studyInfo,
        isLoadig: studyLoading,
        refresh: refreshStudyContext
    } = useGet(`http://localhost:3001/study/${studyId}`,[]);

    console.log(studyInfo);

    const{
        data: researcherList,
        isLoadig: researcherLoading,
        refresh: refreshResearcherContext
    } = useGet(`http://localhost:3001/study/researcher/list/${studyId}`,[]);

    console.log(researcherList);


    //to do
    async function addResearcher (newResearcher) { 
        try{
            const researcherResponse = await axios.post(`http://localhost:3001/study/addResearcher/${studyId}`, newResearcher)
            console.log(researcherResponse);
            refreshResearcherContext();
            return researcherResponse.data;
        } catch (error) {
            alert(error.response.data.message || "Error adding researcher");
        }
    }

    async function removeResearcher (studyId, researcherId) {
        try {
            const response = await axios.put(`http://localhost:3001/study/removeResearcher/${studyId}/${researcherId}`);
            refreshResearcherContext();
            return response.data;
        } catch (error) {
            alert(error.response.data.message || "Error removing researcher)");
        }
        }


    async function fetchResearcherbyEmail (email) {


        
        const response = await axios.get(`http://localhost:3001/researcher/email/${email}`);
        return response;
    }

    const context={
        studyInfo,
        studyLoading,
        refreshStudyContext,
        researcherList,
        researcherLoading,
        refreshResearcherContext,
        addResearcher,
        removeResearcher,
        fetchResearcherbyEmail
    }

    return (
        <StudyResearcherContext.Provider value={context}>
            {children}
        </StudyResearcherContext.Provider>
    )
}

export {
    StudyResearcherContext,
    StudyResearcherContextProvider
};
