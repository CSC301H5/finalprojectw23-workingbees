import React from 'react';
import "../styles/Style.css"
import QuestionText from './QuestionText'
import OptionTexts from './OptionTexts'
import Question from './Question'

/* Necessary props are same as parent class
*/
export default class DropdownQuestion extends Question {

	constructor(props) {
		super(props);
		this.state.type = "DROPDOWN";
		this.state.typeOptions = { required: false, options: [] };

		this.removeOption = this.removeOption.bind(this);
		this.addOption = this.addOption.bind(this);
		this.changeRequired = this.changeRequired.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleOptionChange(event) {
		let i = event.target.id;
		this.setState(function (state) {
			let newOptions = state.typeOptions.options.map((x) => x);
			newOptions[i] = event.target.value;
			return {
				typeOptions: {
					required: state.typeOptions.required,
					options: newOptions,
				}
			}
		})
		this.updateParentState();
	}

	addOption() {
		this.setState((state) => ({
			typeOptions: {
				required: state.typeOptions.required,
				options: [...state.typeOptions.options, ""]
			}
		}));
		this.updateParentState();
	}

	removeOption(index) {
		this.setState((state) => ({
			typeOptions: {
				required: state.typeOptions.required,
				options: state.typeOptions.options.slice(0, index).concat(state.typeOptions.options.slice(index + 1))
			}
		}));
		this.updateParentState();
	}

	changeRequired(event) {
		this.setState((state) => ({
			typeOptions: {
				required: event.target.checked,
				options: state.typeOptions.options
			}
		}));
		this.updateParentState();
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
					options={this.state.typeOptions.options}
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
					checked={this.state.typeOptions.required}
					onChange={this.changeRequired}
				/>
			</div>
		)
	}
}