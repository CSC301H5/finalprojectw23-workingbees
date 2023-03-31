import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate,useLocation } from "react-router-dom";
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import { getCookie } from '../utils/getAuthToken';

import BigEntry from './BigEntry'
const  TeamintroPage=() =>{
  const [room, setRoom] = useState('');
  const x_auth_token = getCookie("x-auth-token");
  const navigate = useNavigate();
  const location = useLocation();
  const row = [] 
 
  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;
  async function getSwamIntro() {
    axios.get("/api/v1/getSwarmInfo", {

        params: {
            hiveID: x_auth_token


        },
        headers: {
            "x-auth-token": token
        }
    }).then(res => {
        if (res.status === 200) {
            for ( let member in res.members){
               row.push(<BigEntry name={member['name']} detail={member['biography']}/>)
            }

        }
    })
}

useEffect(() => {
  console.log("token",token);
  console.log("hiveID", hiveID);
  console.log("code",code);
  console.log("x_auth_token",x_auth_token);
  getSwamIntro();
}, [])


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
        </div>
        <input
          className='SmalltextBox'
          type="text"
          name="username"
          placeholder="Room PIN"
          //onChange={handleInputChange}
          value={room}
          style={{ cursor: 'pointer', position: 'absolute', width: '250px', height: '50px', left: '665px', top: '660px' }}
        />
        <div> {row}</div>

      </div>
    </div>
  );
};

export default TeamintroPage;