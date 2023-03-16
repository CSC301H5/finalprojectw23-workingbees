import { useState } from "react"
import "./Style.css"

/*
expects the following props:
    - socket
    - attendeeList, setAttendeeList
*/
function AttendeeList(props) {

    props.socket.addEventListener('message', (event) => {
        //console.log('received: %s', event.data);
        let data = JSON.parse(event.data);
        if (data.event === "USER_JOIN") {
            //console.log(data.username)
            props.setAttendeeList((prevList) => 
                        [...prevList, (data.username)])
        }
    });

    return (
        <div>
            <h1 className="text">{props.attendeeList}</h1>
            <h1 className="text">{props.attendeeList.length}</h1>
        </div>
    )

}
export default AttendeeList