import React from 'react';

/*necessary props
	question:	a string
	answer:		a string
*/
//the literal barest minimum
export default function ProfileNumberAnswer (props) {
	return (
		<div>	
			<label>{props.question}</label><br />
			<label>{props.answer}</label>
		</div>
	)
}