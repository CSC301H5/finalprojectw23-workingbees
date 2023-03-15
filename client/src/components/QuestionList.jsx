import React, { Component } from 'react';
import "./Style.css"
import NumberlineQuestion from './NumberlineQuestion'
import DropdownQuestion from './DropdownQuestion'
import MultiselectQuestion from './MultiselectQuestion'
import TimetableQuestion from './TimetableQuestion'

export default class QuestionList extends Component{
	constructor(){
		super()
		this.state = {
			questions: [],
			selectedType: "DROPDOWN",
			nextKey: 0
		}
		
		this.addQuestion = this.addQuestion.bind(this)
		this.removeQuestion = this.removeQuestion.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.publish = this.publish.bind(this)
	}
	
	addQuestion(event){
		//need to make a copy to prevent concurrency issues
		let copyquestions = this.state.questions.map(x => x)
		let k = this.state.nextKey
		this.setState({nextKey: k+1})
		let newQuestion
		
		if (this.state.selectedType === "DROPDOWN"){
			newQuestion = <DropdownQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							/>
		} else if (this.state.selectedType === "MULTISELECT") {
			newQuestion = <MultiselectQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							/>

		} else if (this.state.selectedType === "NUMBERLINE") {
			newQuestion = <NumberlineQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							/>


		} else if (this.state.selectedType === "TIMETABLE") {
			newQuestion = <TimetableQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							/>


		}
		
		copyquestions.push(newQuestion)
		this.setState({questions: copyquestions})
	}

	
	removeQuestion(id){
		let i = 0
		while (i < this.state.questions.length && parseInt(this.state.questions[i].key) !== id) {
			i++
		} 
		
		if (i < this.state.questions.length) {
			let newQuestions = this.state.questions.slice(0, i).concat(this.state.questions.slice(i+1)) 
			this.setState({questions: newQuestions})
		}
	}
	

	handleSelectChange(event){
		this.setState({
			selectedType: event.target.value
		})
	}
	
	publish(event){
		//
	}
	
	render() {
		return (
			<form onSubmit={this.publish}
				style={{width: '550px',}}>
				<select value={this.state.SelectedType} 	
						onChange={this.handleSelectChange}
						className="smallInputBox">
					<option value="DROPDOWN">Dropdown</option>
					<option value="MULTISELECT">Multiselect</option>
					<option value="NUMBERLINE">Numberline</option>
					<option value="TIMETABLE">Timetable</option>
				</select>
				<div className="questionList">
					{this.state.questions}
				</div>
				<input
					type="button"
					value="Add Question"
					onClick={this.addQuestion}
					className="secondaryButton"
					/>
				<input
					type="submit"
					value="Publish"
					className="loginButton"
					/>
			</form>
		)
	}
	
}