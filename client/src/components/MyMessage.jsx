/*
expects the following props:
    - message
*/
function MyMessage(props) {


    return (
        <div>
            <p className="sender">You</p>
            <p className="message">{props.message}</p>
        </div>
    )
} export default MyMessage;