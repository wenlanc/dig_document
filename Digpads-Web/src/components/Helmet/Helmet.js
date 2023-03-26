import React from 'react';
import { Helmet } from 'react-helmet';

function createHelmet(props) {
	let metaTags = props.metas.map((one, index) => {
		return <meta name={one.name} key={index} content={one.content} />;
	});
	return <Helmet>{metaTags}</Helmet>;
}

export default createHelmet;
