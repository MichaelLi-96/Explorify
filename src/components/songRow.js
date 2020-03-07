import React, { Component } from "react";
import '../assets/css/songRow.css';
import axios from "axios";
import { API_URL } from "../url"
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { songChange, songPress, newSongAddedToHistory, singleSongPlayed } from '../actions';

class SongRow extends Component {
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
	  			this.setState({ song: response.data });
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
	    	<div className="songRow" >
				<div className="songRowMusicNoteIconContainer">
					<IoMdMusicalNote className="songRowMusicNoteIcon" />
					<IoMdPlay className="songRowPlayIcon" onClick={this.playSong} />
				</div>
				<div className="songRowSongInfo">
					<div className="songRowSongName">{this.state.song.name}</div>
					{this.props.showPlays === true ? (
						<div className="songRowDetailsContainer">{this.state.song.plays}</div>
					) : (
						<div className="songRowDetailsContainer">
							<Link 
								className="songRowDetailsLink"
								to={{
									pathname: `/artists/${this.state.artist.name}`,
									state: {
										artistId: this.state.artist._id
									}
								}}
							>
								{this.state.artist.name}
							</Link>
							&nbsp;&nbsp;
							<div className="songRowDetailsDot">
								•
							</div>
							&nbsp;&nbsp;
							 <Link 
								className="songRowDetailsLink"
								to={{
									pathname: `/albums/${this.state.artist.name}/${this.state.albumPlaylist.name}`,
									state: {
										albumPlaylistId: this.state.albumPlaylist._id
									}
								}}
							>
								{this.state.albumPlaylist.name}
							</Link>
						</div>
					)}
				</div> 
				<div className="songRowMusicMoreInfoIconContainer">
					<IoIosMore className="songRowMusicMoreInfoIcon" />
					<div className="songRowMoreInfoPanel">
						<div className="songRowMoreInfoOption">Add to Playlist</div>
						<div className="songRowMoreInfoOption">Save to your Liked Songs</div>
					</div>
				</div>
				<div className="songRowMusicSongLength">{this.state.song.length}</div>
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
})(SongRow);
