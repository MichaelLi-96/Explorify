import React, { Component } from "react";
import '../assets/css/logIn.css';
import axios from "axios";
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { userLoggedIn } from '../actions';
import { API_URL } from "../url"

class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			demoButtonClicked: false
		}
	}

	logIn = () => {
		if(!this.state.demoButtonClicked) {
			const errorMsg = document.getElementById("logInErrorMessage");
			if(this.state.email.trim() === "") {
				errorMsg.innerHTML = "Email address cannot be blank.";
				errorMsg.style.display = "flex";
			}
			else if(this.state.password === "") {
				errorMsg.innerHTML = "Password cannot be blank.";
				errorMsg.style.display = "flex";
			}
			else {
				errorMsg.style.display = "none";
				axios.post(`${API_URL}/auth/login`, {
					email: this.state.email,
					password: this.state.password
				})
			  	.then((response) => {
			  		const jwt = response.data.token;
			  		axios.post(`${API_URL}/auth/decodeJwt`, {
			  			token: jwt
			  		})
				  	.then((response) => {
				  		const userId = response.data.userId;
				  		
				  		axios.get(`${API_URL}/users/${userId}`)
					  	.then((response) => {
					  		const userObject = response.data;
					  		this.props.userLoggedIn({
					  			token: jwt,
					  			user: userObject
					  		})
					  		this.props.history.push("/");
					  	})
					  	.catch(function (error) {
					  		console.log(error);
					  	});
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});
			  	})
			  	.catch((error) => {
			  		errorMsg.innerHTML = error.response.data.msg;
					errorMsg.style.display = "flex";
				});
			}
		}
	}

	demoLogIn = () => {
		if(!this.state.demoButtonClicked) {
			const errorMsg = document.getElementById("logInErrorMessage");
			errorMsg.style.display = "none";
			this.setState({ demoButtonClicked: true });

			const registerHereLink = document.getElementById("logInRegister");
			registerHereLink.style.pointerEvents = "none";

			let i = 0;
			const demoEmailAddress = "DemoUser@demo.com";
			const emailAddressInput = document.getElementById("emailAddress");
			emailAddressInput.value = "";

			function emailAddressWriter() {
			  if (i < demoEmailAddress.length) {
			    emailAddressInput.value += demoEmailAddress.charAt(i);
			    i++;
			    setTimeout(emailAddressWriter, 100);
			  }
			}

			emailAddressWriter();

			let j = 0;
			const demoPassword = "demoPassword";
			const passwordInput = document.getElementById("password");
			passwordInput.value = "";

			function passwordWriter() {
			  if (j < demoPassword.length) {
			    passwordInput.value += demoPassword.charAt(j);
			    j++;
			    setTimeout(passwordWriter, 100);
			  }
			}
			setTimeout(() => { passwordWriter() }, 2100);

			setTimeout(() => {
				axios.post(`${API_URL}/auth/login`, {
					email: "DemoUser@demo.com",
					password: "demoPassword"
				})
			  	.then((response) => {
			  		const jwt = response.data.token;
			  		axios.post(`${API_URL}/auth/decodeJwt`, {
			  			token: jwt
			  		})
				  	.then((response) => {
				  		const userId = response.data.userId;
				  		
				  		axios.get(`${API_URL}/users/${userId}`)
					  	.then((response) => {
					  		const userObject = response.data;
					  		this.props.userLoggedIn({
					  			token: jwt,
					  			user: userObject
					  		})
					  		this.props.history.push("/");
					  	})
					  	.catch(function (error) {
					  		console.log(error);
					  	});
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});
			  	})
			  	.catch((error) => {
			  		errorMsg.innerHTML = error.response.data.msg;
					errorMsg.style.display = "flex";
				});
			}, 3900);

		}
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

  	render() {
	    return(
			<div id="logIn">
				<div id="logInLogoContainer">
					<Link to="/">
						<img id="logInLogo" alt="Explorify" src={logo} />
					</Link>
				</div>

				<div id="logInTitle" className="noselect">Welcome back!</div>
				<div id="logInSubtitle" className="noselect">Start listening to all your favorite songs and playlists.</div>
				<div id="logInFormContainer">
					<div id="logInErrorMessage">Error</div>
					<div id="logInForm">
						<div className="logInInputContainer">
					 		<div className="logInFormLabel noselect">Email Address</div>
					 		<input type="email" id="emailAddress" className="logInInput" autoComplete="off" maxLength={50}  onChange={this.handleEmailChange} />
						</div>

						<div className="logInInputContainer">
					 		<div className="logInFormLabel noselect">Password</div>
					 		<input type="password" id="password" className="logInInput" autoComplete="off" maxLength={50}  onChange={this.handlePasswordChange} />
						</div>
						<div id="logInButton" className="noselect" onClick={this.logIn}>Log In</div>
					</div>
					<div id="logInDivider">
						<div className="logInDividerLine" />
						<div id="logInOr" className="noselect">OR</div>
						<div className="logInDividerLine" />
					</div>
					<div id="logInDemoButton" className="noselect" onClick={this.demoLogIn}>Demo Log In</div>
				</div>
				<div id="logInRegisterContainer">
					<div id="logInRegisterQuestion" className="noselect">Don't have an account?</div>
					<Link to="/signUp" id="logInRegister">Register here</Link>
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 

});

export default connect(mapStateToProps, { 
	userLoggedIn
})(LogIn);

