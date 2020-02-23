import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//css
import "./assets/css/app.css"

//components
import Navbar from "./components/navbar";
import Playbar from "./components/playbar";
import Home from "./components/home";
import Search from "./components/search";
import YourLibrary from "./components/yourLibrary";
import PlaylistAlbum from "./components/playlistAlbum";
import Artist from "./components/artist";
import AccountButton from "./components/accountButton";

class App extends Component {
  render() {
    return(
		<Router>
			<Route exact path='/' component={Artist} />
			<Route exact path='/search' component={Search} />
			<Route exact path='/yourLibrary' component={YourLibrary} />	
			<AccountButton />
			<Navbar />
			<Playbar />
		</Router>
    );
  }
}

export default App;