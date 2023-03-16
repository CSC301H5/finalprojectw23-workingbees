import { Component, useEffect, useState } from "react";
import axios from 'axios';
import "./Style.css"
import { useNavigate, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import hives from '../Assets/hives.png'
import getCookie from "../utils/getAuthToken.js"
function CreateRoom() {
    const [hiveName, setHiveName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [joinDate, setJoinDate] = useState('')
    const [profileDate, setProfileDate] = useState('')
    const [joinTime, setJoinTime] = useState('')
    const [profileTime, setProfileTime] = useState('')
    const [classDate, setClassDate] = useState('')
    const [classTime, setClassTime] = useState('')
   
    const [groupSizeMax, setGroupSizeMax] = useState('')
    const [groupSizeMin, setGroupSizeMin] = useState('')
    const navigate = useNavigate();
    //guest token
    //const [token, setToken] = useState('')

    const handleHiveName = (e) => { setHiveName(e.target.value) }
    const handleDisplayName = (e) => { setDisplayName(e.target.value) }
    const handleJoinDate = (e) => { setJoinDate(e.target.value) }
    const handleJoinTime = (e) => { setJoinTime(e.target.value) }
    const handleProfileDate = (e) => { setProfileDate(e.target.value) }
    const handleProfileTime = (e) => { setProfileTime(e.target.value) }
    const handleClassDate = (e) => { setClassDate(e.target.value) }
    const handleClassTime = (e) => { setClassTime(e.target.value) }
    const handleGroupSizeMax = (e) => { setGroupSizeMax(parseInt(e.target.value))}
    const handleGroupSizeMin = (e) => { setGroupSizeMin(parseInt(e.target.value))}

 
    const token =  getCookie('x-auth-token');

    const handleSubmit = e => {
        e.preventDefault();
        if  (groupSizeMax < groupSizeMin){ 
            console.log("groupSizeMax < groupSizeMin")
        }
        

        else{
        
        
        navigate('/roomConfig', { state: { hiveName: hiveName, 
            token: token,
            displayName: displayName, 
            joinDate:joinDate, 
            profileDate:profileDate,
            joinTime:joinTime,
            profileTime:profileTime,
            classDate:classDate,
            classTime:classTime,
            groupSizeMax:groupSizeMax,
            groupSizeMin: groupSizeMin,

        } })   }
    }

    

    return (
        <div className="grid">
            <div class="left">
                <img src={hives}></img>
            </div>
            <div class="right">
                
                <h2 className="h2">Let's get some basic info down for your new hive.</h2>
                <form onSubmit={handleSubmit}>
                    <label className="display" style={{ width: '150px', height: '20px', left: '753px', top: '200px' }}>Hive name</label>
                    <input className="textBox" style={{ width: '400px', height: '50px', left: '753px', top: '225px' }}
                        type="text"
                        required
                        //onChange={(e) => this.setState({hiveName: e.target.value})}
                        onChange={handleHiveName}
                    />
                    <label className="display" style={{ width: '150px', height: '20px', left: '753px', top: '285px' }}>Your display name</label>
                    <input
                        className="displayNameField"
                        type="text"
                        required
                        onChange={handleDisplayName} //handleDisplayName
                    />
                     <label className="display" style={{ width: '150px', height: '20px', left: '753px', top: '370px' }}>Group size:</label>

                     <input className="SmalltextBox" style={{ height: '50px', left: '753px', top: '395px' }}
                        type="text"
                        required
                       //handleGroupSize
                       placeholder="Max"
                        onChange={handleGroupSizeMax}
                    />
                     <input className="SmalltextBox" style={{ height: '50px', left: '900px', top: '395px' }}
                        type="text"
                        required
                       //handleGroupSize
                       placeholder="Min"
                        onChange={handleGroupSizeMin}
                    />
                   
                    <label className="display" style={{ width: '300px', height: '20px', left: '753px', top: '455px' }}>Join/pregroup deadline (Optional)</label>
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '753px', top: '480px' }}
                        type="date"
                        onChange={handleJoinDate}
                    />
                    <input
                        className="SmalltextBox" style={{ width: '197.5px', left: '953px', top: '480px' }}
                        type="time"
                        onChange={handleJoinTime}
                    />

                    <label className="display" style={{ width: '400px', height: '20px', left: '753px', top: '540px' }}>  Profile completion deadline (Optional)</label>
                    <input
                        className="textBox" style={{ top: '565px', left: '753px', width: '197.5px', height: '50px' }}
                        type="date"
                        onChange={handleProfileDate}
                    />
                    <input
                        className="SmalltextBox" style={{ top: '565px', left: '953px', width: '197.5px' }}
                        type="time"
                        onChange={handleProfileTime}
                    />

                    <label className="display" style={{ top: '630px', left: '753px', width: '300px', height: '20px' }}>Classification deadline (Optional)</label>
                    <input
                        type="date"
                        className="SmalltextBox" style={{ width: '197.5px', left: '753px', top: '655px' }}
                        onChange={handleClassDate}
                    />
                    <input
                        type="time"
                        className="SmalltextBox" style={{ width: '197.5px', left: '953px', top: '655px' }}
                        onChange={handleClassTime}
                    />
                    <button type="submit" className="continue" style={{ cursor: 'pointer' ,top: '730px', left: '920px', }}>Continue</button>
                </form>
            </div>
        </div>
    );

}
export default CreateRoom