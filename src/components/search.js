import React, { Component } from "react";
import '../assets/css/search.css';
import { MdSearch } from "react-icons/md";
import ArtistPreview from "./artistPreview";
import AlbumPlaylistPreview from "./albumPlaylistPreview";
import SongPreview from "./songPreview";
import axios from "axios";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			filterString: '',
			artists: [],
			albums: [],
			songs: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/artists/')
	  	.then((response) => {
	  		this.setState({ artists: response.data });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});

	  	axios.get('http://localhost:4000/albumPlaylists/')
	  	.then((response) => {
	  		this.setState({ albums: response.data });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});

		axios.get('http://localhost:4000/songs/')
	  	.then((response) => {
	  		this.setState({ songs: response.data });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	loadFilteredArtists = () => {
		const subtitle = document.getElementById("searchSubtitle_Artists");
		if(subtitle === null) {
			return;
		}
		if(this.state.filterString === '') {
			subtitle.style.display = "none";
			return;
		}
		const filteredArtists = [];
		for(let i = 0; i < this.state.artists.length; i++) {
			const artist = this.state.artists[i];
			if(artist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) {
				filteredArtists.push(
					<ArtistPreview 
						key={artist._id}
						artistId={artist._id}
					/>
				)
			}
		}
		
		if(filteredArtists.length === 0) {
			subtitle.style.display = "none";
		}
		if(filteredArtists.length > 0) {
			subtitle.style.display = "block";
		}
		return filteredArtists;
	}

	loadFilteredAlbums = () => {
		const subtitle = document.getElementById("searchSubtitle_Albums");
		if(subtitle === null) {
			return;
		}
		if(this.state.filterString === '') {
			subtitle.style.display = "none";
			return;
		}
		const filteredAlbums = [];
		for(let i = 0; i < this.state.albums.length; i++) {
			const album = this.state.albums[i];
			if(album.name.toLowerCase().includes(this.state.filterString.toLowerCase())) {
				filteredAlbums.push(
					<AlbumPlaylistPreview
						key={album._id}
						albumId={album._id}
					/>
				)
			}
		}

		if(filteredAlbums.length === 0) {
			subtitle.style.display = "none";
		}
		if(filteredAlbums.length > 0) {
			subtitle.style.display = "block";
		}
		return filteredAlbums;
	}

	loadFilteredSongs = () => {
		const subtitle = document.getElementById("searchSubtitle_Songs");
		if(subtitle === null) {
			return;
		}
		if(this.state.filterString === '') {
			subtitle.style.display = "none";
			return;
		}
		const filteredSongs = [];
		for(let i = 0; i < this.state.songs.length; i++) {
			const song = this.state.songs[i];
			if(song.name.toLowerCase().includes(this.state.filterString.toLowerCase())) {
				filteredSongs.push(
					<SongPreview 
						key={song._id}
						songId={song._id}
					/>
				)
			}
		}

		if(filteredSongs.length === 0) {
			subtitle.style.display = "none";
		}
		if(filteredSongs.length > 0) {
			subtitle.style.display = "block";
		}
		return filteredSongs;
	}  

	handleChange = (event) => {
		this.setState({ filterString: event.target.value });
	}

  	render() {
	    return(
			<div id="search">
				<div id="searchTitle">Find artists, albums, or songs</div>
				<div id="searchBarContainer">
					<MdSearch id="searchIcon" />
					<input type="text" id="input" onChange={this.handleChange} placeholder="Search.." autoComplete="off" maxLength={50} />
				</div>
				<div id="searchListsContainer">
					<div id="searchSubtitle_Artists" className="searchSubtitle">Artists</div>
					<div className="searchListContainer">
						{this.loadFilteredArtists()}
					</div>
					<div id="searchSubtitle_Albums" className="searchSubtitle">Albums</div>
					<div className="searchListContainer">
						{this.loadFilteredAlbums()}
					</div>
					<div id="searchSubtitle_Songs" className="searchSubtitle">Songs</div>
					<div className="searchListContainer">
						{this.loadFilteredSongs()}
					</div>
				</div>
			</div>
	    );
  	}
}

export default Search;