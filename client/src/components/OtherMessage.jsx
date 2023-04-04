/*
expects the following props:
    - sender
    - message
*/
function OtherMessage(props) {


    return (
        <div>
            <p className="other-sender" id="similar">{props.sender}</p>
            <p className="other-message">{props.message}</p>

        </div>
    )
} export default OtherMessage;