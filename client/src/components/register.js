import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';

export default class Register extends Login{
	//this technically means you could use the console to log in from register despite the button for it not existing
	//unintended, but doesnt affect security

	constructor(){
		super()
		this.state.confirmPassword = '' 
		
		this.handleRegister = this.handleRegister.bind(this)

	}
	
	handleRegister = (event) => {
		//checks input validity then sends the post request
		
		event.preventDefault()
		if(this.state.password != this.state.confirmPassword) {
			this.setState({errText: "Password and confirm password must match"})
			console.log('passwords dont match')
		}else if(!this.checkInputs(this.state.username, this.state.password)) {
			this.setState({errText: "Invalid email or password, passwords must be between 8-32 characters long and consist of alphanumeric characters, spaces and .,-_!@#%$"})
		} else {
			axios.post("/api/v1/register", {username:this.state.username, password:this.state.password}).then(res => {
				if (res.status == 200){
					//this auth token is stored globally and deleted at the end of the session
					document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
					
					window.location.replace("")	
				} else if (res.status == 401) {
					this.setState({errText: "Incorrect username or password"})
				} else {
					this.setState({errText: "Server error"})
				}
			})
		}
    }
	
	//displaying 3 input fields and a button
	render() {
		return (
		<div>
			<h1>Welcome</h1>
			<form onSubmit={this.handleRegister}>
				<b>Email</b> <br/>
				<input 
					type="text" 
					name="username"
					placeholder="honeybee@hivemind.net" 
					value={this.state.username} 
					onChange={this.handleTextChange} 
					required /> <br/>
				<b>Password</b> <br/>
				<input 
					type="password"
					name="password"
					placeholder="Pick something secure!" 
					value={this.state.password} 
					onChange={this.handleTextChange} 
					required /> <br/>
				<input 
					type="password" 
					name="confirmpassword"
					placeholder="Confirm password" 
					value={this.state.confirmPassword} 
					onChange={this.handleTextChange} 
				required /> <br/>
				<input type="submit" value="Sign up" />
			</form>
			<p>{this.state.errText}</p>
		</ div>
		)
	}
}