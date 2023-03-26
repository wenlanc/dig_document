import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Stack, Button } from '@mui/material';

import Contact from '../assets/icons/contact.png';
import { SuiPageTitle } from 'components/styled/Page';
import Footer from 'components/Footer';
import Header from 'components/Nav/Header';

import {
	ContactHeader,
	ContactInformation,
	Email,
	HeaderInfo,
	ImageContainer,
	Phone,
	StyledContainer,
	StyledHeading,
	StyledImage,
	StyledParagh,
} from 'components/styled/Contact';

export default function ContactUs() {
	return (
		<>
			<Header />
			<ContactHeader>
				<HeaderInfo>
					<StyledHeading
						component='h1'
						sx={{ borderBottom: '1px solid #fff', mb: '0.3em' }}
					>
						Contact Us
					</StyledHeading>

					<StyledParagh>
						digpads welcomes and values feedback from our users.We'd love to
						hear your questions, thoughts, interesting trends and news in
						renting, tips on new developments in landlording, new offerings of
						interest to landlords and/or tenants, product improvement ideas,
						concepts for new products to help landlords and tenants, exploration
						of partnerships, interest in advertising on the site or any other
						constructive inquiries.
					</StyledParagh>
				</HeaderInfo>

				<ImageContainer style={{ padding: '10px', marginLeft: '5px' }}>
					<StyledImage src={Contact} alt='Contact us image' />
				</ImageContainer>
			</ContactHeader>

			<Footer renderSubscribe={false}>
				<StyledContainer sx={{ mb: 4, pb: '12em' }}>
					<ContactInformation>
						<SuiPageTitle component='h2'>Email Information</SuiPageTitle>
						<Email>info@digpads.com</Email>
					</ContactInformation>
					<ContactInformation
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<SuiPageTitle component='h2'>FAQs</SuiPageTitle>
						<Link to={'/faq'}>
							<Button
								variant='contained'
								color='primary'
								style={{ borderRadius: '20px' }}
							>
								Go to our FAQs page
							</Button>
						</Link>
					</ContactInformation>
					<ContactInformation>
						<SuiPageTitle component='h2'>Contact Information</SuiPageTitle>
						<Typography variant='body1' component='label'>
							digpads INC
						</Typography>
						<Typography
							variant='body1'
							component='a'
							href='https://www.google.com/maps/place/2209+Cherokee+St,+St.+Louis,+MO+63118,+USA/@38.5932171,-90.2257842,17z/data=!3m1!4b1!4m6!3m5!1s0x87d8b38a6f2e517b:0xf122638174c25abc!8m2!3d38.5932171!4d-90.2235955!16s%2Fg%2F11cpdvx7sb'
							sx={{ color: 'inherit' }}
						>
							2209 Cherokee St, St. Louis, MO 63118
						</Typography>
						<Phone>+ 1(314)-329-0033</Phone>
					</ContactInformation>
				</StyledContainer>
			</Footer>
		</>
	);
}
