import React, { Component } from 'react';
import '../assets/css/landingPage.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div id="landingPage">
        <div id="landingPageLogoTitleContainer">
          <img id="landingPageLogo" className="noselect" alt="Explorify" src={logo} />
          <div id="landingPageTitlesContainer">
            <div id="landingPageTitle" className="noselect">
              Explorify
            </div>
            <div id="landingPageSubtitle" className="noselect">
              All your music in one place.
            </div>
          </div>
        </div>
        <Link id="landingPageLogInButton" to="/logIn">
          Log In
        </Link>
      </div>
    );
  }
}

export default LandingPage;
