import React, { Component } from "react";
import '../assets/css/albumPlaylist.css';
import axios from "axios";
import { MdPlayCircleOutline } from "react-icons/md";
import BackButton from "./backButton";
import SongRow from "./songRow";
import { API_URL } from "../url"
import { connect } from 'react-redux';
import { songChange, songPress, playlistAlbumPlayed, checkedJwtToken } from '../actions';


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

	loadSongs = () => {
		if(this.state.albumPlaylist === undefined || JSON.stringify(this.state.albumPlaylist) === '{}')  {
			return;
		}
		if(this.state.albumPlaylist.songs.length === 0) {
			const emptyMsg = [];
		}
		const songRows = [];
		for(let i = 0; i < this.state.albumPlaylist.songs.length; i++) {
			const songId = this.state.albumPlaylist.songs[i];
			if(i === 0) {
				songRows.push(
					<SongRow 
						key={songId}
						songId={songId}
						showPlays={false}
						isFirst={true}
						isLast={false}
					/>
				)
			}
			else if(i === this.state.albumPlaylist.songs.length - 1) {
				songRows.push(
					<SongRow 
						key={songId}
						songId={songId}
						showPlays={false}
						isFirst={false}
						isLast={true}
					/>
				)
			}
			else {
				songRows.push(
					<SongRow 
						key={songId}
						songId={songId}
						showPlays={false}
						isFirst={false}
						isLast={false}
					/>
				)
			}
		}
		return songRows;
	}

	playAlbumPlaylist = () => {
		if(this.state.albumPlaylist.songs.length === 0) {
			return;
		}

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
					{ this.state.albumPlaylist.isAlbum ? (
						<div id="albumPlaylistArtist">{this.state.albumPlaylist.artist}</div>
					) : (
						<div />
					)}
					<div id="albumPlaylistPlayButton" className="noselect" onClick={this.playAlbumPlaylist}>Play</div>
					{ this.state.albumPlaylist.isAlbum ? (
						<div id="albumPlaylistYearAndSongs">{this.state.albumPlaylist.year} • {this.state.numberOfSongs} SONGS</div>
					) : (
						<div id="albumPlaylistYearAndSongs">{this.state.numberOfSongs} SONGS</div>
					)}
				</div>

				<div id="albumPlaylistSongsContainer">
					<div>It's a bit empty in here!</div>
					<div>Find some songs to add into this playlist.</div>
					{ this.loadSongs() }
				</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	currentSong: state.currentSong,
	songHistory: state.songHistory,
	authDetails: state.authDetails
});

export default connect(mapStateToProps, { 
	songChange,
	songPress,
	playlistAlbumPlayed,
	checkedJwtToken
})(AlbumPlaylist);
