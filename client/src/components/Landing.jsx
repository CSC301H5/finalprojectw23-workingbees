import React, { useState } from 'react';
import hives from '../Assets/hives.png'
import axios from 'axios';
import "./Style.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const [roomCode, setRoomCode] = useState('');
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  const handleJoinRoomCode = () => {

    axios.post("/api/v1/guestRegister").then(res => {

      if (res.status === 201) {

        setToken(res.data.token)
        document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "

        async function getHiveName() {
          const roomInt = parseInt(roomCode);

          if (isNaN(roomInt)) {
            console.error('Room code is not a number!');
            return;
          }
          console.log("BeforegetHiveInfo", token);
          axios.get("/api/v1/getHiveInfo", {
            params: {
              code: roomCode
            },
            headers: {
              "x-auth-token": token
            }
          }).then(res => {
            if (res.status === 200) {
              console.log("AFTERgetHiveInfo", token);
              navigate("/Profile", { state: { code: roomCode, token: token } })
            }
            console.log(res.data);
          }).catch(err => {
            console.error(err.response.data);
          });
        }
        getHiveName();
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
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
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
