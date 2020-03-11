import React, { Component } from "react";
import '../assets/css/songPreview.css';
import { MdPlayCircleOutline } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../url"
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { songChange, songPress, newSongAddedToHistory, singleSongPlayed } from '../actions';

class SongPreview extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			loading: true,
			song: {},
			albumPlaylist: {},
			artist: {}
		}
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`${API_URL}/songs/${this.props.songId}`)
	  	.then((response) => {
	  		if(this._isMounted) {
		  		this.setState({ song: response.data, loading: false });
		  	}

	  		axios.get(`${API_URL}/albumPlaylists/${this.state.song.albumPlaylist}`)
		  	.then((response) => {
		  		if(this._isMounted) {
			  		this.setState({ albumPlaylist: response.data });
			  	}
		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});

		  	axios.get(`${API_URL}/artists/${this.state.song.artist}`)
		  	.then((response) => {
		  		if(this._isMounted) {
		  			this.setState({ artist: response.data });
		  		}
		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	componentWillUnmount() {
	   this._isMounted = false;
	}

	playSong = () => {
		if(this.props.songHistory.isPlayingAlbumPlaylist) {
			this.props.singleSongPlayed();
		}
		this.props.songChange({ 
			name: this.state.song.name,
			albumPlaylist: this.state.albumPlaylist,
			artist: this.state.artist,
			url: this.state.song.url,
			imageUrl: this.state.song.imageUrl,
			length: this.state.song.length,
			plays: this.state.song.plays
		});
		this.props.songPress();
		if(this.props.songHistory.currentSongId !== this.state.song._id) {
			this.props.newSongAddedToHistory({ 
				_id: this.state.song._id,
				name: this.state.song.name,
				albumPlaylist: this.state.albumPlaylist,
				artist: this.state.artist,
				url: this.state.song.url,
				imageUrl: this.state.song.imageUrl,
				length: this.state.song.length,
			});
		}


		axios.put(`${ API_URL }/songs/update/${this.state.song._id}`, {
			name: this.state.song.name,
			albumPlaylist: this.state.albumPlaylist._id,
			artist: this.state.artist._id,
			url: this.state.song.url,
			imageUrl: this.state.song.imageUrl,
			length: this.state.song.length,
			plays: this.state.song.plays + 1
		})
	  	.then((response) => {
	  		//console.log(response);
	  	})
	  	.catch(function (error) {
	  		console.log(error);
		});
	}

  	render() {
	    return(
			<div className="songPreviewContainer">
				<img src={this.state.song.imageUrl} alt={this.state.song.name} className="songPreviewImg"></img>
				<div className="songPreviewPlaySongIconContainer" onClick={this.playSong}><MdPlayCircleOutline className="songPreviewPlaySongIcon" /></div>
				<Link 
					className="songPreviewName"
					to={{
						pathname: `/albums/${this.state.artist.name}/${this.state.albumPlaylist.name}`,
						state: {
							albumPlaylistId: this.state.albumPlaylist._id
						}
					}}
				>
					{this.state.song.name}
				</Link>

				<Link 
					className="songPreviewArtist"
					to={{
						pathname: `/artists/${this.state.artist.name}`,
						state: {
							artistId: this.state.artist._id
						}
					}}
				>
					{this.state.artist.name}
				</Link>
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
	newSongAddedToHistory,
	singleSongPlayed
})(SongPreview);
