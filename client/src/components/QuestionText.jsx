import React, { Component } from 'react';
import "./Style.css"
/*
*/
export default function QuestionText(props) {
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
			<select
				name={"matchMode-" + props.index}
				onChange={props.selectMode}
				value={props.matchMode}
				placeholder="Select Match Mode">
				<option>Similar</option>
				<option>Diverse</option>
				<option>None</option>
			</select> <br />
			<input
				type="text"
				name={"explanation-" + props.index}
				placeholder="Explanation"
				value={props.explanation}
				onChange={props.handleTextChange}
				required
			/>
		</div>
	)
}
