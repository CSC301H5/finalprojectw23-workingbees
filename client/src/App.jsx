import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import ErrorPage from './components/Error';
import CreateRoom from './components/RoomCreation';
import ConfigRoom from './components/RoomConfig';
import WaitingP1 from './components/Waitingp1';
import Register from './components/Register';
import Profile from './components/Profile';
import TeamProfile from './components/TeamProfile';
import LoginHomePage from './components/LoginHomePage';
import GroupCreation from './components/GroupCreation';
import WaitingP2 from './components/Waitingp2';
import Tinder from './components/Tinder';
import TeamintroPage from './components/TeamintroPage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomConfig" element={<ConfigRoom />} />
        <Route path="/waiting1" element={< WaitingP1 />} />
        <Route path="/waiting2" element={< WaitingP2 />} />
        <Route path="/createHive" element={< CreateRoom />} />
        <Route path="/register" element={< Register />} />
        <Route path="/teamProfile" element={<TeamProfile />} />
        <Route path="/LoginHomePage" element={< LoginHomePage />} />
        <Route path="/groupcreation" element={< GroupCreation />} />
        <Route path="/tinder" element={< Tinder />} />
        <Route path="/Teamintro" element={< TeamintroPage />} />

        <Route path="*" element={< ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
