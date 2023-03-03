import { useState, useEffect } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import hives from '../Assets/hives.png'
import Navbar from "./Navbar"


// expects code and token
function TeamProfile() {
    // stores availability as 2D array arr in calendar
    const [arr, setArr] = useState(Array(7).fill(0).map(row => new Array(13).fill(0)))
    // stores client input value in slider
    const [num, setNum] = useState(0)
    // stores client response in dropdown
    const [response, setResponse] = useState("")
    // stores selected options in multiselect
    const [selected, setSelected] = useState([])

    // get configOptions
    const configOptions = {
        "groupSizeRange": [1, 3],
        "questions": [{
            "type": "DROPDOWN",
            "explanation": "What year are you in?",
            "typeOptions": {
                "options": ["Year 1", "Year 2", "Year 3", "Year 4+"]
            }
        }, {
            "type": "MULTISELECT",
            "explanation": "What topics interest you?",
            "typeOptions": {
                "options": ["Data structures and algorithms", "Stats", "Cyber security", "Data science", "Software engineering", "Computer hardware", "Systems design"],
                "maxAllowed": 3,
            }
        }, {
            "type": "NUMBERLINE",
            "explanation": "What is your target grade?",
            "typeOptions": {
                "min": 0,
                "max": 100,
                "step": 0.5
            }
        }, {
            "type": "TIMETABLE",
            "typeOptions": {
                "maxAllowed": 10
            }
        }]
    }

    const rows = [];
    for (let i = 0; i < configOptions.questions.length; i++) {
        // calendar
        if (configOptions.questions[i].type === "TIMETABLE") {
            rows.push(<ClientCalendar maxAllowed={configOptions.questions[i].typeOptions.maxAllowed} arr={arr} setArr={setArr} />);
        }
        if (configOptions.questions[i].type === "DROPDOWN") {
            rows.push(<ClientDropdown options={configOptions.questions[i].typeOptions.options} response={response} setResponse={setResponse} explanation={configOptions.questions[i].explanation} />);
        }
        if (configOptions.questions[i].type === "MULTISELECT") {
            rows.push(<ClientMultiselect options={configOptions.questions[i].typeOptions.options} selected={selected} setSelected={setSelected} explanation={configOptions.questions[i].explanation} maxAllowed={configOptions.questions[i].typeOptions.maxAllowed} />);
        }
        if (configOptions.questions[i].type === "NUMBERLINE") {
            rows.push(<ClientSlider min={configOptions.questions[i].typeOptions.min} max={configOptions.questions[i].typeOptions.max} step={configOptions.questions[i].typeOptions.step} num={num} setNum={setNum} explanation={configOptions.questions[i].explanation} />);
        }
    }

    return (
        <div className="grid">
            <div class="left">
                <img src={hives}></img>
            </div>
            <div class="right">
                <Navbar />
                <tbody>{rows}</tbody>
            </div>

        </div>

    )

}
export default TeamProfile