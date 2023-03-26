import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Subscribe from '../Subscribe';
import Logo from '../Nav/Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Typography from '@mui/material/Typography';
import { device } from '../MediaSizes';

// ===== Subscribe & footer ======
const StyledFooter = styled.footer`
	padding-top: ${(props) => props.pt};
	${(props) => props.zIndex && `z-index: ${props.zIndex}`};

	background: url(/images/decorations/GradientMask.png);
	background-size: cover;
	background-repeat: no-repeat;

	position: relative;
	&::after {
		content: '';
		width: 100%;
		bottom: 5rem;
		position: absolute;
		height: 1px;
		background: #e3ebfc;
	}

	@media screen and ${device.tablet} {
	}

	@media screen and ${device.laptop} {
		&::after {
			bottom: 8rem;
		}
	}

	@media screen and ${device.laptopXL} {
		padding-top: ${(props) => (props.renderSubscribe ? '2.5em' : '20em')};

		&::after {
			bottom: 10rem;
		}
	}
`;

const FooterSubscribe = styled.div`
	text-align: center;
	margin-bottom: 3em;
`;

const FooterContent = styled.div`
	ul > * {
		margin-bottom: 0.7em;
	}

	.links-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
`;

const FooterTitle = styled(Typography).attrs(() => ({
	variant: 'h5',
}))`
	margin-bottom: 15px;
	font-weight: bold;
	color: ${(props) => props.theme.primaryColor};
`;

const FooterLinks = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 2em;
	column-gap: 3em;
	margin-bottom: 1em;
	max-width: 650px;
	margin: 0 auto;
	margin-bottom: 0.5em;

	@media screen and ${device.tablet} {
		margin-bottom: 3em;
	}

	@media screen and ${device.laptop} {
		margin-bottom: 4em;
		display: flex;
		justify-content: space-evenly;
		max-width: 900px;
	}

	@media screen and ${device.laptopXL} {
		max-width: 1170px;
	}
`;

const SocialIconList = styled.div`
	display: flex;
	flex-direction: row;

	a {
		margin-right: 1em;
	}

	svg {
		padding: 5px;
		background-color: white;
		box-sizing: content-box;
		border-radius: 50%;
		transition: 0.5s color, background-color;
	}

	svg:hover {
		color: #fff;
		background-color: ${(props) => props.theme.primaryColor};
	}
`;

const FooterLegal = styled.div`
	display: flex;
	flex-direction: column;
	height: 5rem;
	justify-content: space-evenly;

	span {
		color: ${(props) => props.theme.primaryColor};
		font-weight: bold;
	}

	a {
		color: initial;
	}

	@media screen and ${device.tablet} {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	@media screen and ${device.laptop} {
		height: 8rem;
	}

	@media screen and ${device.laptopXL} {
		height: 11rem;
	}
`;

const FooterPhone = styled.a.attrs((props) => ({
	href: `tel:${props.children}`,
}))`
	text-decoration: none;
	display: block;
	color: #0063c8;
`;

const StyledFooterLink = styled(Link)`
	text-decoration: none;
	color: #0063c8;
`;

const FooterEmail = styled.a.attrs((props) => ({
	href: `mailto:${props.children}`,
}))`
	display: block;
	color: ${(props) => props.theme.primaryColor};
`;

export default function Footer({ renderSubscribe = true, children }) {
	return (
		<StyledFooter
			renderSubscribe={renderSubscribe}
			pt={children || renderSubscribe === true ? '0' : '20em'}
		>
			<Container maxWidth='lg'>
				{children}

				{renderSubscribe && (
					<FooterSubscribe>
						<Subscribe />
					</FooterSubscribe>
				)}

				<FooterLinks>
					<FooterContent className='footer-content'>
						<div style={{ marginBottom: '1.5em' }}>
							<Logo src='/logo-small.png' />
						</div>

						<Typography className='links-list' variant='body2' component='div'>
							<FooterPhone>314-329-0033</FooterPhone>

							<FooterEmail>info@digpads.com</FooterEmail>
						</Typography>
					</FooterContent>

					<FooterContent className='footer-content'>
						<FooterTitle>Discover</FooterTitle>

						<Typography className='links-list' variant='body2' component='div'>
							<StyledFooterLink to='/knowledge'>Knowledge</StyledFooterLink>

							<StyledFooterLink to='/landlordforum'>
								Landlord Forum
							</StyledFooterLink>

							<StyledFooterLink to='/calculators'>Calculators</StyledFooterLink>

							<StyledFooterLink to='/map/articlelist'>
								All Our Articles
							</StyledFooterLink>

							<StyledFooterLink to='/map/postlist'>
								All Our Posts
							</StyledFooterLink>

							<StyledFooterLink to='/faq'>FAQs</StyledFooterLink>
						</Typography>
					</FooterContent>

					<FooterContent className='footer-content'>
						<FooterTitle>Company</FooterTitle>

						<Typography className='links-list' variant='body2' component='div'>
							<StyledFooterLink to='/aboutUs'>About Us</StyledFooterLink>

							<StyledFooterLink to='/advertisingAndAffiliates'>
								Advertising &amp; Affiliates
							</StyledFooterLink>

							<StyledFooterLink to='/partnerships'>
								Partnerships
							</StyledFooterLink>

							<StyledFooterLink to='/contactUs'>Contact Us</StyledFooterLink>
						</Typography>
					</FooterContent>

					<FooterContent className='footer-content'>
						<FooterTitle>Legal</FooterTitle>

						<Typography className='links-list' variant='body2' component='div'>
							<StyledFooterLink to='/termsOfService'>Terms</StyledFooterLink>

							<StyledFooterLink to='/privacypolicy'>Privacy</StyledFooterLink>

							<StyledFooterLink to='/forumCommentsPoliciesAndRules'>
								Forum Policies
							</StyledFooterLink>
						</Typography>
					</FooterContent>

					<FooterContent className='footer-content'>
						<FooterTitle>Social</FooterTitle>

						<SocialIconList className='social-icons'>
							<a
								href='https://www.facebook.com/digpads-111905014050235'
								target='_blank'
								rel='noreferrer'
							>
								<FacebookIcon color='primary' />
							</a>
							<a
								href='https://twitter.com/digpads'
								target='_blank'
								rel='noreferrer'
							>
								<TwitterIcon color='primary' />
							</a>
							<a
								href='https://www.youtube.com/channel/UCMb6mCJwg1ZvzY0Gbw2jElg'
								target='_blank'
								rel='noreferrer'
							>
								<YouTubeIcon color='primary' />
							</a>
							<a
								href='https://www.instagram.com/digpads/'
								target='_blank'
								rel='noreferrer'
							>
								<InstagramIcon color='primary' />
							</a>
						</SocialIconList>
					</FooterContent>
				</FooterLinks>

				<FooterLegal>
					<label className='copyright'>
						&copy; 2021 <span>digpads </span>
						All rights reserved.
					</label>
					<div className='policies'>
						<Link to='/privacypolicy'>Privacy Policy </Link>/
						<Link to='/termsOfService'> Terms &amp; Conditions </Link>
						{/* <Link to='/credits'> Credits</Link> */}
					</div>
				</FooterLegal>
			</Container>
		</StyledFooter>
	);
}
