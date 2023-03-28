import { useState, useEffect } from "react"
import axios from 'axios';
import BigEntry from './BigEntry';
import { getCookie } from '../utils/getAuthToken';

export default function HiveList2(props) {

    const [hiveData, setHiveData] = useState([]);
    const token = getCookie("x-auth-token");




    async function getHiveData() {
        axios.get("/api/v1/getAllSwarms ", {
            params: {hiveID: props.hiveID},
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                const rows = [];
                var roomCode = 1 ;
                const jsonObject = JSON.parse(res.data);

                for (let hiveID in jsonObject) {
                   console.log(jsonObject[res.data[hiveID]]);

                   rows.push({ name: "Swarm" +  roomCode, 
                     description: "Group of " + jsonObject[res.data[hiveID]],
                    destination :  "/TeamChat", 
                    hiveID :  hiveID})
                   roomCode += 1;
                  
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
                />
            ))}
        </div>
    );
}