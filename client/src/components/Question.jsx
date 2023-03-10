import React, { Component } from 'react';
import "./Style.css"
import QuestionText from './QuestionText'

/*Props must have:
	key: int to uniquely identify the question
	removeQuestion: funciton to remove this question from the list
	
*/
export default class Question extends Component{
	constructor(props){
		super(props)
		this.state = {
			id: props.id,
			title: "",
			explanation: "",
			matchMode: "SIMILAR",
		}
		
		this.handleTextChange = this.handleTextChange.bind(this)
		this.removeQuestion = props.removeQuestion.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		
	}
	
	handleSelectChange(event){
		this.setState({matchMode: event.target.value})
	}
	
	handleTextChange(event){
		if (event.target.name === "title"){
			this.setState({title: event.target.value})
		} else if (event.target.name === "explanation"){
			this.setState({explanation: event.target.value})
		}
	}
	
	// render isnt implemented because this class is meant to be abstract
}