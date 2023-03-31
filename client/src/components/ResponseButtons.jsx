import React from 'react';
import axios from 'axios';
import { getCookie } from '../utils/getAuthToken';
import "./Style.css"
function sendMatchingResponse(hiveID, matchingID, response, next, token) {

	console.log( "pass in inputs hiveID",  hiveID);
	console.log( "pass in inputs  matchingID ", matchingID);
	console.log( "pass in inputs response", response);
	console.log( "pass in inputs  token ", token);

        axios.post("/api/v1/respondToMatchingGroupRecommendation",
            {
                hiveID: hiveID,
				matchingGroupID: matchingID,
                response: response
            }, {
            headers: {
                'x-auth-token': token
            }
        }
        ).then(res => {
			console.log("x2 : ", token);
			if (res.status == 200) {
				console.log("30000");
				console.log("x2 ", token);
				next()
			}
			console.log(res.data);
			
		}).catch(err => {
			console.error(err.response);
		});
    

	
	console.log("toekm", token);
 
}


/*necessary props
	hiveID: id of the hive decisions are being made in
	matchingID: id of the person/group whose profile is being
	next: some function to iterate through the list of profiles in parent component
*/

export default function ResponseButtons(props) {
	return (
		<div>
			<input
				className='small_button'
				type="button"
				value="Reject"
				onClick={() => {
					sendMatchingResponse(props.hiveID, props.matchingGroupIDArray[props.current_profile_index], "NO", props.next, props.token)
					console.log("click click click -1",props.hiveID, props.matchingGroupIDArray[props.current_profile_index], "NO", props.next, props.hiveID)
					props.Setcurrent_profile_index(props.current_profile_index +  1)
				}}
			/>
			<input
				className='small_button'
				type="button"
				value="Maybe"
				onClick={() => {
					sendMatchingResponse(props.hiveID, props.matchingGroupIDArray[props.current_profile_index], "MAYBE", props.next,  props.token)
					console.log("click  +1")
					props.Setcurrent_profile_index(props.current_profile_index + 1)
				}}
			/>
			<input
				className="small_button"
				type="button"
				value="Accept"
				onClick={() => {
					sendMatchingResponse(props.hiveID, props.matchingGroupIDArray[props.current_profile_index], "YES", props.next , props.token)
					console.log("click click +1")
					props.Setcurrent_profile_index(props.current_profile_index + 1)
				}}
			/>
		</div>
	)
}