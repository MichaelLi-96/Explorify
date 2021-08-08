import React, { Component } from 'react';
import '../assets/css/accountButton.css';
import { withRouter } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { connect } from 'react-redux';
import { userLoggedOut, songToBeAddedToPlaylistCleared, currentSongCleared, songHistoryCleared } from '../actions';

class AccountButton extends Component {
  componentDidMount() {
    const accountButton = document.getElementById('accountButton');
    accountButton.addEventListener('click', () => {
      const downArrowIcon = accountButton.children[1];
      const upArrowIcon = accountButton.children[2];
      const panel = accountButton.children[3];

      if (upArrowIcon.style.display === '' || upArrowIcon.style.display === 'none') {
        downArrowIcon.style.display = 'none';
        upArrowIcon.style.display = 'block';
        panel.style.display = 'block';
      } else {
        downArrowIcon.style.display = 'block';
        upArrowIcon.style.display = 'none';
        panel.style.display = 'none';
      }
    });

    const accountButtonName = document.getElementById('accountButtonName');
    const name = this.props.authDetails.user.name;
    if (name.indexOf(' ') === -1) {
      accountButtonName.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      const firstName = name.substr(0, name.indexOf(' '));
      accountButtonName.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
  }

  logOut = () => {
    this.props.userLoggedOut();
    this.props.songToBeAddedToPlaylistCleared();
    this.props.currentSongCleared();
    this.props.songHistoryCleared();
    this.props.history.push('/');
  };

  render() {
    return (
      <div id="accountButton">
        <div id="accountButtonName" className="noselect"></div>
        <FaCaretDown id="downArrowIcon" className="accountButtonArrowIcon" />
        <FaCaretUp id="upArrowIcon" className="accountButtonArrowIcon" />
        <div id="accountButtonOptionPanel">
          <div id="accountButtonLogOut" className="accountButtonOptionPanelOption noselect" onClick={this.logOut}>
            Log out
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authDetails: state.authDetails
});

export default withRouter(
  connect(mapStateToProps, {
    userLoggedOut,
    songToBeAddedToPlaylistCleared,
    currentSongCleared,
    songHistoryCleared
  })(AccountButton)
);
