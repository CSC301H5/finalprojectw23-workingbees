import React, { Component } from 'react';
import "./Style.css"
/*Necessary props
	id
	title
	explanation
	handleTextChange
	removeQuestion
	matchMode
	selectMode
*/
export default function QuestionText(props) {
	return (
		<div>
			<input
				//class="inputBox"
				type="text"
				name="title"
				placeholder="Question"
				value={props.title}
				onChange={props.handleTextChange}
				required />
			<input
				type="button"
				name="remove"
				value="Remove"
				onClick={() => {props.removeQuestion(props.id)

				 props.removeQuestionInput(props.id)
				 console.log("good bye question props.id:", props.id)}}
			/>
			<select
				name={"matchMode"}
				onChange={props.selectMode}
				value={props.matchMode}
				placeholder="Select Match Mode">
				<option value="SIMILAR">Similar</option>
				<option value="DIVERSE">Diverse</option>
				<option value="NONE">None</option>
			</select> <br />
			<input
				type="text"
				name={"explanation"}
				placeholder="Explanation"
				value={props.explanation}
				onChange={props.handleTextChange}
				required
			/>
		</div>
	)
}
