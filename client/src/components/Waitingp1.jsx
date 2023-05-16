import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Style.css"
import Navbar from "./Navbar";
import hives from '../assets/hives.png'
import AttendeeList from "./AttendeeList";
import ProfileNumbers from "./ProfileNumbers";
import PhaseTimer from "./PhaseTimer";
import axios from 'axios';

/*
expects the following props
  - hiveID
  - token
  - code
*/
function WaitingP1() {
  const [attendeeList, setAttendeeList] = useState([])
  const [numBees, setNumBees] = useState("0")
  const [profileNums, setProfileNums] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();

  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;
  console.log(token);
  const socket = new WebSocket('ws://localhost:3030/initializeWS')
  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(hiveID), token: token }));
  });

  const beginPhaseOne = () => {
    axios.post('/api/v1/beginPhaseOne',
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
    navigate('/waiting2', { state: { code: code, token: token, hiveID: hiveID } });
  }

  const handleSubmit = e => {
    e.preventDefault();
    beginPhaseOne();
  }

  return (
    <div className="grid">
      <div class="left">
        <img src={hives} alt="" />
      </ div>
      <div class="right">
        <Navbar roomCode={location.state.code} token={location.state.token}>
          <PhaseTimer token={token} hiveID={hiveID} event={handleNavigation} />
        </Navbar>
        <h2 className="roomCode">Code: </h2>
        <p className="roomCode" style={{ left: '1000px', top: '35px' }}>{location.state.code}</p>
        <form onSubmit={handleSubmit}>
          <label className="numsDescription" style={{ left: '762px' }}> bees in the hive</label>
          <label className="numsDescription" style={{ left: '1000px' }}>profiles completed</label>
          <ProfileNumbers
            socket={socket}
            profileNums={profileNums}
            setProfileNums={setProfileNums}
          />
          <p className="nums" style={{ left: '820px' }}>{attendeeList.length}</p>
          <p className="nums" style={{ left: '1070px' }}>{profileNums}</p>

          <label className="attendees">Attendee list

            <AttendeeList
              socket={socket}
              attendeeList={attendeeList}
              setAttendeeList={setAttendeeList}
            />
          </label>
          <button type="submit" className="button" style={{ position: 'absolute', left: '1017px', top: '667px' }}>Skip to phase 1</button>
        </form>
      </div>
    </div>
  );
}

export default WaitingP1