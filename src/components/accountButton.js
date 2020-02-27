import React, { Component } from "react";
import '../assets/css/accountButton.css';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

class AccountButton extends Component {
	componentDidMount() {
		const accountButton = document.getElementById("accountButton");
		accountButton.addEventListener("click", () => {
			const downArrowIcon = accountButton.children[1];
			const upArrowIcon = accountButton.children[2];
			const panel = accountButton.children[3];

			if(upArrowIcon.style.display === "none") {
				downArrowIcon.style.display = "none";
				upArrowIcon.style.display = "block";
				panel.style.display = "block";
			}
			else {
				downArrowIcon.style.display = "block";
				upArrowIcon.style.display = "none";
				panel.style.display = "none";
			}
		})
	}

  	render() {
	    return(
			<div id="accountButton">
				<div className="noselect">Michael</div>
				<FaCaretDown id="downArrowIcon" className="accountButtonArrowIcon" />
				<FaCaretUp id="upArrowIcon" className="accountButtonArrowIcon" />
				<div id="accountButtonOptionPanel">
					<div className="accountButtonOptionPanelOption noselect">Log out</div>
					<div className="accountButtonOptionPanelOption noselect">Log out</div>
				</div>
			</div>
	    );
  	}
}

export default AccountButton;