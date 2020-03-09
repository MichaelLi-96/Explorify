import React, { Component } from "react";
import '../assets/css/artist.css';
import axios from "axios";
import { API_URL } from "../url"
import AlbumPlaylistPreview from "./albumPlaylistPreview";
import BackButton from "./backButton";
import SongRow from "./songRow";

class Artist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artistId: this.props.location.state.artistId,
			artist: {},
			albumPlaylists: [],
			songs: [],
			loading: true,
			added: false,
		}
	}

	componentDidMount() {
		axios.get(`${API_URL}/artists/${this.state.artistId}`)
	  	.then((response) => {
	  		this.setState({ artist: response.data });

	  		for(let i = 0; i < this.state.artist.albumPlaylists.length; i++) {
	  			axios.get(`${API_URL}/albumPlaylists/${this.state.artist.albumPlaylists[i]}`)
			  	.then((response) => {
			  		this.state.albumPlaylists.push(response.data);
			  		this.setState({ albumPlaylists: this.state.albumPlaylists });

			  		for(let j = 0; j < response.data.songs.length; j++) {
			  			axios.get(`${API_URL}/songs/${response.data.songs[j]}`)
			  			.then((response) => {
			  				this.state.songs.push(response.data);
			  				this.setState({ songs: this.state.songs });
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
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	loadAlbums = () => {
		if(this.state.artist === undefined || JSON.stringify(this.state.artist) === '{}')  {
			return;
		}
		const albums = [];
		for(let i = 0; i < this.state.artist.albumPlaylists.length; i++) {
			const albumId = this.state.artist.albumPlaylists[i];
			albums.push(
				<AlbumPlaylistPreview
					key={albumId}
					albumId={albumId}
				/>
			)
		}
		return albums;
	}

	loadPopularSongs = () => {
		const sortedSongs = this.state.songs.sort((a,b) => b.plays - a.plays).slice(0, 8);
		if(sortedSongs === undefined || sortedSongs.length < 8)  {
			return;
		}
		const popularSongs = [];
		for(let i = 0; i < sortedSongs.length; i++) {
			const songId = sortedSongs[i]._id;
			popularSongs.push(
				<SongRow 
					key={songId}
					songId={songId}
					showPlays={true}
					isFirst={false}
					isLast={false}
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
		// { this.state.loading === false ? (
		// 	this.loadPopularSongs()
		// ) : (
		// 	<div />
		// )}
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
						{ this.loadAlbums() }
					</div>
					<div className="artistSubtitle">Popular Songs</div>
					<div id="artistSongsContainer">
						{ this.loadPopularSongs() }
					</div>
				</div>
			</div>
	    );
  	}
}

export default Artist;
