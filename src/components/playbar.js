import React, { Component } from "react";
import '../assets/css/playbar.css';
import sound from "../assets/songs/Shelter.mp3";
import { MdPlayCircleOutline, MdPauseCircleOutline, MdSkipPrevious, 
	MdSkipNext, MdRepeat, MdShuffle, MdVolumeOff, MdVolumeUp } from "react-icons/md";

class Playbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			muted: false,
			volumeBarValue: 0,
			songProgressValue: 0,
			ended: false,
			repeat: false
		}
	}

	playSong = () => {
		const audio = document.getElementById("audio");
		audio.play();
		const songDuration = document.getElementById("songDuration");
		const min = Math.floor(audio.duration / 60);
		const sec = Math.floor(audio.duration % 60);
		if(sec < 10) {
			const time = min + ":0" + sec;
			songDuration.innerHTML = time;
		}
		else {
			const time = min + ":" + sec;
			songDuration.innerHTML = time;
		}
		this.setState({ playing: true });
	}

	stopSong = () => {
		const audio = document.getElementById("audio");
		audio.pause();
		this.setState({ playing: false });
	}

	mute = () => {
		const audio = document.getElementById("audio");
		audio.muted = true;
		const volumeBar = document.getElementById("volumeBar");
		this.setState({ muted: true, volumeBarValue: audio.volume * 100 });
		volumeBar.setAttribute("value", 0);
	}

	unmute = () => {
		const audio = document.getElementById("audio");
		audio.muted = false;
		const volumeBar = document.getElementById("volumeBar");
		this.setState({ muted: false });
		volumeBar.setAttribute("value", this.state.volumeBarValue);
	}

	repeat = () => {
		const audio = document.getElementById("audio");
		audio.loop = true;
		this.setState({ repeat: true });
	}

	unrepeat = () => {
		const audio = document.getElementById("audio");
		audio.loop = false;
		this.setState({ repeat: false });
	}

	componentDidMount() {
		this.interval = setInterval(() => this.setState({ }), 0);

		const audio = document.getElementById("audio");
		document.getElementById("songProgressContainer").addEventListener("click", function (e) {
			const x = e.pageX - this.offsetLeft;
		    const currentProgress = x / this.offsetWidth;
		  	audio.currentTime = currentProgress * audio.duration;
		});

		document.getElementById('volumeBarContainer').addEventListener('click', function (e) {
		    const x = e.pageX - this.offsetLeft;
		    const currentProgress = x / this.offsetWidth;
		  	audio.volume = currentProgress;
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidUpdate() {
		const audio = document.getElementById("audio");
		if(this.state.playing) {
			const currentTime = document.getElementById("currentTime");
			const min = Math.floor(audio.currentTime / 60);
			const sec = Math.floor(audio.currentTime % 60);
			if(sec < 10) {
				const time = min + ":0" + sec;
				currentTime.innerHTML = time;
			}
			else {
				const time = min + ":" + sec;
				currentTime.innerHTML = time;
			}

			const songProgress = document.getElementById("songProgress");
			songProgress.setAttribute("value", audio.currentTime * 100 / audio.duration);

			if(audio.ended) {
				this.setState({ playing: false, ended: true });
			}
		}
		else {
			if(audio.currentTime < audio.duration && this.state.ended) {
				this.playSong();
				this.setState({ ended: false });
			}
		}

		if(!this.state.muted) {
			const volumeBar = document.getElementById("volumeBar");
			volumeBar.setAttribute("value", audio.volume * 100);
		}
	}

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
					<audio controls src={sound} id="audio" />
					<div id="controlButtons">
						<MdShuffle className="icons" />
						<MdSkipPrevious className="icons" />
						{!this.state.playing ? (
							<MdPlayCircleOutline className="icons" id="playButton" onClick={this.playSong} />
						) : (
							<MdPauseCircleOutline className="icons" id="playButton" onClick={this.stopSong} />
						)}
						<MdSkipNext className="icons" />
						{!this.state.repeat ? (
							<MdRepeat className="icons" onClick={this.repeat} />
						) : (
							<MdRepeat className="selectedIcons" onClick={this.unrepeat} />
						)}
					</div>
					<div id="progressBar">
						<div className="time" id="currentTime">0:00</div>
						<div className="progressBarContainer" id="songProgressContainer">
							<progress value="0" max="100" id="songProgress"></progress>
						</div>
						<div className="time" id="songDuration">0:00</div>
					</div>
				</div>
				<div id="volume">
					{!this.state.muted ? (
						<MdVolumeUp className="icons" onClick={this.mute} />
					) : (
						<MdVolumeOff className="selectedIcons" onClick={this.unmute} />
					)}
					<div className="progressBarContainer" id="volumeBarContainer">
						<progress value="100" max="100" id="volumeBar"></progress>
					</div>
				</div>
			</div>
	    );
  	}
}

export default Playbar;