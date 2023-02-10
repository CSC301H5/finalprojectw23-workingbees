import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/login';
import ErrorPage from './components/Error';
import Test from './components/test';
//import Profile from './components/Profile';
import WaitingP1 from './components/waitingp1';
import CreateRoom from './components/roomcreation';
import ConfigRoom from './components/roomconfig';
import WaitingP2 from './components/waitingp2';
import Register from './components/register';

function App() {
  return (

    
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/room-config" element={<ConfigRoom />} />
        <Route path="/waiting1" element={< WaitingP1 />} />
        <Route path="/createHive" element={< CreateRoom />} />
        <Route path="/waiting2" element={<WaitingP2 />} />
        <Route path="/register" element={< Register />} />
        <Route path="*" element={< ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
