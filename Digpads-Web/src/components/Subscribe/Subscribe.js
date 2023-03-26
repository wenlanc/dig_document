import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { instance, getCSRF } from '../../controllers/axios';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { device } from '../MediaSizes';

const PREFIX = 'Subscribe';

const classes = {
	root: `${PREFIX}-root`,
};

const SubscribeBox = styled.div`
	max-width: 425px;
	margin-left: auto;
	margin-right: auto;
	background-repeat: no-repeat;
	color: white;
	background: url(images/decorations/BlueShapesBg.png),
		${(props) => props.theme.primaryColor};
	background-size: contain;
	background-repeat: no-repeat;
	border-radius: 10px;
	padding: 1em 1.5em 3em;

	.MuiTextField-root {
		margin-bottom: 1.5em;
	}

	@media screen and ${device.mobileL} {
		padding: 2em 1.5em 4em;
		border-radius: 20px;
	}

	@media screen and ${device.tablet} {
		max-width: 650px;
		padding: 2em 6em 3em;
		border-radius: 30px;
	}

	@media screen and ${device.laptop} {
		max-width: 900px;
		padding: 3em 6em 5em;
		border-radius: 40px;
	}

	@media screen and ${device.laptopXL} {
		max-width: 1170px;
		padding: 3em 10em 5em;
	}
`;

const StyledSubscribeBox = muiStyled(SubscribeBox)({
	[`& .${classes.root}`]: {
		'& .MuiInput-underline': {
			'&:before': {
				borderBottom: `2px solid white`,
			},
			'&:after': {
				borderBottom: `2px solid white`,
				transition: 'none',
			},
			'&:hover:not($disabled):not($focused):not($error):before': {
				borderBottom: `2px solid white`,
			},
			color: 'white',
		},
		'& .MuiFormHelperText-root': {
			color: 'white',
		},
	},
});

const SubscribeForm = styled.form`
	.MuiFormHelperText-root {
		position: absolute;
		bottom: -1.8em;
		font-size: 1.2rem;
	}

	.MuiInput-input {
		padding-left: 0.5em;
	}

	@media screen and ${device.mobileL} {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media screen and ${device.tablet} {
		flex-wrap: nowrap;
		align-items: flex-end;

		.MuiTextField-root {
			margin-bottom: 0;
		}
	}

	@media screen and ${device.laptop} {
		width: 85%;
		margin: 0 auto;
	}

	@media screen and ${device.laptopXL} {
		input[type='email'] {
			font-size: 1.6rem;
		}
	}
`;

const SectionTitle = styled.h2`
	font-size: 30px;
	margin-top: 0;
	font-weight: normal;
	margin-bottom: 0.3em;
	span {
		font-weight: bold;
	}

	@media screen and ${device.laptop} {
		font-size: 40px;
	}

	@media screen and ${device.laptopL} {
		font-size: 45px;
		margin-bottom: 0;
	}

	@media screen and ${device.laptopXL} {
		font-size: 3.75rem;
	}
`;

const SubscribeText = styled(Typography).attrs(() => ({
	variant: 'body2',
}))`
	margin-bottom: 2.5em;

	@media screen and ${device.laptop} {
		font-size: 1rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 1.25rem;
		margin-bottom: 4em;
	}
`;

const SubscribeButton = styled(Button)`
	&.MuiButton-containedPrimary {
		background-color: white;
		color: #0063c8;
		border-radius: 7px;
		font-weight: bold;
		text-transform: capitalize;
		margin: 0 auto;
		font-size: 1.2rem;
		padding: 0.3em 1.2em;
	}

	@media screen and ${device.tablet} {
		&.MuiButton-containedPrimary {
			margin-left: 1.5em;
			font-size: initial;
			padding: 0;
			width: 170px;
			height: 40px;
		}
	}

	@media screen and ${device.laptopXL} {
		&.MuiButton-containedPrimary {
			width: 185px;
			height: 60px;
			font-size: 1.6rem;
			flex-shrink: 0;
		}
	}
`;

const SubscribeContent = styled.div`
	max-width: 540px;
	margin-left: auto;
	margin-right: auto;

	@media screen and ${device.laptop} {
		max-width: initial;
	}
`;
//#endregion styles

export default function Subscribe() {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = async (data) => {
		await getCSRF();
		await instance
			.post('/subscribe', data)
			.then((res) => {
				if (res.status === 200) {
					setHelperText('subscribed successfully');
				} else {
					setHelperText('oops something went wrong, try again');
				}
			})
			.catch((e) => {
				console.log(e.response.data);
				e.response &&
					e.response.data &&
					e.response.data.error === 'email already exist' &&
					setHelperText('email already subscribed');
			});
	};

	const [helperText, setHelperText] = React.useState('');

	React.useEffect(() => {
		if (!errors.email) return setHelperText('');
		if (errors.email.type === 'required')
			setHelperText('please enter an email');
		else setHelperText('please enter the correct email');
	}, [errors]);

	return (
		<StyledSubscribeBox>
			<SectionTitle>
				Subscribe to <span>our newsletter</span>
			</SectionTitle>
			<SubscribeContent>
				<SubscribeText>
					Stay up-to-date on all things in residential rental industry
					news. From reviews of new products and services in the
					industry, to hot investment areas, to ways to generate more
					cash flow from your rental properties. Please enter your
					email below and hit subscribe!
				</SubscribeText>
				<SubscribeForm
					action='/subscribe'
					method='post'
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						variant='standard'
						name='email'
						fullWidth
						placeholder='Enter Your Email'
						inputRef={register({
							required: true,
							pattern: /^\S+@\S+$/i,
						})}
						className={classes.root}
						helperText={helperText}
						type='email'
					/>
					<SubscribeButton type='submit' variant='contained'>
						Subscribe
					</SubscribeButton>
				</SubscribeForm>
			</SubscribeContent>
		</StyledSubscribeBox>
	);
}
