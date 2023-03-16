import { useState } from "react"
import "./Style.css"

/*
expects the following props:
    - hiveID
    - token: auth token 
*/
function AttendeeList(props) {

    const [attendeeList, setAttendeeList] = useState([])
    const socket = new WebSocket('ws://localhost:3030/initializeWS')

    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(props.hiveID), token: props.token }));
    });

    socket.addEventListener('message', (event) => {
        //console.log('received: %s', event.data);
        let data = JSON.parse(event.data);
        if (data.event === "USER_JOIN") {
            //console.log(data.username)
            setAttendeeList((prevList) => 
                        [...prevList, (data.username)])
        }
    });

    return (
        <div>
            <h1 className="text">{attendeeList}</h1>
            <h1 className="text">{attendeeList.length}</h1>
        </div>
    )

}
export default AttendeeList