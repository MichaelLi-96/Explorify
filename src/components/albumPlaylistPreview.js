import React, { Component } from "react";
import '../assets/css/albumPlaylistPreview.css';
import axios from "axios";
import { API_URL } from "../url"
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class AlbumPlaylistPreview extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false
		this.state = {
			loading: true,
			albumPlaylist: {},
			numberOfSongs: 0
		}
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`${API_URL}/albumPlaylists/${this.props.albumId}`)
	  	.then((response) => {
	  		if(this._isMounted) {
		  		this.setState({ albumPlaylist: response.data, loading: false });
		  		this.setState({ numberOfSongs: this.state.albumPlaylist.songs.length });
		  	}
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

	componentWillUnmount() {
	   this._isMounted = false;
	}

  	render() {
	    return(
			<div className="albumPlaylistPreviewContainer">
				{ this.state.albumPlaylist.isAlbum ? (
					<Link to={{
						pathname: `/albums/${this.state.albumPlaylist.artist}/${this.state.albumPlaylist.name}`,
						state: {
							albumPlaylistId: this.state.albumPlaylist._id
						}}
					}>
						<img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} className="albumPlaylistPreviewImg"></img>
					</Link>
				) :(
					<Link to={{
						pathname: `/yourLibrary/${this.state.albumPlaylist.name}`,
						state: {
							albumPlaylistId: this.state.albumPlaylist._id
						}}
					}>
						<img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} className="albumPlaylistPreviewImg"></img>
					</Link>
				)}
					
				<div className="albumPlaylistPreviewName">{this.state.albumPlaylist.name}</div>
				<div className="albumPlaylistPreviewSongs">{this.state.numberOfSongs} SONGS</div>
			</div>
	    );
  	}
}

const mapStateToProps = state => ({ 
	authDetails: state.authDetails
});

export default connect(mapStateToProps, { 
})(AlbumPlaylistPreview);
