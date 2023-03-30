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
*/
function IncomingMessage(props) {
    const [swarmID, setSwarmID] = useState('')
    const [userName, setUserName] = useState('')
    // for testing
    /*
    const [messages, setMessages] = useState([
        { sender: "JohnBee", message: "Hello there", timestamp: "'Mon Mar 20 2023 18:33:08 GMT-0400 (Eastern Daylight Time)'" },
        { sender: "MaryBee", message: "Hey guys!", timestamp: "'Mon Mar 20 2023 18:34:08 GMT-0400 (Eastern Daylight Time)'" }
    ])
    */
   const [messages, setMessages] = useState([])

    // get swarmID
    async function getSwarmID() {
        axios.get("/api/v1/getSwarmInfo",
            {
                params: {
                    hiveID: props.hiveID
                },
                headers: {
                    'x-auth-token': props.token
                }
            }).then(res => {
                if (res.status == 200) {
                    setSwarmID(res.data.swarmID)
                }
            })
    }
    useEffect(() => {
        getSwarmID();
    }, [])

    // get chat history
    async function getChatHistory() {
        axios.get("/api/v1/getSwarmChatHistory",
            {
                params: {
                    hiveID: props.hiveID,
                    swarmID: swarmID
                },
                headers: {
                    'x-auth-token': props.token
                }
            }).then(res => {
                if (res.status == 200) {
                    setMessages(res.data.messages)
                }
            })
    }
    useEffect(() => {
        getChatHistory();
    }, [])

    // get userName
    async function getUserName() {
        axios.get("/api/v1/getSwarmChatHistory",
            {
                params: {
                    hiveID: props.hiveID,
                },
                headers: {
                    'x-auth-token': props.token
                }
            }).then(res => {
                if (res.status == 200) {
                    setUserName(res.data.userName)
                }
            })
    }
    useEffect(() => {
        getUserName();
    }, [])

    // stores messages to be displayed
    const chat = [];

    const rows = [];
    for (let i = 0; i < (messages.length); i++) {
        if (messages[i].sender === userName) {
            // my message
            rows.push(<MyMessage message={messages[i].message} />);

        } else {
            // team member's msg
            rows.push(<OtherMessage sender={messages[i].sender} message={messages[i].message} />);
        }
    }

    return (
        <div className="incomingMsg" style={{ overflow: "auto", maxHeight: "70vh" }}>
            <NewMessage hiveID={props.hiveID} token={props.token} messages={messages} />
            <div>
                <tbody>{rows}</tbody>
            </div>
        </div>
    )

} export default IncomingMessage;
