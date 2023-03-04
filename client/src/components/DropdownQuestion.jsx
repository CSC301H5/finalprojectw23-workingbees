import React, { Component } from 'react';
import "./Style.css"
import QuestionText from './QuestionText'
import AnswerTexts from './AnswerTexts'

/* Props must have
	index: 
	question:
	answers:
	handleTextChange: function to handle text change
	removeQuestion: function to remove question 
	addAnswer: function to add answer
	removeAnswer: function to remove answer
	
*/
export default function DropdownQuestion (props){
	return (
		<div>
			<QuestionText 
				index={props.index}
				question={props.question}
				handleTextChange={props.handleTextChange}
				removeQuestion={props.removeQuestion}
				/>
			<AnswerTexts
				index={props.index}
				answers={props.answers}
				handleTextChange={props.handleTextChange}
				removeAnswer={props.removeAnswer}
				/>
			<input
				type="button"
				name={"addanswer-" + props.index}
				value="Add Answer"
				onClick={props.addAnswer}
				/>
		</div>
	)
}