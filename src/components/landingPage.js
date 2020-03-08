import React, { Component } from "react";
import '../assets/css/landingPage.css';
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';
import { API_URL } from "../url"

class landingPage extends Component {
  	render() {
	    return(
			<div id="landingPage">
				<div id="landingPageLogoTitleContainer">
					<img id="landingPageLogo" className="noselect" alt="Explorify" src={logo} />
					<div id="landingPageTitlesContainer">
						<div id="landingPageTitle" className="noselect">Explorify</div>
						<div id="landingPageSubtitle" className="noselect">All your music in one place.</div>
					</div>
				</div>
				<NavLink exact id="landingPageLogInButton" to="/signIn">Sign In</NavLink>
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
})(landingPage);

