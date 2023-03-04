import { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'


function WaitingP1() {
  const [attendeeList, setAttendeeList] = useState([])
  const [numBees, setNumBees] = useState("0")
  const profilesCompleted = useState("0")
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/waiting2')
  }

  return (
    <div className="grid">
      <div class="left">
        <img src={hives}></img>
      </ div>
      <div class="right">
        <Navbar roomCode={location.state.code} token={location.state.token}/>
        <h2 className="roomCode">Code: </h2>
        <p className="roomCode" style={{ left: '1000px', top: '35px' }}>{location.state.code}</p>
        <form onSubmit={handleSubmit}>
          <label className="numsDescription" style={{ left: '762px' }}>bees in the hive</label>
          <label className="numsDescription" style={{ left: '1000px' }}>profiles completed</label>
          <p className="nums" style={{ left: '1070px' }}>{profilesCompleted}</p>
          <p className="nums" style={{ left: '820px' }}>{numBees}</p>
          <label className="attendees">Attendee list</label>
          <p className="attendeeList">{attendeeList}</p>
          <button type="submit" className="button" style={{ position: 'absolute', left: '1017px', top: '667px' }}>Skip to phase 1</button>
        </form>
      </div>
    </div>
  );

}
export default WaitingP1