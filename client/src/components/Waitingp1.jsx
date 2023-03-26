import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import AttendeeList from "./AttendeeList";
import ProfileNumbers from "./ProfileNumbers";
import ProfileHeader from "./Header"

/*
expects the following props
  - hiveID
  - token
  - code
*/
function WaitingP1() {
  const [attendeeList, setAttendeeList] = useState([])
  const [numBees, setNumBees] = useState("0")
  const location = useLocation();
  const navigate = useNavigate();
  const [profileNums, setProfileNums] = useState(0)

  const socket = new WebSocket('ws://localhost:3030/initializeWS')
  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(location.state.hiveID), token: location.state.token }));
  });

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/waiting2', { state: { code: location.state.code, token: location.state.token, hiveID: location.state.hiveID, socket: socket } })
  }

  return (
    <div className="grid">
      <div class="left">
        <img src={hives} alt="" />
      </ div>
      <div class="right">

        <Navbar roomCode={location.state.code} token={location.state.token} />
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
      <ProfileHeader/>

    </div>
    
  );
}
export default WaitingP1