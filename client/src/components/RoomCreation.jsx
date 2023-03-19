import { Component, useEffect, useState } from "react";
import "./Style.css"
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import hives from '../Assets/hives.png';

function CreateRoom() {
    const [hiveName, setHiveName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [joinDate, setJoinDate] = useState('')
    const [profileDate, setProfileDate] = useState('')
    const [joinTime, setJoinTime] = useState('')
    const [profileTime, setProfileTime] = useState('')
    const [classDate, setClassDate] = useState('')
    const [classTime, setClassTime] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const token = location.state.token;

    const handleHiveName = (e) => { setHiveName(e.target.value) }
    const handleDisplayName = (e) => { setDisplayName(e.target.value) }
    const handleJoinDate = (e) => { setJoinDate(e.target.value) }
    const handleJoinTime = (e) => { setJoinTime(e.target.value) }
    const handleProfileDate = (e) => { setProfileDate(e.target.value) }
    const handleProfileTime = (e) => { setProfileTime(e.target.value) }
    const handleClassDate = (e) => { setClassDate(e.target.value) }
    const handleClassTime = (e) => { setClassTime(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/RoomConfig', { state: { token: token, profilePicture: "meow", hiveName: hiveName, displayName: displayName } });
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
                    <label className="display" style={{ width: '300px', height: '20px', left: '753px', top: '370px' }}>Join/pregroup deadline (Optional)</label>
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '753px', top: '395px' }}
                        type="date"
                        onChange={handleJoinDate}
                    />
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '953px', top: '395px' }}
                        type="time"
                        onChange={handleJoinTime}
                    />

                    <label className="display" style={{ width: '400px', height: '20px', left: '753px', top: '455px' }}>  Profile completion deadline (Optional)</label>
                    <input
                        className="textBox" style={{ top: '480px', left: '753px', width: '197.5px', height: '50px' }}
                        type="date"
                        onChange={handleProfileDate}
                    />
                    <input
                        className="SmalltextBox" style={{ top: '480px', left: '953px', width: '197.5px' }}
                        type="time"
                        onChange={handleProfileTime}
                    />

                    <label className="display" style={{ top: '540px', left: '753px', width: '300px', height: '20px' }}>Classification deadline (Optional)</label>
                    <input
                        type="date"
                        className="SmalltextBox" style={{ width: '197.5px', left: '753px', top: '565px' }}
                        onChange={handleClassDate}
                    />
                    <input
                        type="time"
                        className="SmalltextBox" style={{ width: '197.5px', left: '953px', top: '565px' }}
                        onChange={handleClassTime}
                    />
                    <button type="submit" className="continue" style={{ cursor: 'pointer' }}>Continue</button>
                </form>
            </div>
        </div>
    );

}
export default CreateRoom