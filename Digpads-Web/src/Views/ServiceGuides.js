import React from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';

import {
	Typography,
	Container,
	Button,
	Tooltip,
	Box,
	Grid,
	Snackbar,
	Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Nav/Header';
import Footer from '../components/Footer';
import ServiceGuidesCard from '../components/ServiceGuidesCard';
import styled from 'styled-components';
import { PageTitle, Banner } from '../components/styled/Page';
import { NarrowHeader } from '../components/styled/Page';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const StyledButtonText = styled(Typography)`
	&& {
		font-weight: bold;
		font-size: 1.5rem;
		@media (max-width: 673px) and (min-width: 512px) {
			font-size: 1rem;
		}
	}
`;

export default function ServiceGuides() {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<NarrowHeader>
				<Header />
			</NarrowHeader>

			<Banner>
				<PageTitle>Guides</PageTitle>
			</Banner>

			<Container sx={{ mt: 4, mb: 2 }} maxWidth='lg'>
				<Typography
					style={{
						marginBottom: '0.3em',
						fontSize: '16px',
						color: '#7a7a7a',
						fontWeight: '600',
					}}
				>
					digpads does extensive research on products and services commonly
					utilized by landlords so you don't have to! We filter through all the
					various providers of rental business needs and distill the very best
					providers, providing nuanced details to help you the right providers
					for your unique needs
				</Typography>

				<Tooltip title={disclaimerText} enterTouchDelay={0} leaveDelay={500}>
					<Typography variant='body2' component='label' color='primary'>
						Disclaimer
					</Typography>
				</Tooltip>
			</Container>

			<Typography
				sx={{ fontWeight: 'bold', color: 'rgba(36, 56, 161, 1)' }}
				variant='h4'
				component='h2'
				align='center'
				gutterBottom
			>
				How can digpads help you make the best decision for your needs?
			</Typography>

			<Container sx={{ mt: 4, mb: 2 }} maxWidth='lg'>
				<Grid
					container
					spacing={4}
					sx={{ marginBottom: '80px', justifyContent: 'center' }}
				>
					<Grid item xs={12} md={3}>
						<ScrollLink
							activeClass='active'
							to='guides'
							spy={true}
							smooth={true}
							offset={-80}
							duration={500}
						>
							<Box
								sx={{
									backgroundColor: 'rgba(19, 156, 234, 0.72)',
									cursor: 'pointer',
									borderRadius: '0.45em',
								}}
								display='flex'
								alignItems='center'
								justifyContent='center'
								height={140}
								width='100%'
							>
								<Typography
									style={{
										color: '#fff',
										fontWeight: 'bold',
									}}
									variant='h4'
									align='center'
								>
									{' '}
									Guides
								</Typography>
							</Box>
						</ScrollLink>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							display='flex'
							flexDirection='column'
							justifyContent='space-between'
							gap='0.4em'
						>
							<Button
								style={{
									width: 240,
									margin: '0 auto',
									display: 'block',
									marginBottom: 16,
									height: 60,
									background: 'orange',
								}}
								variant='contained'
								onClick={handleOpen}
							>
								<StyledButtonText>Match Me</StyledButtonText>
							</Button>

							<Typography
								sx={{ fontWeight: 'bold' }}
								color='primary'
								variant='h5'
								align='center'
							>
								Let digpads match <br /> your needs to a provider.
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={3}>
						<ScrollLink
							activeClass='active'
							to='company-comparisons'
							spy={true}
							smooth={true}
							offset={-80}
							duration={500}
						>
							<Box
								sx={{
									background: 'rgba(225, 205, 18, 0.76)',
									cursor: 'pointer',
									borderRadius: '0.45em',
								}}
								display='flex'
								alignItems='center'
								justifyContent='center'
								height={140}
								width='100%'
							>
								<Typography
									style={{ color: '#fff', fontWeight: 'bold' }}
									variant='h4'
									align='center'
								>
									{' '}
									Company
									<br />
									Comparisons
								</Typography>
							</Box>
						</ScrollLink>
					</Grid>
				</Grid>

				<section id='guides' style={{ marginBottom: '80px' }}>
					<Element name='guides'>
						<Typography
							color='tertiary'
							style={{
								fontWeight: 'bold',
								letterSpacing: '-0.00833em',
								fontSize: '40px',
								marginBottom: '0.3em',
							}}
							variant='h4'
						>
							Guides
						</Typography>

						<Divider />

						<Grid container spacing={4}>
							{guides.map((guide, index) => (
								<ServiceGuidesCard
									key={index}
									title={guide.title}
									image={'images/' + guide.image}
									href={`/serviceGuides${guide.url}`}
								/>
							))}
						</Grid>
					</Element>
				</section>

				<section id='companyComparisons'>
					<Element name='company-comparisons'>
						<Typography
							color='tertiary'
							style={{
								fontWeight: 'bold',
								letterSpacing: '-0.00833em',
								fontSize: '40px',
								marginBottom: '0.3em',
							}}
							variant='h4'
						>
							Company Comparisons
						</Typography>

						<Divider />

						<Grid container spacing={4}>
							<Grid item xs={12} sm={6} md={4}>
								<Link
									style={{ color: 'inherit' }}
									to='/serviceGuides/tenant-screening'
								>
									<Box
										mt={2}
										py={1}
										sx={{
											backgroundColor: 'green',
											cursor: 'pointer',
											borderRadius: '0.45em',
										}}
										display='flex'
										alignItems='center'
										justifyContent='center'
										width='100%'
									>
										<Typography
											variant='h4'
											sx={{ color: '#fff' }}
											align='center'
										>
											{' '}
											Tenant Screening
										</Typography>
									</Box>
								</Link>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Box
									mt={2}
									py={1}
									sx={{
										backgroundColor: 'rgb(22 135 249)',
										cursor: 'pointer',
										borderRadius: '0.45em',
									}}
									display='flex'
									alignItems='center'
									justifyContent='center'
									width='100%'
								>
									<Typography
										variant='h4'
										sx={{ color: '#fff' }}
										align='center'
									>
										{' '}
										Hard Money Loan
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Element>
				</section>
			</Container>

			<ServiceGuidesModal open={open} handleClose={handleClose} />

			<Footer />
		</>
	);
}

