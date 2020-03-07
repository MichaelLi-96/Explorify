import React, { Component } from "react";
import '../assets/css/albumPlaylist.css';
import axios from "axios";
import { MdPlayCircleOutline } from "react-icons/md";
import BackButton from "./backButton";
import SongRow from "./songRow";
import { API_URL } from "../url"
import { connect } from 'react-redux';
import { songChange, songPress, playlistAlbumPlayed } from '../actions';


class AlbumPlaylist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albumPlaylistId: this.props.location.state.albumPlaylistId,
			albumPlaylist: {},
			songs: [],
			numberOfSongs: 0,
			idToSongMap: {}
		}
	}

	componentDidMount() {
		axios.get(`${API_URL}/albumPlaylists/${this.state.albumPlaylistId}`)
	  	.then((response) => {
	  		this.setState({ albumPlaylist: response.data, loading: false });
	  		this.setState({ numberOfSongs: this.state.albumPlaylist.songs.length });

	  		for(let i = 0; i < this.state.albumPlaylist.songs.length; i++) {
	  			const songId = this.state.albumPlaylist.songs[i];
	  			let song = {};
	  			axios.get(`${API_URL}/songs/${songId}`)
			  	.then((response) => {
			  		song = response.data;

			  		axios.get(`${API_URL}/albumPlaylists/${response.data.albumPlaylist}`)
				  	.then((response) => {
				  		song.albumPlaylist = response.data;
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});

				  	axios.get(`${API_URL}/artists/${response.data.artist}`)
				  	.then((response) => {
				  		song.artist = response.data;
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});

			  		this.state.songs.push(song);
			  		const mapping = {};
			  		mapping[songId] = song;
			  		this.setState({ songs: this.state.songs, idToSongMap: {...this.state.idToSongMap, ...mapping} });
			  	})
			  	.catch(function (error) {
			  		console.log(error);
			  	});
	  		}
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
		if(this.state.albumPlaylist === undefined || JSON.stringify(this.state.albumPlaylist) === '{}')  {
			return;
		}
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

	playAlbumPlaylist = () => {
		const sortedSongs = [];
		for(let i = 0; i < this.state.albumPlaylist.songs.length; i++) {
			const songId = this.state.albumPlaylist.songs[i];
			sortedSongs.push(this.state.idToSongMap[songId]);
		}

		this.props.songChange({ 
			name: sortedSongs[0].name,
			albumPlaylist: sortedSongs[0].albumPlaylist,
			artist: sortedSongs[0].artist,
			url: sortedSongs[0].url,
			imageUrl: sortedSongs[0].imageUrl,
			length: sortedSongs[0].length,
			plays: sortedSongs[0].plays
		});
		this.props.songPress();
		this.props.playlistAlbumPlayed(sortedSongs);
	}

  	render() {
	    return(
			<div id="albumPlaylist">
				<BackButton history={this.props.history} />
				<div id="albumPlaylistInfoContainer">
					<div id="albumPlaylistImgContainer">
						<img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} id="albumPlaylistImg"></img>
						<div id="albumPlaylistImgPlaySongIconContainer" onClick={this.playAlbumPlaylist}><MdPlayCircleOutline id="albumPlaylistImgPlaySongIcon" /></div>
					</div>
					<div id="albumPlaylistName">{this.state.albumPlaylist.name}</div>
					<div id="albumPlaylistArtist">{this.state.albumPlaylist.artist}</div>
					<div id="albumPlaylistPlayButton" className="noselect" onClick={this.playAlbumPlaylist}>Play</div>
					<div id="albumPlaylistYearAndSongs">{this.state.albumPlaylist.year} • {this.state.numberOfSongs} SONGS</div>
				</div>

				<div id="albumPlaylistSongsContainer">
					{ this.loadSongs() }
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	currentSong: state.currentSong,
	songHistory: state.songHistory
});

export default connect(mapStateToProps, { 
	songChange,
	songPress,
	playlistAlbumPlayed
})(AlbumPlaylist);
