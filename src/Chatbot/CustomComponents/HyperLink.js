import React from "react";
import './HyperLinkStyle.css';

const HyperLink = (props) => {
	console.log(props.link)
	return(
		<div className="HyperLink-Container">

			<span className="Link">🔗</span>
			<a rel="noopener noreferrer" href={String(props.link)}>{props.link}</a>

		</div>

		);

}

export default HyperLink