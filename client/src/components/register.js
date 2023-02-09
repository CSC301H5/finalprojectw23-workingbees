import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';

export default class Register extends Login{
	//this technically means you could use the console to log in from register despite the button for it not existing
	//unintended, but doesnt affect security

	constructor(props){
		super(props)
		this.state.confirmPassword = '' 
		
		this.handleRegister = this.handleRegister.bind(this)

	}
	
	handleRegister = (event) => {
		event.preventDefault()
		
		if(this.state.password == this.state.confirmPassword) {
			axios.post("/api/v1/register", {username:this.state.username, password:this.state.password}).then(res => {
				if (res.status == 200){
					//this auth token is stored globally and deleted at the end of the session
					document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
					// TODO add forwarding URL
					//window.location.replace("")	
				} //else {}
				// TODO: error handling
			})
		} //else: 
    }
	
	//displaying 3 input fields and a button
	render(){
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
		</ div>
		)
	}
}