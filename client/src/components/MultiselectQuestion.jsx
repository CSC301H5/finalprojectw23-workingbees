import "./Style.css"
import QuestionText from './QuestionText'
import OptionTexts from "./OptionTexts"
import DropdownQuestion from './DropdownQuestion'

/* Necessary props same as parent
*/

export default class MultiselectQuestion extends DropdownQuestion {
	constructor(props){
		super(props)
	
		this.state.type = "MULTISELECT"
		this.state.maxAllowed = 0
		
		this.changeMaxAllowed = this.changeMaxAllowed.bind(this)
	}
	
	changeMaxAllowed(event){
		this.setState({maxAllowed: event.target.value})
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
					/> <br />
					
				<label>Maximum number of selected options</label>
				<input 
					type="number"
					value={this.state.maxAllowed}
					onChange={this.changeMaxAllowed}
					required />
				
			</div>
		)
	}
}