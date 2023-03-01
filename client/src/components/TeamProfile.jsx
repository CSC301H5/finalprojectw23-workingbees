import { useState } from "react"
import ClientCalendar from "./ClientCalendar"
import ClientSlider from "./ClientSlider"

function TeamProfile() {
    // stores availability as 2D array arr
    const [arr, setArr] = useState(Array(7).fill(0).map(row => new Array(13).fill(0)))
    const [num, setNum] = useState(0)
    return (
        <div>
            {/* TODO: update maxAllowed*/}
            <ClientCalendar maxAllowed={3} arr={arr} setArr={setArr} />
            {/* TODO: update props accordingly */}
            <ClientSlider min={0} max={100} step={1} num={num} setNum={setNum} explanation={"Target grade"}/>
        </div>
    )
}
export default TeamProfile