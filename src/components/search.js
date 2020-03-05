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
			songs: [],
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

	componentDidUpdate() {

	}

	loadFilteredArtists = () => {
		if(this.state.filterString === '') {
			return;
		}
		const filteredArtists = [];
		for(let i = 0; i < this.state.artists.length; i++) {
			const artist = this.state.artists[i];
			if(artist.name.toLowerCase().includes(this.state.filterString)) {
				filteredArtists.push(
					<ArtistPreview 
						key={artist._id}
						artistId={artist._id}
					/>
				)
			}
		}
		return filteredArtists;
	}

	loadFilteredAlbums = () => {
		if(this.state.filterString === '') {
			return;
		}
		const filteredAlbums = [];
		for(let i = 0; i < this.state.albums.length; i++) {
			const album = this.state.albums[i];
			if(album.name.toLowerCase().includes(this.state.filterString)) {
				filteredAlbums.push(
					<AlbumPlaylistPreview
						key={album._id}
						albumId={album._id}
					/>
				)
			}
		}
		return filteredAlbums;
	}

	loadFilteredSongs = () => {
		if(this.state.filterString === '') {
			return;
		}
		const filteredSongs = [];
		for(let i = 0; i < this.state.songs.length; i++) {
			const song = this.state.songs[i];
			if(song.name.toLowerCase().includes(this.state.filterString)) {
				filteredSongs.push(
					<SongPreview 
						key={song._id}
						songId={song._id}
					/>
				)
			}
		}
		return filteredSongs;
	}  

	handleChange = (event) => {
		this.setState({ filterString: event.target.value });
	}

  	render() {
  		if(this.state.artists.length === 0 || this.state.albums.length === 0 || this.state.songs.length === 0) {
  			return(
	  			<div id="search">
	  			</div>
  			)
  		}
	    return(
			<div id="search">
				<div id="searchTitle">Find artists, albums, or songs</div>
				<div id="searchBarContainer">
					<MdSearch id="searchIcon" />
					<input type="text" id="input" onChange={this.handleChange} placeholder="Search.." autoComplete="off" />
				</div>
				<div id="searchListsContainer">
					<div className="searchSubtitle">Artists</div>
					<div className="searchListContainer">
						{this.loadFilteredArtists()}
					</div>
					<div className="searchSubtitle">Albums</div>
					<div className="searchListContainer">
						{this.loadFilteredAlbums()}
					</div>
					<div className="searchSubtitle">Songs</div>
					<div className="searchListContainer">
						{this.loadFilteredSongs()}
					</div>
				</div>
			</div>
	    );
  	}
}

export default Search;