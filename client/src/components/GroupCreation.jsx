import React, { Component, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./Style.css"
import hives from '../Assets/hives.png'
import Navbar from "./Navbar";
import MemberList from './MemberList';
import PendingInvitesList from "./PendingInviteList"

const GroupCreation = () => {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const location = useLocation();
    const token = location.state.token;
    const hiveID = location.state.hiveID;

    const handleInvite = () => {
        axios.post('/api/v1/sendInvite',
            {
                hiveID: hiveID,
                username: username
            }, {
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
            if (res.status === 200) {
                // confirmation message
                console.log(res.status);
            }
        })
    };

    const handleNavigation = () => {
        navigate("/roomConfig", { state: { token } })
    };

    return (
        <>
            <div class="grid">
                <div class="left">
                    <img src={hives}></img>
                </div>
                <div class="right">
                    < Navbar />
                    <label className="display" style={{ position: 'absolute ', left: '654px', width: '97px', height: '20px' }}>Your swarm</label>

                    <MemberList hiveID={hiveID} />
                    <input class="textBox" value={username}
                        onChange={e => setName(e.target.value)} placeholder="Username" style={{
                            width: "400px",
                            height: "50px"
                        }}></input>
                    <button onClick={handleInvite} style={{ position: 'absolute ', left: '1010px', top: '380px' }}>Invite</button>

                    <div style={{ position: 'absolute ', left: '594px', top: '480px', width: '150px', height: '20px' }}>
                        <label className="display" >Pending invites</label>
                        <PendingInvitesList hiveID={hiveID} />
                    </div>
                    <button onClick={handleNavigation} style={{ position: 'absolute ', left: '1017px', top: '669px' }}>Continue</button>
                </div>

            </div>
        </>
    );

};


export default GroupCreation;