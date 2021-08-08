import React, { Component } from 'react';
import '../assets/css/backButton.css';
import { IoIosArrowBack } from 'react-icons/io';
import { removeSongToBeAddedToPlaylist } from '../actions';
import { connect } from 'react-redux';

class BackButton extends Component {
  goBack = () => {
    if (this.props.fromAddSongToPlaylist) {
      this.props.removeSongToBeAddedToPlaylist();
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    return <IoIosArrowBack id="playlistAlbumBackButton" onClick={this.goBack} />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  removeSongToBeAddedToPlaylist,
})(BackButton);
