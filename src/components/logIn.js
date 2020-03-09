import React, { Component } from "react";
import '../assets/css/logIn.css';
import axios from "axios";
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { songChange, songPress } from '../actions';

class logIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		}
	}

	logIn = () => {

	}

	demoLogIn = () => {

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
	currentSong: state.currentSong  
});

export default connect(mapStateToProps, { 
	songChange,
	songPress
})(logIn);

