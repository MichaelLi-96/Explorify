import React, { Component } from "react";
import '../assets/css/landingPage.css';
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';
import { API_URL } from "../url"

class landingPage extends Component {
  	render() {
	    return(
			<div id="landingPage">
				<div id="landingPageLogoTitleContainer">
					<img id="landingPageLogo" className="noselect" alt="Explorify" src={logo} />
					<div id="landingPageTitle" className="noselect">Explorify</div>
				</div>
				<div id="landingPageLogInButton" className="noselect">Log In</div>
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

