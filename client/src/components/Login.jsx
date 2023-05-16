import React, { Component } from 'react';
import axios from 'axios';
import "../styles/Style.css"
import hives from '../assets/hives.png'
import Navbar from './Navbar';

export default class Login extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			errText: '',
		}

		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)

	}

	errText = (props) => {
		return (<div><p>{props.text}</p></div>)
	}

	checkInputs = (username, password) => {
		// checks username and password formatting
		// emails have to follow tstandard email formatting
		// passwords are 8-32 chars long, and alphanumeric  plus .,-_!@#%$ and spaces
		const emailexp = /^[\w.-_]+@\w+\.\w+$/
		const pwexp = /^[\w.,-_!@#%$ ]{8,32}$/


		return (emailexp.test(username) && pwexp.test(password))
	}

	// this updates the object state if any changes happen
	handleTextChange = (event) => {
		if (event.target.name === "username") {
			this.setState({ username: event.target.value });
		} else if (event.target.name === "password") {
			this.setState({ password: event.target.value });
		} else if (event.target.name === "confirmpassword") {
			this.setState({ confirmPassword: event.target.value });
		}
	}

	handleLogin = (event) => {
		// checks inputs, then sends the request,
		// on success saves the token as a cookie, then forwards to the logged in homepage
		// failure at any point prints an error

		event.preventDefault()

		if (!this.checkInputs(this.state.username, this.state.password)) {
			this.setState({ errText: "Invalid email or password, passwords must be between 8-32 characters long and consist of alphanumeric characters, spaces and .,-_!@#%$" })
		} else {
			axios.post("/api/v1/login", { email: this.state.username, password: this.state.password }).then(res => {
				if (res.status === 200) {
					//this auth token is stored globally and deleted at the end of the session
					document.cookie = "x-auth-token=" + res.data.token + "; SameSite=Lax "
					console.log(res.data.token)
					window.location.replace("/loginHomePage");
				} else if (res.status === 401) {
					this.setState({ errText: "Incorrect username or password" })
				} else {
					this.setState({ errText: "Server error" })
				}
			})
		}
	}

	//displaying 2 input fields and a button
	render() {
		return (
			<div class="grid">
				<div class="left-side">
					<img src={hives} alt="" />
				</ div>
				<div class="right-side">
					< Navbar />
					<h1 class="welcomeBackText">Welcome Back</h1>
					<h5 class="welcomeBackSubtext">Sign in to return where you left off</h5>
					<form class="loginForm" onSubmit={this.handleLogin}>
						<input
							class="inputBox"
							type="text"
							name="username"
							placeholder="Email address"
							value={this.state.username}
							onChange={this.handleTextChange}
							required />
						<br />
						<br />
						<input
							class="inputBox"
							type="password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleTextChange}
							required />
						<br />

						<input class="loginButton" type="submit" value="Sign In" />
					</form>
					<p class="text">{this.state.errText}</p>
				</ div>
			</div>
		)
	}
}