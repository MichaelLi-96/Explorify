import React, { Component } from "react";
import '../assets/css/playlistAlbumPreview.css';

class PlaylistAlbumPreview extends Component {
  	render() {
	    return(
			<div className="playlistAlbumContainer">
				<div className="playlistAlbumImg"></div>
				<div className="playlistAlbumName">{this.props.playlistAlbumName}</div>
				<div className="tracks">{this.props.numberOfTracks} TRACKS</div>
			</div>
	    );
  	}
}

export default PlaylistAlbumPreview;