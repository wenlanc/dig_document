import React from 'react';
import { Helmet } from 'react-helmet';

function createHelmet(props) {
	return (
		<Helmet>
			<meta property='og:type' content={props.type} />
			<meta property='og:title' content={props.title} />
			<meta property='og:description' content={props.description} />
			<meta property='og:image' content={props.image} />
			<meta property='og:site_name' content='digpads' />
			<meta property='og:url' content={props.url} />
		</Helmet>
	);
}

export default createHelmet;
