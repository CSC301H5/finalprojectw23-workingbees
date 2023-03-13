import { useState, useEffect } from "react"
import axios from 'axios';
import { getCookie } from './getAuthToken';
import SmallEntry from "./SmallEntry";
import AcceptReject from "./AcceptReject";

export default function PendingInviteList({ hiveID }) {

    const [invites, setInvites] = useState([]);
    const token = getCookie("x-auth-token");

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