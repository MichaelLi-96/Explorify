import React, { Component } from "react";
import '../assets/css/playlistAlbum.css';

class PlaylistAlbum extends Component {
  	render() {
	    return(
			<div id="playlistAlbum">
				<div id="playlistAlbumBackButton">Back</div>
				<div id="playlistAlbumInfoContainer">
					<div id="playlistAlbumImg"></div>
					<div id="playlistAlbumName"></div>
					<div id="playlistAlbumArtist"></div>
					<div id="playButton"></div>
					<div id="playlistAlbumInfo">
						<div id="playlistAlbumYear"></div>
						<div id="playlistAlbumSongs"></div>
					</div>
				</div>
				<div id="playlistAlbumSongsContainer">
				</div>
			</div>
	    );
  	}
}

export default PlaylistAlbum;