import React, { Component } from "react";
import '../assets/css/artistPreview.css';
import { MdInfo } from "react-icons/md";

class ArtistPreview extends Component {
  	render() {
	    return(
			<div className="artistContainer">
				<div className="artistImg"></div>
				<div className="artistIconContainer"><MdInfo className="moreInfoIcon" /></div>
				<div className="artistName">{this.props.artistName}</div>
			</div>
	    );
  	}
}

export default ArtistPreview;