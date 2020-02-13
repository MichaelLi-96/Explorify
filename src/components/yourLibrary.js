import React, { Component } from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import '../assets/css/yourLibrary.css';
import { connect } from 'react-redux';
import { changeSong } from '../actions';

class yourLibrary extends Component {
	playSong = () => {
		this.props.changeSong({ src:"https://spotify-clone.s3-us-west-1.amazonaws.com/Taylor+Swift+-+Red/taylor_swift-starlight-IroMusic-581.mp3", name: "Starlight"});
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
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ currentSong: state.currentSong });

export default connect(mapStateToProps, { 
	changeSong
})(yourLibrary);
