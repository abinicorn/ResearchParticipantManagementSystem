import {useState, createContext} from 'react';
import useGet from '../hooks/useGet';
import usePost from '../hooks/usePost'
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const StudyParticipantContext = createContext(undefined);

export default function StudyParticipantProvider({children}) {
    const [studyParticipants, setStudyParticipants] = useState([]);
  
        // const study_id = "64fef4f7b921a503b17be43c";// 5000 SP
    // // const study_id ='64fed03dd49623d718f09a77' // 0 SP
    // const studyId = "64fef4f7b921a503b17be43c";
    const { studyId } = useParams();

    // const {
    //     data: studyparticipants,
    //     isLoading: studyparticipantsLoading,
    //     refresh: refreshStudyparticipants
    // } = useGet(`http://localhost:3001/study-participants/${studyId}`, [])

    // const {
    //     data: studyParticipants,
    //     isLoading: studyParticipantsLoading,
    //     refresh: refreshStudyParticipants
    // } = useGet(`http://localhost:3001/study-participants/${studyId}`, [])

    async function fetchStudyParticipants() {
        const response = await axios.get(`http://localhost:3001/study-participants/${studyId}`);
        if (response.status === 204) {
            setStudyParticipants([]);
        } else {
            setStudyParticipants(response.data);
        }
    };
    
    async function addParticipants (newParticipants) {
        const participantsResponse = await axios.post(`http://localhost:3001/participant/add`, newParticipants)
        return participantsResponse.data

    }

    async function addStudyParticipants (newStudyParticipants) {
        const response = await axios.post(`http://localhost:3001/study-participants/${studyId}`, newStudyParticipants)
        setStudyParticipants(prevStudyParticipants => [...prevStudyParticipants, ...response.data]);
        // refreshStudyParticipants();
        return response.data

    }

    // async function deleteSession (sessionId) {
    //     const response = await axios.delete(`http://localhost:3001/session/${sessionId}`)
    //     refreshSession();
    //     return response
    // }

    // async function updateStudyParticipants (studyParticipantsIds) {
        
    //     const response = await axios.put(`http://localhost:3001/session/${sessionId}`)
    //     refreshSession();
    //     return response.data
    // }

    
    const context = {
        studyParticipants,
        // studyParticipantsLoading,
        fetchStudyParticipants,
        addParticipants,
        addStudyParticipants,
        // refreshStudyParticipants
    }

    return (
        <StudyParticipantContext.Provider value={context}>
            {children}
        </StudyParticipantContext.Provider>
    )

}
