import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import StaticAttendeeList from "./StaticAttendeeList";
import PhaseTimer from "./PhaseTimer";
import MiniEntry from "./MiniEntry";

function WaitingP3() {
  const [attendeeList, setAttendeeList] = useState([])
  const location = useLocation();
  const navigate = useNavigate();

  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;

  return (
    <div className="grid">
      <div class="left">
        <img src={hives} alt="" />
      </ div>
      <div class="right">
        <Navbar roomCode={code} token={token} >
          <PhaseTimer token={token} hiveID={hiveID} />
        </Navbar>
        <h2 className="roomCode" style={{ left: '800px' }}>Phase 2 </h2>
        <label className="numsDescription" style={{ left: '850px', top: '250px' }}>generating swarms for</label>
        <label className="numsDescription" style={{ left: '940px', top: '360px' }}>bees...</label>
        <p className="nums" style={{ left: '950px', top: '200px' }}>{attendeeList.length}</p>
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
      </div>
    </div>
  );
}

export default WaitingP3