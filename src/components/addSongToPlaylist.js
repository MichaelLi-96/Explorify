import React, { Component } from 'react';
import AlbumPlaylistPreview from './albumPlaylistPreview';
import { withRouter } from 'react-router-dom';
import BackButton from './backButton';
import '../assets/css/addSongToPlaylist.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../url';
import { checkedJwtToken, showCreatePlaylistModal } from '../actions';

class AddSongToPlaylist extends Component {
  componentDidMount() {
    const newAuthState = {
      jwt: this.props.authDetails.jwt,
      userIsLoggedIn: this.props.authDetails.userIsLoggedIn,
      user: this.props.authDetails.user
    };

    if (this.props.authDetails.jwt === '' || this.props.authDetails.jwt === null) {
      newAuthState.jwt = null;
      newAuthState.userIsLoggedIn = false;
      newAuthState.user = {};
      this.props.checkedJwtToken(newAuthState);
    } else {
      axios
        .post(`${API_URL}/auth/decodeJwt`, {
          token: this.props.authDetails.jwt
        })
        .then((response) => {
          if (!this.props.authDetails.userIsLoggedIn) {
            const userId = response.data.userId;
            axios
              .get(`${API_URL}/users/${userId}`)
              .then((response) => {
                newAuthState.userIsLoggedIn = true;
                newAuthState.user = response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          newAuthState.jwt = null;
          newAuthState.userIsLoggedIn = false;
          newAuthState.user = {};
        })
        .finally(() => {
          this.props.checkedJwtToken(newAuthState);
          if (!newAuthState.userIsLoggedIn) {
            this.props.history.push('/');
          }
        });
    }
  }

  loadPlaylists = () => {
    const playlistAlbums = [];
    for (let i = 1; i < this.props.authDetails.user.albumPlaylists.length; i++) {
      const playlistAlbumId = this.props.authDetails.user.albumPlaylists[i];
      playlistAlbums.push(<AlbumPlaylistPreview key={playlistAlbumId} albumId={playlistAlbumId} addingSongToPlaylist={true} />);
    }
    return playlistAlbums;
  };

  showCreatePlaylistModal = () => {
    this.props.showCreatePlaylistModal();
  };

  render() {
    return (
      <div id="addSongToPlaylist">
        <BackButton history={this.props.history} fromAddSongToPlaylist={true} />
        <div id="addSongToPlaylistTitle">Playlists</div>
        <div id="addSongToPlaylistPlaylistsListContainer">
          {this.loadPlaylists()}
          <div id="addSongToPlaylistAddPlaylistContainer" onClick={this.showCreatePlaylistModal}>
            <div id="addSongToPlaylistAddPlaylistImg">
              <FaPlus id="addSongToPlaylistPlusIcon" />
            </div>
            <div id="addSongToPlaylistAddPlaylistName">Create Playlist</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authDetails: state.authDetails
});

export default withRouter(
  connect(mapStateToProps, {
    checkedJwtToken,
    showCreatePlaylistModal
  })(AddSongToPlaylist)
);
