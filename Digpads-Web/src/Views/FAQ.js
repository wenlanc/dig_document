import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Header from 'components/Nav/Header';
import Footer from 'components/Footer';
import { PageTitle, Banner, SuiPageTitle } from 'components/styled/Page';

export default function FAQ() {
	return (
		<>
			<Header />

			<Banner>
				<PageTitle>FAQs</PageTitle>
			</Banner>

			<Container sx={{ maxWidth: '700px', m: '1em auto' }}>
				<SuiPageTitle
					component='label'
					sx={{ span: { color: 'rgb(26 73 153)' } }}
				>
					<span>F</span>requently <span>A</span>sked <span>Q</span>uestions
				</SuiPageTitle>

				<Stack spacing={4} component='ol'>
					<li style={{ fontSize: '1.5rem' }}>
						<Typography variant='h5' color='tertiary' component='h2'>
							What is digpads?
						</Typography>

						<Typography variant='body1'>
							digpads is an online platform that provides free and paid services
							to independent landlords and those involved in the residential
							real estate industry.
						</Typography>
					</li>

					<li style={{ fontSize: '1.5rem' }}>
						<Typography variant='h5' color='tertiary' component='h2'>
							What products does digpads offer?
						</Typography>

						<div>
							<Typography variant='body1'>
								digpads’ primary value propositions to independent landlords
								includes:
							</Typography>

							<ul style={{ paddingLeft: '2em', listStyle: 'disc' }}>
								<li>
									<Typography variant='body1'>
										News &amp; Research and Knowledge that provide current
										information and resource articles on the landlord business.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										Landlord Forum which allows independent landlords to
										collaborate with
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										Service Guides are heavily researched industry guides
										helping landlords make the right choice for each service for
										their particular and unique needs.
									</Typography>
								</li>

								<li>
									<Typography variant='body1'>
										Landlord Tools which enables landlords to store, send,
										organize, and run their own tenant screening process will
										expand into a full property management platform overtime.
									</Typography>
								</li>
							</ul>
						</div>
					</li>

					<li style={{ fontSize: '1.5rem' }}>
						<Typography variant='h5' color='tertiary' component='h2'>
							How is digpads different from its competitors?
						</Typography>

						<Typography variant='body1'>
							digpads was founded by independent landlords for independent
							landlords. Our goal is to produce amazing products for free and at
							very low cost to help landlords getting started and to grow with
							them, providing increasingly valuable products and services, to
							help landlords scale their business.
						</Typography>
					</li>
				</Stack>
			</Container>

			<Footer />
		</>
	);
}
