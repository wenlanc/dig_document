import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Nav/Header';

export default function PageWrapper(props) {
	return (
		<>
			<Header />
			{props.children}
			<Footer renderSubscribe={false} />
		</>
	);
}
