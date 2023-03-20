import { Component } from 'react';
import "./Style.css"

/*Props must have:
	key: int to uniquely identify the question
	removeQuestion: funciton to remove this question from the list
*/
export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			title: "",
			explanation: "",
			matchMode: "SIMILAR",
			priority: "1"
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.removeQuestion = props.removeQuestion;
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.changePriority = this.changePriority.bind(this);
	}

	updateParentState() {
		const parent = this.props.parent;
		const questionDataCopy = parent.state.questionData.map(x => x);
		questionDataCopy[this.state.id] = this.state;
		parent.setState({ questionData: questionDataCopy });
	}

	handleSelectChange(event) {
		this.setState({ matchMode: event.target.value });
		this.updateParentState();
	}

	handleTextChange(event) {
		if (event.target.name === "title") {
			this.setState({ title: event.target.value });
		} else if (event.target.name === "explanation") {
			this.setState({ explanation: event.target.value });
		}
		this.updateParentState();
	}

	changePriority(event) {
		this.setState({ priority: event.target.value });
		this.updateParentState();
	}

	// render isnt implemented because this class is meant to be abstract
}