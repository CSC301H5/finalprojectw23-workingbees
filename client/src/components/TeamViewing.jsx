import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import { getCookie } from '../utils/getAuthToken';
import HiveList2 from './HiveList2';


//Need hiveID
function TeamViewing(props) {
  const location = useLocation();
  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;

  const [room, setRoom] = useState('');
  const x_auth_token = getCookie("x-auth-token");
  const navigate = useNavigate();
  //const hiveID = location.state.hiveID;
  const handleInputChange = (event) => {
    setRoom(event.target.value);
  }

  // Handle create new hive button 
  const handlBackToHomePage = () => {
    navigate("/");
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
          <HiveList2 hiveID={hiveID} code={code} />
        </div>
        <button onClick={handlBackToHomePage} type="submit" className="button" style={{ cursor: 'pointer', position: 'absolute', width: '492px', height: '50px', left: '650px', top: '718px' }}>Back to home page</button>
      </div>
    </div>
  );
};

export default TeamViewing;