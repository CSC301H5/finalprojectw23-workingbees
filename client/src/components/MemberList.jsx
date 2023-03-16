import { useState, useEffect } from "react"
import axios from 'axios';
import { getCookie } from './getAuthToken';
import SmallEntry from "./SmallEntry";

export default function MemberList({ hiveID }) {

    const [leader, setLeader] = useState('');
    const [members, setMembers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const token = getCookie("x-auth-token");

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