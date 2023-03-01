import React, { Component, useEffect, useState } from 'react';
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'



const  Gorupcreation = () => {
    
    return (
        <> 
      <div class="grid">
      <div class="left">
      <img src={hives}></img>
      </div>
        <div class="right">
        < Navbar />
                <input className="textBox" style={{ width: '400px', height: '50px', left: '753px', top: '225px' }}/>

        <div className='display'style={{ overflow : "auto", width: '507px', height: '115px',left: '740px', top: '261px', fontWeight: "500px", fontSize:"94px",lineHeight:"115px"}}> section1 </div>
   
            </div>
          </div>
        </>
      );
    
};


export default Gorupcreation;
