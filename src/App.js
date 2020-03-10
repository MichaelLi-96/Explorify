import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "./url"
import { BrowserRouter as Router, Route  } from "react-router-dom";
import { connect } from 'react-redux';
import { checkedJwtToken } from './actions';

//css
import "./assets/css/app.css"

//components
import LandingPage from "./components/landingPage";
import LogIn from "./components/logIn";
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
		const newAuthState = {
			jwt: this.props.authDetails.jwt,
			userIsLoggedIn: this.props.authDetails.userIsLoggedIn, 
			user: this.props.authDetails.user
		}

		if(this.props.authDetails.jwt === "" || this.props.authDetails.jwt === null) {
			newAuthState.jwt = null;
			newAuthState.userIsLoggedIn = false;
			newAuthState.user = {};

			this.props.checkedJwtToken(newAuthState);
		}
		else {
			axios.post(`${API_URL}/auth/decodeJwt`, {
				token: this.props.authDetails.jwt
			})
		  	.then((response) => {
		  		if(!this.props.authDetails.userIsLoggedIn) {
					const userId = response.data.userId;
					axios.get(`${API_URL}/users/${userId}`)
				  	.then((response) => {
						newAuthState.userIsLoggedIn = true;
						newAuthState.user = response.data;
						this.props.checkedJwtToken(newAuthState);
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});
				}
		  	})
		  	.catch(function (error) {
				newAuthState.jwt = null;
				newAuthState.userIsLoggedIn = false;
				newAuthState.user = {};
				this.props.checkedJwtToken(newAuthState);
		  	})
		}
	}

	render() {
		return(
			<div id="app">
		  	  	{ !this.props.authDetails.userIsLoggedIn ? (
		  	  		<Router>
						<Route exact path='/' component={LandingPage} />
						<Route exact path='/logIn' component={LogIn} />
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
	checkedJwtToken
})(App);
