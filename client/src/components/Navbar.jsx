import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Style.css";
import axios from 'axios';

export default function Navbar({ roomCode, token }) {

  const [hiveName, setHiveName] = useState('')

  //assumes room code is given
  async function getHiveName() {
    axios.get("/api/v1/getHiveInfo",
      {
        params: {
          code: roomCode
        },
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        if (res.status == 200) {
          setHiveName(res.data.hiveName)
        }
      })
  }
  useEffect(() => {
    getHiveName();
  }, [])

  return (
    <div class="grid">
      <div class="right">
        <nav class="nav">
          <h1>{hiveName}</h1> {/* should be hiveName instead of roomCode */}
          <h1 style={{ color: '#FFAF40' }}>(Timer)</h1>
          <h1>HIVEMIND</h1>
        </nav>
      </div>
    </div>
  )
}