import React, { Component } from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import { connect } from 'react-redux';
import { songChange, songPress, newSongAddedToHistory, singleSongPlayed } from './actions';

//css
import "./assets/css/app.css"

//components
import LandingPage from "./components/landingPage";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Navbar from "./components/navbar";
import Playbar from "./components/playbar";
import Home from "./components/home";
import Search from "./components/search";
import YourLibrary from "./components/yourLibrary";
import AlbumPlaylist from "./components/albumPlaylist";
import Artist from "./components/artist";
import AccountButton from "./components/accountButton";

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
		}
	}

	componentDidMount() {
		console.log(localStorage.getItem("jwt"));
	}

	render() {
		return(
			<div id="app">
		  	  	{ this.props.authDetails.userIsLoggedIn ? (
		  	  		<Router>
						<Route exact path='/' component={LandingPage} />
						<Route exact path='/signIn' component={SignIn} />
						<Route exact path='/signUp' component={SignUp} />
					</Router>
		  	  	) : (
					<Router>
						<Route exact path='/' component={Home} />
						<Route exact path='/search' component={Search} />
						<Route exact path='/yourLibrary' component={YourLibrary} />	
						<Route exact path='/artists/:artistname' component={Artist} />
						<Route exact path='/albums/:artistname/:albumname' component={AlbumPlaylist} />
						<AccountButton />
						<Navbar />
						<Playbar />
					</Router>
				)}
			</div>
	    );
	}
}

const mapStateToProps = state => ({ 
	authDetails: state.authDetails
});

export default connect(mapStateToProps, { 
	songChange,
	songPress,
	newSongAddedToHistory,
	singleSongPlayed
})(App);
