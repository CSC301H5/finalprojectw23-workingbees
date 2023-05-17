import React, { useState } from 'react';
import hives from '../assets/hives.png'
import axios from 'axios';
import "../styles/Style.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoomCode = () => {
    axios.get("/api/v1/getCodeExistence", {
      params: {
        code: code
      }
    }).then(res => {
      if (res.status === 200 && res.data.exists) {
        axios.post("/api/v1/guestRegister").then(res => {
          if (res.status === 201) {
            document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
            navigate("/profile", { state: { code: code, token: res.data.token } });
          }
        })
      }
    })
  };

  return (
    <>
      <div class="grid">
        <div class="left">
          <img src={hives} alt="" />
        </div>
        <div class="right">
          <div className='display' style={{ width: '507px', height: '115px', left: '740px', top: '261px', fontWeight: "500px", fontSize: "94px", lineHeight: "115px" }}> HIVEMIND </div>
          <input className="textBox" style={{ width: '400px', height: '50px', left: '750px', top: '450px' }}
            id="room-code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button class='small_button' onClick={handleJoinRoomCode} style={{ position: 'absolute', left: '1167px', top: '445px' }}>Join Hive</button>
          <button onClick={() => { navigate("/register") }} style={{ position: 'absolute', left: '1017px', top: '617px' }}>Register</button>
          <div className='display' style={{ position: 'absolute', left: '850px', top: '580px', width: "400px" }} > Or login to host and save your work </div>
          <button onClick={() => { navigate("/Login") }} style={{ position: 'absolute', left: '750px', top: '617px' }}> Login</button>
        </div>
      </div>
    </>
  );
};

export default Landing;