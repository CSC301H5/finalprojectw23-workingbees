import { useState, useEffect } from "react";
import axios from 'axios';
import Timer from "./Timer";

export default function PhaseTimer({ token, hiveID, event }) {

    const [phaseCompletionDate, setPhaseCompletionDate] = useState("");
     console.log("hiveID", hiveID);
     console.log("token", token);

    async function getPhaseDeadline() {
        axios.get("/api/v1/getHiveTimer", {
            params: {
                hiveID: hiveID
            },
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                setPhaseCompletionDate(res.data.phaseCompletionDate);
            }
        })
    }
    useEffect(() => {
        getPhaseDeadline();
    }, [])

    if (!phaseCompletionDate) {
        return "";
    } else {
        return <Timer endDate={phaseCompletionDate} event={event} />
    }
}