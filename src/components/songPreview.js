import React, { Component } from "react";
import '../assets/css/songPreview.css';
import { MdPlayCircleOutline } from "react-icons/md";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { songChange, songPress } from '../actions';

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
		axios.get(`http://localhost:4000/songs/${this.props.songId}`)
	  	.then((response) => {
	  		if(this._isMounted) {
		  		this.setState({ song: response.data, loading: false });
		  	}

	  		axios.get(`http://localhost:4000/albumPlaylists/${this.state.song.albumPlaylist}`)
		  	.then((response) => {
		  		if(this._isMounted) {
			  		this.setState({ albumPlaylist: response.data });
			  	}
		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});

		  	axios.get(`http://localhost:4000/artists/${this.state.song.artist}`)
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

		axios.put(`http://localhost:4000/songs/update/${this.state.song._id}`, {
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
	currentSong: state.currentSong  
});

export default connect(mapStateToProps, { 
	songChange,
	songPress
})(SongPreview);
