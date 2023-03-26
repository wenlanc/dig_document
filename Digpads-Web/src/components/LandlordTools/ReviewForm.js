import React from 'react';
import styled from 'styled-components';
import StarsRating from 'stars-rating';
import {
	Typography,
	Grid,
	Checkbox,
	Button,
	useMediaQuery,
	Stack,
	Paper,
	Box,
} from '@mui/material';

import SuiButton from 'components/SuiButton';

import { authContext } from '../../contexts/AuthContext';

import SuiInput from 'components/SuiInput';

const RatingTitle = styled(Typography)`
	font-weight: bold;
	min-width: 160px;
`;

const StyledCheckbox = styled(Checkbox)`
	margin-right: 8px;
	margin-left: 8px;
`;

function ReviewForm({
	preview = false,
	logo = '',
	reviewFormStyles = {},
	description = '',
	onChangeAgreement = () => {},
	agreement,
	onSubmit,
	onChange = () => {},
	user = '',
	review,
}) {
	const isLgBreakpoint = useMediaQuery('(max-width: 1200px)');
	const isMdBreakpoint = useMediaQuery('(max-width: 900px)');
	const isSmBreakpoint = useMediaQuery('(max-width: 600px)');
	const { auth } = React.useContext(authContext);

	let borderWidth = 30;
	if (reviewFormStyles?.width && !isNaN(reviewFormStyles?.width)) {
		borderWidth = reviewFormStyles?.width / 25;
	}

	let width = 'auto';
	if (reviewFormStyles?.width) {
		if (reviewFormStyles?.width === 'auto') {
			width = 'auto';
		} else {
			width = reviewFormStyles?.width + 'px';
		}
	}

	let height = 'auto';
	if (reviewFormStyles?.height) {
		if (reviewFormStyles?.height === 'auto') {
			height = 'auto';
		} else {
			height = reviewFormStyles?.height + 'px';
		}
	}

	let borderColor = reviewFormStyles?.borderColor
		? reviewFormStyles?.borderColor
		: 'white';

	return (
		<>
			<Box
				width={width}
				height={height}
				overflow={'auto'}
				bgcolor={
					reviewFormStyles?.bodyColor ? reviewFormStyles?.bodyColor : 'white'
				}
				mb={4}
			>
				<Box border={`${borderWidth}px solid ${borderColor}`}>
					<Box
						pt={6}
						px={'2%'}
						sx={{ border: '0.0625rem solid rgb(222, 226, 230)' }}
					>
						{logo ? (
							<img
								src={logo}
								alt='campaign logo'
								width='150'
								style={{
									display: 'block',
									margin: '0 auto 1em auto',
								}}
							/>
						) : (
							<Typography
								sx={{ fontWeight: 'bold', mb: '32px' }}
								variant='h5'
								component='p'
								align='center'
							>
								{user ? (
									user.name
								) : auth.authenticated ? (
									<span>{auth.data.username}</span>
								) : (
									'Please log in'
								)}
							</Typography>
						)}
						<Box py={3} mb={4}>
							{description ? (
								<Typography
									sx={{ fontWeight: 'bold', mb: '32px' }}
									variant='body1'
									component='p'
									paragraph
								>
									{description}
								</Typography>
							) : (
								<Box height={120} />
							)}
							<Typography
								sx={{
									fontWeight: 'bold',
									textDecoration: 'underline',
									mb: '12px',
								}}
								variant='body1'
								component='p'
							>
								From digpads
							</Typography>
							<Typography
								sx={{ fontWeight: '500' }}
								variant='body1'
								component='p'
							>
								Please know that your review should be written only if you had
								an actual experience with the person or entity you are
								reviewing, it should not be a personal attack, and it should be
								honest. It should adhere to digpads Review Collection Rules &
								Policies as well. Reviews that do not adhere to these
								requirements may be deemphasized or removed.{' '}
							</Typography>
						</Box>

						<Typography
							sx={{ fontWeight: '500' }}
							variant='body1'
							component='p'
						>
							Please select an overall star rating and a star rating for each of
							the below.{' '}
						</Typography>

						<Box
							sx={{
								'& .stars-rating': {
									display: 'flex',
									justifyContent: 'space-evenly',
									width: '100%',
									mb: '24px',
								},
							}}
						>
							<StarsRating
								className='stars-rating'
								count={5}
								onChange={(newRating) => {
									onChange('rating', { overall: newRating });
								}}
								value={review?.ratings['overall']}
								size={
									isSmBreakpoint
										? 32
										: isMdBreakpoint
										? 64
										: isLgBreakpoint
										? 80
										: 96
								}
								color2={'#ffd700'}
							/>
						</Box>
						<Box
							border='0.0625rem solid rgb(176 176 176)'
							px={2}
							py={3}
							mb={4}
							sx={{ '& span': { fontSize: '50px' }, borderRadius: '0.5em' }}
						>
							<Grid container>
								{Object.keys(review ? review.ratings : {})
									.slice(1)
									.map((key) => (
										<div key={key}>
											<Rating
												title={key}
												stars={review?.ratings[key]}
												onChange={(newRating) => {
													onChange('rating', {
														[key]: newRating,
													});
												}}
											/>
										</div>
									))}
							</Grid>
						</Box>

						<Stack spacing={2} mb={2}>
							<SuiInput
								required
								disabled={preview}
								value={review?.title}
								onChange={(e) => onChange('reviewTitle', e.target.value)}
								variant='outlined'
								fullWidth
								type='text'
								placeholder='Review Title Here'
							/>

							<SuiInput
								required
								disabled={preview}
								value={review?.text}
								onChange={(e) => {
									onChange('reviewText', e.target.value);
								}}
								multiline
								variant='outlined'
								fullWidth
								rows={15}
								placeholder='Write Review Here'
							/>

							<SuiInput
								required
								disabled={preview}
								type='email'
								placeholder='your email'
								value={review?.reviewer.email}
								onChange={(evt) =>
									onChange('reviewer', {
										email: evt.target.value,
									})
								}
							/>

							<SuiInput
								required
								disabled={preview}
								type='text'
								placeholder='your first name'
								value={review?.reviewer.firstName}
								onChange={(evt) =>
									onChange('reviewer', {
										firstName: evt.target.value,
									})
								}
							/>

							<SuiInput
								required
								disabled={preview}
								type='text'
								placeholder='your middle name'
								value={review?.reviewer.middleName}
								onChange={(evt) =>
									onChange('reviewer', {
										middleName: evt.target.value,
									})
								}
							/>

							<SuiInput
								required
								disabled={preview}
								type='text'
								placeholder='your last name'
								value={review?.reviewer.lastName}
								onChange={(evt) =>
									onChange('reviewer', {
										lastName: evt.target.value,
									})
								}
							/>
						</Stack>
					</Box>
				</Box>
			</Box>

			{/* === Agree to rules & policies  ===*/}
			{!preview && (
				<Box sx={{ px: '20px' }}>
					<Box display='flex' alignItems='center' mb={2}>
						<StyledCheckbox
							onChange={onChangeAgreement}
							name='digpadsReviewCollection'
							value={agreement?.digpadsReviewCollection}
						/>
						<Typography
							sx={{ fontWeight: '500', ml: '16px' }}
							variant='body1'
							component='p'
						>
							I agree to digpads’ Review Collection Rules & Policies.
						</Typography>
					</Box>
					<Box display='flex' alignItems='center' mb={16}>
						<StyledCheckbox
							onChange={onChangeAgreement}
							name='reviewPublished'
							value={agreement?.reviewPublished}
						/>
						<Typography
							sx={{ fontWeight: '500', ml: '16px' }}
							variant='body1'
							component='p'
						>
							I agree to have my review published on the requester’s profile
							page on www.digpads.com and Iagree to allow digpads and the
							requester to utilize my review in marketing and advertising
							endeavors.
						</Typography>
					</Box>

					<Box sx={{ mr: 2 }} display='flex' justifyContent='flex-end'>
						<SuiButton
							variant='contained'
							color='primary'
							onClick={() => onSubmit()}
						>
							Agree & Submit
						</SuiButton>
					</Box>
				</Box>
			)}
		</>
	);
}

function Rating({ title, stars, onChange }) {
	const isSmBreakpoint = useMediaQuery('(max-width: 600px)');
	return (
		<Grid item xs={12} lg={6} sx={{ '& span': { fontSize: '50px' } }}>
			<Box display='flex' alignItems='center' flexWrap='wrap'>
				<RatingTitle>{title}</RatingTitle>
				<StarsRating
					count={5}
					value={stars}
					onChange={onChange}
					size={isSmBreakpoint ? 16 : 32}
					color2={'#ffd700'}
				/>
			</Box>
		</Grid>
	);
}

export default ReviewForm;
