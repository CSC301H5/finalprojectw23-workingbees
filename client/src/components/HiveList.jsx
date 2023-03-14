import { useState, useEffect } from "react"
import axios from 'axios';
import HiveEntry from './HiveEntry';
import { getCookie } from './getAuthToken';

export default function HiveList() {

    const [hiveData, setHiveData] = useState([]);
    const token = getCookie("x-auth-token");

    async function getHiveData() {
        axios.get("/api/v1/getUserHives", {
            params: {},
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                const rows = [];
                for (let hiveID in res.data) {
                    if (res.data[hiveID].isHost) {
                        rows.push({ name: res.data[hiveID].name, description: "Phase " + res.data[hiveID].phase });
                    } else {
                        rows.push({ name: res.data[hiveID].name, description: "Team of " + res.data[hiveID].teamSize });
                    }
                }
                setHiveData(rows);
            }
        })
    }
    useEffect(() => {
        getHiveData();
    }, [])

    return (
        <div>
            {hiveData.map(hiveDatum => (
                <HiveEntry
                    name={hiveDatum.name}
                    description={hiveDatum.description}
                />
            ))}
        </div>
    );
}