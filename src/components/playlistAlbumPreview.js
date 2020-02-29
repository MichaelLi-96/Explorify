import React, { Component } from "react";
import '../assets/css/playlistAlbumPreview.css';

class PlaylistAlbumPreview extends Component {
  	render() {
	    return(
			<div className="playlistAlbumPreviewContainer">
				<img src={this.props.playlistAlbumImageUrl} alt={this.props.playlistAlbumName} className="playlistAlbumPreviewImg"></img>
				<div className="playlistAlbumPreviewName">{this.props.playlistAlbumName}</div>
				<div className="playlistAlbumPreviewSongs">{this.props.numberOfSongs} SONGS</div>
			</div>
	    );
  	}
}

export default PlaylistAlbumPreview;