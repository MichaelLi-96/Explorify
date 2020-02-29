import React, { Component } from "react";
import '../assets/css/artistPreview.css';
import { MdInfo } from "react-icons/md";
import { Link } from "react-router-dom";

class ArtistPreview extends Component {
  	render() {
	    return(
			<div className="artistPreviewContainer">
				<img src={this.props.artistImageUrl} alt={this.props.artistName} className="artistPreviewImg"></img>
				<Link 
					className="artistPreviewIconContainer" 
					to={{
						pathname: `/artists/${this.props.artistName}`,
						state: {
							artist: this.props.artist
						}
					}}
				>
					<MdInfo className="artistPreviewMoreInfoIcon" />
				</Link>
				<div className="artistPreviewName">{this.props.artistName}</div>
			</div>
	    );
  	}
}

export default ArtistPreview;