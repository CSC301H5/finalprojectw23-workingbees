import { useState, useEffect } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"
import PhaseTimer from './PhaseTimer';
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import Navbar from "./Navbar"
import hives from '../assets/hives.png'


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
    const [configOptions, setConfigOptions] = useState({
        questions: [
            {
                type: "DROPDOWN",
                title: "Meow",
                explanation: "There is no explanation, only banana",
                matchMode: "SIMILAR",
                priority: 4,
                typeOptions: {
                    options: ["apple", "potato"],
                    required: false
                }
            }]
    })

    const location = useLocation();
    const navigate = useNavigate();

    const token = location.state.token;
    const hiveID = location.state.hiveID;
    const code = location.state.code;

    // get configOptions
    async function getConfigOptions() {
        axios.get("/api/v1/getRoomConfigOptions",
            {
                params: {
                    hiveID: hiveID
                },
                headers: {
                    'x-auth-token': token
                }
            }).then(res => {
                if (res.status === 200) {
                    setConfigOptions(res.data.questions)
                }
            })
    }
    useEffect(() => {
        getConfigOptions();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/v1/submitRoomConfigOptions",
            {
                hiveID: hiveID,
                responses: userResponses
            }, {
            headers: {
                'x-auth-token': token
            }
        }
        ).then(res => {
            if (res.status === 200) {
                navigate('/waitingP1Attendee', { state: { token: token, hiveID: hiveID, code: code } })
            }
        })
    }

    // stores user responses to be sent
    const userResponses = [];


    const rows = [];
    for (let i = 0; i < (configOptions.length); i++) {
        // calendar
        if (configOptions[i].type === "TIMETABLE") {
            rows.push(<span key={i}><ClientCalendar maxAllowed={configOptions[i].typeOptions.maxAllowed} arr={arr} setArr={setArr} explanation={configOptions[i].explanation} question={configOptions[i].title} /></span>);
            userResponses.push(arr);
        }
        if (configOptions[i].type === "DROPDOWN") {
            rows.push(<span key={i}><ClientDropdown options={configOptions[i].typeOptions.options} response={response} setResponse={setResponse} explanation={configOptions[i].explanation} question={configOptions[i].title} /></span>);
            userResponses.push(response);
        }
        if (configOptions[i].type === "MULTISELECT") {
            rows.push(<span key={i}><ClientMultiselect options={configOptions[i].typeOptions.options} selected={selected} setSelected={setSelected} explanation={configOptions[i].explanation} maxAllowed={configOptions[i].typeOptions.maxAllowed} question={configOptions[i].title} /></span>);
            userResponses.push(selected);
        }
        if (configOptions[i].type === "NUMBERLINE") {
            rows.push(<span key={i}><ClientSlider min={configOptions[i].typeOptions.min} max={configOptions[i].typeOptions.max} step={configOptions[i].typeOptions.step} num={num} setNum={setNum} explanation={configOptions[i].explanation} question={configOptions[i].title} /></span>);
            userResponses.push(num);
        }
    }


    return (
        <div className="grid">
            <div class="left">
                <img src={hives} alt="" />
            </div>
            <div class="right">
                <Navbar roomCode={code} token={token} >
                    <PhaseTimer token={token} hiveID={hiveID} />
                </Navbar>
                <div className="config" style={{ overflow: "auto", maxHeight: "70vh" }}>
                    <tbody>{rows}</tbody>
                </div>
                <button type="submit" className="continue" style={{ cursor: 'pointer' }} onClick={handleSubmit}>Continue</button>
            </div>
        </div>
    )
}

export default TeamProfile