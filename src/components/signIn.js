import React, { Component } from "react";
import '../assets/css/signIn.css';
import logo from "../assets/images/logo.png";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';
import { API_URL } from "../url"

class signIn extends Component {
  	render() {
	    return(
			<div id="signIn">
				
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
})(signIn);

