import "../styles/Style.css"

/*
expects the following props:
    - profileNums, setProfileNums
    - socket
*/
function SwipedNumbers(props) {

    props.socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (data.event === "GROUP_DONE_RESPONDING") {
            props.setProfileNums(props.profileNums + 1)
        }
    });

    return (
        <div>
        </div>
    )

}

export default SwipedNumbers