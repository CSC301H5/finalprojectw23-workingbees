import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Style.css";
import axios from 'axios';

export default function HiveComp({ roomCode }) {

  const [hiveName, setHiveName] = useState('')


  return (
    <div>
          <div/>
          <div >  <h1 style={{ position : 'relative', width: '190px',left: '100px',top:'75px' }} > CSC301 202F</h1></div>
          
           <div
      style={{
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        backgroundColor: 'orange',
      }}
    ></div>
          <div style={{ position : 'relative', width: '190px',left: '100px',top:'0px',fontSize:'26px' }} > phase 1</div>
    </div>
  )
}