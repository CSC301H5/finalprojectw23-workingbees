import { useState, useEffect } from "react"
import axios from 'axios';
import SmallEntry from "./SmallEntry";

export default function MemberList({ hiveID, token }) {

    const [leader, setLeader] = useState('');
    const [members, setMembers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);

    const socket = new WebSocket('ws://localhost:3030/initializeWS');

    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: hiveID, token: token }));
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event === "INVITE_ACCEPTED") {
            setMembers((prevList) => [...prevList, data.username]);
            setInvitedUsers((prevList) => prevList.slice(0, prevList.indexOf(data.username)).concat(prevList.slice(prevList.indexOf(data.username) + 1)));
        } else if (data.event === "INVITE_REJECTED") {
            setInvitedUsers((prevList) => prevList.slice(0, prevList.indexOf(data.username)).concat(prevList.slice(prevList.indexOf(data.username) + 1)));
        }
    });

    async function getMembers() {
        axios.get("/api/v1/getMatchingGroup", {
            params: {
                hiveID: hiveID
            },
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                // Set leader
                if (res.data.leaderName === res.data.userName) {
                    setLeader(`${res.data.leaderName}(You)`);
                } else {
                    setLeader(res.data.leaderName);
                }

                // Set members
                const currentMembers = [];
                for (let i = 0; i < res.data.members.length; i++) {
                    if (res.data.members[i] === res.data.userName) {
                        currentMembers.push(`${res.data.userName}(You)`);
                    } else {
                        currentMembers.push(res.data.members[i]);
                    }
                }
                setMembers(currentMembers);
            }
        })
    }

    async function getOutgoingInvites() {
        axios.get("/api/v1/getOutgoingInvites", {
            params: {
                hiveID: hiveID
            },
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                const currentlyInvitedUsers = [];
                for (let invitedUser in res.data) {
                    currentlyInvitedUsers.push(invitedUser);
                }
                setInvitedUsers(currentlyInvitedUsers);
            }
        })
    }

    useEffect(() => {
        getMembers();
        getOutgoingInvites();
    }, [])

    return (
        <div>
            <SmallEntry name={leader} status='leader'/>
     
            {members.map(member => (
                <SmallEntry name={member} status='Accepted'/>
            ))}
            {invitedUsers.map(invitedUser => (
                <SmallEntry name={invitedUser} status='Invited'/>
              
            ))}
        </div>
    )
}