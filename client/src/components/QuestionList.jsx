import React, { Component } from 'react';
import "./Style.css"
import NumberlineQuestion from './NumberlineQuestion'
import DropdownQuestion from './DropdownQuestion'
import MultiselectQuestion from './MultiselectQuestion'
import TimetableQuestion from './TimetableQuestion'
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import getCookie from "../utils/getAuthToken.js"


export default class QuestionList extends Component{
	


	constructor(props){
		super(props)
		this.questionsInput = []; 
		this.state = {
			questions: [],
			selectedType: "DROPDOWN",
			nextKey: 0,

		}
		
		/*console.log(this.props.displayName, "#########displayName###########");
		console.log(this.props.token, "#########token###########");
		console.log(this.props.joinDate, "#########joinDate###########");
		console.log(this.props.profileDate, "#########profileDate###########");
		console.log(this.props.joinTime, "#########joinTime###########");
		console.log(this.props.profileTime, "#########profileTime###########");
		console.log(this.props.classDate, "#########classDate###########");
		console.log(questions, "#########questions###########");
	
		console.log(this.props.groupSizeMax, "#########groupSizeMax###########");
		console.log(this.props.groupSizeMin, "#########groupSizeMin###########");
		*/
		this.addQuestion = this.addQuestion.bind(this)
		this.removeQuestion = this.removeQuestion.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.publish = this.publish.bind(this)
		
	}
 
	addQuestionInput = (question, i ) =>  {
		if ( i == null){
			i = this.questionsInput.length;
			console.log( "Before ", question, i );
			this.questionsInput[i] = question;
		//this.questionsInput.push(question); // update the array
		console.log(this.questionsInput, "should have new question : ", question);
		console.log("index assign : ", i )
		}
		else {
			this.questionsInput[i] = question;
		}
		console.log(this.questionsInput); // verify that the array has been updated
		
		return i
	  }

	removeQuestionInput =(i)=>{
		console.log("removeQuestionInput : ", i)
		this.questionsInput[i] = null
	  }
	

	removeOptionInput =(i, v)=>{
		console.log("v in removeOptionInput", v)
		console.log("removeOptionInput",this.questionsInput[i])
		Object.entries(this.questionsInput[i]["typeOptions"]["options"]).forEach(([key, value]) => {
			console.log(key + ": " + value);
			if (value == v){
					console.log( v , "found targert ");
					delete this.questionsInput[i]["typeOptions"]["options"][key]
				}
			  }); }
	  
	removeNullInput =()=>{
        console.log("Yes null: ", this.questionsInput )
		this.questionsInput = this.questionsInput.filter(question => question!=null)
		console.log("No null: ", this.questionsInput )
		

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
							addQuestionInput={this.addQuestionInput}
							removeQuestionInput={this.removeQuestionInput}
							removeOptionInput={this.removeOptionInput}
							
							/>
			
			console.log()
		} else if (this.state.selectedType === "MULTISELECT") {
			newQuestion = <MultiselectQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							addQuestionInput={this.addQuestionInput}
							removeQuestionInput={this.removeQuestionInput}
							removeOptionInput={this.removeOptionInput}
							/>

		} else if (this.state.selectedType === "NUMBERLINE") {
			newQuestion = <NumberlineQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion}
							addQuestionInput={this.addQuestionInput}
							removeQuestionInput={this.removeQuestionInput}
							removeOptionInput={this.removeOptionInput}
							/>							


		} else if (this.state.selectedType === "TIMETABLE") {
			newQuestion = <TimetableQuestion
							id={k}
							key={k}
							removeQuestion={this.removeQuestion} 
							addQuestionInput={this.addQuestionInput}
							removeQuestionInput={this.removeQuestionInput}
							removeOptionInput={this.removeOptionInput}
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
		event.preventDefault()
		console.log(this.props.displayName, "#########displayName###########");
		//const hiveName = location.state.hiveName;
		//const displayName = location.state.displayName;

		this.removeNullInput();
		const token =  getCookie('x-auth-token');
		console.log('this.props.hiveName ', this.props.hiveName)
		console.log('this.props.displayName ', this.props.displayName)
		console.log('token', token)
		console.log('this.props.groupSizeMin', this.props.groupSize)
		console.log('this.props.groupSizeMax', this.props.groupSize)
		console.log('this.questionsInput', this.questionsInput)
		console.log("this.state.questions", this.state.questions)
			axios.post("/api/v1/createHive",
			{
				profilePicture: "sldkcndlkcns",
                hiveName: this.props.hiveName,
                displayName: this.props.displayName,
                configOptions: {  "groupSizeRange": [this.props.groupSizeMin, this.props.groupSizeMax], 
				phaseChangeDates: [this.props.joinDate, this.props.joinTime , this.props.profileDate, this.props.profileTime,this.props.classTime,this.props.classDate],
				questions: this.questionsInput
				
			
			}
			}, {
				headers: {
					'x-auth-token': token
				}
			}
			).then(res => {
				if (res.status == 200) {
					//let navigate = useNavigate();
					console.log("200 works")
					//navigate('/waiting1', { state: { code: res.data.code, token: token } })
					console.log(res.data.code , "Room code ")
					console.log(res.data.hiveID, "HiveID")
				}
				else{
					console.log(token, "token ")
					console.log(res.status)
				}
			})
	
	
	}
	/*questions: [{ type:"MULTISELECT", title:"sheesh",
				explanation:"boom",
				  matchMode:"NONE",
				  priority: 4,
				  typeOptions: {options: ["option1", "option2"],
				maxAllowed: 3,
				required: false}  }]*/
	
	render() {
		return (
			<form onSubmit={this.publish}>
				<select value={this.state.SelectedType} 	
						onChange={this.handleSelectChange}>
					<option value="DROPDOWN">Dropdown</option>
					<option value="MULTISELECT">Multiselect</option>
					<option value="NUMBERLINE">Numberline</option>
					<option value="TIMETABLE">Timetable</option>
				</select>
				<div>
					{this.state.questions}
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