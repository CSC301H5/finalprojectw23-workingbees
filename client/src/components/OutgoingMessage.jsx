import axios from "axios";
import { useState, useEffect } from "react";
import MyMessage from './MyMessage'


/*Necessary props
	token
	hiveID
	swarmID
	Messsages*/
	

export default function OutgoingMessage (props) {
	const [message, setMessage] = useState('')
	
	function changeMessage(event){
		setMessage(event.target.value)
	}

	async function sendMessage(e){
		axios.post("/api/v1/sendSwarmChatMessage",
            {
                params: {
                    hiveID: props.hiveID,
					swarmID: props.swarmID,
					message: message
                },
                headers: {
                    'x-auth-token': props.token
                }
            }).then(res => {
                if (res.status === 200) {
					//TODO make this line match with whatever youre sending 
					//props.Messages.push(<MyMessage message={message}>)
                    setMessage('')
                }
            })
		setMessage('')
	}
	return <form onSubmit={sendMessage}>
			<input className="inputBox"
				type="text"
				placeholder="Send a message"
				value={message}
				onChange={changeMessage}
				required />
			<input className="small_button" 
				type="submit" 
				value="Send" />
		</form>
}