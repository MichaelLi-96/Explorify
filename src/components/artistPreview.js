import React, { Component } from "react";
import '../assets/css/artistPreview.css';
import { MdInfo } from "react-icons/md";

class ArtistPreview extends Component {
  	render() {
	    return(
			<div className="artistPreviewContainer">
				<img src={this.props.artistImageUrl} alt={this.props.artistName} className="artistPreviewImg"></img>
				<div className="artistPreviewIconContainer"><MdInfo className="artistPreviewMoreInfoIcon" /></div>
				<div className="artistPreviewName">{this.props.artistName}</div>
			</div>
	    );
  	}
}

export default ArtistPreview;