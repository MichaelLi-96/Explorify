import React, { Component } from "react";
import '../assets/css/playlistAlbum.css';
import BackButton from "./backButton";
import SongRow from "./songRow";
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";

class PlaylistAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistAlbum: this.props.location.state.playlistAlbum
		}
		console.log(this.state.playlistAlbum);
	}

	componentDidMount() {
		const songs = document.getElementsByClassName("songRow");
		for(let i = 0; i < songs.length; i++) {
			const currentSong = songs[i];

			// Margin top spacing for first song
			if(i === 0) {
				currentSong.style.marginTop = "10%";
			}
			// Margin bottom spacing for first song
			if(i === songs.length - 1) {
				currentSong.style.marginBottom = "10%";
			}

			// On hover song, change music note icon to play icon
			currentSong.addEventListener("mouseenter", () => {
				const musicNote = currentSong.children[0].children[0];
				const play = currentSong.children[0].children[1];
				musicNote.style.display = "none";
				play.style.display = "block";
			})

			// On unhover song, change play icon to music note icon
			currentSong.addEventListener("mouseleave", () => {
				const musicNote = currentSong.children[0].children[0];
				const play = currentSong.children[0].children[1];
				musicNote.style.display = "block";
				play.style.display = "none";
			})

			// On click more info icon, show more info panel
			const moreInfoIcon = currentSong.children[2].children[0];
			moreInfoIcon.addEventListener("click", () => {
				const moreInfoPanel = currentSong.children[2].children[1];
				if(moreInfoPanel.style.display === "none") {
					moreInfoPanel.style.display = "block";
				}
				else {
					moreInfoPanel.style.display = "none";
				}
			})

			// Hide more info panel when mouse leaves song div
			currentSong.addEventListener("mouseleave", () => {
				const moreInfoPanel = currentSong.children[2].children[1];
				moreInfoPanel.style.display = "none";
			})

		}
	}

	loadSongs = () => {
		const songs = [];
		for(let i = 0; i < this.state.playlistAlbum.songs.length; i++) {
			const song = this.state.playlistAlbum.songs[i];
			const songId = song._id;
			const songName = song.name;
			const songArtist = song.artist;
			const songUrl = song.url;
			const songImageUrl = song.imageUrl;
			const songLength = song.length;
			const songPlays = song.plays;
			songs.push(
				<SongRow 
					key={songId}
					song={song}
					songName={songName}
					songArtist={songArtist}
					songUrl={songUrl}
					songImageUrl={songImageUrl}
					songLength={songLength}
					songPlays={songPlays}
					showPlays={false}
				/>
			)
		}
		return songs;
	}

  	render() {
	    return(
			<div id="playlistAlbum">
				<BackButton history={this.props.history} />
				<div id="playlistAlbumInfoContainer">
					<img src={this.state.playlistAlbum.imageUrl} alt={this.state.playlistAlbum.name} id="playlistAlbumImg"></img>
					<div id="playlistAlbumName">{this.state.playlistAlbum.name}</div>
					<div id="playlistAlbumArtist">{this.state.playlistAlbum.artist}</div>
					<div id="playlistAlbumPlayButton">Play</div>
					<div id="playlistAlbumYearAndSongs">{this.state.playlistAlbum.year} • {this.state.playlistAlbum.songs.length} SONGS</div>
				</div>

				<div id="playlistAlbumSongsContainer">
					{this.loadSongs()}
				</div>
			</div>
	    );
  	}
}

export default PlaylistAlbum;