import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Style.css";
import axios from 'axios';

export default function HiveComp({ roomCode }) {

  const [hiveName, setHiveName] = useState('')

  //assumes room code is given
  /* TODO: get hiveName
  async function getHiveName() {
    axios.get("/api/v1/getHiveInfo",
      {
        params: {
          code: roomCode
        }
      }).then(res => {
        console.log(res.data.hiveName)
        if (res.status == 200) {
          setHiveName(res.data.hiveName)
        }
      })
  }
  useEffect(() => {
    getHiveName();
  }, [])
  */

  return (
    <div>
          <div/>
          <h1>ROOM</h1>
           <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'orange',
      }}
    ></div>
          <div > status</div>
    </div>
  )
}