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
		this.removeQuestion = props.removeQuestion
		this.handleSelectChange = this.handleSelectChange.bind(this)
		
	}
	updateInput(){
		if (this.state.type == "DROPDOWN"){
			this.state.index = this.props.addQuestionInput({
				type : this.state.type,
				title :this.state.title,
				explanation : this.state.explanation,
				matchMode : this.state.matchMode,
				priority: 0,
				typeOptions: { options : this.state.options,
					required : this.state.required 
				}
			}, this.state.index)
		}
		else if(this.state.type == "MULTISELECT")
		{
		this.state.index = this.props.addQuestionInput({
			type : this.state.type,
			title :this.state.title,
			explanation : this.state.explanation,
			matchMode : this.state.matchMode,
			priority: 0,
			typeOptions: { 
				options : this.state.min,
				maxAllowed: this.state.max,
				required : this.state.required 
			}
		}, this.state.index)}
		else if (this.state.type == "NUMBERLINE"){
			this.state.index = this.props.addQuestionInput({
				type : this.state.type,
				title :this.state.title,
				explanation : this.state.explanation,
				matchMode : this.state.matchMode,
				priority: 0,
				typeOptions: { 
					min : this.state.options,
					max: this.state.maxAllowed,
					step : this.state.step
				}
			}, this.state.index)


		}

	}

	handleSelectChange(event){
		this.setState({matchMode: event.target.value})
	}
	
	handleTextChange(event){
		if (event.target.name === "title"){
			this.setState({title: event.target.value})
			this.updateInput()
		} else if (event.target.name === "explanation"){
			this.setState({explanation: event.target.value})
			this.updateInput()
		}
	}
	
	// render isnt implemented because this class is meant to be abstract
}