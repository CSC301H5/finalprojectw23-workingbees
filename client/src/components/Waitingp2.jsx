import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import StaticAttendeeList from "./StaticAttendeeList";
import SwipedNumbers from "./SwipedNumbers";
import PhaseTimer from "./PhaseTimer";
import axios from 'axios'
import MiniEntry from "./MiniEntry";

function WaitingP2() {
  const [attendeeList, setAttendeeList] = useState([])
  const [numBees, setNumBees] = useState("0")
  const profilesCompleted = useState("0")
  const location = useLocation();
  const navigate = useNavigate();
  const [profileNums, setProfileNums] = useState(0)

  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;

  const socket = new WebSocket('ws://localhost:3030/initializeWS');
  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(hiveID), token: token }));
  });

  const beginPhaseTwo = () => {
    axios.post('/api/v1/beginPhaseTwo',
      {
        hiveID: hiveID,
      }, {
      headers: {
        'x-auth-token': token
      }
    }).then(res => {
      if (res.status === 200) {
        handleNavigation();
      }
    })
  }

  const handleNavigation = () => {
    navigate('/waiting3', { state: { code: code, token: token, hiveID: hiveID } });
    // navigate('/TeamViewing', { state: { code: code, token: token, hiveID: hiveID } });
  }

  const handleSubmit = e => {
    e.preventDefault();


    beginPhaseTwo();
  }

  return (
    <div className="grid">
      <div class="left">
        <img src={hives} alt="" />
      </ div>
      <div class="right">
        <Navbar roomCode={code} token={token} >
          <PhaseTimer token={token} hiveID={hiveID} />
        </Navbar>
        <h2 className="roomCode" style={{left: '800px'}}>Phase 1</h2>
        <form onSubmit={handleSubmit}>
          <label className="numsDescription" style={{ left: '762px' }}>bees in the hive</label>
          <label className="numsDescription" style={{ left: '1000px' }}>users done swiping</label>
          <SwipedNumbers socket={socket} profileNums={profileNums} setProfileNums={setProfileNums} />
          <p className="nums" style={{ left: '1070px' }}>{profileNums}</p>
          <p className="nums" style={{ left: '820px' }}>{attendeeList.length}</p>
          <label className="attendees">Attendee list</label>
          <StaticAttendeeList hiveID={hiveID} token={token} attendeeList={attendeeList} setAttendeeList={setAttendeeList} />
          <div
            className="entryBox"
            style={{
              position: "absolute",
              left: "720px",
              top: "420px",
              width: "570px",
              height: "200px",
              display: "inline-block",
              overflowY: "scroll",

            }}
          >
            {attendeeList.map((name) => (
              <MiniEntry key={name} name={name} style={{}} />
            ))}
          </div>
          <button type="submit" className="button" style={{ position: 'absolute', left: '1017px', top: '667px' }}>Skip to phase 2</button>
        </form>
      </div>
    </div>
  );
}

export default WaitingP2