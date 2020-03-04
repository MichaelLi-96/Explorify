import React, { Component } from "react";
import axios from "axios";
import ArtistPreview from "./artistPreview";
import SongPreview from "./songPreview";
import '../assets/css/home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			artists.push(
				<ArtistPreview 
					key={artist._id}
					artistId={artist._id}
				/>
			)
		}
		return artists;
	}

	loadTracks = () => {
		const songs = [];
		for(let i = 0; i < this.state.songs.length; i++) {
			const song = this.state.songs[i];
			songs.push(
				<SongPreview 
					key={song._id}
					songId={song._id}
				/>
			)
		}
		this.shuffle(songs);
		return songs.slice(0, 10);
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