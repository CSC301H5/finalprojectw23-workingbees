import { useState, useEffect } from "react"
import axios from 'axios';
import SmallEntry from "./SmallEntry";
import AcceptReject from "./AcceptReject";

function indexOfObject(arr, key, value) {
    try {for (let i = 0; i < i < arr.length; i++) {
        if (arr[i][key] === value) {
            return i;
        }
    }}
    catch (e) {
        return -1;
    }
}

export default function PendingInviteList({ hiveID, token, socket }) {

    const [invites, setInvites] = useState([]);

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event === "NEW_INVITE") {
            getIncomingInvites();
        } else if (data.event === "INVITE_CANCELED") {
            setInvites((prevList) => prevList.slice(0, indexOfObject(prevList, "name", data.leaderName)).concat(prevList.slice(indexOfObject(prevList, "name", data.leaderName) + 1)));
        }
    });

    async function getIncomingInvites() {
        axios.get("/api/v1/getIncomingInvites", {
            params: {
                hiveID: hiveID
            },
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                const rows = [];
                for (let leaderName in res.data) {
                    rows.push({ name: leaderName, component: <AcceptReject hiveID={hiveID} matchingGroupID={res.data[leaderName]} token={token} /> })
                }
                setInvites(rows);
            }
        })
    }
    useEffect(() => {
        getIncomingInvites();
    }, [])

    return (
        <div>
            {invites.map(invitation => (
                <SmallEntry name={invitation.name}>{invitation.component}</SmallEntry>
            ))}
        </div>
    )
}