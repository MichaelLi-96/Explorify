import React, { Component } from "react";
import '../assets/css/playlistAlbumPreview.css';
import { Link } from "react-router-dom";

class PlaylistAlbumPreview extends Component {
  	render() {
	    return(
			<div className="playlistAlbumPreviewContainer">
				<Link to={{
					pathname: `/albums/${this.props.playlistAlbumArtist}/${this.props.playlistAlbumName}`,
					state: {
						playlistAlbum: this.props.playlistAlbum
					}}
				}>
				<img src={this.props.playlistAlbumImageUrl} alt={this.props.playlistAlbumName} className="playlistAlbumPreviewImg"></img>
				</Link>
				<div className="playlistAlbumPreviewName">{this.props.playlistAlbumName}</div>
				<div className="playlistAlbumPreviewSongs">{this.props.numberOfSongs} SONGS</div>
			</div>
	    );
  	}
}

export default PlaylistAlbumPreview;