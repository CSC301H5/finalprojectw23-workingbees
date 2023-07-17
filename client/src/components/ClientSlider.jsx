import "../styles/Style.css"

// takes in max, min, step, num (target grade), setNum, question, and explanation
function ClientSlider(props) {
    const min = props.min
    const max = props.max
    const step = props.step
    const num = props.num
    const setNum = props.setNum
    const explanation = props.explanation

    const handleChange = (e) => { setNum(parseInt(e.target.value)) }

    return (
        <div>
            <label className="question" style={{ fontSize: "16px", marginRight: "50px", fontFamily: "Montserrat" }}>{props.question}</label>
            <label className="text" style={{ fontSize: "16px", marginRight: "50px", fontFamily: "Montserrat" }}>{explanation}</label>
            <label className="text" style={{ color: "#FFAF40", fontSize: "24px", fontWeight: "light" }}>{num}%</label> <br />
            <label className="text" style={{ color: "#FFAF40", fontSize: "13px" }}>{min}%</label>
            <input
                className="slider"
                type='range'
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                style={{ marginBottom: "14px" }}
            />
            <label className="text" style={{ color: "#FFAF40", fontSize: "13px", marginRight: "50px" }}>{max}%</label>
        </div>
    )
}

export default ClientSlider