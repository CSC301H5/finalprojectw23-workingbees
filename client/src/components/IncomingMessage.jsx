import axios from "axios";
import { useEffect } from "react";
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
        console.log(props.hiveID)
        console.log(props.swarmID)
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
                if (res.status === 200) {
                    console.log(res.data.messages)
                    props.setMessages(res.data.messages)
                }
            })
    }
    useEffect(() => {
        getChatHistory();
    }, [])

    const rows = [];
    for (let i = 0; i < (props.messages.length); i++) {
        console.log(props.userName)
        if (props.messages[i].sender === props.userName) {
            // my message

            rows.push(<div style={{ float: 'right' }}>
                <MyMessage message={props.messages[i].message} />
            </div>
            );
        } else {
            // team member's msg
            rows.push(<OtherMessage sender={props.messages[i].sender} message={props.messages[i].message} />);
        }
    }

    return (
        <div className="config" style={{
            border: "1px solid #FFAF40",
            borderRadius: "8px", overflow: "auto", height: "500px", width: "436px", backgroundColor: "whitesmoke"
        }}>
            <NewMessage hiveID={props.hiveID} token={props.token} messages={props.messages} setMessages={props.setMessages} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {rows}
            </div>
        </div>
    )

} export default IncomingMessage;
