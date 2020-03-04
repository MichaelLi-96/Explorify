import React, { Component } from "react";
import '../assets/css/artistPreview.css';
import axios from "axios";
import { MdInfo } from "react-icons/md";
import { Link } from "react-router-dom";

class ArtistPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			artist: {}
		}
	}

	componentDidMount() {
		axios.get(`http://localhost:4000/artists/${this.props.artistId}`)
	  	.then((response) => {
	  		this.setState({ artist: response.data, loading: false });
	  	})
	  	.catch(function (error) {
	  		console.log(error);
	  	});
	}

  	render() {
	    return(
			<div className="artistPreviewContainer">
				<img src={this.state.artist.imageUrl} alt={this.state.artist.name} className="artistPreviewImg"></img>
				<Link 
					className="artistPreviewIconContainer" 
					to={{
						pathname: `/artists/${this.state.artist.name}`,
						state: {
							artistId: this.state.artist._id
						}
					}}
				>
					<MdInfo className="artistPreviewMoreInfoIcon" />
				</Link>
				<div className="artistPreviewName">{this.state.artist.name}</div>
			</div>
	    );
  	}
}

export default ArtistPreview;