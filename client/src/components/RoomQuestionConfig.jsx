import React, { Component } from 'react';
import axios from 'axios';
import "./Style.css"
import hives from '../Assets/hives.png'
import Title1 from '../Assets/Title1.png'
import Navbar from './Navbar';


export default class RoomQuestionConfig extends Component {
	
	render() {
		return (
			<div class="grid">
				<div class="left-side">
					<img src={hives}></img>
				</ div>
				<div class="right-side">
					< Navbar />
					<label> Specify some fields for attendees to match with</label>
					<QuestionList />
					
				</ div>
			</div>
		)
	}
}