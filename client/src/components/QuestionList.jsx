import React, { Component } from 'react';
import "./Style.css"
import NumberlineQuestion from './NumberlineQuestion'
import DropdownQuestion from './DropdownQuestion'
import MultiselectQuestion from './MultiselectQuestion'
import CalendarQuestion from './CalendarQuestion'

export default class AddQuestionList{
	constructor(){
		this.state = {
			questions: [],
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
		let newTypeOptions
		
		if (this.state.selectedType === "DROPDOWN"){
			newTypeOptions = {
				options: [],
				required: false
			}
		} else if (this.state.selectedType === "MULTISELECT") {
			newTypeOptions = {
				options: [],
				maxAllowed: 0,
				required: false
			}
			
		} else if (this.state.selectedType === "NUMBERLINE") {
			newTypeOptions = {
				min: 0,
				max: 0,
				step: 0,
			}
			
		} else if (this.state.selectedType === "TIMETABLE") {
			newTypeOptions = {
				maxAllowed: 0
			}
		}
		
		let newQuestion = {
			type: this.state.selectedType,
			title: "",
			explanation: "",
			matchmode: "NONE",
			typeOptions: newTypeOptions
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
						index={i}
						question={this.state.questions[i].title}
						explanation={this.state.questions[i].explanation}
						start={this.state.questions[i].typeOptions.min}
						stop={this.state.questions[i].typeOptions.max}
						increment={this.state.questions[i].typeOptions.step}
						handleTextChange={this.handleTextChange}
						removeQuestion={this.removeQuestion}
						addAnswer={this.addAnswer}
						removeAnswer={this.removeAnswer}
						/>
				)
			} else if (this.state.questions[i].type === "MULTISELECT"){
				questionComponents.push(
					<MultiselectQuestion
						index={i}
						question={this.state.questions[i].title}
						explanation={this.state.questions[i].explanation}
						start={this.state.questions[i].typeOptions.min}
						stop={this.state.questions[i].typeOptions.max}
						increment={this.state.questions[i].typeOptions.step}
						handleTextChange={this.handleTextChange}
						removeQuestion={this.removeQuestion}
						addAnswer={this.addAnswer}
						removeAnswer={this.removeAnswer}
						/>
				)
			} else if (this.state.questions[i].type === "NUMBERLINE"){
			questionComponents.push(
					<NumberlineQuestion
						index={i}
						question={this.state.questions[i].title}
						explanation={this.state.questions[i].explanation}
						start={this.state.questions[i].typeOptions.min}
						stop={this.state.questions[i].typeOptions.max}
						increment={this.state.questions[i].typeOptions.step}
						handleTextChange={this.handleTextChange}
						removeQuestion={this.removeQuestion}
						/>
				)
			} else if (this.state.questions[i].type === "TIMETABLE"){
				questionComponents.push(
					<TimetableQuestion
						index={i}
						question={this.state.questions[i].title}
						explanation={this.state.questions[i].explanation}
						start={this.state.questions[i].typeOptions.min}
						stop={this.state.questions[i].typeOptions.max}
						increment={this.state.questions[i].typeOptions.step}
						handleTextChange={this.handleTextChange}
						removeQuestion={this.removeQuestion}
						/>
				)
			}
		}
		return questionComponents
	}
	
	removeQuestion(event){
		// the button triggering the event will have the question index in its name
		let index = parseInt(event.target.name.split('-')[1])
		let newQuestions = this.state.questions.slice(0, index).concat(this.state.questions.slice(index+1)) 
		this.setState({questions: newQuestions})
		
	}
	
	addAnswer(event){
		// the button triggering the event will have the question index in its name
		let index = parseInt(event.target.name.split('-')[1])  
	}
	
	removeAnswer(event){
		// the button triggering the event will have the question and answer indexes in its name
		let questionIndex = parseInt(event.target.name.split('-')[1])
		let answerIndex =  parseInt(event.target.name.split('-')[2])
		let newTypeOptions = {
			options: this.state.questions[questionIndex].typeOptions.options.slice(0, answerIndex).concat(this.state.questions[questionIndex].typeOptions.options.slice(answerIndex+1)),
			required:  this.state.questions[questionIndex].typeOptions.required
		}
		if(this.state.questions[questionIndex].type === "MULTISELECT"){
			newTypeOptions.maxAllowed = this.state.questions[questionIndex].typeOptions.maxAllowed
		} 
		let newQuestion = {
			type: this.state.question[questionIndex].type.slice(),
			title: this.state.question[questionIndex].title.slice(),
			explanation: this.state.question[questionIndex].explanation.slice(),
			matchmode: this.state.question[questionIndex].matchmode.slice(),
			typeOptions: newTypeOptions
		}
		let copyQuestions= this.state.questions.map(x=>x)	
		copyQuestions[questionIndex] = newQuestion
		this.setState({questions: copyQuestions})
	}
	
	handleTextChange(event){
		let indexes = event.target.name.split('-')
		let newTypeOptions
		
		if(this.state.questions[indexes[1]].type === "MULTISELECT"){
			newTypeOptions= {
				maxAllowed: this.state.questions[indexes[1]].typeOptions.maxAllowed,
				required: this.state.questions[indexes[1]].typeOptions.required,
				options: this.state.questions[indexes[1]].typeOptions.options.slice()
			}
		} else if (this.state.questions[indexes[1]].type === "DROPDOWN"){
			newTypeOptions= {
				required: this.state.questions[indexes[1]].typeOptions.required ,
				options: this.state.questions[indexes[1]].typeOptions.options.slice()
			}
		} else if(this.state.questions[indexes[1]].type === "NUMBERLINE"){
			newTypeOptions= {
				min: this.state.questions[indexes[1]].typeOptions.min,
				max:this.state.questions[indexes[1]].typeOptions.max,
				step:this.state.questions[indexes[1]].typeOptions.step
			}
		} else if (this.state.questions[indexes[1]].type === "TIMETABLE"){
			newTypeOptions= {
				maxAllowed: this.state.questions[indexes[1]].typeOptions.maxAllowed
			}
		}
		let newQuestion = {
			type: this.state.question[indexes[1]].type.slice(),
			title: this.state.question[indexes[1]].title.slice(),
			explanation: this.state.question[indexes[1]].explanation.slice(),
			matchmode: this.state.question[indexes[1]].matchmode.slice(),
			matchmode: this.state.question[indexes[1]].matchmode.slice(),
			typeOptions: newTypeOptions
		}
		if(indexes[0] === "question"){
			newQuestion.title = event.target.value
		} else if ((indexes[0] === "answer")){
			newQuestion.typeOptions.options[indexes[1]] = event.target.value
		} else if (indexes[0] === "start"){
			newQuestion.typeOptions.min = event.target.value
		} else if (indexes[0] === "stop"){
			newQuestion.typeOptions.max = event.target.value
		} else if (indexes[0] === "increment"){
			newQuestion.typeOption.step = event.target.value
		} else if (indexes[0] === "max"){
			newQuestion.typeOption.MaxAllowed = event.target.value
		}
		
		let copyQuestions= this.state.questions.map(x=>x)	
		copyQuestions[indexes[1]] = newQuestion
		this.setState({questions: copyQuestions})
	}
	
	handleSelectChange(event){
		this.setState({
			selectType: event.target.value
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