import React from 'react';
import "../styles/Style.css"
/*Necessary props
	id
	title
	explanation
	handleTextChange
	removeQuestion
	matchMode
	selectMode
	priority
	changePriority
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
				onClick={() => { props.removeQuestion(props.id) }}
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
			<div onChange={props.changePriority}>
				<label className="text">Matching Priority: </label>

				<input type="radio" id="mp1" name={"priority " + props.id} value="1" />
				<label for="mp1" className="radioText">1</label>

				<input type="radio" id="mp2" name={"priority " + props.id} value="2" />
				<label for="mp2" className="radioText">2</label>

				<input type="radio" id="mp3" name={"priority " + props.id} value="3" defaultChecked="checked" />
				<label for="mp3" className="radioText">3</label>

				<input type="radio" id="mp4" name={"priority " + props.id} value="4" />
				<label for="mp4" className="radioText">4</label>

				<input type="radio" id="mp5" name={"priority " + props.id} value="5" />
				<label for="mp5" className="radioText">5</label>
			</div>

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
