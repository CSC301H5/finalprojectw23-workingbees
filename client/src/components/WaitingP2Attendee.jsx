import { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import PhaseTimer from './PhaseTimer'

function WaitingP2Attendee() {
 
  const profilesCompleted = useState()
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state.code;
  const token = location.state.token;
  const hiveID = location.state.hiveID;
  console.log(location.state.toke); 
  const ws = new WebSocket('ws://localhost:3030/initializeWS')
	ws.addEventListener('open', (event) => {
		ws.send(JSON.stringify({ event: 'REGISTER', hiveID: String(hiveID), token: token }));
	});
	ws.addEventListener('message', (event) => { 
		const parsed_data = JSON.parse(event.data)
		if(parsed_data.event === "PHASE_SKIP"){
			handleNavigation()
		}
	});
		
  const handleNavigation = () => {
	// idk where im sending yet
	
    navigate('/Teamintro', { state: { code: location.state.code, token: location.state.token, hiveID: location.state.hiveID } });
  }	
	
  return (
    <div className="grid">
      <div class="left">
        <img src={hives}></img>
      </ div>
      <div class="right" style={{text_align: 'center'}}>
        
		<label className="centeredSubtitle">
		  Waiting for others to finish selecting...
		</label>
		  <div className="placeTimer">
		  <div className="bigTimer"> 
			<PhaseTimer
				token={token}
				hiveID={hiveID}
				event={handleNavigation} />

		  </ div>
		  <label class="yellowSubtitle">
			Until groups are created !
		  </label>
		</div>		
      </div>
    </div>
  );

}
export default WaitingP2Attendee