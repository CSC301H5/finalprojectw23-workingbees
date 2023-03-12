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


	constructor(){
		super()
		this.state = {
			questions: [],
			selectedType: "DROPDOWN",
			nextKey: 0,
			hiveName: "df",
			displayName:"fdfdf"

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
		
		
		//const hiveName = location.state.hiveName;
		//const displayName = location.state.displayName;
		console.log('submit¬¬')
		const token =  getCookie('x-auth-token');
		
        axios.post("/api/v1/createHive",
            {
                profilePicture: "sldkcndlkcns",
                hiveName: this.hiveName,
                displayName: this.displayName,
                configOptions: "{}"
                /*
                UNCOMMENT FOR FUTURE SPRINTS (ROOM CONFIG)
                joinDate: this.state.joinDate,
                joinTime: this.state.joinTime,
                profileDate: this.state.profileDate,
                profileTime: this.state.profileTime,
                classDate: this.state.classDate,
                classTime: this.state.classTime
                */
            }, {
            headers: {
                'x-auth-token': token
            }
        }
        ).then(res => {
            if (res.status === 200) {
              //  navigate('/waiting1', { state: { code: res.data.code, token: token } })
            }
        })
		
	}
	
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