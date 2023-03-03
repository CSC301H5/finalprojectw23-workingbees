import "./Style.css"
import QuestionText from './QuestionText'
import AnswerTexts from "./AnswerTexts"

/* Necessary props:
    index: index in the list of questions
    question: question text
    options, maxAllowed, required: multiselect parameters
    handleTextChange: function to change state in parent
    removeQuestion: function to remove element from parent state list
    setRequired: function to change state in parent
*/
export default function MultiselectQuestion(props) {
    return (
        <div>
            <QuestionText
                index={props.index}
                question={props.question}
                handleTextChange={props.handleTextChange}
                removeQuestion={props.removeQuestion}
            />
            <label>Options:</label>
            <AnswerTexts
                index={props.index}
                answers={props.answers}
                handleTextChange={props.handleTextChange}
                removeAnswer={props.removeAnswer}
            />
            <input
                type="button"
                name={"addanswer-" + props.index}
                value="Add Answer"
                onClick={props.addAnswer}
            /> <br />
            <label>Maximum number of options allowed:</label>
            <input
                type="number"
                name={"max-" + props.index}
                value={props.max}
                onChange={props.handleTextChange}
                required /> <br />
            <label>Required?</label>
            <select
				name={"required-" + props.index}
				onChange={props.setRequired}
				value={props.required}
				placeholder="Required">
				<option>Yes</option>
				<option>No</option>
			</select> <br />
        </div>
    )
}