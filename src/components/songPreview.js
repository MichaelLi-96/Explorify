import React, { Component } from "react";
import '../assets/css/songPreview.css';
import { MdPlayCircleOutline } from "react-icons/md";

class SongPreview extends Component {
  	render() {
	    return(
			<div className="songContainer">
				<div className="songImg"></div>
				<div className="playSongIconContainer"><MdPlayCircleOutline className="playSongIcon" /></div>
				<div className="songName">{this.props.songName}</div>
				<div className="songArtist">{this.props.songArtist}</div>
			</div>
	    );
  	}
}

export default SongPreview;