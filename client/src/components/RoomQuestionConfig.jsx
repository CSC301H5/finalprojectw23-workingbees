import React, { Component } from 'react';
import "./Style.css"
import hives from '../Assets/hives.png'
import Navbar from './Navbar';
import QuestionList from './QuestionList'


export default class RoomQuestionConfig extends Component {
	
	render() {
		return (
			<div class="grid">
				<div class="left-side">
					<img src={hives}></img>
				</ div>
				<div class="right-side">
					< Navbar />
					<div style={{
						position: "absolute",
						left: "796px",
						top: "147px"
					}}>
						<label className="subtitle"> 
							Specify some fields for attendees to match with
						</label>
						<QuestionList />
					</div>
				</ div>
			</div>
		)
	}
}