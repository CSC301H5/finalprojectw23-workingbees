import React, { Component } from 'react';
import "./Style.css"
import NumberlineQuestion from './NumberlineQuestion'
import DropdownQuestion from './DropdownQuestion'
//import MultiselectQuestion from './MultiselectQuestion'
import CalendarQuestion from './CalendarQuestion'

export default class AddQuestionList{
	constructor(){
		this.state = {
			questions: []
			selectedType: "DROPDOWN"
		}
		
		this.addQuestion = this.addQuestion.bind(this)
		this.removeQuestion = this.removeQuestion.bind(this)
		this.addAnswer = this.removeQuestion.bind(this)
		this.removeAnswer = this.removeAnswer.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.publish = this.publish.bind(this)
	}
	
	addQuestion(event){
		//need to make a deep copy to prevent concurrency issues
		let copyquestions = this.state.questions.map(x => x)
		let newQuestion = {
			type: this.state.selectType,
			title: "",
			explanation: "",
			matchmode: "NONE",
		}
		
		if (this.state.selectedType === "DROPDOWN"){
			newQuestions.typeOptions = {
				options: []
				required: False
			}
		} else if (this.state.selectedType === "MULTISELECT") {
			newQuestions.typeOptions = {
				options: []
				maxAllowed: 0
				required: False
			}
			
		} else if (this.state.selectedType === "NUMBERLINE") {
			newQuestion.typeOption = {
				min = 0,
				max = 0,
				step = 0,
			}
			
		} else if (this.state.selectedType === "TIMETABLE") {
			newQuestion.typeOption = {
				maxAllowed = 0
			}
		}
		copyquestions.push(newQuestion)
		this.setState({questions: copyquestions})
	}
	
	renderQuestions(){
		let questionComponents = []
		for(let i = 0; i < this.state.questions.length; i++){
			if(this.state.questions[i].type === "DROPDOWN"){
				questionComponents.push(
					<DropdownQuestion
						
						/>
				)
			} else if (this.state.questions[i].type === "MULTISELECT"){
				questionComponents.push(
					<MultiselectQuestion
						
						/>
				)
			} else if (this.state.questions[i].type === "NUMBERLINE"){
			questionComponents.push(
					<NumberlineQuestion
						
						/>
				)
			} else if (this.state.questions[i].type === "TIMETABLE"){
				questionComponents.push(
					<TimetableQuestion
						
						/>
				)
			}
		}
		return questionComponents
	}
	
	removeQuestion(event){
		
	}
	
	addAnswer(event){
		
	}
	
	removeAnswer(event){
		
	}
	
	handleTextChange(event){
		
	}
	
	handleSelectChange(event){
		this.setState({
			
		})
	}
	
	publish(event){
		// the state layout is meant to closely match the format of the 
		// request
	}
	
	
	render(){
		return (
			<form onSubmit={this.publish}>
				<select value={this.state.DROPDOWN} 	
						onChange={this.handleSelectChange}>
					<option value="DROPDOWN">Dropdown</option>
					<option value="MULTISELECT">Multiselect</option>
					<option value="NUMBERLINE">Numberline</option>
					<option value="TIMETABLE">Timetable</option>
				</select>
				<div>
					{this.renderQuestions}
				</div>
				<input
					type="button"
					value="Add Question"
					onClick={this.addQuestion}
					/>
				<input
					type="submit"
					value="Publish"
					/>
				
			</form>
		)
	}
}