const disclaimerText = `While it in no way affects digpads determination
 of the ratings, digpads does receive a fee from some providers in exchange
for directing the right consumers on to them to purchase a product or service.`;

const guides = [
	{
		title: 'Tenant Screening Service Guide',
		image: '/service-guides/tenant_screening_report_card_image.jpeg',
		url: '/tenant-screening',
	},
	{
		title: 'Hard Money Loan Service Guide',
		image: '/service-guides/hard_money_loan_guide.jpeg',
		url: '',
	},
];

function ServiceGuidesModal(props) {
	const [alert, setAlert] = React.useState(false);

	const handleAlertOpen = () => {
		setAlert(true);
	};

	const handleAlertClose = () => {
		setAlert(false);
	};

	function getModalStyle() {
		const top = 50;
		const left = 50;

		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
			position: 'absolute',
		};
	}

	const body = (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				padding: '1em',
			}}
		>
			<h2
				id='simple-modal-title'
				style={{ color: 'white', maxWidth: '540px', textAlign: 'center' }}
			>
				In which product or service industry are you looking for a suggested
				provider?
			</h2>

			<Box
				display='flex'
				justifyContent='space-between'
				height='90px'
				flexDirection='column'
			>
				<Button
					size='small'
					variant='contained'
					color='primary'
					component={Link}
					to='/match-me/tenant-screening'
				>
					Tenant Screening
				</Button>
				<Button
					size='small'
					variant='contained'
					color='primary'
					onClick={handleAlertOpen}
				>
					Hard money loans
				</Button>
			</Box>
		</Box>
	);

	return (
		<div>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				{body}
			</Modal>
			{/* Temporarary Alert for Hard Money Loans selection. Please remove all alerts in this page once it is implemented */}
			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleAlertClose} severity='info'>
					COMING SOON !
				</Alert>
			</Snackbar>
		</div>
	);
}
