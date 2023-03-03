import { useState } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"

function TeamProfile() {
    // stores availability as 2D array arr in calendar
    const [arr, setArr] = useState(Array(7).fill(0).map(row => new Array(13).fill(0)))
    // stores client input value in slider
    const [num, setNum] = useState(0)
    // stores client response in dropdown
    const [response, setResponse] = useState("")
    // stores selected options in multiselect
    const [selected, setSelected] = useState([])
    return (
        <div>
            {/* TODO: update maxAllowed*/}
            <ClientCalendar maxAllowed={3} arr={arr} setArr={setArr} />
            {/* TODO: update props accordingly */}
            <ClientSlider min={0} max={100} step={1} num={num} setNum={setNum} explanation={"Target grade"}/>
            {/* TODO: update */}
            <ClientDropdown options={["Option 1", "Option 2", "Option 3"]} required={true} response={response} setResponse={setResponse} explanation="What project topics interest you?"/>
            {/* TODO: update */}
            <ClientMultiselect options={["Option 1", "Option 2", "Option 3"]} required={true} selected={selected} setSelected={setSelected} explanation="Choose all that apply." maxAllowed={2}/>
        </div>
    )
}
export default TeamProfile