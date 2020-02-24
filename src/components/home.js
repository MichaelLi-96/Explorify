import React, { Component } from "react";
import ArtistPreview from "./artistPreview";
import SongPreview from "./songPreview";
import '../assets/css/home.css';

class Home extends Component {
  	render() {
	    return(
			<div id="home">
				<div id="homeTitle">Discover Weekly</div>
				<div id="homeListsContainer"> 
					<div id="homeSubtitle">Popular Artists</div>
					<div className="homeListContainer">
						<ArtistPreview 
							artistName="Zed" 
						/>
						<ArtistPreview 
							artistName="Zed" 
						/>
						<ArtistPreview 
							artistName="Zed" 
						/>
						<ArtistPreview 
							artistName="Zed" 
						/>
						<ArtistPreview 
							artistName="Zed" 
						/>
						<ArtistPreview 
							artistName="Zed" 
						/>
					</div>
					<div id="homeSubtitle">Featured Tracks</div>
					<div className="homeListContainer">
						<SongPreview 
							songName="Maps"
							songArtist="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							songArtist="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							songArtist="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							songArtist="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							songArtist="Maroon 5" 
						/>
					</div>
				</div>
			</div>
	    );
  	}
}

export default Home;