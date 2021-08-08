import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/navbar.css';
import { IoMdHome, IoMdSearch } from 'react-icons/io';
import { MdQueueMusic } from 'react-icons/md';

class Navbar extends Component {
  render() {
    return (
      <div id="navbar" className="noselect">
        <div id="navbarLogoContainer">
          <img id="navbarLogo" alt="Explorify" src={logo} />
          <div id="navbarLogoName">Explorify</div>
        </div>
        <ul>
          <li>
            <NavLink exact className="link" activeClassName="linkActive" to="/">
              <IoMdHome className="navbarIcon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" activeClassName="linkActive" to="/search">
              <IoMdSearch className="navbarIcon" />
              Search
            </NavLink>
          </li>
          <li>
            <NavLink className="link" activeClassName="linkActive" to="/yourLibrary">
              <MdQueueMusic className="navbarIcon" />
              Your Library
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
