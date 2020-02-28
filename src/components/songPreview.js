import React, { Component } from "react";
import '../assets/css/songPreview.css';
import { MdPlayCircleOutline } from "react-icons/md";
import { connect } from 'react-redux';
import { songChange, songPress } from '../actions';

class SongPreview extends Component {
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
			<div className="songPreviewContainer">
				<img src={this.props.songImageUrl} alt={this.props.songName} className="songPreviewImg"></img>
				<div className="songPreviewPlaySongIconContainer" onClick={this.playSong}><MdPlayCircleOutline className="songPreviewPlaySongIcon" /></div>
				<div className="songPreviewName">{this.props.songName}</div>
				<div className="songPreviewArtist">{this.props.songArtist}</div>
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