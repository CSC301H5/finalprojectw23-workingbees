import "../styles/Style.css"
import ScheduleSelector from 'react-schedule-selector';
import { useEffect, useState } from "react";

// takes in maxAllowed, question, and explanation
function ClientCalendar(props) {
    const maxAllowed = props.maxAllowed
    const setArr = props.setArr
    const [schedule, setSchedule] = useState([])
    // 2D array to store availability where 0 = F and 1 = T
    // Sunday = 0, Saturday = 6
    // 9am = 0, 9pm = 12
    const dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const times = Array(24).fill().map((item, idx) => String(idx))

    const setArray = (e) => {
        // loop through e and update arr
        let newArr = Array(7).fill(0).map(row => new Array(24).fill(0))
        for (let i=0; i<e.length; i++) {
            let date = String(e[i]).slice(0, 3)
            let time = String(e[i]).slice(16, 18)
            if (time[0]==='0') {
                time = time.slice(1,2)
            }
            newArr[dates.indexOf(date)][times.indexOf(time)] = 1
        }
        {props.setArr((prevArr) => newArr)}
    }

    const handleChange = (e) => {
        if ((e.length > maxAllowed) && ((schedule !== e))) {
        } else {
            setSchedule(e)
            setArray(e)
        }
    }

    useEffect(() => {
        // this hook will get called every time schedule has changed
    }, [schedule])

    return (
        <div className="schedule">
            <label className="text">{props.question}</label> <br />
            <label className="text">{props.explanation}</label>
            <ScheduleSelector
                selection={schedule}
                onChange={handleChange}
                selectedColor={"#FFAF40"}
                hoveredColor={"#f8d6a5"}
                unselectedColor={"#dbd9d9"}
                startDate={new Date('Sun Feb 26 2023')}
                dateFormat="ddd"
                minTime={0}
                maxTime={24}
            />
        </div>
    )
}
export default ClientCalendar