import React, { useState } from 'react';
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

    const socket = new WebSocket('ws://localhost:3030/initializeWS');
    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: hiveID, token: token }));
    });

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
                    <img src={hives} />
                </div>
                <div class="right" >
                    < Navbar />

                    <div className="entryBox">
                        <MemberList hiveID={hiveID} token={token} socket={socket} />
                        <input class="textBox" value={username}
                            onChange={e => setName(e.target.value)} placeholder="Username" style={{
                                width: "400px",
                                height: "50px",
                                position: 'absolute',
                                top: '390px'
                            }} />
                    </div>
                    <button onClick={handleInvite} style={{ position: 'absolute ', left: '1010px', top: '380px' }}>Invite</button>
                    <label className="display" style={{ top: '460px', left: '600px', width: '300px', height: '20px' }}>Pending invites</label>
                    <div className="entryBox" style={{ position: 'absolute ', left: '600px', top: '480px', width: '615px', height: '200px' }}>
                        <PendingInvitesList hiveID={hiveID} token={token} socket={socket} />
                    </div>
                    <button onClick={handleNavigation} style={{ position: 'absolute ', left: '1017px', top: '699px' }}>Continue</button>
                </div>

            </div>
        </>
    );

};


export default GroupCreation;