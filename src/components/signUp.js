import React, { Component } from "react";
import '../assets/css/signUp.css';
import axios from "axios";
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { userRegistered } from '../actions';
import { API_URL } from "../url"

class SignUp extends Component {
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
		const errorMsg = document.getElementById("signUpErrorMessage");
		if(!this.state.email.trim().includes("@")) {
			errorMsg.innerHTML = "Please enter a valid email address.";
			errorMsg.style.display = "flex";
		}
		else if(this.state.password.length < 8) {
			errorMsg.innerHTML = "Passwords must be a minimum of 8 characters.";
			errorMsg.style.display = "flex";
		}
		else if(this.state.password !== this.state.confirmedPassword) {
			errorMsg.innerHTML = "Passwords do not match.";
			errorMsg.style.display = "flex";
		}
		else if(this.state.name.trim() === ""){
			errorMsg.innerHTML = "Name cannot be blank.";
			errorMsg.style.display = "flex";
		}
		else {
			errorMsg.style.display = "none";
			axios.post(`${API_URL}/users/add`, {
				email: this.state.email.trim(),
				password: this.state.password,
				name: this.state.name.trim()
			})
		  	.then((response) => {
		  		const jwt = response.data.token;
		  		axios.post(`${API_URL}/auth/decodeJwt`, {
		  			token: jwt
		  		})
			  	.then((response) => {
			  		const userId = response.data.userId;

			  		axios.post(`${API_URL}/albumPlaylists/add`, {
						name: "Liked Songs",
						isAlbum: false,
						imageUrl: "https://explorify.s3-us-west-1.amazonaws.com/likedSongsImg.jpg",
						artist: "",
						year: "",
						songs: []
					})
				  	.then((response) => {
				  		const albumPlaylistId = response.data.albumPlaylist._id;
				  		const albumPlaylistsWithLikedSongsId = [];
				  		albumPlaylistsWithLikedSongsId.push(albumPlaylistId);

				  		axios.put(`${API_URL}/users/update/${userId}`, {
							email: this.state.email.trim(),
							password: this.state.password,
							name: this.state.name.trim(),
							albumPlaylists: albumPlaylistsWithLikedSongsId
						})
					  	.then((response) => {
					  		axios.get(`${API_URL}/users/${userId}`)
						  	.then((response) => {
						  		const userObject = response.data;
						  		this.props.userRegistered({
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
					<div id="signUpErrorMessage"></div>
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

});

export default connect(mapStateToProps, { 
	userRegistered
})(SignUp);
