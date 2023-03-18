import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import StaticAttendeeList from "./StaticAttendeeList";
import SwipedNumbers from "./SwipedNumbers";


function WaitingP1() {
  const [attendeeList, setAttendeeList] = useState([])
  const [numBees, setNumBees] = useState("0")
  const profilesCompleted = useState("0")
  const location = useLocation();
  const navigate = useNavigate();
  const [profileNums, setProfileNums] = useState(0)

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="grid">
      <div class="left">
        <img src={hives} alt="" />
      </ div>
      <div class="right">
        <Navbar roomCode={location.state.code} token={location.state.token} />
        <h2 className="roomCode">Phase 1 </h2>
        <form onSubmit={handleSubmit}>
          <label className="numsDescription" style={{ left: '762px' }}>bees in the hive</label>
          <label className="numsDescription" style={{ left: '1000px' }}>users done swiping</label>
          <SwipedNumbers socket={location.state.socket} profileNums={profileNums} setProfileNums={setProfileNums} />
          <p className="nums" style={{ left: '1070px' }}>{profilesCompleted}</p>
          <p className="nums" style={{ left: '820px' }}>{numBees}</p>
          <label className="attendees">Attendee list</label>
          <StaticAttendeeList hiveID={location.state.hiveID} token={location.state.token} />
          <button type="submit" className="button" style={{ position: 'absolute', left: '1017px', top: '667px' }}>Skip to phase 2</button>
        </form>
      </div>
    </div>
  );

}
export default WaitingP1