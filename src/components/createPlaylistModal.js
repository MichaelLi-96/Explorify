import React, { Component } from "react";
import '../assets/css/createPlaylistModal.css';
import axios from "axios";
import { connect } from 'react-redux';
import { API_URL } from "../url"
import { hideCreatePlaylistModal, userChangedData } from '../actions';

class CreatePlaylistModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistName: ""
		}
	}

	handleNameChange = (event) => {
		this.setState({ playlistName: event.target.value });
	}

	canceled = () => {
		this.props.hideCreatePlaylistModal();
	}

	created = () => {
		let name = "";
		if(this.state.playlistName === "") {
			name = "New Playlist";
		}
		else {
			name = this.state.playlistName;
		}

		axios.post(`${API_URL}/albumPlaylists/add`, {
			name: name,
			isAlbum: false,
			imageUrl: "https://explorify.s3-us-west-1.amazonaws.com/defaultPlaylistImg.jpg",
			artist: this.props.authDetails.user.name,
			year: "",
			songs: []
		})
	  	.then((response) => {
	  		const albumPlaylistId = response.data.albumPlaylist._id;
	  		const updatedUserObj = this.props.authDetails.user;
	  		const updatedAlbumPlaylists = updatedUserObj.albumPlaylists;
	  		updatedAlbumPlaylists.push(albumPlaylistId);
	  		updatedUserObj.albumPlaylists = updatedAlbumPlaylists;

	  		axios.put(`${API_URL}/users/update/${this.props.authDetails.user._id}`, updatedUserObj)
		  	.then((response) => {
		  		this.props.userChangedData(updatedUserObj);
		  		this.props.hideCreatePlaylistModal();

		  	})
		  	.catch(function (error) {
		  		console.log(error);
			});
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

  	render() {
  	    return(
	    	<div id="createPlaylistModal">
    			<div id="createPlaylistModalTitle">Create new playlist</div>
    			<div id="createPlaylistModalStrip">
    				<div id="createPlaylistModalInputContainer">
	    				<div id="createPlaylistModalInputLabel">Playlist name</div>
	    				<input type="text" id="createPlaylistModalInput" autoComplete="off" maxLength={50} onChange={this.handleNameChange} autoFocus={true} placeholder="New Playlist"></input>
    				</div>
    			</div>
    			<div id="createPlaylistModalButtonsContainer">
    				<div id="createPlaylistModalCancelButton" className="noselect" onClick={this.canceled}>Cancel</div>
    				<div  id="createPlaylistModalCreateButton" className="noselect" onClick={this.created}>Create</div>
    			</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	authDetails: state.authDetails  
});

export default connect(mapStateToProps, { 
	hideCreatePlaylistModal,
	userChangedData
})(CreatePlaylistModal);
