import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import '../assets/css/navbar.css';
import { IoMdHome, IoMdSearch } from "react-icons/io";
import { MdQueueMusic } from "react-icons/md";


class Navbar extends Component {
  	render() {
	    return(
			<div id="navbar">
				<div id="logoContainer">
					<img id="logo" alt="Explorify" src={logo} />
					<div id="logoName">Explorify</div>
				</div>
				<ul>
				  <li>
				  	<IoMdHome className="icon" />
				  	Home
				  </li>
				  <li>
				  	<IoMdSearch className="icon" />
				  	Search
				  </li>
				  <li>
				  	<MdQueueMusic className="icon" />
				  	Playlists
				  </li>
				</ul>
			</div>
	    );
  	}
}

export default Navbar;