import React from 'react';
import Footer from 'components/Footer/index';
import Header from 'components/Nav/Header';

import HardMoneyCalculatorInput from 'components/calculator/Inputs';

function HardMoneyCalculator() {
	return (
		<div>
			<Header />
			<HardMoneyCalculatorInput />
			<div>
				{' '}
				<Footer />{' '}
			</div>
		</div>
	);
}

export default HardMoneyCalculator;
