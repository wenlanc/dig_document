import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import styled from 'styled-components';

const Root = styled.div`
	::before {
		content: '';
		display: block;
		height: 75px; /* fixed header height*/
		margin: -75px 0 0; /* negative fixed header height */
	}
`;

function Instruction() {
	return (
		<Container>
			<Box py={8}>
				<Root id='instructions'>
					<Typography
						fontWeight='bold'
						variant='h3'
						component='h2'
						align='center'
						marginBottom='48px'
					>
						Hard Money Loan Calculator for Rental Property
						Acquisition
					</Typography>

					<Box mb={4}>
						<Typography variant='body1' gutterBottom>
							digpads Hard Money Loan Calculator for Landlords is
							intended to assist landlords analyzing the economic
							feasibility of taking on a hard money loan to fund
							the purchase of a rental property. This calculator
							can be utilized for most traditional loans as well
							by adjusting the loan inputs on the calculator
							according to the terms of the loan you are
							contemplating.{' '}
						</Typography>
					</Box>
					<Box mb={4}>
						<Typography
							fontWeight='bold'
							variant='h5'
							component='h3'
						>
							{' '}
							Instructions on Utilizing the Hard Money Calculator
						</Typography>{' '}
						<Typography variant='body1' gutterBottom>
							<ol>
								<li>
									Enter the values for each item that
									corresponds to the hard money loan type you
									are looking for or in discussions on.
									Reference the explanations below of the
									inputs if you are confused about what each
									value is.
								</li>
								<br />
								<li>
									Be sure to adjust for months, years,
									interest rates, flat fees, etc. utilizing
									the green selectors next to each variable.
								</li>
								<br />

								<li>
									If there are special features like balloon
									payments, prepayment penalties, interest
									only loan, no monthly payments, these can
									all be selected with the corresponding
									values related to them entered where
									required (ex. when the balloon payment is
									due).
								</li>
								<br />

								<li>
									Please note that in this calculator a payoff
									date may not exceed the balloon payment
									date.
								</li>
								<br />

								<li>
									When you are ready with the inputs for your
									loan analysis, hite “Calculate” on the hard
									money loan calculator and see your results
									in the Output section.
								</li>
								<br />

								<li>
									If you’d like, you can download an Excel
									copy of the Amortization Table for the
									values of your loan by clicking the
									“Download Amortization Table”.
								</li>
							</ol>
						</Typography>
					</Box>
					<Box mb={4}>
						<Typography
							fontWeight='bold'
							variant='h5'
							component='h3'
							gutterBottom
						>
							{' '}
							What is a hard money loan?
						</Typography>
						<Typography variant='body1' gutterBottom>
							A hard money loan is a loan backed not by the income
							of a company or a person but instead by the
							underlying asset or other assets. Hard money loans
							tend to have more stringent terms than traditional
							loans, including higher interest rates, balloon
							payments, prepayment penalties, and high origination
							fees.
						</Typography>
					</Box>
					<Box mb={4}>
						<Typography
							fontWeight='bold'
							variant='h5'
							component='h3'
							gutterBottom
						>
							{' '}
							When does a hard money loan make sense for a
							landlord?
						</Typography>
						<Typography variant='body1' gutterBottom>
							A hard money loan may make sense for a landlord if
							they do not have the capital or the income to obtain
							a traditional loan but have an economically
							profitable rental property to acquire. This could
							possibly include remodel or rehabilitation property
							opportunities for rentals depending on the lender.
							Hard money loans typically do not make sense if the
							landlord is losing money each month on the loan
							based on the rental price paid by a tenant.
							<br />
							<br />A hard money loan may also make sense if a
							landlord anticipates coming into cash to repay the
							loan or circumstances in the future that would allow
							them to obtain a more attractive loan than the hard
							money loan.
						</Typography>
					</Box>
					<Box mb={4}>
						<Typography
							fontWeight='bold'
							variant='h5'
							component='h3'
							gutterBottom
						>
							{' '}
							How can digpads’ Hard Money Loan Calculator help a
							landlord access the feasibility of a hard money
							loan?
						</Typography>
						<Typography variant='body1' gutterBottom>
							digpads Hard Money Loan Calculator can be used to
							calculate the total costs of a hard money loan over
							the life of the loan and to compare that monthly
							cost to the anticipated rent money the rental
							property could generate each month. This information
							helps a landlord determine if a hard money loan
							makes sense for a particular rental property
							acquisition opportunity or not.
							<br />
							<br />
							digpads Hard Money Loan Calculator may also be
							utilized to understand what the loan costs,
							repayment amount, and other unique variables will be
							related to the loan at certain times along the
							loan’s maturity.
							<br />
							<br />
							One way a landlord can utilize digpads’ Hard Money
							Loan Calculator is to back into the type of hard
							money loan the landlord will need to acquire a
							certain property and then go find hard money loan
							lenders that offer loans that meet your unique
							needs.
						</Typography>
					</Box>
					<Box mb={4}>
						<Typography
							fontWeight='bold'
							variant='h5'
							component='h3'
							gutterBottom
						>
							{' '}
							Who are the top hard money lenders in the country?
						</Typography>
						<Typography variant='body1' gutterBottom>
							Hard money lenders can be national, local, or both.
							digpads provides a comprehensive Guide on Hard Money
							Loan Providers that we highly recommend you check
							out.
						</Typography>
						<br />
						<u>
							Inputs to Hard Money Loan Calculator for Landlords
						</u>
						<br />
						<br />
						<Typography variant='body1' gutterBottom>
							<b>Purchase Price -</b> The purchase price is the
							price that is being paid to acquire the rental
							property. This includes the down payment you will
							pay as that will be deducted from the purchase price
							to get to the loan principal amount.
							<br />
							<br />
							<b>Estimated Monthly Rent -</b> The estimated
							monthly rent is the monthly rent amount that the
							property to be acquired should be able to generate.
							If you don’t know what this amount is, ask your
							realtor or do research on what a similar property in
							a similar condition in the area rents for.
							<br />
							<br />
							<b>Loan Term Length -</b> Loan term length is how
							long the loan will last in either years or months.
							<br />
							<br />
							<b>Monthly Administrative Fees -</b> Some lenders
							may charge a monthly administration fee to collect
							and process your monthly payment on the loan. Add
							this amount or any other monthly fees charged by the
							lender here.
							<br />
							<br />
							<b>Annual Interest Rate -</b> The annual interest
							rate is the rate charged annually on the loan as
							stated by the lender.
							<br />
							<br />
							<b>Origination Fees -</b> Many lenders charge
							origination fees to the lender, in this case the
							landlord, for being issued a loan. These can be paid
							in cash as a part of the down payment or amortized
							over the life of the loan if the lender gives this
							option.s stated by the lender.
							<br />
							<br />
							<b>Amortized Origination Fees? - </b> This option
							gives the landlord the ability to include the
							origination fees in the loan amortization or to pay
							them in cash when the loan closes.
							<br />
							<br />
							<b>Balloon Payment? - </b> A balloon payment is a
							payment that is due in full at a specific time
							period in the future. Many loans may be calculated
							as if they are 15 year or 30 year loans but have a
							balloon payment at some point in the future. Balloon
							payments are a common feature for hard money loans.
							<br />
							<br />
							<b>Months till Balloon Payment Due - </b> This is
							the number of months that occur before the balloon
							payment feature of a loan becomes due.
							<br />
							<br />
							<b>Interest Only? - </b> Some loans require a lender
							to only pay the interest on the loan until the
							principal is due or the property is sold and the
							loan is repaid. This can be beneficial to landlords
							in some circumstances as it reduces their monthly
							payment amount on the loan.
							<br />
							<br />
							<b>Monthly Payments? - </b> Some loans do not
							require monthly payments, accruing all interest
							along with the principal until the end of the loan.
							<br />
							<br />
							<b>Prepayment Penalty? -</b> Some loans have
							prepayment penalties and hard money loans are more
							likely to have these than more traditional loan
							products. A prepayment penalty is a penalty a
							borrower must pay if they pay back the loan earlier
							than the set term. For example, if a landlord takes
							a 30 year loan with a balloon payment in 24 months
							and repays it in 14 months then a prepayment penalty
							will apply if built into the loan agreement.
							<br />
							<br />
							digpads Hard Money Loan Calculator allows for a
							landlord to enter a fixed prepayment amount or a
							percentage of the ending balance from the time
							period that the loan is paid off to calculate the
							prepayment amount.
							<br />
							<br />
							<b>Prepayment Amount or % of Balance -</b> If the
							loan you are considering has a prepayment penalty,
							this is where you can enter the amount. If it’s a
							percentage of the balance at the time the loan is
							paid off, simply add the percentage. If there is a
							more complicated calculation, you can enter whatever
							whole number you’d like to be added to the
							calculation of total costs for the loan.
							<br />
							<br />
							<b>Estimated Months Till Payoff Date -</b>The
							Estimated Months Till Payoff Date section allows the
							landlord to enter the number of months until they
							anticipate paying off the loan. This will calculate
							the remaining loan balance, interest paid, and any
							prepayment penalties associated with paying off the
							loan at the time the landlord indicates.
							<br />
							<br />
							<b>Estimated Months Till Payoff Date -</b>The
							Estimated Months Till Payoff Date section allows the
							landlord to enter the number of months until they
							anticipate paying off the loan. This will calculate
							the remaining loan balance, interest paid, and any
							prepayment penalties associated with paying off the
							loan at the time the landlord indicates.
							<br />
							<br />
							<u> Outputs to Hard Money Loan Calculator</u>
							<br />
							<br />
							<b>Loan Principal Amount -</b> This is the total
							amount of the loan that is calculated by deducting
							the downpayment from the purchase price and adding
							any origination fees associated with the loan
							agreement.
							<br />
							<br />
							<b>Estimated Monthly Payment -</b> This is the
							estimated monthly payment that a landlord will need
							to pay for the loan.
							<br />
							<br />
							<b>Any Administrative Fees -</b> This is the output
							as entered in the input for administrative fees.
							<br />
							<br />
							<b>Total Monthly Loan Cost - </b> This is the total
							monthly loan costs that combines the estimated
							monthly payment with the administrative fees.
							<br />
							<br />
							<b>Payoff Due in Month (X) - </b> This is the payoff
							amount at the designated period either at the
							ballooning of the loan or if the loan is paid off
							early as indicated by the landlord in the input
							section.
							<br />
							<br />
							<b>Prepayment Penalty - </b> This is the calculated
							prepayment penalty as entered by the landlord in the
							inputs section or as a percentage of the ending
							balance in the period indicated.
							<br />
							<br />
							<b>Total Loan Cost - </b> The total loan cost is the
							calculated Interest + Origination Fees + any
							prepayment penalties.
							<br />
							<br />
							<b>Total Principal Repaid During Term - </b> The
							total principal repaid is the total amount of
							principal that has been paid until the payoff date.
							<br />
							<br />
							<b>Monthly Profit after Loan Costs -</b> The monthly
							profit after loan costs is the monthly profit on the
							rental property after the loan costs are covered.
							<br />
							<br />
							<b>Amortization Table for Loan - </b> The
							Amortization Table of the Loan is the calculation of
							the beginning loan balance, the interest, less the
							monthly payment, and the ending loan balance for
							each period of the loan agreement until the payoff
							date.
							<br />
							<br />
						</Typography>
					</Box>
				</Root>
			</Box>
		</Container>
	);
}

export default Instruction;
