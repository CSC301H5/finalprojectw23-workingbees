import hives from "../assets/hives.png";
import IncomingMessage from "./IncomingMessage";
import Navbar from "./Navbar";
import OutgoingMessage from "./OutgoingMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

/*
expects the following props:
  -  hiveID
  - token
  - code
  - swarmID
*/
function Chat(props) {
    //const [swarmID, setSwarmID] = useState('')
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState("");
    const location = useLocation();

    // get userName
    async function getUserName() {
        axios
            .get("/api/v1/getUserDisplayName", {
                params: {
                    hiveID: location.state.hiveID,
                },
                headers: {
                    "x-auth-token": location.state.token,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUserName(res.data.name);
                }
            });
    }
    useEffect(() => {
        getUserName();
    }, []);

    return (
        <div className="grid">
            <div className="left">
                <img src={hives} alt="" />
            </div>
            <div className="right">
                <Navbar
                    roomCode={location.state.code}
                    token={location.state.token}></Navbar>

                <IncomingMessage
                    hiveID={location.state.hiveID}
                    token={location.state.token}
                    code={location.state.code}
                    swarmID={location.state.swarmID}
                    messages={messages}
                    setMessages={setMessages}
                    userName={userName}
                />
                <OutgoingMessage
                    token={location.state.token}
                    hiveID={location.state.hiveID}
                    swarmID={location.state.swarmID}
                    setMessages={setMessages}
                    username={userName}
                />
            </div>
        </div>
    );
}

export default Chat;
