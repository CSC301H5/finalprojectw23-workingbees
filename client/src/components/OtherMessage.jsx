/*
expects the following props:
    - sender
    - message
*/
function OtherMessage(props) {


    return (
        <div>
            <p className="sender">{props.sender}</p>
            <p className="message">{props.message}</p>

        </div>
    )
} export default OtherMessage;