import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import SessionManagePage from './pages/SessionManagePage';
import CreateEditStudyPage from './pages/CreateEditStudyPage';
import ResearcherManagePopup from './components/Researcher/ResearcherManagePopup';
import AddResearcherPopup from './components/Researcher/AddResearcherPopup';
import LoginPage from './pages/LoginPage';

function App() {
  // Determine if you're in Edit mode or Create mode
  // If it's Edit mode, provide the existing study data
  // const existingData = isEditMode ? /* Existing study data */ : null;

  return (

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="session">
        <Route index element={<SessionManagePage />} />
      </Route>
      <Route path="/studyDetail">
        <Route path=":studyId" element={<CreateEditStudyPage isEditMode={true} />} />
        <Route path="create" element={<CreateEditStudyPage isEditMode={false} />} />
        {/* For test use */}
        <Route path="manageResearcher" element={<ResearcherManagePopup />} />
        <Route path="addResearcher" element={<AddResearcherPopup />} />
      </Route> 
    </Routes>
    // :studyId/
  );

  
}

export default App;

