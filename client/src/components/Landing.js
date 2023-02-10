import React, { useState } from 'react';
import hives from './hives.png'
import Title1 from './Title1.png'
import axios from 'axios';
import "./Style.css";
import{useNavigate} from "react-router-dom";

const Landing = () => {
  const [roomCode, setRoomCode] = useState('');
  let navigate =useNavigate();

  const handleJoinRoomCode = () => {
    const code = roomCode;
  
    axios.get(`/api/v1/getHiveInfo`, { code})
      .then(res => { 
        if (res.status === 200) {
          navigate("/profile");
        } else {
          alert("Room code not found. Please try again.");
        }
        console.log(res.status)
      })
      .catch(error => {
        console.error(error);
        
        alert("An error has occurred. Please try again later.");
      });
  };
  
  

  return (
    <> 
  <div class="grid">
  <div class="left-side">
  <img src={hives} />
  </div>
    <div class="right-side">
    <img src={Title1} />
      
      <input class="textbox"
        id="room-code"
        type="text"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      />

      <button onClick={handleJoinRoomCode}>Join Hive</button>
      <button onClick={() => {navigate("/register")}}>Register</button>
      <button onClick={() => {navigate("/Login")}}> Login</button>
    </div>
    </div>
    </>
  );
  
};

export default Landing;