import React, { Component } from 'react';
import "./Style.css"

// Assumes props.left and props.right are other components
export default class SplitPaneH extends Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return 
			<div class="grid">
				<div class="left">
					{props.left}	
				</ div>
				<div class="right">
					{props.right}
				</ div>
			</div>
		
	}
}