/*
expects the following props:
    - message
*/
function MyMessage(props) {

    return (
        <div>
            <p className="my-sender" id="similar" style={{ textAlign: 'right' }}>You</p>
            <p className="my-message">{props.message}</p>
        </div>
    )
}

export default MyMessage;