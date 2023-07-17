import React from 'react';
import "../styles/Style.css"
import QuestionText from './QuestionText'
import Question from './Question'
/* Necessary props: same as parent
*/
export default class NumberlineQuestion extends Question {
	constructor(props) {
		super(props);
		this.state.type = "NUMBERLINE";
		this.state.typeOptions = { min: 0, max: 100, step: 5 };

		this.handleNumberChange = this.handleNumberChange.bind(this);
	}

	handleNumberChange(event) {
		let t = event.target.name;

		this.setState(function (state) {
			let min = state.typeOptions.min;
			let max = state.typeOptions.max;
			let step = state.typeOptions.step;
			if (t === "min") {
				return { typeOptions: { min: parseInt(event.target.value), max: max, step: step } };
			} else if (t === "max") {
				return { typeOptions: { min: min, max: parseInt(event.target.value), step: step } };
			} else if (t === "step") {
				return { typeOptions: { min: min, max: max, step: parseInt(event.target.value) } };
			}
		})

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
				<div>
					<label className="text">Start: </label>
					<input
						type="number"
						className="tinyInputBox"
						name={"min"}
						value={this.state.typeOptions.min}
						onChange={this.handleNumberChange}
						required /> <br />
					<label className="text">Stop: </label>
					<input
						type="number"
						className="tinyInputBox"
						name={"max"}
						value={this.state.typeOptions.max}
						onChange={this.handleNumberChange}
						required /> <br />
					<label className="text">Increment: </label>
					<input
						type="number"
						className="tinyInputBox"
						name={"step"}
						value={this.state.typeOptions.step}
						onChange={this.handleNumberChange}
						required />
				</div>
			</div>
		)
	}
}
