import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { device } from '../MediaSizes';

export const ContactHeader = styled.div`
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: rgb(13, 95, 183);
	padding-bottom: 20px 10px 20px 10px;

	@media screen and (max-width: 599px) {
		display: none;
	}
`;

export const HeaderInfo = styled.div`
	width: 400px;
	color: white;
	font-size: 0.98rem;
	@media screen and (max-width: 815px) {
		width: 300px;
	}
	@media screen and (max-width: 670px) {
		width: 250px;
	}
`;

export const StyledHeading = styled(Typography)`
	font-size: 2.6rem;
	font-weight: 400;
	@media screen and (max-width: 980px) {
		font-size: 2.2rem;
	}
`;

export const StyledParagh = styled(Typography)`
	font-size: 0.98rem;
	font-weight: 400;
	@media screen and (max-width: 980px) {
		font-size: 0.89rem;
	}
	@media screen and (max-width: 815px) {
		font-size: 0.7rem;
	}
	@media screen and (max-width: 670px) {
		font-size: 0.6rem;
	}
`;

export const ImageContainer = styled.div`
	padding: 10px;
	margin-left: 5px;
`;

export const StyledImage = styled.img`
	width: 500px;
	object-fit: contain;

	@media screen and (max-width: 980px) {
		width: 350px;
	}
	@media screen and (max-width: 815px) {
		width: 300px;
	}
	@media screen and (max-width: 670px) {
		width: 250px;
	}
`;

export const StyledContainer = styled(Container)`
	display: flex;
	justify-content: space-around;
	text-align: center;
	@media screen and (max-width: 599px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const ContactDescription = styled.div`
	margin-bottom: 1.5em;

	.MuiTypography-gutterBottom {
		margin-bottom: 1em;
	}

	@media screen and ${device.tablet} {
		margin-bottom: 2.5em;
	}
`;

export const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	margin-bottom: 2em;

	@media screen and ${device.tablet} {
		grid-template-columns: 1fr 1fr;
		margin-bottom: 3em;

		.MuiFormControl-root:first-of-type {
			grid-column: 1 / span 2;
			width: 49%;
		}

		.MuiFormControl-root:nth-of-type(8),
		.MuiFormControl-root:nth-of-type(9) {
			grid-column: 1 / 3;
		}
	}
`;

export const ContactInformation = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	@media screen and (max-width: 599px) {
		margin-bottom: 20px;
	}
`;

export const ContactInfoTitle = styled(Typography).attrs(() => ({
	variant: 'h6',
}))`
	font-size: 1rem;
	font-weight: bold;
	text-decoration: underline;
	margin-bottom: 1em;
`;

export const Phone = styled.a.attrs((props) => ({
	href: `tel:${props.children}`,
}))`
	color: inherit;
`;

export const Email = styled.a.attrs((props) => ({
	href: `mailto:${props.children}`,
}))`
	color: #1f5ea3;
	font-weight: bold;
`;
