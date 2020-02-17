import React, { Component } from "react";
import PlaylistAlbumPreview from "./playlistAlbumPreview";
import '../assets/css/yourLibrary.css';
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';

class yourLibrary extends Component {
	playSong = () => {
		this.props.songChange({ src:"https://spotify-clone.s3-us-west-1.amazonaws.com/Taylor+Swift+-+Red/taylor_swift-starlight-IroMusic-581.mp3", name: "Starlight"});
		this.props.songPress();
	}

  	render() {
	    return(
			<div id="yourLibrary">
				<div id="title">Playlists</div>
				<div className="playlistsListContainer">
					<div className="playlistContainer">
						<div className="playlistImg" onClick={this.playSong}></div>
						<div className="playlistName">playlist</div>
						<div className="tracks">100 TRACKS</div>
					</div>
					<PlaylistAlbumPreview
						playlistAlbumName="name"
						numberOfTracks="19"
					/>
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	currentSong: state.currentSong  
});

export default connect(mapStateToProps, { 
	songChange,
	songPress
})(yourLibrary);
