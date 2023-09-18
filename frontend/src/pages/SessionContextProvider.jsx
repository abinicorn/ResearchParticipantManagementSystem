import * as React from 'react';
import useGet from '../hooks/useGet';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const SessionContext = React.createContext(undefined);

export default function SessionContextProvider({children}) {
  
    const { studyId } = useParams();
    const {
        data: sessions,
        isLoading: sessionLoading,
        refresh: refreshSession
    } = useGet(`http://localhost:3001/session/list/${studyId}`, [])

    const { data: studyParticipantInfo } = useGet(`http://localhost:3001/study-participants/${studyId}`, []);
    
    const { data: studyInfo } = useGet(`http://localhost:3001/study/${studyId}`,[])

    const { data: studyList } = useGet('http://localhost:3001/researcher/list/64fe98fdae1ff28bdcd455a2', [])
    
    async function addSession (newSession) {
        const sessionResponse = await axios.post(`http://localhost:3001/session/${studyId}`, newSession)
        refreshSession();
        return sessionResponse.data
    }

    async function deleteSession (sessionId) {
        const response = await axios.delete(`http://localhost:3001/session/${sessionId}`)
        console.log(response)
        refreshSession();
        return response.data
    }

    async function updateSession (updateData) {
        
        const sessionId = updateData._id
        const response = await axios.put(`http://localhost:3001/session/${sessionId}`, updateData)
        console.log(response)
        refreshSession();
        return response.data
    }

    const context = {
        studyId,
        sessions,
        sessionLoading,
        studyInfo,
        studyList,
        studyParticipantInfo,
        addSession,
        deleteSession,
        updateSession,
        refreshSession
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )

}
