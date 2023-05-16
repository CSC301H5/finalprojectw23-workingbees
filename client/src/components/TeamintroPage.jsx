import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import hives from '../assets/hives.png'
import "../styles/Style.css"
import Navbar from "./Navbar";

import BigEntry from './BigEntry'
const TeamintroPage = () => {
  const [swarmID, setSwarmID] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const row = []
  const [displayComponents, setDisplayComponents] = useState([]);
  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;

  async function getSwamIntro() {
    axios.get("/api/v1/getSwarmInfo", {

      params: {
        hiveID: hiveID
      },
      headers: {
        "x-auth-token": token
      }
    }).then(res => {
      if (res.status === 200) {
        setSwarmID(res.data.swarmID);
        for (let member in res.data.members) {
          row.push(<BigEntry hiveId={hiveID} name={res.data.members[member].name} detail={res.data.members[member].biography} pictureUrl={res.data.members[member].profilePicture} img={false
          } />);
        }
        setDisplayComponents(row);
      }
    })
  }

  useEffect(() => {
    getSwamIntro();
  }, [])

  const handleNavigation = () => {
    navigate("/chat", { state: { code: code, token: token, hiveID: hiveID, swarmID: swarmID } });
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
          <div> 
          <p style={{fontFamily: "Montserrat", fontWeight:"1000", fontSize:"large"}}> Meet Your Team!</p>

            {displayComponents}
            
            </div>
        </div>
        <button
          className="button"
          onClick={handleNavigation}
          style={{ cursor: 'pointer', position: 'absolute', width: '250px', height: '50px', left: '665px', top: '660px' }}
        >  Open Chat </button>

      </div>
    </div>
  );
};

export default TeamintroPage;