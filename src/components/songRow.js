import React, { Component } from "react";
import '../assets/css/songRow.css';
import axios from "axios";
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';

class SongRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			song: {},
			albumPlaylist: {},
			artist: {}
		}
	}

	componentDidMount() {
		axios.get(`http://localhost:4000/songs/${this.props.songId}`)
	  	.then((response) => {
	  		this.setState({ song: response.data });

	  		axios.get(`http://localhost:4000/albumPlaylists/${this.state.song.albumPlaylist}`)
		  	.then((response) => {
		  		this.setState({ albumPlaylist: response.data });
		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});

		  	axios.get(`http://localhost:4000/artists/${this.state.song.artist}`)
		  	.then((response) => {
		  		this.setState({ artist: response.data });
		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
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
	currentSong: state.currentSong  
});

export default connect(mapStateToProps, { 
	songChange,
	songPress
})(SongRow);