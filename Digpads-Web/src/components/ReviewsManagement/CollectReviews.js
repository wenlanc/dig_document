import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';

import usaStates from '../../constants/usaStates';
import usaCities from '../../constants/usaCities';
import CreateCampaignForm from './CreateCampaignForm';
import ReviewCollectionEmbeddedLink from './ReviewCollectionEmbeddedLink';
import { StyledLabel } from '../styled/ReviewsManagement';
import AcceptTerms from './AcceptTerms';
import ReviewForm from '../LandlordTools/ReviewForm';
import { instance as axios } from '../../controllers/axios';
import ReviewFormConfig from './ReviewForm/ReviewFormConfig';

export default function CollectReviews({ onCampaignCreated }) {
	const [embedModalOpen, setEmbedModalOpen] = React.useState(false);

	// Campaign form state
	const [campaign, setCampaign] = useState({
		name: '',
		description: '',
		collectingOutOfState: false,
		agreedToTerms: false,
	});

	const [reviewFormStyles, setReviewFormStyles] = useState({
		bodyColor: '#fff',
		borderColor: '#fff',
		height: 'auto',
		width: 'auto',
		logo: '',
	});

	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [stateCities, setStateCities] = useState([]);

	const [reviewCollectionLink, setReviewCollectionLink] = useState('');

	function handleStateChange(state) {
		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === state.value);
		stateCities = stateCities.map((c) => c.city);

		setState(state.value);
		setStateCities(stateCities);
	}

	function handleCityChange(city, reason) {
		setCity(city.value);
	}

	async function handleSubmit() {
		if (!campaign.agreedToTerms) {
			alert('You must agree to digpads’ Review Collection Rules and Policies');
			return;
		}

		if (state === '' || city === '') {
			alert('You must select a state and city');
			return;
		}

		if (campaign.name === '') {
			alert('You must enter a campaign name');
			return;
		}

		// === Create new campaign ===
		const campaignData = {
			name: campaign.name,
			logo: reviewFormStyles.logo,
			description: campaign.description,
			city: city,
			state: state,
			reviewFormStyles: reviewFormStyles,
			collectingOutOfState: campaign.collectingOutOfState,
		};

		try {
			const response = await axios.post(
				'/reviewCollectionCampaigns',
				campaignData
			);

			if (response.status === 201) {
				const campaign = response.data;

				onCampaignCreated(campaign);

				setReviewCollectionLink(
					location.origin +
						`/collect-review/?campaign=${campaign.id}&form=${campaign.form}`
				);
				setEmbedModalOpen(true);
			}
		} catch (error) {
			throw `Error creating new campaign: ${error}`;
		}
	}

	const handleReviewFormConfigChange = (element, value) => {
		setReviewFormStyles({ ...reviewFormStyles, [element]: value });
	};

	const handleUploadLogoChange = (logo) => {};

	return (
		<>
			<StyledLabel underlined={true}>
				Create New Review Collection Link
			</StyledLabel>

			<Box
				display='grid'
				gridTemplateColumns='1fr 0.8fr'
				mb={4}
				gridGap='20px'
				style={{ position: 'relative' }}
			>
				<Box sx={{ maxWidth: '358px' }}>
					<CreateCampaignForm
						campaign={campaign}
						onChange={(field, value) =>
							setCampaign({ ...campaign, [field]: value })
						}
						usaStates={usaStates}
						stateCities={stateCities}
						city={city}
						handleStateChange={handleStateChange}
						handleCityChange={handleCityChange}
						noUploadImageButton
						preview={<div>this is preview</div>}
					/>
				</Box>

				<ReviewFormConfig
					reviewFormStyles={reviewFormStyles}
					onChange={handleReviewFormConfigChange}
					onUploadLogo={handleUploadLogoChange}
				/>
			</Box>

			<ReviewForm
				preview={true}
				logo={reviewFormStyles?.logo}
				reviewFormStyles={reviewFormStyles}
				description={campaign.description}
				review={{
					reviewer: {
						firstName: '',
						middleName: '',
						lastName: '',
						email: '',
					},
					title: '',
					text: '',
					ratings: {
						overall: 0,
						communication: 0,
						quality: 0,
						delivery: 0,
						value: 0,
					},
				}}
			/>

			<AcceptTerms
				collectingOutOfState={campaign?.collectingOutOfState}
				agreedToTerms={campaign?.agreedToTerms}
				onChange={(field, value) =>
					setCampaign({ ...campaign, [field]: value })
				}
			/>
			<Box textAlign='center' mb='8px'>
				<Button
					variant='contained'
					color='primary'
					sx={{
						'&:hover': {
							backgroundColor: '#858cc3',
							transition: 'background-color 0.5s',
						},
					}}
					p='0.33em 2.27em'
					onClick={() => handleSubmit()}
				>
					Agree &amp; Submit
				</Button>
			</Box>
			{/* Modal to copy review collection embedded link */}
			<Modal
				open={embedModalOpen}
				onClose={() => setEmbedModalOpen(false)}
				aria-labelledby='Review collection embedded link modal'
				aria-describedby='Modal to copy review collection embedded link'
			>
				<div>
					<ReviewCollectionEmbeddedLink link={reviewCollectionLink} />
				</div>
			</Modal>
		</>
	);
}
