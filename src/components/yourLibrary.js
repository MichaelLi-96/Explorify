import React, { Component } from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import '../assets/css/yourLibrary.css';

class yourLibrary extends Component {
  	render() {
	    return(
			<div id="yourLibrary">
				<div id="title">Playlists</div>
				<div className="playlistsListContainer">
					<div className="playlistContainer">
						<div className="playlistImg"></div>
						<div className="playlistName">playlist</div>
						<div className="tracks">100 TRACKS</div>
					</div>
				</div>
			</div>
	    );
  	}
}

export default yourLibrary;