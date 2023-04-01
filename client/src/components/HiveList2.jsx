import { useState, useEffect } from "react"
import axios from 'axios';
import BigEntry from './BigEntry';
import { getCookie } from '../utils/getAuthToken';

export default function HiveList2(props) {

    const [hiveData, setHiveData] = useState([]);
    const token = getCookie("x-auth-token");




    async function getHiveData() {
        axios.get("/api/v1/getAllSwarms", {
            params: {hiveID: props.hiveID},
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                const rows = [];
                var roomCode = 1 ;
                console.log(res.data);
                //const jsonObject = JSON.parse(res.data);

                for (let swarmID  in res.data) {
                   console.log(res.data[swarmID ]);

                   rows.push({ name: "Swarm" +  roomCode, 
                     description: "Group of " + res.data[swarmID],
                    destination :  "/chat", 
                    swarmID  :  swarmID 
                     })
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
                    hiveID={props.hiveID}
                    token={token}
                    code={props.code}
                    swarmID ={hiveDatum.swarmID}
            
                />
            ))}
        </div>
    );
}