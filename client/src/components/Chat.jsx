import hives from '../Assets/hives.png'
import IncomingMessage from './IncomingMessage';
import Navbar from "./Navbar";
import OutgoingMessage from './OutgoingMessage';
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

/*
expects the following props:
  -  hiveID
  - token
  - code
*/
function Chat(props) {

    const [swarmID, setSwarmID] = useState('')
    const [messages, setMessages] = useState([])
    const [userName, setUserName] = useState('')
    const location = useLocation();

    // for testing
    /*
    const [messages, setMessages] = useState([
        { sender: "JohnBee", message: "Hello there", timestamp: "'Mon Mar 20 2023 18:33:08 GMT-0400 (Eastern Daylight Time)'" },
        { sender: "MaryBee", message: "Hey guys!", timestamp: "'Mon Mar 20 2023 18:34:08 GMT-0400 (Eastern Daylight Time)'" }
    ])
    */

    // get swarmID
    async function getSwarmID() {
        axios.get("/api/v1/getSwarmInfo",
            {
                params: {
                    hiveID: location.state.hiveID
                },
                headers: {
                    'x-auth-token': location.state.token
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

    // get userName
    async function getUserName() {
        axios.get("/api/v1/getMatchingGroup",
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

    return (
        <div className="grid">
            <div className="left">
                <img src={hives} alt="" />
            </div>
            <div className="right">
                <Navbar roomCode={location.state.code} token={location.state.token}>
                </Navbar>

                <IncomingMessage hiveID={props.hiveID} token={location.state.token} code={location.state.code}
                    swarmID={swarmID} messages={messages} setMessages={setMessages} userName={userName}
                />
                <OutgoingMessage token={location.state.token} hiveID={props.hiveID} swarmID={swarmID}
                    setMessages={setMessages} username={userName}
                />
            </div>

        </div>
    )

}
export default Chat;