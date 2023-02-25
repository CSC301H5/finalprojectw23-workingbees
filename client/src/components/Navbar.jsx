import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Style.css";

export default function Navbar() {
  const [roomName, setRoomName] = useState(null);
  const [timer, setTimer] = useState(null);
  const location = useLocation();


  if (location.pathname === "/") {
    return null
  }
  else if (location.pathname === ("/Login") || (location.pathname === ("/register"))) {
    return (
      <nav className='rightNav'>
        <h1>HIVEMIND</h1>
      </nav>
    )
  }
  else {
    return (
      <nav className="nav">
        <h1>(Room Name)</h1>
        <h1 style={{ color: '#FFAF40' }}>(Timer)</h1>
        <h1>HIVEMIND</h1>
      </nav>
    )
  }
}