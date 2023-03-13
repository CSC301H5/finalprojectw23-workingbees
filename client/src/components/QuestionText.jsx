import React from 'react';
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
				className="inputBox"
				type="text"
				name="title"
				placeholder="Question"
				value={props.title}
				onChange={props.handleTextChange}
				required /> 
			<input
				type="button"
				className="tinyButton"
				name="remove"
				value="X"
				onClick={() => {props.removeQuestion(props.id)}}
			/>
			<select
				name={"matchMode"}
				className="smallInputBox"
				onChange={props.selectMode}
				value={props.matchMode}
				placeholder="Select Match Mode">
				<option value="SIMILAR">Similar</option>
				<option value="DIVERSE">Diverse</option>
				<option value="NONE">None</option>
			</select> <br />
			<textarea
				className="explanation"
				name={"explanation"}
				placeholder="Explanation"
				value={props.explanation}
				onChange={props.handleTextChange}
				required
			/>
		</div>
	)
}
