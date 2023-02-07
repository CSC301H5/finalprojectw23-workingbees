import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Login{
	//this technically means you could use the console to log in from register despite the button for it not existing
	//unintended, but doesnt affect security

	constructor(props){
		super(props)
		this.state.confirmPassword = '' 
		
		this.handleRegister = this.handleRegister.bind(this)

	}
	
	handleRegister = () => {
		event.preventDefault()
		
		if(this.state.password == this.state.confirmPassword) {
			axios.post("/api/v1/register", {username:this.state.username, password:this.state.password}).then(res => {
				if (res.status == 200){
					this.state.jwt = res.data.token
				} //else {}
				// TODO: error handling
			})
		} //else: 
    }
	
	//displaying 3 input fields and a button
	render(){
		<form onSubmit={handleLoginButtonClick}>
			<input 
				type="text" 
				name="username"
				placeholder="username" 
				value={this.state.username} 
				onChange={this.handleTextChange} 
				required />
			<input 
				type="password"
				name="password"
				placeholder="password" 
				value={this.state.password} 
				onChange={this.handleTextChange} 
				required />
			<input 
			type="password" 
			placeholder="Confirm password" 
			value={this.state.confirmPassword} 
			onChange={this.handleTextChange} 
			required />
			<input type="submit" value="Sign up" />
		</form>
	}
}