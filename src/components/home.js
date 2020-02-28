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
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});

		axios.get('http://localhost:4000/songs/')
	  	.then((response) => {
	  		this.setState({ songs: response.data, loading: false });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	loadArtists = () => {
		const artists = [];
		for(let i = 0; i < this.state.artists.length; i++) {
			const artist = this.state.artists[i];
			const artistId = artist._id;
			const artistName = artist.name;
			const artistImageUrl = artist.imageUrl;
			artists.push(
				<ArtistPreview 
					key={artistId}
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
			const song = this.state.songs[i];
			const songId = song._id;
			const songName = song.name;
			const songArtist = song.artist;
			const songUrl = song.url;
			const songImageUrl = song.imageUrl;
			const songLength = song.length;
			const songPlays = song.plays;

			songs.push(
				<SongPreview 
					key={songId}
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