import "./Style.css"
import QuestionText from './QuestionText'

/* Necessary props:
    index: index in the list of questions
    question: question text
    maxAllowed: maximum number of 1-hour blocks that can be selected
    handleTextChange: function to change state in parent
    removeQuestion: function to remove element from parent state list
*/

export default function CalendarQuestion(props) {
    return (
        <div>
            <QuestionText
                index={props.index}
                question={props.question}
                handleTextChange={props.handleTextChange}
                removeQuestion={props.removeQuestion}
            />
            <div>
                <label>
                    Maximum number of 1-hour blocks allowed:
                </label>
                <input
                    type="number"
                    name="max"
                    onChange={props.handleTextChange}
                    required
                />
            </div>
        </div>
    )
}
