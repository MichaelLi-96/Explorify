import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//css
import "./assets/css/app.css"

//components
import Navbar from "./components/navbar";
import Playbar from "./components/playbar";
import Home from "./components/home";
// import DataTypes from "./components/pages/dataTypes";
// import ObjectOrientedProgramming from "./components/pages/oop";
// import DataStructures from "./components/pages/dataStructures";
// import Algorithms from "./components/pages/algorithms";
// import BigO from "./components/pages/bigO";
// import Sorting from "./components/pages/sorting";

class App extends Component {
  render() {
    return(
		<Router>
			<Navbar />
			<Route exact path='/' component={Home} />
			<Playbar />
		</Router>
    );
  }
}

export default App;