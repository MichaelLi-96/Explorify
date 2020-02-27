import React, { Component } from "react";
import '../assets/css/artist.css';
import PlaylistAlbumPreview from "./playlistAlbumPreview";
import BackButton from "./backButton";
import { IoMdMusicalNote, IoIosMore, IoMdPlay } from "react-icons/io";

class Artist extends Component {
	componentDidMount() {
		const songs = document.getElementsByClassName("artistSong");
		for(let i = 0; i < songs.length; i++) {
			const currentSong = songs[i];

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
			<div id="artist">
				<BackButton />
				<div id="artistImageNameContainer">
					<div id="artistImage"></div>
					<div id="artistName">Zedd</div>
				</div>
				<div id="artistInfoContainer">
					<div className="artistSubtitle">Albums</div>
					<div id="artistAlbumContainer">
						<PlaylistAlbumPreview
							playlistAlbumName="name"
							numberOfSongs="19"
						/>
						<PlaylistAlbumPreview
							playlistAlbumName="name"
							numberOfSongs="19"
						/>
						<PlaylistAlbumPreview
							playlistAlbumName="name"
							numberOfSongs="19"
						/>
						<PlaylistAlbumPreview
							playlistAlbumName="name"
							numberOfSongs="19"
						/>
					</div>
					<div className="artistSubtitle">Popular Songs</div>
					<div id="artistSongsContainer">

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistSongPlays" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

												<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

						<div className="artistSong">
							<div className="artistMusicNoteIconContainer">
								<IoMdMusicalNote className="artistMusicNoteIcon" />
								<IoMdPlay className="artistPlayIcon" />
							</div>
							<div className="artistSongInfo">
								<div className="artistSongName">Through the Night</div>
								<div className="artistSongPlays">238,213</div>
							</div> 
							<div className="artistMusicMoreInfoIconContainer">
								<IoIosMore className="artistMusicMoreInfoIcon" />
								<div className="artistMoreInfoPanel">
									<div className="artistMoreInfoOption">Add to Playlist</div>
									<div className="artistMoreInfoOption">Save to your Liked Songs</div>
								</div>
							</div>
							<div className="artistMusicSongLength">4:13</div>
						</div>

					</div>
				</div>
			</div>
	    );
  	}
}

export default Artist;