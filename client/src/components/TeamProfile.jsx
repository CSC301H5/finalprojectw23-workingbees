import { useState, useEffect } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';


// expects code and token
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
    const [configOptions, setConfigOptions] = useState('')

    const location = useLocation();
    const navigate = useNavigate();

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
                if (res.status == 200) {
                    setConfigOptions(res.data.configOptions)
                    console.log("200 get ")
                }
                else {
                    console.log("GGG ")
                }
            })
    }
    useEffect(() => {
        getConfigOptions();
    }, [])

    const rows = [];
    console.log("configOptions ",configOptions)
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

    return <tbody>{rows}</tbody>;

}
export default TeamProfile
