import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import ErrorPage from './components/Error';
import CreateRoom from './components/Roomcreation';
import ConfigRoom from './components/Roomconfig';
import WaitingP1 from './components/Waitingp1';
import Register from './components/Register';
import Profile from './components/Profile';
import TeamProfile from './components/TeamProfile';
import LoginHomePage from './components/LoginHomePage';
import QuestionList from './components/QuestionList';
import RoomQuestionConfig from './components/RoomQuestionConfig';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomConfig" element={<RoomQuestionConfig />} />
        <Route path="/waiting1" element={< WaitingP1 />} />
        <Route path="/createHive" element={< CreateRoom />} />
        <Route path="/register" element={< Register />} />
        <Route path="/teamProfile" element={<TeamProfile />} />
        <Route path="/LoginHomePage" element={< LoginHomePage />} />
        <Route path="*" element={< ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
