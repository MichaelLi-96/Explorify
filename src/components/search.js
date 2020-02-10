import React, { Component } from "react";
import '../assets/css/search.css';
import { MdSearch } from "react-icons/md";

class Search extends Component {
  	render() {
	    return(
			<div id="search">
				<div id="title">Find artists, albums, or playlists</div>
				<div id="searchBarContainer">
					<MdSearch id="searchIcon" />
					<input type="text" placeholder="Search.." id="input" />
				</div>
			</div>
	    );
  	}
}

export default Search;