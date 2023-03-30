import axios from "axios";
import { useState, useEffect } from "react";
import MyMessage from "./MyMessage";
import NewMessage from "./NewMessage";
import OtherMessage from "./OtherMessage";

/*
expects the following props:
    - hiveID
    - token
    - code
    - swarmID
    - messages, setMessages
    - username
*/
function IncomingMessage(props) {
    
    // get chat history
    async function getChatHistory() {
        axios.get("/api/v1/getSwarmChatHistory",
            {
                params: {
                    hiveID: props.hiveID,
                    swarmID: props.swarmID
                },
                headers: {
                    'x-auth-token': props.token
                }
            }).then(res => {
                if (res.status == 200) {
                    props.setMessages(res.data.messages)
                }
            })
    }
    useEffect(() => {
        getChatHistory();
    }, [])

    const rows = [];
    for (let i = 0; i < (props.messages.length); i++) {
        if (props.messages[i].sender === props.userName) {
            // my message
            rows.push(<MyMessage message={props.messages[i].message} />);

        } else {
            // team member's msg
            rows.push(<OtherMessage sender={props.messages[i].sender} message={props.messages[i].message} />);
        }
    }

    return (
        <div className="incomingMsg" style={{ overflow: "auto", maxHeight: "70vh" }}>
            <NewMessage hiveID={props.hiveID} token={props.token} messages={props.messages} setMessages={props.setMessages}/>
            <div>
                <tbody>{rows}</tbody>
            </div>
        </div>
    )

} export default IncomingMessage;
