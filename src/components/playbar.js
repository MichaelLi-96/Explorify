import React, { Component } from "react";
import '../assets/css/playbar.css';
import sound from "../assets/songs/Shelter.mp3";
import { MdPlayCircleOutline, MdPauseCircleOutline, MdSkipPrevious, 
	MdSkipNext, MdRepeat, MdShuffle, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { songChange, songPress, prevSongPressed, nextSongPressed, shufflePressed, unshufflePressed } from '../actions';

class Playbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			played: false,
			playing: false,
			muted: false,
			volumeBarValue: 0,
			songProgressValue: 0,
			ended: false,
			repeat: false,
			shuffle: false
		}
	}

	playSong = () => {
		const audio = document.getElementById("playbarAudio");
		if(this.props.currentSong.url !== "") {
			audio.play();
			const songDuration = document.getElementById("playbarSongDuration");
			songDuration.innerHTML = this.props.currentSong.length;
			this.setState({ playing: true });
		}
	}

	pauseSong = () => {
		const audio = document.getElementById("playbarAudio");
		audio.pause();
		this.setState({ playing: false });
	}

	mute = () => {
		const audio = document.getElementById("playbarAudio");
		const volumeBar = document.getElementById("playbarVolumeBar");
		this.setState({ muted: true, volumeBarValue: audio.volume });
		volumeBar.setAttribute("value", 0);
		audio.volume = 0;
	}

	unmute = () => {
		const audio = document.getElementById("playbarAudio");
		const volumeBar = document.getElementById("playbarVolumeBar");
		this.setState({ muted: false });
		volumeBar.setAttribute("value", this.state.volumeBarValue * 100);
		audio.volume = this.state.volumeBarValue;
	}

	repeat = () => {
		const audio = document.getElementById("playbarAudio");
		audio.loop = true;
		this.setState({ repeat: true });
	}

	unrepeat = () => {
		const audio = document.getElementById("playbarAudio");
		audio.loop = false;
		this.setState({ repeat: false });
	}

	shuffle = () => {
		if(this.props.songHistory.isPlayingAlbumPlaylist) {
			this.props.shufflePressed();
			this.setState({ shuffle: true });
		}
	}

	unshuffle = () => {
		if(this.props.songHistory.isPlayingAlbumPlaylist) {
			this.props.unshufflePressed();
			this.setState({ shuffle: false });
		}
	}

	toPreviousSong = () => {
		if(this.props.songHistory.currentSongHistoryIndex > 0) {
			this.props.prevSongPressed();
			const prevIndex = this.props.songHistory.currentSongHistoryIndex - 1;

			this.props.songChange({ 
				name: this.props.songHistory.songHistoryPlaylist[prevIndex].name,
				albumPlaylist: this.props.songHistory.songHistoryPlaylist[prevIndex].albumPlaylist,
				artist: this.props.songHistory.songHistoryPlaylist[prevIndex].artist,
				url: this.props.songHistory.songHistoryPlaylist[prevIndex].url,
				imageUrl: this.props.songHistory.songHistoryPlaylist[prevIndex].imageUrl,
				length: this.props.songHistory.songHistoryPlaylist[prevIndex].length,
				plays: this.props.songHistory.songHistoryPlaylist[prevIndex].plays
			});
			this.props.songPress();
		}
	}

	toNextSong = () => {
		if(this.props.songHistory.currentSongHistoryIndex < this.props.songHistory.currentSongHistoryLength - 1) {
			this.props.nextSongPressed();
			const nextIndex = this.props.songHistory.currentSongHistoryIndex + 1;

			this.props.songChange({ 
				name: this.props.songHistory.songHistoryPlaylist[nextIndex].name,
				albumPlaylist: this.props.songHistory.songHistoryPlaylist[nextIndex].albumPlaylist,
				artist: this.props.songHistory.songHistoryPlaylist[nextIndex].artist,
				url: this.props.songHistory.songHistoryPlaylist[nextIndex].url,
				imageUrl: this.props.songHistory.songHistoryPlaylist[nextIndex].imageUrl,
				length: this.props.songHistory.songHistoryPlaylist[nextIndex].length,
				plays: this.props.songHistory.songHistoryPlaylist[nextIndex].plays
			});
			this.props.songPress();
		}
	}


	componentDidMount() {
		this.interval = setInterval(() => this.setState({ }), 0);

		const audio = document.getElementById("playbarAudio");
		const songProgress = document.getElementById("playbarSongProgress");
		//const volumeBar = document.getElementById("playbarVolumeBar");
		document.getElementById("playbarSongProgressContainer").addEventListener("click", function (e) {
			const x = e.pageX - this.offsetLeft;
		    const currentProgress = x / this.offsetWidth;
		    if(audio.currentSrc !== "") {
			  	audio.currentTime = currentProgress * audio.duration;
			  	songProgress.setAttribute("value", currentProgress * 100);
			}
		});

		document.getElementById('playbarVolumeBarContainer').addEventListener("click", function (e) {
		    const x = e.pageX - this.offsetLeft;
		    const currentProgress = x / this.offsetWidth;
		  	audio.volume = currentProgress;
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidUpdate() {
		const audio = document.getElementById("playbarAudio");
		if(this.state.playing) {
			// Update the current time and duration of the song 
			const currentTime = document.getElementById("playbarCurrentTime");
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

			const songProgress = document.getElementById("playbarSongProgress");
			songProgress.setAttribute("value", audio.currentTime * 100 / audio.duration);

			if(audio.ended) {
				this.setState({ playing: false, ended: true });
			}
		}
		else {
			// Playback on click progress bar once song has ended
			if((audio.currentTime < audio.duration && this.state.ended)) {
				this.playSong();
				this.setState({ ended: false });
			}
		}

		// Update the position of the progress bar circle indicator using the ratio of song completed (0.0 - 1.0) * div width
		const progressBarPositionCircle = document.getElementById("playbarProgressBarPositionCircle");
		progressBarPositionCircle.style.marginLeft = (586 * (audio.currentTime / audio.duration)) + "px";
		
		// Update the position of the volume bar circle indicator using the volume of song (0.0 - 1.0) * div width
		const volumeBarPositionCircle = document.getElementById("playbarVolumeBarPositionCircle");
		volumeBarPositionCircle.style.marginLeft = (200 * audio.volume) + "px";
		
		// Update the volume bar according to audio volume
		const volumeBar = document.getElementById("playbarVolumeBar");
		volumeBar.setAttribute("value", audio.volume * 100);

		// If muted and volume bar clicked, unmute
		if(this.state.muted && volumeBar.getAttribute("value") > 0) {
			this.setState({ muted: false });
		}

		// If song is clicked, play it as current song and turn shuffle off
		if(this.props.songPressed) {
			audio.setAttribute("src", this.props.currentSong.url);
			this.playSong();
			if(!this.props.songHistory.isPlayingAlbumPlaylist) {
				this.setState({ shuffle: false });
			}
			this.props.songPress();
		}

		const playbarPrevSongIcon = document.getElementById("playbarPrevSongIcon");
		if(this.props.songHistory.currentSongHistoryIndex <= 0) {
			playbarPrevSongIcon.style.pointerEvents = "none";
		}
		else {
			playbarPrevSongIcon.style.pointerEvents = "auto";
		}

		const playbarNextSongIcon = document.getElementById("playbarNextSongIcon");
		if(this.props.songHistory.currentSongHistoryIndex === this.props.songHistory.currentSongHistoryLength - 1) {
			playbarNextSongIcon.style.pointerEvents = "none";
		}
		else {
			playbarNextSongIcon.style.pointerEvents = "auto";
		}

		const playbarShuffleIcon = document.getElementById("playbarShuffleIcon");
		if(!this.props.songHistory.isPlayingAlbumPlaylist) {
			playbarShuffleIcon.style.pointerEvents = "none";
		}
		else {
			playbarShuffleIcon.style.pointerEvents = "auto";
		}

		const playbarPlayIcon = document.getElementById("playbarPlayIcon");
		if(this.props.currentSong.url === "") {
			playbarPlayIcon.style.pointerEvents = "none";
		}
		else {
			playbarPlayIcon.style.pointerEvents = "auto";
		}

		// Autoplay song if exists next song in song history
		if(this.props.songHistory.currentSongHistoryIndex < this.props.songHistory.currentSongHistoryLength - 1 && audio.ended) {
			this.toNextSong();
		}
	}

  	render() {
	    return(
			<div id="playbar" className="noselect">
				<div id="playbarCurrentSong">
					<img src={this.props.currentSong.imageUrl} alt={this.props.currentSong.name} id="playbarCurrentSongImg"></img>
					<div id="playbarCurrentSongInfo">
						<Link 
							id="playbarSongTitle"
							to={{
								pathname: `/albums/${this.props.currentSong.artist.name}/${this.props.currentSong.albumPlaylist.name}`,
								state: {
									albumPlaylistId: this.props.currentSong.albumPlaylist._id
								}
							}}
						>
							{this.props.currentSong.name}
						</Link>

						<Link 
							id="playbarSongArtist"
							to={{
								pathname: `/artists/${this.props.currentSong.artist.name}`,
								state: {
									artistId: this.props.currentSong.artist._id
								}
							}}
						>
							{this.props.currentSong.artist.name}
						</Link>
					</div>
				</div>
				<div id="playbarNowPlaying">
					<audio id="playbarAudio" />
					<div id="playbarControlButtons">
						{!this.state.shuffle ? (
							<MdShuffle id="playbarShuffleIcon" className="playbarIcons" onClick={this.shuffle} />
						) : (
							<MdShuffle id="playbarShuffleIcon" className="playbarSelectedIcons" onClick={this.unshuffle} />
						)}
						<MdSkipPrevious id="playbarPrevSongIcon" className="playbarIcons" onClick={this.toPreviousSong} />
						{!this.state.playing ? (
							<MdPlayCircleOutline id="playbarPlayIcon" className="playbarIcons" onClick={this.playSong} />
						) : (
							<MdPauseCircleOutline id="playbarPlayIcon" className="playbarIcons" onClick={this.pauseSong} />
						)}
						<MdSkipNext id="playbarNextSongIcon" className="playbarIcons" onClick={this.toNextSong} />
						{!this.state.repeat ? (
							<MdRepeat className="playbarIcons" onClick={this.repeat} />
						) : (
							<MdRepeat className="playbarSelectedIcons" onClick={this.unrepeat} />
						)}
					</div>
					<div id="playbarProgressBar">
						<div className="playbarTime" id="playbarCurrentTime">0:00</div>
						<div className="playbarProgressBarContainer" id="playbarSongProgressContainer">
							<div id="playbarProgressBarPositionCircle" className="playbarCircle"></div>
							<progress value="0" max="100" id="playbarSongProgress"></progress>
						</div>
						<div className="playbarTime" id="playbarSongDuration">0:00</div>
					</div>
				</div>
				<div id="playbarVolume">
					{!this.state.muted ? (
						<MdVolumeUp className="playbarIcons" onClick={this.mute} />
					) : (
						<MdVolumeOff className="playbarSelectedIcons" onClick={this.unmute} />
					)}
					<div className="playbarProgressBarContainer" id="playbarVolumeBarContainer">
						<div id="playbarVolumeBarPositionCircle" className="playbarCircle"></div>
						<progress value="100" max="100" id="playbarVolumeBar"></progress>
					</div>
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	currentSong: state.currentSong,
	songPressed: state.songPressed,
	songHistory: state.songHistory
});

export default connect(mapStateToProps, { 
	songChange,
	songPress,
	prevSongPressed,
	nextSongPressed,
	shufflePressed,
	unshufflePressed
})(Playbar);