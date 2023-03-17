import React, { Component } from 'react';
import "./Style.css"
import QuestionText from './QuestionText'
import Question from './Question'
/* Necessary props: same as parent
*/
export default class NumberlineQuestion extends Question {
	constructor(props){
		super(props)
		this.state.type = "NUMBERLINE"
		this.state.min = 0
		this.state.max = 100
		this.state.step = 5
		this.state.required = false
		this.state.options = []
		this.state.index = null

		this.handleNumberChange = this.handleNumberChange.bind(this)
	}
	
	handleNumberChange(event){
		let t = event.target.name
		
		if (t === "min") {
			this.setState({min: event.target.value})
		} else if(t === "max") {
			this.setState({max: event.target.value})
		} else if (t === "step") {
			this.setState({step: event.target.value})
		}

		this.state.index = this.props.addQuestionInput({
			type : this.state.type,
			title :this.state.title,
			explanation : this.state.explanation,
			matchMode : this.state.matchMode,
			priority: 0,
			typeOptions: { 
				min: this.state.min,
				max: this.state.max,
				step: this.state.step
			}
		}, this.state.index)
		
	
	}
	
	render(){
		return (
			<div>
				<QuestionText 
					id={this.state.id}
					title={this.state.title}
					explanation={this.state.explanation}
					handleTextChange={this.handleTextChange}
					removeQuestion={this.removeQuestion}
					matchMode={this.state.matchMode}
					selectMode={this.handleSelectChange}
					/>
				<div>
					Start:
					<input 
						type="number" 
						name={"min"} 
						value={this.state.min} 
						onChange={this.handleNumberChange} 
						required /> <br />
					Stop:
					<input 
						type="number" 
						name={"max"}  
						value={this.state.question} 
						onChange={this.handleNumberChange} 
						required /> <br />
					Increment:
					<input 
						type="number" 
						name={"step"}
						value={this.state.question} 
						onChange={this.handleNumberChange} 
						required />
				</div>
			</div>	
		)
	}
}
