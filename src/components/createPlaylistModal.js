import React, { Component } from "react";
import '../assets/css/createPlaylistModal.css';
import axios from "axios";
import { connect } from 'react-redux';
import { API_URL } from "../url"
import { hideCreatePlaylistModal } from '../actions';

class CreatePlaylistModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistName: "New Playlist"
		}
	}

	handleNameChange = (event) => {
		this.setState({ playlistName: event.target.value });
	}

	canceled = () => {
		this.props.hideCreatePlaylistModal();
	}

	created = () => {
		
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
	hideCreatePlaylistModal
})(CreatePlaylistModal);
