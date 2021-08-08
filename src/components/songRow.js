import React, { Component } from 'react';
import '../assets/css/songRow.css';
import axios from 'axios';
import { API_URL } from '../url';
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { songChange, songPress, newSongAddedToHistory, singleSongPlayed, storeSongToBeAddedToPlaylist } from '../actions';

class SongRow extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      loading: true,
      song: {},
      albumPlaylist: {},
      artist: {},
      currentUsersLikedSongsAlbumPlaylist: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${API_URL}/songs/${this.props.songId}`)
      .then((response) => {
        if (this._isMounted) {
          this.setState({ song: response.data });

          const songRow = document.getElementById(`songRow/${this.state.song._id}`);

          // On hover song, change music note icon to play icon
          songRow.addEventListener('mouseenter', () => {
            const musicNote = songRow.children[0].children[0];
            const play = songRow.children[0].children[1];
            musicNote.style.display = 'none';
            play.style.display = 'block';
          });

          // On unhover song, change play icon to music note icon
          songRow.addEventListener('mouseleave', () => {
            const musicNote = songRow.children[0].children[0];
            const play = songRow.children[0].children[1];
            musicNote.style.display = 'block';
            play.style.display = 'none';
          });

          // On click more info icon, show more info panel
          const moreInfoIcon = songRow.children[2].children[0];
          moreInfoIcon.addEventListener('click', () => {
            const moreInfoPanel = songRow.children[2].children[1];
            if (moreInfoPanel.style.display === '' || moreInfoPanel.style.display === 'none') {
              moreInfoPanel.style.display = 'block';
            } else {
              moreInfoPanel.style.display = 'none';
            }
          });

          // Hide more info panel when mouse leaves song div
          songRow.addEventListener('mouseleave', () => {
            const moreInfoPanel = songRow.children[2].children[1];
            moreInfoPanel.style.display = 'none';
          });

          if (this.props.isFirst) {
            songRow.style.marginTop = '10%';
          }

          if (this.props.isLast) {
            songRow.style.marginBottom = '10%';
          }
        }

        axios
          .get(`${API_URL}/albumPlaylists/${this.state.song.albumPlaylist}`)
          .then((response) => {
            if (this._isMounted) {
              this.setState({ albumPlaylist: response.data });
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        axios
          .get(`${API_URL}/artists/${this.state.song.artist}`)
          .then((response) => {
            if (this._isMounted) {
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

    axios
      .get(`${API_URL}/albumPlaylists/${this.props.authDetails.user.albumPlaylists[0]}`)
      .then((response) => {
        if (this._isMounted) {
          this.setState({ currentUsersLikedSongsAlbumPlaylist: response.data.songs });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  playSong = () => {
    if (this.props.songHistory.isPlayingAlbumPlaylist) {
      this.props.singleSongPlayed();
    }
    this.props.songChange({
      name: this.state.song.name,
      albumPlaylist: this.state.albumPlaylist,
      artist: this.state.artist,
      url: this.state.song.url,
      imageUrl: this.state.song.imageUrl,
      length: this.state.song.length,
      plays: this.state.song.plays,
    });
    this.props.songPress();
    if (this.props.songHistory.currentSongId !== this.state.song._id) {
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

    axios
      .put(`${API_URL}/songs/update/${this.state.song._id}`, {
        name: this.state.song.name,
        albumPlaylist: this.state.albumPlaylist._id,
        artist: this.state.artist._id,
        url: this.state.song.url,
        imageUrl: this.state.song.imageUrl,
        length: this.state.song.length,
        plays: this.state.song.plays + 1,
      })
      .then((response) => {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addSongToPlaylist = () => {
    this.props.storeSongToBeAddedToPlaylist(this.state.song);
  };

  removeSongFromPlaylist = () => {
    const albumPlaylistIdContainingSong = this.props.albumPlaylistId;

    axios
      .get(`${API_URL}/albumPlaylists/${albumPlaylistIdContainingSong}`)
      .then((response) => {
        const updatedAlbumPlaylist = response.data;
        const updatedAlbumPlaylistSongs = updatedAlbumPlaylist.songs.filter((songId) => songId !== this.state.song._id);
        updatedAlbumPlaylist.songs = updatedAlbumPlaylistSongs;

        axios
          .put(`${API_URL}/albumPlaylists/update/${albumPlaylistIdContainingSong}`, updatedAlbumPlaylist)
          .then((response) => {
            const songRow = document.getElementById(`songRow/${this.state.song._id}`);
            const moreInfoPanel = songRow.children[2].children[1];
            moreInfoPanel.style.display = 'none';
            if (this._isMounted) {
              window.location.reload(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addSongToLikedSongs = () => {
    const userLikedSongsPlaylistId = this.props.authDetails.user.albumPlaylists[0];

    axios
      .get(`${API_URL}/albumPlaylists/${userLikedSongsPlaylistId}`)
      .then((response) => {
        const userLikedSongsAlbumPlaylist = response.data;
        userLikedSongsAlbumPlaylist.songs.push(this.state.song._id);

        axios
          .put(`${API_URL}/albumPlaylists/update/${userLikedSongsPlaylistId}`, userLikedSongsAlbumPlaylist)
          .then((response) => {
            //console.log(response);
            const songRow = document.getElementById(`songRow/${this.state.song._id}`);
            const moreInfoPanel = songRow.children[2].children[1];
            moreInfoPanel.style.display = 'none';
            if (this._isMounted) {
              this.setState({ currentUsersLikedSongsAlbumPlaylist: userLikedSongsAlbumPlaylist.songs });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  removeSongFromLikedSongs = () => {
    const userLikedSongsPlaylistId = this.props.authDetails.user.albumPlaylists[0];

    axios
      .get(`${API_URL}/albumPlaylists/${userLikedSongsPlaylistId}`)
      .then((response) => {
        const userLikedSongsAlbumPlaylist = response.data;
        const likedSongsAfterRemoved = userLikedSongsAlbumPlaylist.songs.filter((songId) => songId !== this.state.song._id);
        userLikedSongsAlbumPlaylist.songs = likedSongsAfterRemoved;

        axios
          .put(`${API_URL}/albumPlaylists/update/${userLikedSongsPlaylistId}`, userLikedSongsAlbumPlaylist)
          .then((response) => {
            const songRow = document.getElementById(`songRow/${this.state.song._id}`);
            const moreInfoPanel = songRow.children[2].children[1];
            moreInfoPanel.style.display = 'none';
            if (this._isMounted) {
              this.setState({ currentUsersLikedSongsAlbumPlaylist: likedSongsAfterRemoved });
              if (!this.props.isAlbum) {
                window.location.reload(false);
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div id={`songRow/${this.state.song._id}`} className="songRow">
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
                    artistId: this.state.artist._id,
                  },
                }}
              >
                {this.state.artist.name}
              </Link>
              &nbsp;&nbsp;
              <div className="songRowDetailsDot">•</div>
              &nbsp;&nbsp;
              <Link
                className="songRowDetailsLink"
                to={{
                  pathname: `/albums/${this.state.artist.name}/${this.state.albumPlaylist.name}`,
                  state: {
                    albumPlaylistId: this.state.albumPlaylist._id,
                  },
                }}
              >
                {this.state.albumPlaylist.name}
              </Link>
            </div>
          )}
        </div>
        <div className="songRowMusicMoreInfoIconContainer">
          <IoIosMore className="songRowMusicMoreInfoIcon noselect" />
          <div className="songRowMoreInfoPanel">
            {this.props.isAlbum ? (
              <div className="songRowMoreInfoOption" onClick={this.addSongToPlaylist}>
                Add to Playlist
              </div>
            ) : (
              <div className="songRowMoreInfoOption" onClick={this.removeSongFromPlaylist}>
                Remove from this Playlist
              </div>
            )}

            {!this.state.currentUsersLikedSongsAlbumPlaylist.includes(this.state.song._id) ? (
              <div className="songRowMoreInfoOption" onClick={this.addSongToLikedSongs}>
                Save to your Liked Songs
              </div>
            ) : (
              <div className="songRowMoreInfoOption" onClick={this.removeSongFromLikedSongs}>
                Remove from your Liked Songs
              </div>
            )}
          </div>
        </div>
        <div className="songRowMusicSongLength">{this.state.song.length}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSong: state.currentSong,
  songHistory: state.songHistory,
  authDetails: state.authDetails,
  songToAddToPlaylist: state.songToAddToPlaylist,
});

export default connect(mapStateToProps, {
  songChange,
  songPress,
  newSongAddedToHistory,
  singleSongPlayed,
  storeSongToBeAddedToPlaylist,
})(SongRow);
