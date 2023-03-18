import { useState, useEffect } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import Navbar from "./Navbar"
import hives from '../Assets/hives.png'


// expects code, token, and hiveID 
function TeamProfile() {
    // stores availability as 2D array arr in calendar
    const [arr, setArr] = useState(Array(7).fill(0).map(row => new Array(24).fill(0)))
    // stores client input value in slider
    const [num, setNum] = useState(0)
    // stores client response in dropdown
    const [response, setResponse] = useState("")
    // stores selected options in multiselect
    const [selected, setSelected] = useState([])
    // stores configOptions
    //const [configOptions, setConfigOptions] = useState('')

    const location = useLocation();
    const navigate = useNavigate();

    const configOptions =  {
        groupSizeRange: [1, 4],
        questions: [
            {
                type: "DROPDOWN",
                title: "Meow",
                explanation: "Select one",
                matchMode: "SIMILAR",
                priority: 4,
                typeOptions: {
                    options: ["A", "B", "C", "D"],
                    required: false
                }
            },
            {
                type: "MULTISELECT",
                title: "Multi-Meow",
                explanation: "Select one or more (max 2)",
                matchMode: "SIMILAR",
                priority: 3,
                typeOptions: {
                    options: ["A", "B", "C", "D"],
                    maxAllowed: 2,
                    required: false
                }
            },
            {
                type: "NUMBERLINE",
                title: "Number-Meow",
                explanation: "Choose a value",
                matchMode: "SIMILAR",
                priority: 2,
                typeOptions: {
                    min: 0,
                    max: 100,
                    step: 0.5
                }
            },
            {
                type: "TIMETABLE",
                title: "Number-Meow",
                explanation: "Availability (max 5)",
                matchMode: "SIMILAR",
                priority: 2,
                typeOptions: {
                    maxAllowed: 5
                }
            }
    ]
    }

/*
    // get configOptions
    async function getConfigOptions() {
        axios.get("/api/v1/getRoomConfigOptions",
            {
                params: {
                    code: location.state.code
                },
                headers: {
                    'x-auth-token': location.state.token
                }
            }).then(res => {
                if (res.status === 200) {
                    setConfigOptions(res.data.configOptions)
                }
            })
    }
    useEffect(() => {
        getConfigOptions();
    }, [])
*/
    const handleSubmit = e => {

        e.preventDefault();
        axios.post("/api/v1/submitRoomConfigOptions",
            {
                hiveID: location.state.hiveID,
                configOptionsResponse: {
                    responses: userResponses
                }
            }, {
            headers: {
                'x-auth-token': location.state.token
            }
        }
        ).then(res => {
            if (res.status === 200) {
                // redirect
            }
        })
    }

    // stores user responses to be sent
    const userResponses = [];

    const handleSubmit = e => {

        e.preventDefault();
        axios.post("/api/v1/submitRoomConfigOptions",
            {
                hiveID: location.state.hiveID,
                configOptionsResponse: {
                    responses: userResponses
                }
            }, {
            headers: {
                'x-auth-token': location.state.token
            }
        }
        ).then(res => {
            if (res.status === 200) {
                // redirect
            }
        })
    }

    // stores user responses to be sent
    const userResponses = [];

    const rows = [];
    for (let i = 0; i < configOptions.questions.length; i++) {
        // calendar
        if (configOptions.questions[i].type === "TIMETABLE") {
            rows.push(<ClientCalendar maxAllowed={configOptions.questions[i].typeOptions.maxAllowed} arr={arr} setArr={setArr} />);
            userResponses.push(arr);
        }
        if (configOptions.questions[i].type === "DROPDOWN") {
            rows.push(<ClientDropdown options={configOptions.questions[i].typeOptions.options} response={response} setResponse={setResponse} explanation={configOptions.questions[i].explanation} />);
            userResponses.push(response);
        }
        if (configOptions.questions[i].type === "MULTISELECT") {
            rows.push(<ClientMultiselect options={configOptions.questions[i].typeOptions.options} selected={selected} setSelected={setSelected} explanation={configOptions.questions[i].explanation} maxAllowed={configOptions.questions[i].typeOptions.maxAllowed} />);
            userResponses.push(selected);
        }
        if (configOptions.questions[i].type === "NUMBERLINE") {
            rows.push(<ClientSlider min={configOptions.questions[i].typeOptions.min} max={configOptions.questions[i].typeOptions.max} step={configOptions.questions[i].typeOptions.step} num={num} setNum={setNum} explanation={configOptions.questions[i].explanation} />);
            userResponses.push(num);
        }
    }

    return (
        <div className="grid">
            <div class="left">
                <img src={hives}></img>
            </div>
            <div class="right">
                <Navbar roomCode={location.state.code} token={location.state.token} />
                <div style={{ overflow: "auto", maxHeight: "70vh" }}>
                    <tbody>{rows}</tbody>
                </div>
                <button type="submit" className="continue" style={{ cursor: 'pointer' }} onClick={handleSubmit}>Continue</button>
            </div>
        </div>
    )

}
export default TeamProfile