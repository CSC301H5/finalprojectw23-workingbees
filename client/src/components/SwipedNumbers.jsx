import { useState } from "react"
import "./Style.css"

/*
expects the following props:
    - profileNums, setProfileNums
    - socket
*/
function SwipedNumbers(props) {

    props.socket.addEventListener('message', (event) => {
        //console.log('received: %s', event.data);
        let data = JSON.parse(event.data);
        if (data.event === "GROUP_DONE_RESPONDING") {
            props.setProfileNums(props.profileNums + 1)
        }
    });

    return (
        <div>
            <h1 className="text">{props.profileNums}</h1>
        </div>
    )

}
export default SwipedNumbers