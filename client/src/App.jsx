import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import ErrorPage from './components/Error';
import RoomCreation from './components/RoomCreation';
import RoomConfig from './components/RoomConfig';
import WaitingP1 from './components/Waitingp1';
import Register from './components/Register';
import Profile from './components/Profile';
import TeamProfile from './components/TeamProfile';
import LoginHomePage from './components/LoginHomePage';
import GroupCreation from './components/GroupCreation';
import WaitingP2 from './components/Waitingp2';
import Tinder from './components/Tinder';
import TeamintroPage from './components/TeamintroPage';
import TeamViewing from './components/TeamViewing';
import WaitingP1Attendee from './components/WaitingP1Attendee';
import WaitingP2Attendee from './components/WaitingP2Attendee';
import Chat from './components/Chat';
import WaitingP3 from './components/Waitingp3';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomConfig" element={<RoomConfig />} />
        <Route path="/waiting1" element={< WaitingP1 />} />
        <Route path="/waiting2" element={< WaitingP2 />} />
        <Route path="/createHive" element={< RoomCreation />} />
        <Route path="/register" element={< Register />} />
        <Route path="/teamProfile" element={<TeamProfile />} />
        <Route path="/loginHomePage" element={< LoginHomePage />} />
        <Route path="/groupCreation" element={< GroupCreation />} />
        <Route path="/waitingP1Attendee" element={< WaitingP1Attendee />} />
        <Route path="/waitingP2Attendee" element={< WaitingP2Attendee />} />
        <Route path="/teamViewing" element={< TeamViewing />} />
        <Route path="/tinder" element={< Tinder />} />
        <Route path="/teamIntro" element={< TeamintroPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/waiting3" element={<WaitingP3 />} />
        <Route path="*" element={< ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
