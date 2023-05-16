import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import "./Style.css"
import hives from '../assets/hives.png'
import Navbar from './Navbar.jsx';

export default class Register extends Login {
	//this technically means you could use the console to log in from register despite the button for it not existing
	//unintended, but doesnt affect security

	constructor() {
		super()
		this.state.confirmPassword = ''
		this.handleRegister = this.handleRegister.bind(this)
	}

	handleRegister = (event) => {
		//checks input validity then sends the post request
		event.preventDefault()
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({ errText: "Password and confirm password must match" })
			console.log('passwords don\'t match')
		} else if (!this.checkInputs(this.state.username, this.state.password)) {
			this.setState({ errText: "Invalid email or password, passwords must be between 8-32 characters long and consist of alphanumeric characters, spaces and .,-_!@#%$" })
		} else {
			axios.post("/api/v1/register", { email: this.state.username, password: this.state.password }).then(res => {
				if (res.status === 201) {
					//this auth token is stored globally and deleted at the end of the session
					document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
					window.location.replace("/LoginHomePage");
				} else if (res.status === 401) {
					this.setState({ errText: "Incorrect username or password" })
				} else {
					this.setState({ errText: "Server error" })
					console.log(res.status, res.data);
				}
			})
		}
	}

	//displaying 3 input fields and a button
	render() {
		return (
			<div class="grid">
				<div class="left-side">
					<img src={hives} alt="" />
				</div>
				<div class="right-side">
					< Navbar />
					<h1 class="welcomeText">Welcome</h1> <br />
					<h5 class="welcomeSubtext">Register to get started</h5>
					<form class="loginForm" onSubmit={this.handleRegister}>
						<p class="text">Email</p>
						<input
							class="inputBox"
							type="text"
							name="username"
							placeholder="honeybee@hivemind.net"
							value={this.state.username}
							onChange={this.handleTextChange}
							required /> <br />
						<p class="text">Password</p>
						<input
							class="inputBox"
							type="password"
							name="password"
							placeholder="Pick something secure!"
							value={this.state.password}
							onChange={this.handleTextChange}
							required /> <br /> <br />
						<input
							class="inputBox"
							type="password"
							name="confirmpassword"
							placeholder="Confirm password"
							value={this.state.confirmPassword}
							onChange={this.handleTextChange}
							required /> <br />
						<input class="loginButton" type="submit" value="Sign up" />
					</form>
					<p class="text">{this.state.errText}</p>
				</div>
			</ div>
		)
	}
}