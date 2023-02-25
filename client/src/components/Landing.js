import React, { useState } from 'react';
import hives from './hives.png'
import Title1 from './Title1.png'
import axios from 'axios';
import "./Style.css";
import{useNavigate} from "react-router-dom";

const Landing = () => {
  const [roomCode, setRoomCode] = useState('');
  const  navigate =useNavigate();
  const handleJoinRoomCode = () => {

    const code = roomCode;
    console.log("ROOMCODE:",roomCode);
   
    navigate("/profile", { state: { roomCode: roomCode } });
  
  };
  
  

  return (
    <> 
  <div class="grid">
  <div class="left-side">
  <img src={hives} />
  </div>
    <div class="right-side">
    <img src={Title1} />
      
      <input class="`textbox`"
        id="room-code"
        type="text"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      />

      <button class = 'small_button'onClick={handleJoinRoomCode}>Join Hive</button>
      <button onClick={() => {navigate("/register")}}>Register</button>
      <button onClick={() => {navigate("/Login")}}> Login</button>
    </div>
    </div>
    </>
  );
  
};

export default Landing;
