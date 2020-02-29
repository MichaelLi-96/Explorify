import React, { Component } from "react";
import '../assets/css/songRow.css';
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';

class SongRow extends Component {
	playSong = () => {
		this.props.songChange({ 
			name: this.props.songName,
			artist: this.props.songArtist,
			url: this.props.songUrl,
			imageUrl: this.props.songImageUrl,
			length: this.props.songLength,
			plays: this.props.songPlays
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
					<div className="songRowSongName">{this.props.songName}</div>
					<div className="songRowSongPlays">{this.props.songPlays}</div>
				</div> 
				<div className="songRowMusicMoreInfoIconContainer">
					<IoIosMore className="songRowMusicMoreInfoIcon" />
					<div className="songRowMoreInfoPanel">
						<div className="songRowMoreInfoOption">Add to Playlist</div>
						<div className="songRowMoreInfoOption">Save to your Liked Songs</div>
					</div>
				</div>
				<div className="songRowMusicSongLength">{this.props.songLength}</div>
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
