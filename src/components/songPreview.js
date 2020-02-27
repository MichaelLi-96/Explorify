import React, { Component } from "react";
import '../assets/css/songPreview.css';
import { MdPlayCircleOutline } from "react-icons/md";

class SongPreview extends Component {
  	render() {
	    return(
			<div className="songPreviewContainer">
				<div className="songPreviewImg"></div>
				<div className="songPreviewPlaySongIconContainer"><MdPlayCircleOutline className="songPreviewPlaySongIcon" /></div>
				<div className="songPreviewName">{this.props.songName}</div>
				<div className="songPreviewArtist">{this.props.songArtist}</div>
			</div>
	    );
  	}
}

export default SongPreview;