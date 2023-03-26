import React, { Component } from 'react';
import axios from 'axios';
import "./Style.css"
import NumberlineQuestion from './NumberlineQuestion'
import DropdownQuestion from './DropdownQuestion'
import MultiselectQuestion from './MultiselectQuestion'
import TimetableQuestion from './TimetableQuestion'
// assumes token, profilePicture, hiveName, displayName, navigateFunction, navigatePath are given
export default class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			questionData: [],
			selectedType: "DROPDOWN",
			nextKey: 0
		}

		this.addQuestion = this.addQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.publish = this.publish.bind(this);
	}

	addQuestion(event) {
		// need to make a copy to prevent concurrency issues
		let copyquestions = this.state.questions.map(x => x);
		let copyquestionsdata = this.state.questions.map(x => x);
		let k = this.state.nextKey;
		this.setState({ nextKey: k + 1 });
		let newQuestion;

		if (this.state.selectedType === "DROPDOWN") {
			newQuestion = <DropdownQuestion
				id={k}
				key={k}
				removeQuestion={this.removeQuestion}
				parent={this}
			/>
		} else if (this.state.selectedType === "MULTISELECT") {
			newQuestion = <MultiselectQuestion
				id={k}
				key={k}
				removeQuestion={this.removeQuestion}
				parent={this}
			/>
		} else if (this.state.selectedType === "NUMBERLINE") {
			newQuestion = <NumberlineQuestion
				id={k}
				key={k}
				removeQuestion={this.removeQuestion}
				parent={this}
			/>
		} else if (this.state.selectedType === "TIMETABLE") {
			newQuestion = <TimetableQuestion
				id={k}
				key={k}
				removeQuestion={this.removeQuestion}
				parent={this}
			/>
		}

		copyquestions.push(newQuestion);
		copyquestionsdata.push({});
		this.setState({ questions: copyquestions });
	}

	removeQuestion(id) {
		let i = 0;
		while (i < this.state.questions.length && parseInt(this.state.questions[i].key) !== id) {
			i++;
		}

		if (i < this.state.questions.length) {
			let newQuestions = this.state.questions.slice(0, i).concat(this.state.questions.slice(i + 1));
			this.setState({ questions: newQuestions });
		}
	}

	handleSelectChange(event) {
		this.setState({
			selectedType: event.target.value
		});
	}

	publish(event) {
		event.preventDefault();
		axios.post("/api/v1/createHive",
			{
				profilePicture: this.props.profilePicture,
				hiveName: this.props.hiveName,
				displayName: this.props.displayName,
				configOptions: {
					groupSizeRange: [1, 4],
					phaseChangeDates: [null, null],
					questions: this.state.questionData
				}

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
				'x-auth-token': this.props.token
			}
		}).then(res => {
			if (res.status === 200) {
				this.props.navigateFunction(this.props.navigatePath, { state: { code: res.data.code, token: this.props.token, hiveID: res.data.hiveID } });
			}
		})
	}

	render() {
		return (
			<form onSubmit={this.publish}
				style={{ width: '550px' }}>
				<select value={this.state.selectedType}
					onChange={this.handleSelectChange}
					className="smallInputBox">
					<option value="DROPDOWN">Dropdown</option>
					<option value="MULTISELECT">Multiselect</option>
					<option value="NUMBERLINE">Numberline</option>
					<option value="TIMETABLE">Timetable</option>
				</select>
				<div className="questionList">
					{this.state.questions}
				</div>
				<input
					type="button"
					value="Add Question"
					onClick={this.addQuestion}
					className="secondaryButton"
				/>
				<input
					type="submit"
					value="Publish"
					className="loginButton"
				/>
			</form>
		)
	}

}