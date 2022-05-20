import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './App.css';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrganizationPage from './pages/OrganizationPage';
import MembersTab from './pages/MembersTab';
import MemberRegistrationPage from './pages/MemberRegistrationPage';
import MemberAttendanceCal from './components/Calendars/MemberAttendanceCal';
import TeamsTab from './pages/TeamsTab';
import MemberLeavesTab from './pages/MemberLeavesTab';
import MemberProfileTab from './pages/MemberProfileTab';

function App() {
  return (
    <BrowserRouter>

      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="leaves" element={<MemberLeavesTab />}></Route>
            <Route path="profile" element={<MemberProfileTab />}></Route>
            <Route path="" element={<MemberAttendanceCal />}></Route>
          </Route>
          <Route exact path="/orgs/:id/member-registration/:mid" element={<MemberRegistrationPage />}></Route>
          <Route exact path="/orgs/:id" element={<OrganizationPage />}>
            <Route path="members" element={<MembersTab />}></Route>
            <Route path="" element={<TeamsTab />}></Route>
          </Route>

          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </Provider>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
