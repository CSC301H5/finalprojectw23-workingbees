import React from 'react';
import axios from 'axios'
import getCookie from './getAuthToken'

sendMatchingResponse(hiveID, matchingID, response, next) {
	token = getCookie('x-auth-token')
	axios.post("/api/v1/respondToMatchingGroupRecommendation", {
          params: {
            "hiveID": hiveID,
			"matchingGroupID": matchingID,
			"response": response
          },
          headers: {
            "x-auth-token": token
          }
        }).then(res => {
          console.log("x2 : ",token);
          if (res.status ==200) {
			console.log("30000");
			console.log("x2 ", token);
            next()
          }
          console.log(res.data);
        }).catch(err => {
          console.error(err.response.data);
        });
}



/*necessary props
	hiveID: id of the hive decisions are being made in
	matchingID: id of the person/group whose profile is being
	next: some function to iterate through the list of profiles in parent component
*/

export default function ResponseButtons (props) {
	return (
		<div>
			<input
				type="button"
				value="Reject"
				onChange={() => sendMatchingResponse(props.hiveID, props.matchingID, "NO", props.next)}
			/>
			<input
				type="button"
				value="Maybe"
				onChange={() => sendMatchingResponse(props.hiveID, props.matchingID, "MAYBE", props.next)}
			/>
			<input
				type="button"
				value="Accept"
				onChange={() => sendMatchingResponse(props.hiveID, props.matchingID, "YES", props.next)}
			/>
		</div>
	)
}