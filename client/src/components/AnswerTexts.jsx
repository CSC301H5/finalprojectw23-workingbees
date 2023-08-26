import React from 'react';
import "../styles/Style.css"

/* Necessary Props
	questionIndex:
	answerIndex:
	answer: 
	handleText:
	removeAnswer:
*/
function Answer(props) {
	return (
		<div>
			<input
				type="text"
				name={"answer-" + props.questionIndex + "-" + props.answerIndex}
				placeholder="Answer"
				value={props.answer}
				onChange={props.handleTextChange}
				required />
			<input
				type="button"
				value="Remove"
				name={"removeanswer-" + props.questionIndex + "-" + props.answerIndex}
				onClick={props.removeAnswer}
			/>
		</div>
	)
}

/* Necessary props
	index: 
	answers:
	handleTextChange:
	removeAnswer:
*/
export default function AnswerTexts(props) {
	let answerTexts = []

	for (let i = 0; i < props.answerslength; i++) {
		answerTexts.push(
			<Answer
				questionIndex={props.index}
				answerIndex={i}
				answer={props.answers[i]}
				handleTextChange={props.handleTextChange}
				removeAnswer={props.removeAnswer}
			/>
		)
	}

	return answerTexts

}