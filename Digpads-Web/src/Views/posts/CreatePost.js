import React, { useState, useRef } from 'react';
import { Grid, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { instance, getCSRF } from '../../controllers/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	StyledButton,
	StyledContainer,
	StyledForm,
	StyledField,
	StyledTextArea,
	StyledAutocomplete,
	StyledHeading,
} from 'components/styled/FormStyle';
import usaCities from '../../constants/usaCities';
import usaStates from '../../constants/usaStates';
import TextField from '@mui/material/TextField';
import UploadImages from './UploadImages';

export default function CreatePost({ setError }) {
	const navigate = useNavigate();
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [stateCities, setStateCities] = useState([]);
	const [city, setCity] = useState('');

	const [images, setImages] = useState([]);

	const stateRef = useRef(null);
	const cityRef = useRef(null);

	const { register, errors, handleSubmit } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});

	async function createPost(data) {
		await getCSRF();

		if (!category) {
			setError({
				category: 'Must include a Category in post.',
			});
		}

		try {
			const postData = {
				title: data.title,
				content,
				category: category,
				images: images,
			};

			if (stateRef.current.value.length > 0) {
				postData.state = stateRef.current.value;
			}

			if (cityRef.current.value.length > 0) {
				postData.city = cityRef.current.value;
			}

			let res = await instance.post('createPost', postData);

			navigate(`/post/${res.data.data.slug}`, {
				post: res.data.data,
			});
		} catch (e) {
			console.log(e);
		}
	}

	function handleStateInput(e, state, reason) {
		if (reason === 'clear') {
			setCity('');
		}

		if (state === null) {
			return;
		}

		// add empty option to remove warning
		stateCities.unshift('');

		const stateName = state.name;

		let _stateCities = usaCities.filter((c) => c.state === stateName);
		_stateCities = _stateCities.map((c) => c.city);

		setStateCities(_stateCities);
	}

	function handleCityInput(e, city, reason) {
		if (reason === 'selectOption') {
			setCity(city);
			return;
		}

		if (reason === 'clear') {
			setCity('');
		}
	}

	return (
		<StyledContainer>
			<StyledHeading component='h1' variant='h5'>
				Create a post
			</StyledHeading>
			<StyledForm onSubmit={handleSubmit(createPost)}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<StyledField
							label='Title'
							name='title'
							inputRef={register({ required: true })}
							type='title'
							error={errors.title ? true : false}
							helperText={
								errors.title ? errors.title.message || '' : ''
							}
							variant='outlined'
							size='small'
							pagetype='feed'
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledTextArea
							name='content'
							type='content'
							variant='outlined'
							size='small'
							placeholder='Content'
							onChange={(e) => setContent(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledAutocomplete
							options={feedCategories}
							getOptionLabel={(option) => option.categoryName}
							onChange={(e, value) => {
								if (!value) {
									setCategory('');
								} else {
									setCategory(value.categoryName);
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Category'
									variant='outlined'
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledAutocomplete
							options={usaStates}
							getOptionLabel={(state) => `${state.name}`}
							onChange={handleStateInput}
							renderInput={(params) => (
								<TextField
									{...params}
									inputRef={stateRef}
									label='State'
									variant='outlined'
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledAutocomplete
							value={city}
							disabled={stateCities.length === 0}
							options={stateCities}
							getOptionLabel={(city) => `${city}`}
							onChange={handleCityInput}
							renderInput={(params) => (
								<TextField
									{...params}
									inputRef={cityRef}
									label='City'
									variant='outlined'
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<UploadImages
							onUpload={(uploads) =>
								setImages((prevImages) =>
									prevImages.concat(uploads)
								)
							}
							previewImages={images}
						/>
					</Grid>
				</Grid>
			</StyledForm>
			<StyledButton
				variant='contained'
				color='primary'
				type='submit'
				onClick={handleSubmit(createPost)}
				pagetype='feed'
			>
				Create Post
			</StyledButton>
		</StyledContainer>
	);
}

const feedCategories = [
	{
		categoryName: 'Business & Economy',
	},
	{
		categoryName: 'Laws & Regulations',
	},
	{
		categoryName: 'Service Recommendations',
	},
	{
		categoryName: 'Tenant Management',
	},
	{
		categoryName: 'Financing',
	},
	{
		categoryName: 'Property Management',
	},
	{
		categoryName: 'Innovation',
	},
	{
		categoryName: 'Strategies',
	},
	{
		categoryName: 'Miscellaneous',
	},
];
