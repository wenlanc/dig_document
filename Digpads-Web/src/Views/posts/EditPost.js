import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { instance, getCSRF } from '../../controllers/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
	StyledButton,
	StyledContainer,
	StyledForm,
	StyledField,
	StyledTextArea,
	StyledAutocomplete,
} from 'components/styled/FormStyle';
import TextField from '@mui/material/TextField';

export default function EditPost(props) {
	const navigate = useNavigate();
	const [content, setContent] = useState(props.content);
	const [title, setTitle] = useState(props.title);
	const [category, setCategory] = useState('');
	const alert = useAlert();

	const { register, errors, handleSubmit } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});

	async function updatePost(data) {
		await getCSRF();
		try {
			const postData = {
				title: title,
				content,
				category: category,
			};

			let res = await instance.patch(
				'updatePost/' + props.postId,
				postData
			);
			alert.success('Post updated successfully');

			navigate(`/post/${res.data.data.data.slug}`, {
				post: res.data.data.data,
			});
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<StyledContainer>
			<Typography component='h1' variant='h5'>
				Edit a post
			</Typography>
			<StyledForm onSubmit={updatePost}>
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
							pageType='feed'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledTextArea
							name='content'
							type='content'
							variant='outlined'
							size='small'
							placeholder='Content'
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Grid>
					<Grid>
						<StyledAutocomplete
							id='combo-box-demo'
							options={feedCategories}
							getOptionLabel={(option) => option.categoryName}
							onChange={(e, value) =>
								setCategory(value.categoryName)
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Category'
									variant='outlined'
								/>
							)}
						/>
					</Grid>
				</Grid>
			</StyledForm>
			<StyledButton
				variant='contained'
				color='primary'
				type='submit'
				onClick={updatePost}
				pageType='feed'
			>
				Update Post
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
	// {
	// 	categoryName: 'Bazaar',
	// },
];
