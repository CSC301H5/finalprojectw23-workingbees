import { useState, useEffect } from "react"
import axios from 'axios';
import BigEntry from './BigEntry';
import { getCookie } from '../utils/getAuthToken';

export default function HiveList(props) {

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
                    console.log(res.data[hiveID]);
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
                 <BigEntry
                 name={hiveDatum.name}
                 detail={hiveDatum.description}
                 destination={hiveDatum.destination}
                // hiveID={props.hiveID}
                 token={token}
                // code={props.code}
         
             />
            ))}
        </div>
    );
}