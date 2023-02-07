import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			jwt: ''
		}
		
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)

	}
	
	//this updates the object state if any changes happen
	handleTextChange = (event) => {
		this.setState({event.target.name:event.target.value})
	}
	
	
	handleLogin = () => {
		event.preventDefault()
		
        axios.post("/api/v1/login", {username:this.state.username, password:this.state.password}).then(res => {
            if (res.status == 200){
				this.setState({jwt:res.data.token})
			} //else {}
			// TODO: error handling
        })
    }
	
	//displaying 2 input fields and a button
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
				name= placeholder="password" 
				value={this.state.password} 
				onChange={this.handeTextChange} 
				required />
			<input type="submit" value="Log In" />
		</form>
	}
}