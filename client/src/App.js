import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/login';
import ErrorPage from './components/Error';
import Test from './components/test';
import Profile from './components/Profile.js';
import Room_creation from './components/room-creation';
import Room_Config from './components/room-config';
import Waiting1 from './components/waiting1';
import Register from './components/register';

function App() {
  return (

    
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomConfig" element={<Room_Config />} />
        <Route path="/waiting1" element={< Waiting1 />} />
        <Route path="/roomCreation" element={< Room_creation />} />
        <Route path="/register" element={< Register />} />
        <Route path="*" element={< ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
