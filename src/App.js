import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//css
import "./assets/css/app.css"

//components
import Navbar from "./components/navbar";
import Playbar from "./components/playbar";
import Home from "./components/home";
import Search from "./components/search";
import yourLibrary from "./components/yourLibrary";

class App extends Component {
  render() {
    return(
		<Router>
			<Navbar />
			<Route exact path='/' component={Home} />
			<Route exact path='/search' component={Search} />
			<Route exact path='/yourLibrary' component={yourLibrary} />		
			<Playbar />
		</Router>
    );
  }
}

export default App;