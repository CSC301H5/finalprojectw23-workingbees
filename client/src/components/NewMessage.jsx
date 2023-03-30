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

    socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (data.event === "NEW_CHAT_MESSAGE") {
          props.setMessages((prevList) =>
            [...prevList, (data)])
        }
      });

    return (
        <div>
        </div>
    )
} export default NewMessage;