import React from 'react';
import "./Style.css"

/* Necessary Props
	index:
	opt: 
	handleTextChange:
	removeOption:
*/
function Option(props){
	return ( 
		<div>
			<input
				type="text"
				id={props.id}
				key={props.id}
				name={"option"}
				placeholder="Answer"
				value={props.opt}
				onChange={props.handleOptionChange}
				required />
			<input
				type="button"
				value="Remove"
				onClick={() => props.removeOption(props.id, props.opt)}
				/>
		</div>
	)
}

/* Necessary props
	options:
	handleTextChange:
	removeOptions:
*/
export default function OptionTexts (props){
	let optionTexts = []
	
	for(let i=0; i < props.options.length; i++){
		optionTexts.push(
		<Option
			id={i}
			key={i}
			opt={props.options[i]} 
			handleOptionChange={props.handleOptionChange}
			removeOption={() => props.removeOption(i,props.options[i])}
			/>
		)
	}
	
	return optionTexts

}