import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Style.css";
import hives from '../Assets/hives.png'


export default function Navbar() {
  const [roomName, setRoomName] = useState(null);
  const [timer, setTimer] = useState(null);
  const location = useLocation();


  if (location.pathname === "/") {
    return null
  }
  else if (location.pathname === ("/Login") || (location.pathname === ("/register"))) {
    return (
      <div class="grid">
        <div class="left">
          <img src={hives}></img>
        </div>
        <div class="right">
          <nav className="rightNav">
            <h1 style={{ float: 'right' }}>HIVEMIND</h1>
          </nav>
        </div>
      </div>
    )
  }
  else {
    return (
      <div class="grid">
        <div class="left">
          <img src={hives}></img>
        </div>
        <div class="right">
          <nav class="nav">
            <h1>(Room Name)</h1>
            <h1 style={{ color: '#FFAF40' }}>(Timer)</h1>
            <h1>HIVEMIND</h1>
          </nav>
        </div>
      </div>
    )
  }
}