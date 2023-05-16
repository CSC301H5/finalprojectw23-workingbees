import { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Style.css"
import Navbar from "./Navbar";
import hives from '../assets/hives.png'
import PhaseTimer from './PhaseTimer'

function WaitingP1Attendee() {

	const location = useLocation();
	const navigate = useNavigate();
	const code = location.state.code;
	const token = location.state.token;
	const hiveID = location.state.hiveID;
	const ws = new WebSocket('ws://localhost:3030/initializeWS')
	console.log("code :", code);
	ws.addEventListener('open', (event) => {
		ws.send(JSON.stringify({ event: 'REGISTER', hiveID: String(hiveID), token: token }));
	});

	ws.addEventListener('message', (event) => {
		const parsed_data = JSON.parse(event.data)
		if (parsed_data.event === "PHASE_SKIP") {
			handleNavigation()
		}
	});

	const handleNavigation = () => {
		// idk where im sending yet

		navigate('/tinder', { state: { token: location.state.token, hiveID: location.state.hiveID, code: code } });
	}

	return (
		<div className="grid">
			<div class="left">
				<img src={hives}></img>
			</ div>
			<div class="right" style={{ text_align: 'center' }}>

				<label className="centeredSubtitle">
					Waiting for others to join the hive
				</label>
				<div className="placeTimer">
					<div className="bigTimer">
						<PhaseTimer
							token={token}
							hiveID={hiveID}
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
