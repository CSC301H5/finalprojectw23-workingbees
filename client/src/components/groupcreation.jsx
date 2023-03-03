import React, { Component, useEffect, useState } from 'react';
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import Displaygroup from "./Displaygroup";
import{useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';
import PendingInvitesList from "./pendingInvitelist"


const  Gorupcreation = () => {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const location = useLocation();
  const roomCode = location.state.code;
  const token = location.state.token;

  const handleclick3 =() =>{navigate("/roomConfig", {state: { roomCode, token } })}
  //const handleclick3 =() =>{navigate("/roomConfig")}
  const handleInviteGroupMate = ({hiveID,username}) => {
  
    axios
      .post('/api/v1/sendInvite', {hiveID, username: username}, {
        headers: {
          
            "x-auth-token": token
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // Handle success response


        }
      })
      .catch((err) => {
        // Handle error response
        console.log('error for /api/v1/sendInvite')
      });
  };

    return (
        <> 
      <div class="grid">
      <div class="left">
      <img src={hives}></img>
      </div>
        <div class="right">
        < Navbar />
        <label className="display" style={{ position: 'absolute ', left: '654px', width: '97px', height: '20px' }}>Your swarm</label>

       <Displaygroup/>
       <input class="textBox" value={username}
          onChange={e => setName(e.target.value)} placeholder="Username" style={ {width:"400px",
        height: "50px" }}></input> 
           <button onClick ={handleInviteGroupMate} style={{ position: 'absolute ', left: '1010px', top: '380px' }}>Invite</button>

           <div style={{ position: 'absolute ', left: '594px',  top: '480px',width: '150px', height: '20px' }}>
           <label className="display" >Pending invites</label>

           </div>
           <button onClick ={handleclick3} style={{ position: 'absolute ', left: '1017px', top: '669px' }}>Continue</button>
        
          <PendingInvitesList/>
            </div>

          </div>
        </>
      );
    
};


export default Gorupcreation;