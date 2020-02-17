import React, { Component } from "react";
import '../assets/css/artistPreview.css';
import { MdInfo } from "react-icons/md";

class ArtistPreview extends Component {
  	render() {
	    return(
			<div className="artistPreviewContainer">
				<div className="artistPreviewImg"></div>
				<div className="artistPreviewIconContainer"><MdInfo className="artistPreviewMoreInfoIcon" /></div>
				<div className="artistPreviewName">{this.props.artistName}</div>
			</div>
	    );
  	}
}

export default ArtistPreview;