import React, { useState } from 'react';
import hives from '../Assets/hives.png'
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
  <div class="left">
  <img src={hives} />
  </div>
    <div class="right">
   
    <div className='display'style={{ width: '507px', height: '115px',left: '740px', top: '261px', fontWeight: "500px", fontSize:"94px",lineHeight:"115px"}}> HIVEMIND </div>
      <input className="textBox"  style={{ width: '400px', height: '50px',left: '750px', top: '450px'}}
        id="room-code"
        type="text"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      />

      <button class = 'small_button'onClick={handleJoinRoomCode} style={{ position: 'absolute', left: '1167px', top: '445px'}}>Join Hive</button>
      <button onClick={() => {navigate("/register")}}  style={{ position: 'absolute', left: '1017px', top: '617px'}}>Register</button>
      <div className='display' style={{ position: 'absolute',  left: '850px', top: '580px'}} > Or login to host and save your work </div>
      <button onClick={() => {navigate("/Login")}} style={{ position: 'absolute', left: '750px', top: '617px'}}> Login</button>
    </div>
    </div>
    </>
  );
  
};

export default Landing;
