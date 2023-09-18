import * as React from 'react';
import { SessionContext } from "../../pages/SessionContextProvider";
import CreateSession from "./CreateSession";

export default function EditSession({create, sessionId}) {
    
    const { sessions } = React.useContext(SessionContext)
    const session = sessions.find(s => s._id === sessionId);

    return (
        <CreateSession create={create} targetSessionId={sessionId}/>
    )    
}