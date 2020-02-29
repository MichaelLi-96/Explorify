import React, { Component } from "react";
import '../assets/css/artist.css';
import PlaylistAlbumPreview from "./playlistAlbumPreview";
import BackButton from "./backButton";
import SongRow from "./songRow";

class Artist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: this.props.location.state.artist
		}
	}

	componentDidMount() {
		const songs = document.getElementsByClassName("songRow");
		for(let i = 0; i < songs.length; i++) {
			const currentSong = songs[i];
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

	loadAlbums = () => {
		const albums = [];
		for(let i = 0; i < this.state.artist.albumPlaylists.length; i++) {
			const album = this.state.artist.albumPlaylists[i];
			const albumId = album._id;
			const albumName = album.name;
			const albumImageUrl = album.imageUrl;
			const albumArtist = album.artist;
			const albumLength = album.songs.length;
			albums.push(
				<PlaylistAlbumPreview
					key={albumId}
					playlistAlbum={album}
					playlistAlbumName={albumName}
					playlistAlbumImageUrl={albumImageUrl}
					playlistAlbumArtist={albumArtist}
					numberOfSongs={albumLength}
				/>
			)
		}
		this.shuffle(albums);
		return albums;
	}

	loadPopularSongs = () => {
		const songs = [];
		for(let i = 0; i < this.state.artist.albumPlaylists.length; i++) {
			const album = this.state.artist.albumPlaylists[i];
			songs.push(...album.songs);
		}
		this.shuffle(songs);
		const popularSongs = [];
		for(let i = 0; i < 8; i++) {
			const song = songs[i];
			const songId = song._id;
			const songName = song.name;
			const songArtist = song.artist;
			const songUrl = song.url;
			const songImageUrl = song.imageUrl;
			const songLength = song.length;
			const songPlays = song.plays;
			popularSongs.push(
				<SongRow 
					key={songId}
					song={song}
					songName={songName}
					songArtist={songArtist}
					songUrl={songUrl}
					songImageUrl={songImageUrl}
					songLength={songLength}
					songPlays={songPlays}
					showPlays={true}
				/>
			)
		}
		return popularSongs;
	}

	// Shuffle an array: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	shuffle = (array) => {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

  	render() {
	    return(
			<div id="artist">
				<BackButton history={this.props.history} />
				<div id="artistImageNameContainer">
					<img src={this.state.artist.imageUrl} alt={this.state.artist.name} id="artistImage"></img>
					<div id="artistName">{this.state.artist.name}</div>
				</div>
				<div id="artistInfoContainer">
					<div className="artistSubtitle">Albums</div>
					<div id="artistAlbumContainer">
						{this.loadAlbums()}
					</div>
					<div className="artistSubtitle">Popular Songs</div>
					<div id="artistSongsContainer">
						{this.loadPopularSongs()}
					</div>
				</div>
			</div>
	    );
  	}
}

export default Artist;
