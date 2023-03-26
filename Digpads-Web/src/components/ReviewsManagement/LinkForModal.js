import React from 'react';
import {
	Box,
	FormControlLabel,
	RadioGroup,
	Radio,
	Checkbox,
	Typography,
} from '@mui/material';

import CollectionRulesAndPolicies from './CollectionRulesAndPolicies';

import CampaignForm from './CreateCampaignForm';

import {
	BorderedContainer,
	StyledLabel,
	StyledButton,
	AcceptTerms,
} from '../styled/ReviewsManagement';

export default function LinkForModal(props) {
	const [reviewOption, setReviewOption] = React.useState('');

	const handleChange = (evt) => {
		const option = evt.target.value;
		setReviewOption(option);
		props.onSelectOption(option);
	};

	return (
		<BorderedContainer>
			<StyledLabel underlined={true}>Link for Modal</StyledLabel>

			<Box display='grid' gridTemplateColumns='1fr auto' gridGap='16px'>
				<Box
					display='grid'
					gridTemplateColumns='1fr 1fr'
					gridGap='25px'
				>
					<Box
						display='grid'
						gridTemplateRows='1fr 1fr 1fr'
						gridGap='18px'
					>
						<StyledButton
							style={{ height: '32px' }}
							color='green'
							p='6px 23px'
						>
							Upload Logo Image
						</StyledButton>
						<StyledButton
							color='gray'
							circular='true'
							ml={5}
							style={{ marginBottom: 8, marginTop: '-16px' }}
						>
							Choose Shape
						</StyledButton>
						<StyledButton
							color='orange'
							circular='true'
							ml={5}
							style={{ marginBottom: 8, marginTop: '-8px' }}
						>
							Choose Location
						</StyledButton>
					</Box>

					<Box
						className='colored-buttons'
						display='grid'
						gridGap='20px'
						gridTemplateColumns='1fr 1fr'
					>
						<StyledButton color='blue' squared='true'>
							Choose Body Color
						</StyledButton>
						<StyledButton color='yellow' squared='true'>
							Choose Border Color
						</StyledButton>
						<StyledButton color='pink' squared='true'>
							Choose Height
						</StyledButton>
						<StyledButton color='cyan' squared='true'>
							Choose Width
						</StyledButton>
					</Box>

					<RadioGroup
						style={{
							gridColumnStart: '1',
							gridColumnEnd: '3',
							marginBottom: '17px',
						}}
						aria-label='select reviews'
						name='use-reviews'
						onChange={handleChange}
					>
						<div className='label-group'>
							<FormControlLabel
								value='all-reviews'
								control={<Radio />}
								label='Use all reviews (recommended)'
							/>
							{/* <a href='https://digpads.com/knowledge/Marketing/article/why-perfect-ratings-and-reviews-is-bad '>
								Why?
							</a> */}

							<small>
								<a
									href='https://digpads.com/article/why-perfect-ratings-and-reviews-is-bad'
									target='_blank'
									rel='noreferrer'
								>
									Why?
								</a>
							</small>
						</div>
						<FormControlLabel
							value='selected-reviews'
							control={<Radio />}
							label='Select Reviews'
						/>
						<FormControlLabel
							value='collection-link'
							control={<Radio />}
							label='Include Review Collection Link'
						/>
					</RadioGroup>
				</Box>

				<div className='website-preview-image'>
					<img src='https://placekitten.com/214/290' />
				</div>
			</Box>

			<CampaignForm />

			<StyledButton
				color='blue'
				p='5px 43px'
				display='block'
				ml='auto'
				mr='40px'
			>
				Submit
			</StyledButton>
		</BorderedContainer>
	);
}
