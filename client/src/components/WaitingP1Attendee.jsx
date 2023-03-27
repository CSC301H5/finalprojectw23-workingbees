import { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import PhaseTimer from './PhaseTimer'

function WaitingP1Attendee() {
  
  const profilesCompleted = useState()
  const location = useLocation();
  const navigate = useNavigate();
  
  const ws = new WebSocket('ws://localhost:3030/initializeWS')
		ws.on('open', function open() { 
			ws.send('{"event":"REGISTER", "hiveID": ' + location.state.hiveID + ', "token": ' 
				+ location.state.token + '}');
		});
		
		ws.addEventListener('message', (event) => { 
			const parsed_data = JSON.parse(event.data)
			if(parsed_data.event === "PHASE_SKIP"){
				handleNavigation()
			}
		});
		
  const handleNavigation = () => {
	// idk where im sending yet
    navigate('/error', { state: { code: location.state.code, token: location.state.token, hiveID: location.state.hiveID } });
  }	
		
  return (
    <div className="grid">
      <div class="left">
        <img src={hives}></img>
      </ div>
      <div class="right">
        <Navbar roomCode={location.state.code}
		  token={location.state.token} />
		<label class="subtitle" style={{position: "center"}}>
		  Waiting for others to join the hive
		</label>
		  <div class="placeTimer">
		  <div class="bigTimer"> 
			<PhaseTimer 
			  token={location.state.token}
			  hiveID={location.state.hiveID}
			  event={handleNavigation} />
		  </ div>
		  <label class="yellowSubtitle">
		    until your recommendations are generated
		  </label>
		</div>		
      </div>
    </div>
  );

}
export default WaitingP1Attendee