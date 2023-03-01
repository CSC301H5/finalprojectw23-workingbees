import { useState } from "react"
import ClientCalendar from "./ClientCalendar"

function TeamProfile() {
    // stores availability as 2D array arr
    const [arr, setArr] = useState(Array(7).fill(0).map(row => new Array(13).fill(0)))
    return (
        <div>
            {/* TODO: update maxAllowed*/}
            <ClientCalendar maxAllowed={3} arr={arr} setArr={setArr} />
        </div>
    )
}
export default TeamProfile