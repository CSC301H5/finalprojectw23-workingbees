import { useState } from "react"
import "./Style.css"


// takes in max, min, step
function ClientSlider(props) {
    const min = props.min
    const max = props.max
    const step = props.step
    const num = props.num
    const setNum = props.setNum

    const handleChange = (e) => {setNum(e.target.value)}

    return (
        <div>
            <h1 className="text">Target grade</h1>
            <label className="text" style={{color: "#FFAF40", fontSize: "13px" }}>{min}%</label>
            <input
                className="slider"
                type='range'
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
            />
            <label className="text" style={{color: "#FFAF40", fontSize: "13px", marginRight: "50px"}}>{max}%</label>
            <label className="text" style={{color: "#FFAF40", fontSize: "24px", fontWeight: "light"}}>{num}%</label>
        </div>
    )
} export default ClientSlider