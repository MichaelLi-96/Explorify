import React, { Component } from 'react';
import '../assets/css/albumPlaylistPreview.css';
import axios from 'axios';
import { API_URL } from '../url';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeSongToBeAddedToPlaylist } from '../actions';

class AlbumPlaylistPreview extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      loading: true,
      albumPlaylist: {},
      numberOfSongs: 0
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${API_URL}/albumPlaylists/${this.props.albumId}`)
      .then((response) => {
        if (this._isMounted) {
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

  addSongToSelectedPlaylist = () => {
    if (this.state.albumPlaylist.songs.includes(this.props.songToAddToPlaylist.song._id)) {
      this.props.removeSongToBeAddedToPlaylist();
    } else {
      const updatedAlbumPlaylistWithAddedSong = this.state.albumPlaylist;
      const updatedAlbumPlaylistSongs = updatedAlbumPlaylistWithAddedSong.songs;
      updatedAlbumPlaylistSongs.push(this.props.songToAddToPlaylist.song._id);
      updatedAlbumPlaylistWithAddedSong.songs = updatedAlbumPlaylistSongs;

      axios
        .put(`${API_URL}/albumPlaylists/update/${this.state.albumPlaylist._id}`, updatedAlbumPlaylistWithAddedSong)
        .then((response) => {
          this.props.removeSongToBeAddedToPlaylist();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    if (this.props.addingSongToPlaylist && !this.state.albumPlaylist.isAlbum) {
      return (
        <div className="albumPlaylistPreviewContainer">
          <img
            src={this.state.albumPlaylist.imageUrl}
            alt={this.state.albumPlaylist.name}
            className="albumPlaylistPreviewImg"
            onClick={this.addSongToSelectedPlaylist}
          ></img>
          <div className="albumPlaylistPreviewName">{this.state.albumPlaylist.name}</div>
          <div className="albumPlaylistPreviewSongs">{this.state.numberOfSongs} SONGS</div>
        </div>
      );
    } else if (!this.props.addingSongToPlaylist) {
      return (
        <div className="albumPlaylistPreviewContainer">
          {this.state.albumPlaylist.isAlbum ? (
            <Link
              to={{
                pathname: `/albums/${this.state.albumPlaylist.artist}/${this.state.albumPlaylist.name}`,
                state: {
                  albumPlaylistId: this.state.albumPlaylist._id
                }
              }}
            >
              <img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} className="albumPlaylistPreviewImg"></img>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/yourLibrary/${this.state.albumPlaylist.name}`,
                state: {
                  albumPlaylistId: this.state.albumPlaylist._id
                }
              }}
            >
              <img src={this.state.albumPlaylist.imageUrl} alt={this.state.albumPlaylist.name} className="albumPlaylistPreviewImg"></img>
            </Link>
          )}

          <div className="albumPlaylistPreviewName">{this.state.albumPlaylist.name}</div>
          <div className="albumPlaylistPreviewSongs">{this.state.numberOfSongs} SONGS</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  authDetails: state.authDetails,
  songToAddToPlaylist: state.songToAddToPlaylist
});

export default connect(mapStateToProps, {
  removeSongToBeAddedToPlaylist
})(AlbumPlaylistPreview);
