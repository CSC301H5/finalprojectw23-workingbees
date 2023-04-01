import "./Style.css"
import QuestionText from './QuestionText'
import OptionTexts from "./OptionTexts"
import DropdownQuestion from './DropdownQuestion'

/* Necessary props same as parent
*/

export default class MultiselectQuestion extends DropdownQuestion {
    constructor(props) {
        super(props);

        this.state.type = "MULTISELECT";
        this.state.typeOptions.maxAllowed = 0;

        this.changeMaxAllowed = this.changeMaxAllowed.bind(this);
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
                    maxAllowed: state.typeOptions.maxAllowed
                }
            }
        })
        this.updateParentState();
    }

    addOption() {
        this.setState((state) => ({
            typeOptions: {
                required: state.typeOptions.required,
                options: [...state.typeOptions.options, ""],
                maxAllowed: state.typeOptions.maxAllowed
            }
        }));
        this.updateParentState();
    }

    removeOption(index) {
        this.setState((state) => ({
            typeOptions: {
                required: state.typeOptions.required,
                options: state.typeOptions.options.slice(0, index).concat(state.typeOptions.options.slice(index + 1)),
                maxAllowed: state.typeOptions.maxAllowed
            }
        }));
        this.updateParentState();
    }

    changeRequired(event) {
        this.setState((state) => ({
            typeOptions: {
                required: event.target.checked,
                options: state.typeOptions.options,
                maxAllowed: state.typeOptions.maxAllowed
            }
        }));
        this.updateParentState();
    }

    changeMaxAllowed(event) {
        this.setState((state) => ({
            typeOptions: {
                required: state.typeOptions.required,
                options: state.typeOptions.options,
                maxAllowed: parseInt(event.target.value)
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
                /> <br />

                <label className="text">Maximum number of selected options: </label>
                <input
                    type="number"
                    className="tinyInputBox"
                    value={this.state.typeOptions.maxAllowed}
                    onChange={this.changeMaxAllowed}
                    required />

            </div>
        )
    }
}