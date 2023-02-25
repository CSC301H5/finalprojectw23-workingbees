import React, { Component } from 'react';
import "./Style.css"

// Assumes props.top and props.bottom are other components
export default class SplitPaneV extends Component{
	constructor(props){
		super(props)
	}
	
	render(){
		<div class="grid">
			<div>
				{props.top}	
			</ div>
			<div>
				{props.bottom}
			</ div>
		</div>	
	}
}