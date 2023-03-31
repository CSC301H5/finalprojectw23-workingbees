import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, useLocation } from "react-router-dom";
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import { getCookie } from '../utils/getAuthToken';

import BigEntry from './BigEntry'
const TeamintroPage = () => {
  const [room, setRoom] = useState('');
  const [swarmID, setSwarmID] = useState('');
  const x_auth_token = getCookie("x-auth-token");
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
        console.log("res.data.members", res.data.members)
        setSwarmID(res.data.swarmID);
        console.log(swarmID);
        for (let member in res.data.members) {
          console.log("res.data.members[member]", res.data.members[member])
          row.push(<BigEntry hiveId={hiveID} name={res.data.members[member].name} detail={res.data.members[member].biography} pictureUrl={res.data.members[member].profilePicture} />)
        }
        setDisplayComponents(row);
      }
    })
  }

  useEffect(() => {
    console.log("token", token);
    console.log("hiveID", hiveID);
    console.log("code", code);
    console.log("x_auth_token", x_auth_token);
    getSwamIntro();
    console.log("row", row);
  }, [])

  const handleNavigation = () => {
    console.log('swarmID', swarmID);
    console.log('hiveID', hiveID);

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
          <div> {displayComponents}</div>
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