import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
		}
		
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)

	}
	 
	//this updates the object state if any changes happen
	handleTextChange = (event) => {
		//this.setState({event,target.name:event.target.value});
	}
	
	
	handleLogin = (event) => {
		event.preventDefault()
		
        axios.post("/api/v1/login", {username:this.state.username, password:this.state.password}).then(res => {
            if (res.status == 200){
				//this auth token is stored globally and deleted at the end of the session
				document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
				// TODO add forwarding URL
				//window.location.replace("")
			} //else {}
			// TODO: error handling
        })
    }
	
	//displaying 2 input fields and a button
	render(){
		return (
			<div>
				<h1>Welcome Back</h1>
				Sign in to return where you left off
				<form onSubmit={this.handleLogin}>
					<input 
						type="text" 
						name="username" 
						placeholder="Email address" 
						value={this.state.username} 
						onChange={this.handleTextChange} 
						required />
					<input 
						type="password" 
						name="password" 
						placeholder="Password" 
						value={this.state.password} 
						onChange={this.handleTextChange} 
						required />
						<input type="submit" value="Sign In" />
				</form>
			</div>
		)
	}
}