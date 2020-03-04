import React, { Component } from "react";
import '../assets/css/albumPlaylist.css';
import axios from "axios";
import BackButton from "./backButton";
import SongRow from "./songRow";
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";

class AlbumPlaylist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albumPlaylistId: this.props.location.state.albumPlaylistId,
			albumPlaylist: {}
		}
	}

	componentDidMount() {
		axios.get(`http://localhost:4000/albumPlaylists/${this.state.albumPlaylistId}`)
	  	.then((response) => {
	  		this.setState({ albumPlaylist: response.data, loading: false });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	componentDidUpdate() {
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
		const songRows = [];
		for(let i = 0; i < this.state.albumPlaylist.songs.length; i++) {
			const songId = this.state.albumPlaylist.songs[i];
			songRows.push(
				<SongRow 
					key={songId}
					songId={songId}
					showPlays={false}
				/>
			)
		}
		return songRows;
	}

  	render() {
	    return(
			<div id="albumPlaylist">
				<BackButton history={this.props.history} />
				<div id="albumPlaylistInfoContainer">
					<img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} id="albumPlaylistImg"></img>
					<div id="albumPlaylistName">{this.state.albumPlaylist.name}</div>
					<div id="albumPlaylistArtist">{this.state.albumPlaylist.artist}</div>
					<div id="albumPlaylistPlayButton" className="noselect">Play</div>
					<div id="albumPlaylistYearAndSongs">{this.state.albumPlaylist.year} • {this.state.numberOfSongs} SONGS</div>
				</div>

				<div id="albumPlaylistSongsContainer">
					{ this.state.loading === false ? (
						this.loadSongs()
					) : (
						<div />
					)}
				</div>
			</div>
	    );
  	}
}

export default AlbumPlaylist;