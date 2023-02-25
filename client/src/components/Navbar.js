import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [roomName, setRoomName] = useState(null);
    const [timer, setTimer] = useState(null);

    /*
    axios.get("/api/v1/getHiveInfo", {}).then(res => {
        if (res.status == 200) {
          this.setState({ roomName: res.data.hiveName })
          console.log(res.data.hiveName)
        }
      })
      */

    return <nav className="nav">
        <h1>(Room Name)</h1>
        <h1>(Timer)</h1>
        <h1>HIVEMIND</h1>
    </nav>
}