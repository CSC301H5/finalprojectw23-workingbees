import "./Style.css"
import QuestionText from './QuestionText'
import Question from './Question'

/* Necessary props: same as parent
*/

export default class TimetableQuestion extends Question {
	constructor(props) {
		super(props);
		this.state.type = "TIMETABLE";
		this.state.maxAllowed = 6;

		this.handleNumberChange = this.handleNumberChange.bind(this);
	}

	handleNumberChange(event) {
		this.setState({ maxAllowed: event.target.value });
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
					<label className="text">
						Maximum number of 1-hour blocks allowed:
					</label>
					<input
						type="number"
						className="tinyInputBox"
						value={this.state.maxAllowed}
						onChange={this.handleNumberChange}
						required /> <br />
				</div>
			</div>
		)
	}
}
