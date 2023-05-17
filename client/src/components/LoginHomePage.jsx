import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import hives from '../assets/hives.png'
import "../styles/Style.css"
import Navbar from "./Navbar";
import { getCookie } from '../utils/getAuthToken';
import HiveList from './HiveList';

function LoginHomePage() {
  const [code, setCode] = useState('');
  const x_auth_token = getCookie("x-auth-token");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCode(event.target.value);
  }

  // Handle Join Hive button 
  const handleJoinHive = () => {
    axios.get("/api/v1/getCodeExistence", {
      params: {
        code: code
      }
    }).then(res => {
      if (res.status === 200 && res.data.exists) {
        navigate("/profile", { state: { code: code, token: x_auth_token } });
      }
    })
  }

  // Handle create new hive button
  const handleCreateHive = () => {
    navigate("/createHive", { state: { token: x_auth_token } });
  }

  return (
    <div class='grid'>
      <div class='left'>
        <img src={hives} alt="" />
      </div>
      <div class='right'>
        < Navbar />
        <div className='config'
          style={{
            height: '500px',
            overflow: 'auto',
          }}
        >
          <HiveList />
        </div>
        <input
          className='SmalltextBox'
          type="text"
          name="username"
          placeholder="Room PIN"
          onChange={handleInputChange}
          value={code}
          style={{ cursor: 'pointer', position: 'absolute', width: '250px', height: '50px', left: '665px', top: '660px' }}
        />
        <button onClick={handleJoinHive} type="submit" className="button" style={{ cursor: 'pointer', position: 'absolute', width: '150px', height: '35px', left: '930px', top: '660px' }}>Join Hive</button>
        <button onClick={handleCreateHive} type="submit" className="button" style={{ cursor: 'pointer', position: 'absolute', width: '492px', height: '50px', left: '650px', top: '718px' }}>Create new Hive</button>
      </div>
    </div>
  );
};

export default LoginHomePage;