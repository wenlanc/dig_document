import React from 'react';
import Footer from 'components/Footer/index';
import Header from 'components/Nav/Header';

import TurnOverInputs from 'components/calculator/TurnOverInputs';

function HardMoneyCalculator() {
	return (
		<div>
			<Header />
			<TurnOverInputs />
			<div>
				{' '}
				<Footer />{' '}
			</div>
		</div>
	);
}

export default HardMoneyCalculator;
