import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/login';
import ErrorPage from './components/Error';
import Test from './components/test';
import CreateRoom from './components/roomcreation';
import Room_Config from './components/room-config';
import WaitingP1 from './components/waitingp1';
import Register from './components/register';
import Profile from './components/profile';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomConfig" element={<Room_Config />} />
        <Route path="/waiting1" element={< WaitingP1 />} />
        <Route path="/createHive" element={< CreateRoom />} />
        <Route path="/register" element={< Register />} />
        <Route path="*" element={< ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
