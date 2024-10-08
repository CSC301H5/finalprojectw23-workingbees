import axios from "axios";

/*
expects the following props:
    - hiveID
    - token
    - messages, setMessages
*/
function NewMessage(props) {

    const socket = new WebSocket('ws://localhost:3030/initializeWS')
    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ event: 'REGISTER', hiveID: String(props.hiveID), token: props.token }));
    });

    function getChatHistory() {
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
                if (res.status == 200) {
                    props.setMessages(res.data.messages)
                }
            })
    }

    socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (data.event === "NEW_CHAT_MESSAGE") {
            console.log("msg received")
            getChatHistory()
        }
    });

    return (
        <div>
        </div>
    )
} export default NewMessage;