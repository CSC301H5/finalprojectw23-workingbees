import { useState } from "react"
import "./Style.css"

/*
expects the following props:
    - hiveID
    - token: auth token 
*/
function ProfileNumbers(props) {

    const socket = new WebSocket('ws://localhost:3030/initializeWS')
    const [profileNums, setProfileNums] = useState(0)

    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(props.hiveID), token: props.token }));
    });

    socket.addEventListener('message', (event) => {
        //console.log('received: %s', event.data);
        let data = JSON.parse(event.data);
        if (data.event === "GROUP_PROFILE_CREATED") {
            setProfileNums(profileNums + 1)
        }
    });

    return (
        <div>
            <h1 className="text">{profileNums}</h1>
        </div>
    )

}
export default ProfileNumbers