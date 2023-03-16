import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import HiveComp from './LoginHive';
import ScrollPage from './scroll';
import { getCookie } from './getAuthToken';
import HiveList from './HiveList';

function LoginHomePage() {
  const [room, setRoom] = useState('');
  const { state } = useLocation();
  const x_auth_token = getCookie("x-auth-token");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setRoom(event.target.value);
  }

  async function getHiveName() {
    console.log('room', room);
    console.log('x-auth-token', x_auth_token);
    const roomInt = parseInt(room);
    console.log('roomInt', roomInt);

    axios.get("/api/v1/getHiveInfo", {
      params: {
        code: room
      },
      headers: {
        "x-auth-token": x_auth_token
      }
    }).then(res => {
      if (res.status === 200) {
        navigate("/Profile", { state: { code: room, token: x_auth_token } })
      }
    })
  }
  useEffect(() => {
    getHiveName();
  }, [])

  async function getHiveName2() {

  

    axios.get("/api/v1/getUserHives ", {
      params: {},

      headers: {
        "x-auth-token": x_auth_token
      }
    }).then(res => {
      if (res.status === 200) {
        console.log("DATA : ", res.data);


        const rows = [];
        for (var hiveID in res.data) {
          rows.push(< HiveComp names={res.data[hiveID].name} phases={res.data[hiveID].phase} />)
        }
        
      }
    });
  }
  useEffect(() => {
    getHiveName2();
  }, [])

  getHiveName2();





  //Handle Join Hive button 
  const handleClick = () => {
    getHiveName();
  }

  //Handle create new Hive button 
  //Handle create new Hive button 

  const handleClick2 = () => {
    //getHiveName2();
    navigate("/createHive");
  }





  return (
    <div class='grid'>
      <div class='left'>
        <img src={hives}></img>
      </div>
      <div class='right'>
      <div className='display' style={{ position:'relative', width: '507px', height: '200px', top: '60px', fontWeight: "500px", fontSize: "94px", lineHeight: "115px" }}> HIVEMIND </div>

        <div
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
          value={room}

          style={{ cursor: 'pointer', position: 'absolute', width: '250px', height: '50px', left: '665px', top: '660px' }}
        />
        <button onClick={handleClick} type="submit" className="button" style={{ cursor: 'pointer', position: 'absolute', width: '150px', height: '35px', left: '930px', top: '660px' }}>Join Hive</button>
        <button onClick={handleClick2} type="submit" className="button" style={{ cursor: 'pointer', position: 'absolute', width: '492px', height: '50px', left: '650px', top: '718px' }}>Create new Hive</button>

      </div>
    </div>
  );
};

export default LoginHomePage;
        