import React, { Component } from "react";
import ArtistPreview from "./artistPreview";
import SongPreview from "./songPreview";
import '../assets/css/home.css';

class Home extends Component {
  	render() {
	    return(
			<div id="home">
				<div id="title">Discover Weekly</div>
				<div id="listsContainer"> 
					<div id="subtitle">Popular Artists</div>
					<div className="listContainer">
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
					<div id="subtitle">Featured Tracks</div>
					<div className="listContainer">
						<SongPreview 
							songName="Maps"
							artistName="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							artistName="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							artistName="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							artistName="Maroon 5" 
						/>
						<SongPreview 
							songName="Maps"
							artistName="Maroon 5" 
						/>
					</div>
				</div>
			</div>
	    );
  	}
}

export default Home;