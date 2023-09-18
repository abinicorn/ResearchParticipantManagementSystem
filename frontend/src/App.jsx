import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import SessionManagePage from './pages/SessionManagePage';
import SessionContextProvider from './pages/SessionContextProvider';
import Login from "./pages/LoginPage";
import {MainScreen} from "./components/MainScreen";
import {CurrentUserContext} from "./providers/CurrentUserProvider";
import React, {useState} from "react";
import StudyParticipantsProvider from './providers/StudyPaticipantsProvider'
import ParticipantManagePage from './pages/ParticipantManagePage'

import ResearcherManagePopup from './components/Researcher/ResearcherManagePopup';
import {StudyResearcherContextProvider} from './components/Researcher/StudyResearcherContextProvider';
import CreateStudyPage from './pages/CreateStudyPage';
import EditStudyPage from './pages/EditStudyPage';



function App() {
  // Determine if you're in Edit mode or Create mode
  // If it's Edit mode, provide the existing study data
  // const existingData = isEditMode ? /* Existing study data */ : null;



    return (


        <Routes>

          <Route path='/' element={<Login/>} />
          <Route path="session">
            <Route path=":studyId" element = {<SessionContextProvider><SessionManagePage/></SessionContextProvider>} />
          </Route>
          <Route path="/homepage/*" element={<MainScreen/>}/>
          <Route path="/studyDetail">
            <Route path=":studyId" element={<EditStudyPage/>} />
            <Route path="create" element={<CreateStudyPage/>} />
            <Route path=":studyId/researcher" element={<StudyResearcherContextProvider><ResearcherManagePopup/></StudyResearcherContextProvider>} />

          </Route>
          <Route path="study-participants">
            <Route path=":studyId" element = {<StudyParticipantsProvider><ParticipantManagePage/></StudyParticipantsProvider>} />
          </Route>

        {/*<Redirect from={'*'} to={'/'}/>*/}


        </Routes>

  );
}

export default App;
