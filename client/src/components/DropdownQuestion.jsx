import React, { Component } from 'react';
import "./Style.css"
import QuestionText from './QuestionText'
import OptionTexts from './OptionTexts'
import Question from './Question'

/* Necessary props are same as parent class
*/
export default class DropdownQuestion extends Question {
	constructor(props){
		super(props)
	
		this.state.type = "DROPDOWN"
		this.state.required = false
		this.state.options = []
		
		this.state.index = null
		this.removeOption = this.removeOption.bind(this)
		this.addOption = this.addOption.bind(this)
		this.changeRequired = this.changeRequired.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)

		
	}
	
	handleOptionChange(event){
		let i = event.target.id
		let newOptions = this.state.options.map((x) => x)
		newOptions[i] = event.target.value
		this.setState({options: newOptions})
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
			typeOptions: { options : this.state.options,
				maxAllowed: this.state.maxAllowed,
				required : this.state.required 
			}
		}, this.state.index)
	}
		
		//console.log( "this.state.default ",this.state.default)
		console.log( "this.state.index ",this.state.index)


		
	}
	
	addOption(){
		let newOptions = this.state.options.map((x) => x)
		newOptions.push("")
		this.setState({options: newOptions})
		
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
			typeOptions: { options : this.state.options,
				maxAllowed: this.state.maxAllowed,
				required : this.state.required 
			}
		}, this.state.index)
	}
		console.log( "this.state.default ",this.state.default)
		console.log( "this.state.index ",this.state.index)
	}
	
	removeOption(i, opt){
		let newOptions = this.state.options.map((x) => x)
		this.setState({
			
			options: newOptions.slice(0, i).concat(newOptions.slice(i+1))
		})

	    this.props.removeOptionInput(this.state.index, opt)


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
			typeOptions: { options : this.state.options,
				maxAllowed: this.state.maxAllowed,
				required : this.state.required 
			}
		}, this.state.index)
	}
		console.log( "this.state.default",this.state.default)
	}
	
	changeRequired(event){
		this.setState({
			required: event.target.checked
		})
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
			typeOptions: { options : this.state.options,
				maxAllowed: this.state.maxAllowed,
				required : this.state.required 
			}
		}, this.state.index)
	}
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
					removeQuestionInput={this.props.removeQuestionInput}
					/>
				<OptionTexts
					options={this.state.options}
					handleOptionChange={this.handleOptionChange}
					removeOption={this.removeOption}
					/>
				<input
					type="button"
					value="Add Answer"
					onClick={this.addOption}
					/> <br />
				<label>Required</label>
				<input 
					type="checkbox"
					checked={this.state.required}
					onChange={this.changeRequired}
					/>
				
			</div>
		)
	}
}