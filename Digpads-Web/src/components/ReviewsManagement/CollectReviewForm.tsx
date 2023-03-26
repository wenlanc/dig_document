import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { instance, getCSRF } from '../../controllers/axios';
import ReviewForm from '../LandlordTools/ReviewForm';
import { getUSStateFromCoordinates } from '../../controllers/location';

interface Props {
	campaign?: string;
	form?: string;
	redirectUrl?: string;
	onSubmit?: () => void;
}

export default function CollectReviewForm({
	campaign,
	form,
	redirectUrl,
	onSubmit,
}: Props) {
	const navigate = useNavigate();
	const search = useLocation().search;
	const params = new URLSearchParams(search);

	// If campaign is coming from props, use it, otherwise take it from params
	let _campaign = campaign;
	if (typeof campaign === 'undefined') {
		_campaign = params.get('campaign');
	}

	// If form is coming from props, use it, otherwise take it from params
	let _form = form;
	if (typeof form === 'undefined') {
		_form = params.get('form');
	}

	// If redirectUrl is coming from props, use it, otherwise take it from params
	let _redirectUrl = redirectUrl;
	if (typeof redirectUrl === 'undefined') {
		_redirectUrl = params.get('redirectUrl');
	}

	const [reviewForm, setReviewForm] = useState({
		description: '',
		logo: '',
		reviewFormStyles: {
			bodyColor: '',
			borderColor: '',
			height: '',
			width: '',
		},
		user: null,
	});

	const [ratings, setRatings] = useState({
		overall: 0,
		communication: 0,
		quality: 0,
		delivery: 0,
		value: 0,
	});

	const [reviewTitle, setReviewTitle] = useState('');
	const [reviewText, setReviewText] = useState('');

	const [reviewer, setReviewer] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
	});

	const [agreement, setAgreement] = useState({
		digpadsReviewCollection: false,
		reviewPublished: false,
	});

	const review = {
		title: reviewTitle,
		reviewer: reviewer,
		text: reviewText,
		ratings: ratings,
	};

	function handleChange(element, newValue) {
		switch (element) {
			case 'rating':
				setRatings({ ...ratings, ...newValue });
				break;
			case 'reviewTitle':
				setReviewTitle(newValue);
				break;
			case 'reviewText':
				setReviewText(newValue);
				break;
			case 'reviewer':
				setReviewer({ ...reviewer, ...newValue });
				break;
		}
	}

	async function handleSubmit() {
		// Validation
		if (!agreement.digpadsReviewCollection || !agreement.reviewPublished) {
			alert('Please accept Terms & Conditions');
			return;
		}

		if (!reviewer.firstName || !reviewer.lastName || !reviewer.email) {
			alert('Please fill out your first name, last name and email');
			return;
		}

		if (
			ratings['overall'] === 0 ||
			Object.values(ratings).some((s) => s === 0)
		) {
			return alert('Please fill out all star ratings');
		}

		if (reviewText === '') {
			return alert('Please fill out the review text');
		}

		await getCSRF();

		const userId = await signUpUnactivatedUser();
		if (userId) {
			sendReview(userId);
		}
	}

	async function signUpUnactivatedUser() {
		const userData = {
			first: reviewer.firstName,
			last: reviewer.lastName,
			middle: reviewer.middleName,
			email: reviewer.email,
		};

		try {
			const response = await instance.post('signUpUnactivated', userData);
			const userId = response.data;
			return userId;
		} catch (error) {
			console.error('Error creating new unactivated user: ', error);
		}
	}

	async function sendReview(reviewerId) {
		const reviewData = {
			campaign: _campaign,
			title: reviewTitle,
			reviewer: {
				id: reviewerId,
				first: reviewer.firstName,
				last: reviewer.lastName,
				middle: reviewer.middleName,
				email: reviewer.email,
			},
			ratings: {
				overall: ratings['overall'],
				communication: ratings['communication'],
				quality: ratings['quality'],
				value: ratings['value'],
				delivery: ratings['delivery'],
			},
			content: reviewText,
		};

		try {
			const response = await instance.post('/reviews/collect', reviewData);

			if (response.status === 201) {
				onSubmit();

				if (_redirectUrl) {
					navigate(_redirectUrl);
				} else {
					alert('Your review has been successfully submitted');
				}
			}
		} catch (error) {
			console.log(error);
			alert('Error submitting review');
		}
	}

	function handleChangeAgreement(evt) {
		setAgreement({
			...agreement,
			[evt.target.name]: evt.target.checked,
		});
	}

	React.useLayoutEffect(() => {
		async function fetchReviewForm() {
			try {
				instance
					.get(`reviewCollectionForm?campaign=${_campaign}&form=${_form}`)
					.then((res) => setReviewForm(res.data));
			} catch (error) {
				console.log(error);
				alert('Error getting review form');
			}
		}

		fetchReviewForm();
	}, []);

	React.useEffect(() => {
		async function incrementNumberOfViews() {
			await getCSRF();

			try {
				instance
					.post('pageView', {
						id: campaign,
						entity: 'reviewCollectionForm',
					})
					.then((res) => {
						if (res.status !== 200) {
							console.error(res.statusText);
						}
					});
			} catch (error) {
				console.log(error);
			}
		}

		incrementNumberOfViews();

		// Get user US state from latitude and longitude
		const geo = navigator.geolocation;
		geo.getCurrentPosition(success, (err) => console.error(err));

		function success(pos) {
			var crd = pos.coords;

			console.log('Your current position is:');
			console.log(`Latitude : ${crd.latitude}`);
			console.log(`Longitude: ${crd.longitude}`);
			console.log(`More or less ${crd.accuracy} meters.`);

			const state = getUSStateFromCoordinates(crd.latitude, crd.longitude);

			console.log(`found state: ${state}`);
		}
	}, [_campaign]);

	if (!_campaign) {
		alert('The link seems to be broken. Please check the URL');
		return null;
	}

	return (
		<div style={{ margin: '10px' }}>
			<ReviewForm
				{...reviewForm}
				agreement={agreement}
				onChangeAgreement={handleChangeAgreement}
				onSubmit={handleSubmit}
				onChange={handleChange}
				review={review}
				ratings={ratings}
			/>
		</div>
	);
}
