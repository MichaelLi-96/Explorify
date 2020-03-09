import React, { Component } from "react";
import '../assets/css/signUp.css';
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { songChange, songPress } from '../actions';
import { API_URL } from "../url"

class signUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmedPassword: "",
			name: ""
		}
	}

	signUp = () => {
		
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	handleConfirmedPasswordChange = (event) => {
		this.setState({ confirmedPassword: event.target.value });
	}

	handleNameChange = (event) => {
		this.setState({ name: event.target.value });
	}

  	render() {
	    return(
			<div id="signUp">
				<div id="signUpLogoContainer">
					<Link to="/">
						<img id="signUpLogo" alt="Explorify" src={logo} />
					</Link>
				</div>

				<div id="signUpTitle" className="noselect">Create an account!</div>
				<div id="signUpSubtitle" className="noselect">Get access to albums and songs from all your favorite artists.</div>
				<div id="signUpFormContainer">
					<div id="signUpErrorMessage">Error</div>
					<div id="signUpForm">
						<div className="signUpInputContainer">
					 		<div className="signUpFormLabel noselect">Email Address</div>
					 		<input type="email" id="emailAddress" className="signUpInput" autoComplete="off" maxLength={50}  onChange={this.handleEmailChange} />
						</div>

						<div className="signUpInputContainer">
					 		<div className="signUpFormLabel noselect">Password</div>
					 		<input type="password" id="password" className="signUpInput" autoComplete="off" maxLength={50}  onChange={this.handlePasswordChange} />
						</div>

						<div className="signUpInputContainer">
					 		<div className="signUpFormLabel noselect">Confirm Password</div>
					 		<input type="password" id="confirmedPassword" className="signUpInput" autoComplete="off" maxLength={50}  onChange={this.handleConfirmedPasswordChange} />
						</div>

						<div className="signUpInputContainer">
					 		<div className="signUpFormLabel noselect">Name</div>
					 		<input type="text" id="name" className="signUpInput" autoComplete="off" maxLength={50}  onChange={this.handleNameChange} />
						</div>

						<div id="signUpButton" className="noselect" onClick={this.signUp}>Sign Up</div>
					</div>
				</div>
				<div id="signUpRegisterContainer">
					<div id="signUpRegisterQuestion" className="noselect">Already have an account?</div>
					<Link to="/logIn" id="signUpRegister">Log in here</Link>
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
})(signUp);

