import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, LabelList, YAxis } from 'recharts';
import {
	ChartContainer,
	Title,
	FAQContainer,
	Definitions,
} from 'components/styled/charts';
import styled from 'styled-components';
import { Container, Typography, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import Header from 'components/Nav/Header';
import Footer from 'components/Footer';
import { PageTitle, Banner } from 'components/styled/Page';
import { set } from 'js-cookie';

export const StyledFieldRatio = styled(TextField)`
	width: 120px;
	margin-left: 1%;
`;
export const StyledIncomeField = styled(TextField)`
	width: 250px;
	margin-left: 100px;
	marginleft: 40px;
	width: 150px;
`;
export const BarContainer = styled.div`
	border-left: 1px solid black;
	border-bottom: 1px solid black;
	width: 450px;
	margin-left: 50px;
`;
export const StyledCustomContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 8px;
`;

export default function Charts() {
	const [income, setIncome] = useState(0);
	const [customPercent, setCustomPercent] = useState(30);
	const [rentToIncomeRatio, setRentToIncomeRatio] = useState(0);
	const [data, setData] = useState([]);
	const [customError, setCustomError] = useState(false);
	const [incomeError, setIncomeError] = useState(false);
	const [view, setView] = useState(false);

	const showIncomeLabel = (props) => {
		const { x, y, width } = props;

		let tempY = y;
		if (y > 266.42) {
			tempY = 266.42;
		}

		return (
			<g transform='translate(95 0)'>
				<text
					x={0}
					y={tempY - 9}
					fontSize='0.98rem'
					textAnchor='middle'
					fontWeight='500'
				>
					<tspan x='0' dy='1.2em'>
						Tenant can afford
					</tspan>
					<tspan x='0' dy='1.2em'>
						$
						{rentToIncomeRatio
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
						a month
					</tspan>
				</text>
			</g>
		);
	};

	const showInstructionLabel = (props) => {
		const { x, y, width } = props;

		if (rentToIncomeRatio >= 8000) {
			setView(true);

			return (
				<g transform='translate(220 115)'>
					<text
						x={0}
						y={0}
						fill='red'
						fontSize='1.5rem'
						textAnchor='middle'
					>
						<tspan x='0' dy='1.2em'>
							Exceeded calculated
						</tspan>
						<tspan x='0' dy='1.2em'>
							limits
						</tspan>
					</text>
				</g>
			);
		} else {
			return (
				<g transform='translate(220 115)'>
					<text
						x={0}
						y={0}
						fill='#7cb45c'
						fontSize='1.5rem'
						fontWeight='500'
						textAnchor='middle'
					>
						<tspan x='0' dy='1.2em'>
							How much rent can
						</tspan>
						<tspan x='0' dy='1.2em'>
							a prospective tenant
						</tspan>
						<tspan x='0' dy='1.2em'>
							afford?
						</tspan>
					</text>
				</g>
			);
		}
	};

	const handleRentToIncomeRatioChange = useCallback(() => {
		const amount = (customPercent * income) / 100 / 12;
		setRentToIncomeRatio(Math.round(amount));
		setData([]);
	}, [customPercent, income]);

	useEffect(() => {
		handleRentToIncomeRatioChange();
		const incomeInfo = [{ amount: rentToIncomeRatio }];
		setData(incomeInfo);
		if (rentToIncomeRatio < 8000 || !rentToIncomeRatio) {
			setView(false);
		}
	}, [income, customPercent, rentToIncomeRatio]);

	return (
		<>
			<Header />
			<Banner>
				<PageTitle>Rent-to-Income Calculator</PageTitle>
			</Banner>

			<ChartContainer>
				<div
					style={{
						backgroundColor: '#f4f7fd',
						border: '2px solid #f6f6f6',
					}}
				>
					<Container maxWidth='md'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: '3em',
								marginTop: '4em',
							}}
						>
							<div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<span
											style={{
												marginLeft: '0px',
												fontWeight: '700',
											}}
										>
											Enter Tenant Annual Income
										</span>
										<span style={{ fontSize: '0.8rem' }}>
											Up to $200,000
										</span>
									</div>
									<div>
										<StyledIncomeField
											label='Enter Income'
											name='income'
											type='text'
											variant='outlined'
											size='small'
											onChange={(e) => {
												let x = e.target.value;
												const regex = new RegExp(
													/^\$?([0-9]|[0-9],)*[0-9]$/
												);
												let match = regex.test(x);
												if (match) {
													x = x.replaceAll(',', '');
													if (x.startsWith('$'))
														x = x.slice(1);
												} else {
													setIncomeError(true);
												}
												if (!e.target.value)
													setIncomeError(false);

												setIncome(x);
											}}
										/>
									</div>{' '}
								</div>
								{incomeError && (
									<span
										style={{
											fontSize: '0.8rem',
											color: 'red',
										}}
									>
										Please enter a valid income
									</span>
								)}
								<p
									style={{
										fontWeight: '500',
										textDecoration: 'underline',
									}}
								>
									% of Tenant Income
								</p>
								<div>
									<span>20% </span>
									<Checkbox
										checked={
											customPercent === 20 ? true : false
										}
										onClick={() => {
											setCustomError(false);
											setCustomPercent(20);
										}}
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
										color='primary'
									/>
								</div>
								<div>
									<span>30% </span>
									<Checkbox
										checked={
											customPercent === 30 ? true : false
										}
										onClick={() => {
											setCustomError(false);
											setCustomPercent(30);
										}}
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
										color='primary'
									/>
								</div>
								<div>
									<span>40 %</span>
									<Checkbox
										checked={
											customPercent === 40 ? true : false
										}
										onClick={() => {
											setCustomError(false);
											setCustomPercent(40);
										}}
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
										color='primary'
									/>
								</div>
								<StyledCustomContainer>
									<span style={{ marginRight: '20px' }}>
										Custom % :{' '}
									</span>
									<StyledFieldRatio
										label='Enter %'
										name='percentage'
										type='text'
										variant='outlined'
										size='small'
										onChange={(e) => {
											let x = e.target.value;
											const regex = new RegExp(
												/^[0-9]+%?$/
											);
											let match = regex.test(x);
											if (match) {
												setCustomError(false);
												x = x.replace('%', '');
											} else {
												setCustomError(true);
											}
											if (!e.target.value)
												setCustomError(false);
											setCustomPercent(x);
										}}
									/>
								</StyledCustomContainer>
								{customError && (
									<span
										style={{
											fontSize: '0.8rem',
											color: 'red',
										}}
									>
										Please enter a valid percentage
									</span>
								)}
							</div>
							<div>
								<BarContainer>
									<BarChart
										width={500}
										height={300}
										data={data}
										margin={{
											top: 5,
											right: 30,
											bottom: 5,
										}}
										barSize={80}
									>
										<YAxis
											domain={[50, 8000]}
											hide={true}
										/>
										<Bar
											dataKey='amount'
											fill={
												view
													? 'rgb(244, 247, 253)'
													: '#E69039'
											}
										>
											{rentToIncomeRatio < 8000 &&
											rentToIncomeRatio > 0 ? (
												<LabelList
													dataKey='amount'
													content={showIncomeLabel}
													position='left'
												/>
											) : (
												<LabelList
													content={
														showInstructionLabel
													}
													position='center'
												/>
											)}
										</Bar>
									</BarChart>
								</BarContainer>
							</div>
						</div>

						<Title
							variant='h6'
							style={{
								fontWeight: 'bold',
								marginBottom: '1em',
								color: 'rgb(12,106,203)',
							}}
							gutterBottom
						>
							Rent-to-Income Calculator Instructions
						</Title>

						<Typography variant='body1' gutterBottom>
							After calculating the tenant’s projected annual
							income, select the appropriate % of tenant income
							that is should be dedicated to rent that is common
							for the area the rental property is located in. The
							default ratio of income-to-rent is set at 30%,
							indicating that a prospective tenant may only afford
							up to ⅓ of their annual income on rent each month.
							Then enter the estimated prospective tenant annual
							income in the box labeled as such. The number that
							pops up next to the bar is the amount of rent the
							prospective tenant can afford to pay each month
							based on the data entered.
						</Typography>
					</Container>
				</div>
				<div style={{ marginBottom: '2em' }}></div>

				<FAQContainer maxWidth='md'>
					<ul>
						<li>
							<Title>
								What is the Rent-to-Income Calculator?
							</Title>
							<Typography variant='body1'>
								The digpads Income-to-Rent Calculator allows
								landlords to calculate the estimated maximum
								rent amount a prospective tenant is able to pay
								based on their income and what is common for the
								local real estate market.
							</Typography>
						</li>
						<li>
							<Title>
								How does a landlord utilize the Ratio of Rent-to
								Income?
							</Title>

							<Typography variant='body1'>
								Landlords utilize the ratio of rent-to-income
								calculator either when determining what the
								parameters they need a prospective tenant to
								fall within are or calculating the estimated
								maximum rent amount any prospective tenant is
								able to afford based on the tenant’s personal
								income situation and the typical ratio of
								income-to-rent in the local area.
							</Typography>
						</li>
						<li>
							<Title>
								What is the fixed ratio in this calculator?
							</Title>
							<Typography variant='body1'>
								The fixed ratio is 30% in this calculator. This
								metric was historically utilized with a 30%
								ratio, assuming that a tenant should spend no
								more than 30% of their annual income on rent. It
								may be adjusted by selecting the 20% or 40%
								buttons or by entering a custom percentage.
							</Typography>
							<Typography
								variant='body1'
								style={{ marginBottom: '2rem' }}
							>
								This metric was historically utilized with a 30%
								ratio, assuming that a tenant should spend no
								more than 30% of their annual income on rent.
							</Typography>
						</li>
						<li>
							<Title>
								Why would a landlord adjust the rent-to-income
								ratio percentage?
							</Title>

							<Typography
								variant='body1'
								style={{ marginBottom: '2rem' }}
							>
								If the 30% ratio for the rent-to-income
								calculator is not reflective of the average
								situation in the local real estate market then a
								landlord may want to adjust the ratio.
							</Typography>

							<Typography
								variant='body1'
								style={{ marginBottom: '2rem' }}
							>
								In some local real estate markets, such as New
								York City or San Francisco, tenants spend more
								than 30% of their annual income on rental costs
								and are considered used to making the adjustment
								as needed.
							</Typography>

							<Typography
								variant='body1'
								style={{ marginBottom: '2rem' }}
							>
								Please remember that the lower this ratio, the
								better, as it means tenants have more cash to
								pay for other expenses in life as the percentage
								that rent takes of their income is lower.
							</Typography>
						</li>
						<li>
							<Title>
								Are there situations where the rent-to-income
								ratio calculator should not be followed?
							</Title>
							<Typography
								variant='body1'
								style={{ marginBottom: '2rem' }}
							>
								The most common situation where a rent-to-income
								ratio is not useful is when a prospective tenant
								has sufficient assets to support their lease
								obligations and so their income is not of as
								much importance to a landlord.
							</Typography>
							<Typography variant='body1'>
								Landlords should be sure to verify any assets
								that a prospective tenant claims to have to
								ensure there are funds available to pay the
								rent.
							</Typography>
						</li>

						<li>
							<Typography
								variant='body1'
								style={{
									textDecoration: 'underline',
									marginBottom: '1.2em',
								}}
							>
								<Title>Definitions:</Title>
							</Typography>
							<Definitions>
								<li>
									<Typography variant='body1'>
										<span
											style={{
												fontWeight: 'bold',
												marginBottom: '2rem',
												color: 'rgb(12,106,203)',
											}}
										>
											Projected Annual Income:
										</span>{' '}
										This is the prospective tenant’s income
										that is annualized. The easiest way to
										do this is to calculate the average
										tenant’s monthly income over the last
										three months and then multiply that by
										four to get the estimated annual income.
										If a tenant’s income is uneven, and/or
										the income averages are changing over
										time, a landlord may want to consider
										discounting the unstable income to be
										conservative.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										<span
											style={{
												fontWeight: 'bold',
												marginBottom: '1rem',
												color: 'rgb(12,106,203)',
											}}
										>
											Rent-to-Income Ratio:
										</span>{' '}
										This is the percentage of the
										prospective tenant’s income that is
										assumed to be the maximum amount the
										tenant can pay in rent.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										<span
											style={{
												fontWeight: 'bold',
												marginBottom: '1rem',
												color: 'rgb(12,106,203)',
											}}
										>
											Landlord:
										</span>{' '}
										The landlord is likely you, the reader,
										and is the person who leases a rental
										property to a tenant and is responsible
										for keeping the rental property in good
										condition in exchange for rent money.
										The landlord’s concern with the
										rent-to-income ratio is ensuring that a
										prospective tenant will be able to pay
										the rent each month without being
										financially strained.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										<span
											style={{
												fontWeight: 'bold',
												marginBottom: '1rem',
												color: 'rgb(12,106,203)',
											}}
										>
											Prospective Tenant:
										</span>{' '}
										The prospective tenant is the one who
										leases a home from a landlord and must
										pay rent in exchange for this right to
										live in the property. It’s the
										prospective tenant’s income that the
										Rent-to-Income Calculator is calculating
										the estimated maximum rent for.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										<span
											style={{
												fontWeight: 'bold',
												color: 'rgb(12,106,203)',
											}}
										>
											Rent:
										</span>{' '}
										Rent is the monthly or annual amount a
										tenant must pay a landlord per the lease
										agreement to live in the rental home.
										The whole purpose of the rent-to-income
										calculator is to determine what amount
										of rent a prospective tenant is able to
										afford.
									</Typography>
								</li>
							</Definitions>
						</li>
					</ul>
				</FAQContainer>
			</ChartContainer>
			<Footer />
		</>
	);
}
