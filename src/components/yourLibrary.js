import React, { Component } from "react";
import AlbumPlaylistPreview from "./albumPlaylistPreview";
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
				<div id="yourLibraryTitle">Playlists</div>
				<div className="yourLibraryPlaylistsListContainer">
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
