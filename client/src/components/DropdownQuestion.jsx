import React from 'react';
import "./Style.css"
import QuestionText from './QuestionText'
import OptionTexts from './OptionTexts'
import Question from './Question'

/* Necessary props are same as parent class
*/
export default class DropdownQuestion extends Question {
	constructor(props) {
		super(props)

		this.state.type = "DROPDOWN"
		this.state.required = false
		this.state.options = []

		this.removeOption = this.removeOption.bind(this)
		this.addOption = this.addOption.bind(this)
		this.changeRequired = this.changeRequired.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
	}

	handleOptionChange(event) {
		let i = event.target.id
		let newOptions = this.state.options.map((x) => x)
		newOptions[i] = event.target.value
		this.setState({ options: newOptions })
	}

	addOption() {
		let newOptions = this.state.options.map((x) => x)
		newOptions.push("")
		this.setState({ options: newOptions })
	}

	removeOption(index) {
		let newOptions = this.state.options.map((x) => x)
		this.setState({
			options: newOptions.slice(0, index).concat(newOptions.slice(index + 1))
		})
	}

	changeRequired(event) {
		this.setState({
			required: event.target.checked
		})
	}

	render() {
		return (
			<div className='border'>
				<QuestionText
					id={this.state.id}
					title={this.state.title}
					explanation={this.state.explanation}
					handleTextChange={this.handleTextChange}
					removeQuestion={this.removeQuestion}
					matchMode={this.state.matchMode}
					selectMode={this.handleSelectChange}
					priority={this.state.priority}
					changePriority={this.changePriority}
				/>
				<OptionTexts
					options={this.state.options}
					handleOptionChange={this.handleOptionChange}
					removeOption={this.removeOption}
				/>
				<input
					type="button"
					className="small_button"
					value="Add Answer"
					onClick={this.addOption}
				/> <br />
				<label className="text">Required</label>
				<input
					type="checkbox"
					checked={this.state.required}
					onChange={this.changeRequired}
				/>

			</div>
		)
	}
}