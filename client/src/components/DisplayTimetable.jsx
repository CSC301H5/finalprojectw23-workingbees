import "../styles/Style.css"
import ScheduleSelector from 'react-schedule-selector';
import { useEffect, useState } from "react";

// takes in a 2D array called arr representing availability
function DisplayTimetable(props) {
    /* sample arr
    const arr = [ // 12am -> 11pm                  // Q4
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sunday
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Monday
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Tuesday			
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Wednesday
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Thursday
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Friday		
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Saturday
    ]
    */

    const [schedule, setSchedule] = useState([])

    const dates = ["Sun Feb 26 2023 ", "Mon Feb 27 2023 ", "Tue Feb 28 2023 ", "Wed Mar 01 2023 ",
        "Thu Mar 02 2023 ", "Fri Mar 03 2023 ", "Sat Mar 04 2023 "]

    // loop through arr to set schedule (convert to dates)
    // date format: Wed Mar 01 2023 14:00
    async function convertToDate() {
        for (let i = 0; i < props.arr.length; i++) {
            for (let j = 0; j < props.arr[i].length; j++) {
                if (props.arr[i][j] === 1) {
                    let date = dates[i]
                    let time = String(j) + ":00"
                    setSchedule((prevSchedule) =>
                        [...prevSchedule, (date + time)]
                    )
                }
            }
        }
    }
    useEffect(() => {
        convertToDate();
    }, [])

    const handleChange = (e) => {

    }

    return (
        <div className="schedule" style={{ paddingLeft: "50px" }}>
            <h1 className="text">Availability: </h1>
            <ScheduleSelector
                selection={schedule}
                onChange={handleChange}
                startDate={new Date('Sun Feb 26 2023')}
                dateFormat="ddd"
                minTime={0}
                maxTime={24}
                selectedColor={"#FFAF40"}
                unselectedColor={"#dbd9d9"}
                hoveredColor={"#f8d6a5"}
            />
        </div>
    )
}

export default DisplayTimetable