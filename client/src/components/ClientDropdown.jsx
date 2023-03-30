import "./Style.css"
import Select from 'react-select'
import { useState } from "react"

// takes in options, required, response, setResponse, explanation, question
function ClientDropdown(props) {

  const values = props.options.map(item => ({ value: item, label: item }))
  // add a no preference option with value ""
  values.unshift({ vale: "", label: "Select..." })

  const handleChange = (e) => {
    (props.setResponse(e.value))
  }

  return (
    <div>
      <h1 className="text">{props.question}</h1><br/>
      <h1 className="text">{props.explanation}</h1>
      {/* Display options */}
      <Select
        onChange={handleChange}
        className="dropdown"
        options={values}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: '#FFAF40',
            borderRadius: '16px',
            boxShadow: 'none',
            "&:hover": {
              borderColor: "#FFAF40"
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: 'black',
            primary25: "#f8d6a5",
            primary: '#FFAF40',
          },
        })}
      />
    </div>
  )
} export default ClientDropdown