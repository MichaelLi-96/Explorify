import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { API_URL } from "../url"
import { checkedJwtToken } from '../actions';
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
		const newAuthState = {
			jwt: this.props.authDetails.jwt,
			userIsLoggedIn: this.props.authDetails.userIsLoggedIn, 
			user: this.props.authDetails.user
		}

		if(this.props.authDetails.jwt === "" || this.props.authDetails.jwt === null) {
			newAuthState.jwt = null;
			newAuthState.userIsLoggedIn = false;
			newAuthState.user = {};
			this.props.checkedJwtToken(newAuthState);
		}
		else {
			axios.post(`${API_URL}/auth/decodeJwt`, {
				token: this.props.authDetails.jwt
			})
		  	.then((response) => {
		  		if(!this.props.authDetails.userIsLoggedIn) {
					const userId = response.data.userId;
					axios.get(`${API_URL}/users/${userId}`)
				  	.then((response) => {
						newAuthState.userIsLoggedIn = true;
						newAuthState.user = response.data;
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});
				}
		  	})
		  	.catch(function (error) {
				newAuthState.jwt = null;
				newAuthState.userIsLoggedIn = false;
				newAuthState.user = {};
		  	})
		  	.finally(() => {
		  		this.props.checkedJwtToken(newAuthState);
		  		if(!newAuthState.userIsLoggedIn) {
		  			this.props.history.push("/");
		  		}
		  	});
		}

		axios.get(`${API_URL}/artists/`)
	  	.then((response) => {
	  		this.setState({ artists: response.data, loading: false });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});

		axios.get(`${API_URL}/songs/`)
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
		const shuffledSongs = this.shuffle(this.state.songs).splice(0, 10);
		const songs = [];
		for(let i = 0; i < shuffledSongs.length; i++) {
			const song = shuffledSongs[i];
			songs.push(
				<SongPreview 
					key={song._id}
					songId={song._id}
				/>
			)
		}
		return songs;
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
					<div className="homeSubtitle">Popular Artists</div>
					<div className="homeListContainer">
						{this.loadArtists()}
					</div>
					<div className="homeSubtitle">Featured Tracks</div>
					<div className="homeListContainer">
						{this.loadTracks()}
					</div>
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	authDetails: state.authDetails  
});

export default connect(mapStateToProps, { 
	checkedJwtToken
})(Home);
