import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Style.css"
import hives from '../assets/hives.png'
import PhaseTimer from './PhaseTimer'

function WaitingP2Attendee() {

	const location = useLocation();
	const navigate = useNavigate();
	const token = location.state.token;
	const hiveID = location.state.hiveID;
	const code = location.state.code;

	const socket = new WebSocket('ws://localhost:3030/initializeWS');
	socket.addEventListener('open', (event) => {
		socket.send(JSON.stringify({ event: 'REGISTER', hiveID: hiveID, token: token }));
	});

	socket.addEventListener('message', (event) => {
		const parsed_data = JSON.parse(event.data)
		if (parsed_data.event === "PHASE_SKIP") {
			handleNavigation();
		}
	});

	const handleNavigation = () => {
		navigate('/teamIntro', { state: { code: code, token: token, hiveID: hiveID } });
	}

	return (
		<div className="grid">
			<div class="left">
				<img src={hives} alt="" />
			</ div>
			<div class="right" style={{ text_align: 'center' }}>
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