import React, { Component } from "react";
import '../assets/css/playbar.css';
import { MdPlayCircleOutline, MdPauseCircleOutline, MdSkipPrevious, 
	MdSkipNext, MdRepeat, MdShuffle, MdVolumeOff, MdVolumeUp } from "react-icons/md";

class Playbar extends Component {
  	render() {
	    return(
			<div id="playbar">
				<div id="currentSong">
					<div id="currentSongImg">
					</div>
					<div id="currentSongInfo">
						<div id="songTitle">
							Hello	
						</div>
						<div id="songArtist">
							Adelle
						</div>
					</div>
				</div>
				<div id="nowPlaying">
					<div id="controlButtons">
						<MdShuffle className="icons" />
						<MdSkipPrevious className="icons" />
						<MdPlayCircleOutline className="icons" id="playButton" />
						<MdSkipNext className="icons" />
						<MdRepeat className="icons" />
					</div>
					<div id="progressBar">
						<div className="time">00:00</div>
						<div id="progressBarContainer">
							<progress value="10" max="100" id="songProgress"></progress>
						</div>
						<div className="time">00:00</div>
					</div>
				</div>
				<div id="volume">
					<MdVolumeUp className="icons" />
					<div id="progressBarContainer">
						<progress value="10" max="100" id="volumeBar"></progress>
					</div>
				</div>
			</div>
	    );
  	}
}

export default Playbar;