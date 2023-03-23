import { useState } from "react";
import "./Style.css"
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import hives from '../Assets/hives.png';
import { futureDate } from "../utils/time";

function CreateRoom() {
    const [hiveName, setHiveName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [phaseZeroDate, setPhaseZeroDate] = useState('')
    const [phaseZeroTime, setPhaseZeroTime] = useState('')
    const [phaseOneDate, setPhaseOneDate] = useState('')
    const [phaseOneTime, setPhaseOneTime] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const token = location.state.token;

    const handleHiveName = (e) => { setHiveName(e.target.value) }
    const handleDisplayName = (e) => { setDisplayName(e.target.value) }
    const handlePhaseZeroDate = (e) => { setPhaseZeroDate(e.target.value) }
    const handlePhaseZeroTime = (e) => { setPhaseZeroTime(e.target.value) }
    const handlePhaseOneDate = (e) => { setPhaseOneDate(e.target.value) }
    const handlePhaseOneTime = (e) => { setPhaseOneTime(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault();
        const phaseChangeDates = [null, null];
        if (phaseZeroDate && phaseZeroTime) {
            const timeData = phaseZeroTime.split(":");
            phaseChangeDates[0] = futureDate(Date.parse(phaseZeroDate), parseInt(timeData[0]) + 4, parseInt(timeData[1]), 0).toISOString();
        }
        if (phaseOneDate && phaseOneTime) {
            const timeData = phaseOneTime.split(":");
            phaseChangeDates[1] = futureDate(Date.parse(phaseOneDate), parseInt(timeData[0]) + 4, parseInt(timeData[1]), 0).toISOString();
        }

        navigate('/RoomConfig', { state: { token: token, profilePicture: "meow", hiveName: hiveName, displayName: displayName, phaseChangeDates: phaseChangeDates } });
    }

    return (
        <div className="grid">
            <div class="left">
                <img src={hives} alt="" />
            </div>
            <div class="right">
                < Navbar />
                <h2 className="h2">Let's get some basic info down for your new hive.</h2>
                <form onSubmit={handleSubmit}>
                    <label className="display" style={{ width: '150px', height: '20px', left: '753px', top: '200px' }}>Hive name</label>
                    <input className="textBox" style={{ width: '400px', height: '50px', left: '753px', top: '225px' }}
                        type="text"
                        required
                        onChange={handleHiveName}
                    />
                    <label className="display" style={{ width: '150px', height: '20px', left: '753px', top: '285px' }}>Your display name</label>
                    <input
                        className="displayNameField"
                        type="text"
                        required
                        onChange={handleDisplayName}
                    />
                    <label className="display" style={{ width: '300px', height: '20px', left: '753px', top: '370px' }}>Phase 0 deadline (Optional)</label>
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '753px', top: '395px' }}
                        type="date"
                        onChange={handlePhaseZeroDate}
                    />
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '953px', top: '395px' }}
                        type="time"
                        onChange={handlePhaseZeroTime}
                    />

                    <label className="display" style={{ width: '400px', height: '20px', left: '753px', top: '455px' }}>Phase 1 deadline (Optional)</label>
                    <input
                        className="textBox" style={{ top: '480px', left: '753px', width: '197.5px', height: '50px' }}
                        type="date"
                        onChange={handlePhaseOneDate}
                    />
                    <input
                        className="SmalltextBox" style={{ top: '480px', left: '953px', width: '197.5px' }}
                        type="time"
                        onChange={handlePhaseOneTime}
                    />

                    <button type="submit" className="continue" style={{ cursor: 'pointer' }}>Continue</button>
                </form>
            </div>
        </div>
    );

}
export default CreateRoom