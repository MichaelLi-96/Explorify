import React, { Component } from "react";
import axios from "axios";
import ArtistPreview from "./artistPreview";
import SongPreview from "./songPreview";
import '../assets/css/home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showArtist: false,
			loading: true,
			artists: [],
			songs: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/artists/')
	  	.then((response) => {
	  		this.setState({ artists: response.data, loading: false });
	  		console.log(this.state.artists);
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});

		axios.get('http://localhost:4000/songs/')
	  	.then((response) => {
	  		this.setState({ songs: response.data, loading: false });
	  		console.log(this.state.artists);
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	loadArtists = () => {
		const artists = [];
		for(let i = 0; i < this.state.artists.length; i++) {
			const artistName = this.state.artists[i].name;
			const artistImageUrl = this.state.artists[i].imageUrl;
			console.log(artistName);
			artists.push(
				<ArtistPreview 
					artistName={artistName}
					artistImageUrl={artistImageUrl}
				/>
			)
		}
		return artists;
	}

	loadTracks = () => {
		const songs = [];
		for(let i = 0; i < this.state.songs.length; i++) {
			const songName = this.state.songs[i].name;
			const songArtist = this.state.songs[i].artist;
			const songUrl = this.state.songs[i].url;
			const songImageUrl = this.state.songs[i].imageUrl;
			const songLength = this.state.songs[i].length;
			const songPlays = this.state.songs[i].plays;

			songs.push(
				<SongPreview 
					songName={songName}
					songArtist={songArtist}
					songUrl={songUrl}
					songImageUrl={songImageUrl}
					songLength={songLength}
					songPlays={songPlays}
				/>
			)
		}
		return songs;
	}

  	render() {
	    return(
			<div id="home">
				<div id="homeTitle">Discover Weekly</div>
				<div id="homeListsContainer"> 
					<div id="homeSubtitle">Popular Artists</div>
					<div className="homeListContainer">
						{this.loadArtists()}
					</div>
					<div id="homeSubtitle">Featured Tracks</div>
					<div className="homeListContainer">
						{this.loadTracks()}
					</div>
				</div>
			</div>
	    );
  	}
}

export default Home;