import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "../styles/Style.css"
import hives from '../assets/hives.png'
import Navbar from "./Navbar";
import MemberList from './MemberList';
import PendingInvitesList from "./PendingInviteList"
import PhaseTimer from './PhaseTimer';
import Conditional from './Conditional';

const GroupCreation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state.token;
    const hiveID = location.state.hiveID;
    const code = location.state.code;

    const [username, setUsername] = useState('');
    const [leader, setLeader] = useState('');
    const [members, setMembers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);

    const socket = new WebSocket('ws://localhost:3030/initializeWS');
    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: hiveID, token: token }));
    });

    socket.addEventListener('message', (event) => {
        const parsed_data = JSON.parse(event.data)
        if (parsed_data.event === "GROUP_CONFIRMED" && parsed_data.leaderName === leader) {
            navigate('/waitingP1Attendee', { state: { token: token, code: code, hiveID: hiveID } });
        }
    });

    const isLeader = () => leader.startsWith("You (");

    const handleInvite = () => {
        axios.post('/api/v1/sendInvite',
            {
                hiveID: hiveID,
                username: username
            }, {
            headers: {
                'x-auth-token': token
            }
        }).then(setUsername(''))
    };

    const confirmGroup = () => {
        axios.post('/api/v1/confirmGroup',
            {
                hiveID: hiveID
            }, {
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
            if (res.status === 200) {
                navigate("/teamProfile", { state: { token: token, code: code, hiveID: hiveID } });
            }
        })
    }

    return (
        <>
            <div class="grid">
                <div class="left">
                    <img src={hives} alt="" />
                </div>
                <div class="right" >
                    <Navbar roomCode={code} token={token} >
                        <PhaseTimer token={token} hiveID={hiveID} />
                    </Navbar>
                    <div className="entryBox">
                        <MemberList hiveID={hiveID} token={token} socket={socket}
                            leader={leader} setLeader={setLeader}
                            members={members} setMembers={setMembers}
                            invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers}
                        />
                        <input class="textBox" value={username} disabled={!isLeader()} onChange={e => setUsername(e.target.value)} placeholder="Username"
                            style={{
                                width: "400px",
                                height: "50px",
                                position: 'absolute',
                                top: '390px'
                            }} />
                    </div>
                    <button type="reset" onClick={handleInvite} disabled={!isLeader()} style={{ position: 'absolute ', left: '1020px', top: '380px' }}>Invite</button>
                    <label className="display" style={{ top: '460px', left: '600px', width: '300px', height: '20px' }}>Pending invites</label>
                    <div className="entryBox" style={{ position: 'absolute ', left: '600px', top: '480px', width: '615px', height: '200px' }}>
                        <PendingInvitesList hiveID={hiveID} token={token} socket={socket}
                            members={members} setMembers={setMembers} setLeader={setLeader}
                            invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers}
                        />
                    </div>
                    <Conditional renderCondition={isLeader()}>
                        <button onClick={confirmGroup} style={{ position: 'absolute ', left: '1017px', top: '699px' }}>Continue</button>
                    </Conditional>
                </div>
            </div>
        </>
    );
};

export default GroupCreation;