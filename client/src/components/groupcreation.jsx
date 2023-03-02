import React, { Component, useEffect, useState } from 'react';
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import Box from './box';
import Displaygroup from "./Displaygroup";
import StatusIndicator from "./groupmemberentry";


const  Gorupcreation = () => {
    
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
       <input class="textBox" placeholder="Username" style={ {width:"400px",
        height: "50px" }}></input> 
           <button type="submit" style={{ position: 'absolute ', left: '1010px', top: '380px' }}>Invite</button>
           <label className="display" style={{ position: 'absolute ', left: '594px',  top: '480px',width: '150px', height: '20px' }}>Pending invites</label>
           <button type="submit" style={{ position: 'absolute ', left: '1010px', top: '780px' }}>continue</button>
           <Displaygroup style={{ position: 'absolute ', left: '654px', width: '97px',top: '780px', height: '20px' }}/>

            </div>

          </div>
        </>
      );
    
};


export default Gorupcreation;
