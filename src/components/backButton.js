import React, { Component } from "react";
import '../assets/css/backButton.css';
import { IoIosArrowBack } from "react-icons/io";

class BackButton extends Component {
  	render() {
	    return(
			<IoIosArrowBack id="playlistAlbumBackButton" onClick={() => this.props.history.goBack()} />
	    );
  	}
}

export default BackButton;