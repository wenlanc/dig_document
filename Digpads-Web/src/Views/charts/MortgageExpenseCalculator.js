import React from 'react';
import Footer from 'components/Footer/index';
import Header from 'components/Nav/Header';

import MortgageCalculator from 'components/calculator/MortgageCalculator';

function MortgageExpenseCalculator() {
	return (
		<div>
			<Header />
			<MortgageCalculator />
			<div>
				{' '}
				<Footer />{' '}
			</div>
		</div>
	);
}

export default MortgageExpenseCalculator;
