import "../styles/Style.css"
import Select from 'react-select'

// takes in options, maxAllowed, required, explanation, selected, setSelected, question
function ClientMultiselect(props) {

  const values = props.options.map(item => ({ value: item, label: item }))

  const handleChange = (e) => {
    let arr = []
    for (let i = 0; i < e.length; i++) {
      arr[i] = e[i].value
    }
    props.setSelected(arr)
  }

  return (
    <div>
      <h1 className="text">{props.question}</h1>
      <h1 className="text">{props.explanation}</h1>
      <Select
        className="multiselect"
        options={values}
        isMulti
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
            primary25: '#FFAF40',
            primary: 'black',
          },
        })}
        onChange={handleChange}
        // check maxAllowed
        isOptionDisabled={() => props.selected.length >= props.maxAllowed}
      />
    </div>

  )
} export default ClientMultiselect