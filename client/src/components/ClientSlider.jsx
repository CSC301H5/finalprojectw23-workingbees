import { useState } from "react"
import "./Style.css"


// takes in max, min, step, num (target grade), setNum, and explanation
function ClientSlider(props) {
    const min = props.min
    const max = props.max
    const step = props.step
    const num = props.num
    const setNum = props.setNum
    const explanation = props.explanation

<<<<<<< HEAD

    const handleChange = (e) => { setNum(e.target.value) }

=======
    const handleChange = (e) => { setNum(e.target.value) }
>>>>>>> S2-24

    return (
        <div>
            <h1 className="text">{explanation}</h1>
            <label className="text" style={{ color: "#FFAF40", fontSize: "13px" }}>{min}%</label>
<<<<<<< HEAD

=======
>>>>>>> S2-24
            <input
                className="slider"
                type='range'
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
            />
            <label className="text" style={{ color: "#FFAF40", fontSize: "13px", marginRight: "50px" }}>{max}%</label>
            <label className="text" style={{ color: "#FFAF40", fontSize: "24px", fontWeight: "light" }}>{num}%</label>
<<<<<<< HEAD

=======
>>>>>>> S2-24
        </div>
    )
} export default ClientSlider