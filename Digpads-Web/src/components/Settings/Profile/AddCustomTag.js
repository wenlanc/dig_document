import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SuiInput from 'components/SuiInput';
import SuiSelect from 'components/SuiSelect';
import SuiButton from 'components/SuiButton';

export default function AddCustomTag({
	onAddTag,
	selectUserType = false,
	tagExists,
}) {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [tag, setTag] = useState({});

	const handleTagNameChange = (evt) => {
		const tagName = evt.target.value;

		setTag((prevTag) => ({
			...prevTag,
			name: tagName,
		}));
	};

	const handleTagCategoryChange = (target) => {
		const tagCategory = target.value;

		setTag((prevTag) => ({
			...prevTag,
			category: tagCategory,
		}));
	};

	const handleUserTypeChange = (target) => {
		const userType = target.value;

		setTag((prevTag) => ({
			...prevTag,
			userType: userType,
		}));
	};

	const handleSubmit = () => {
		if (!tag?.name || !tag.category) {
			alert('please full out all fields');
			return;
		}

		if (tagExists(tag)) {
			alert('tag already exists');
			return;
		}

		onAddTag(tag);
		setAddModalOpen(false);
	};

	const style = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: '#fff',
		border: '1px solid gray',
		boxShadow: 24,
		p: 4,
	};

	return (
		<div>
			<IconButton onClick={() => setAddModalOpen(true)} title='Add custom tag'>
				<AddIcon fontSize='large' />
			</IconButton>

			<Modal open={addModalOpen}>
				<Box sx={style}>
					{selectUserType && (
						<FormControl sx={{ width: '100%', mb: 3 }}>
							<InputLabel id='user-type'>User Type</InputLabel>

							<Select
								labelId='user-type'
								name='userType'
								value={tag?.userType || ''}
								label='User Type'
								onChange={handleUserTypeChange}
							>
								<MenuItem value={'landlord'}>Landlord</MenuItem>

								<MenuItem value={'contractor'}>Contractor</MenuItem>

								<MenuItem value={'tenant'}>Tenant</MenuItem>
							</Select>
						</FormControl>
					)}

					<Stack direction='row' spacing={2} mb={3} width='100%'>
						<SuiInput
							type='text'
							name='name'
							placeholder='Tag name'
							value={tag?.name || ''}
							onChange={handleTagNameChange}
						/>

						<SuiSelect
							id='category-select'
							name='category'
							onChange={handleTagCategoryChange}
							placeholder='category'
							options={['social', 'business'].map((category) => ({
								value: category,
								label: category,
							}))}
							style={{
								maxWidth: 400,
								width: '50%',
							}}
						/>
					</Stack>

					<Stack direction='row' spacing={2}>
						<SuiButton
							variant='contained'
							color='primary'
							onClick={handleSubmit}
						>
							Submit
						</SuiButton>
						<SuiButton
							variant='contained'
							color='warning'
							onClick={() => setAddModalOpen(false)}
						>
							Cancel
						</SuiButton>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
