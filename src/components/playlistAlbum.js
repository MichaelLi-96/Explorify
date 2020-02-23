import React, { Component } from "react";
import '../assets/css/playlistAlbum.css';
import { IoIosArrowBack, IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";

class PlaylistAlbum extends Component {
	componentDidMount() {
		const songs = document.getElementsByClassName("playlistAlbumSong");
		for(let i = 0; i < songs.length; i++) {
			const currentSong = songs[i];

			// Margin top spacing for first song
			if(i === 0) {
				currentSong.style.marginTop = "10%";
			}
			// Margin bottom spacing for first song
			if(i === songs.length - 1) {
				currentSong.style.marginBottom = "10%";
			}

			// On hover song, change music note icon to play icon
			currentSong.addEventListener("mouseenter", () => {
				const musicNote = currentSong.children[0].children[0];
				const play = currentSong.children[0].children[1];
				musicNote.style.display = "none";
				play.style.display = "block";
			})

			// On unhover song, change play icon to music note icon
			currentSong.addEventListener("mouseleave", () => {
				const musicNote = currentSong.children[0].children[0];
				const play = currentSong.children[0].children[1];
				musicNote.style.display = "block";
				play.style.display = "none";
			})

			// On click more info icon, show more info panel
			const moreInfoIcon = currentSong.children[2].children[0];
			moreInfoIcon.addEventListener("click", () => {
				const moreInfoPanel = currentSong.children[2].children[1];
				if(moreInfoPanel.style.display === "none") {
					moreInfoPanel.style.display = "block";
				}
				else {
					moreInfoPanel.style.display = "none";
				}
			})

			// Hide more info panel when mouse leaves song div
			currentSong.addEventListener("mouseleave", () => {
				const moreInfoPanel = currentSong.children[2].children[1];
				moreInfoPanel.style.display = "none";
			})

		}
	}

  	render() {
	    return(
			<div id="playlistAlbum">
				<IoIosArrowBack id="playlistAlbumBackButton" />
				<div id="playlistAlbumInfoContainer">
					<div id="playlistAlbumImg"></div>
					<div id="playlistAlbumName">Pallete</div>
					<div id="playlistAlbumArtist">IU</div>
					<div id="playlistAlbumPlayButton">Play</div>
					<div id="playlistAlbumYearAndSongs">2017 • 4 SONGS</div>
				</div>

				<div id="playlistAlbumSongsContainer">
					<div className="playlistAlbumSong">
						<div className="playlistAlbumMusicNoteIconContainer">
							<IoMdMusicalNote className="playlistAlbumMusicNoteIcon" />
							<IoMdPlay className="playlistAlbumPlayIcon" />
						</div>
						<div className="playlistAlbumSongInfo">
							<div className="playlistAlbumSongName">Through the Night</div>
							<div className="playlistAlbumSongArtist">IU</div>
						</div> 
						<div className="playlistAlbumMusicMoreInfoIconContainer">
							<IoIosMore className="playlistAlbumMusicMoreInfoIcon" />
							<div className="playlistAlbumMoreInfoPanel">
								<div className="playlistAlbumMoreInfoOption">Add to Playlist</div>
								<div className="playlistAlbumMoreInfoOption">Save to your Liked Songs</div>
							</div>
						</div>
						<div className="playlistAlbumMusicSongLength">4:13</div>
					</div>

					<div className="playlistAlbumSong">
						<div className="playlistAlbumMusicNoteIconContainer">
							<IoMdMusicalNote className="playlistAlbumMusicNoteIcon" />
							<IoMdPlay className="playlistAlbumPlayIcon" />
						</div>
						<div className="playlistAlbumSongInfo">
							<div className="playlistAlbumSongName">Through the Night</div>
							<div className="playlistAlbumSongArtist">IU</div>
						</div> 
						<div className="playlistAlbumMusicMoreInfoIconContainer">
							<IoIosMore className="playlistAlbumMusicMoreInfoIcon" />
							<div className="playlistAlbumMoreInfoPanel">
								<div className="playlistAlbumMoreInfoOption">Add to Playlist</div>
								<div className="playlistAlbumMoreInfoOption">Save to your Liked Songs</div>
							</div>
						</div>
						<div className="playlistAlbumMusicSongLength">4:13</div>
					</div>

					<div className="playlistAlbumSong">
						<div className="playlistAlbumMusicNoteIconContainer">
							<IoMdMusicalNote className="playlistAlbumMusicNoteIcon" />
							<IoMdPlay className="playlistAlbumPlayIcon" />
						</div>
						<div className="playlistAlbumSongInfo">
							<div className="playlistAlbumSongName">Through the Night</div>
							<div className="playlistAlbumSongArtist">IU</div>
						</div> 
						<div className="playlistAlbumMusicMoreInfoIconContainer">
							<IoIosMore className="playlistAlbumMusicMoreInfoIcon" />
							<div className="playlistAlbumMoreInfoPanel">
								<div className="playlistAlbumMoreInfoOption">Add to Playlist</div>
								<div className="playlistAlbumMoreInfoOption">Save to your Liked Songs</div>
							</div>
						</div>
						<div className="playlistAlbumMusicSongLength">4:13</div>
					</div>

					<div className="playlistAlbumSong">
						<div className="playlistAlbumMusicNoteIconContainer">
							<IoMdMusicalNote className="playlistAlbumMusicNoteIcon" />
							<IoMdPlay className="playlistAlbumPlayIcon" />
						</div>
						<div className="playlistAlbumSongInfo">
							<div className="playlistAlbumSongName">Through the Night</div>
							<div className="playlistAlbumSongArtist">IU</div>
						</div> 
						<div className="playlistAlbumMusicMoreInfoIconContainer">
							<IoIosMore className="playlistAlbumMusicMoreInfoIcon" />
							<div className="playlistAlbumMoreInfoPanel">
								<div className="playlistAlbumMoreInfoOption">Add to Playlist</div>
								<div className="playlistAlbumMoreInfoOption">Save to your Liked Songs</div>
							</div>
						</div>
						<div className="playlistAlbumMusicSongLength">4:13</div>
					</div>


					<div className="playlistAlbumSong">
						<div className="playlistAlbumMusicNoteIconContainer">
							<IoMdMusicalNote className="playlistAlbumMusicNoteIcon" />
							<IoMdPlay className="playlistAlbumPlayIcon" />
						</div>
						<div className="playlistAlbumSongInfo">
							<div className="playlistAlbumSongName">Through the Night</div>
							<div className="playlistAlbumSongArtist">IU</div>
						</div> 
						<div className="playlistAlbumMusicMoreInfoIconContainer">
							<IoIosMore className="playlistAlbumMusicMoreInfoIcon" />
							<div className="playlistAlbumMoreInfoPanel">
								<div className="playlistAlbumMoreInfoOption">Add to Playlist</div>
								<div className="playlistAlbumMoreInfoOption">Save to your Liked Songs</div>
							</div>
						</div>
						<div className="playlistAlbumMusicSongLength">4:13</div>
					</div>
					
				</div>
			</div>
	    );
  	}
}

export default PlaylistAlbum;