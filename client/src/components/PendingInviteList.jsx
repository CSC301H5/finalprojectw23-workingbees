import { useState, useEffect } from "react"
import axios from 'axios';
import { getCookie } from './getAuthToken';
import SmallEntry from "./SmallEntry";

import useWebSocket from 'react-use-websocket'
const WS_URL = 'ws://localhost:3030/initializews'

export default function PendingInviteList({ hiveID }) {

    const [invites, setInvites] = useState([]);
    const token = getCookie("x-auth-token");
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
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
                    rows.push({ name: leaderName, component: <h4>Accept? or Reject ?</h4> })
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