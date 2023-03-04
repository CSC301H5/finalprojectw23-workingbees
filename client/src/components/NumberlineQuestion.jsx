import React, { Component } from 'react';
import "./Style.css"
import QuestionText from './QuestionText'
/* Necessary props:
	index: index in the list of questions
	question: question text
	start, stop, increment: numberline parameters
	handleTextChange: function to change state in parent 
	removeQuestion: function to remove element from parent state list
*/
export default function NumberlineQuestion(props){
	return (
		<div>
			<QuestionText 
				index={props.index}
				question={props.question}
				handleTextChange={props.handleTextChange}
				removeQuestion={props.removeQuestion}
				/>
			<div>
				Start:
				<input 
					type="number" 
					name={"start-" + props.index} 
					value={props.start} 
					onChange={props.handleTextChange} 
					required /> <br />
				Stop:
				<input 
					type="number" 
					name={"stop-" + props.index} 
					placeholder="Question" 
					value={this.state.question} 
					onChange={this.handleTextChange} 
					required /> <br />
				Increment:
				<input 
					type="number" 
					name={"increment-" + props.index}
					placeholder="Question" 
					value={this.state.question} 
					onChange={this.handleTextChange} 
					required />
			</div>
		</div>	
	)
}
