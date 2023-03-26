import React from 'react';
import { Helmet } from 'react-helmet';

function createHelmet(props) {
	return (
		<Helmet>
			<meta property='twitter:title' content={props.title} />
			<meta property='twitter:description' content={props.description} />
			<meta property='twitter:image' content={props.image} />
			<meta property='twitter:image:alt' content={props.alt} />
			<meta property='twitter:site' content='@digPads' />
			<meta property='twitter:url' content={props.url} />
		</Helmet>
	);
}

export default createHelmet;
