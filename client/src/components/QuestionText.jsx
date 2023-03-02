import React, { Component } from 'react';
import "./Style.css"
/*
*/
export default function QuestionText (props){ 
	return (
		<div>
			<input
				type="text" 
				name={"question-" + props.index}
				placeholder="Question" 
				value={props.question} 
				onChange={props.handleTextChange} 
				required />
			<input
				type="button" 
				name={"remove-" + props.index}
				value="Remove"
				onChange={props.removeQuestion} 
				/>
		</div>
	)
}
