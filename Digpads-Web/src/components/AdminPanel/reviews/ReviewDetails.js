import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';

export default function ReviewDetails({
	onDeleteReview,
	onEditReview,
	...details
}) {
	const [isEditing, setIsEditing] = React.useState(false);
	const [state, setState] = React.useState(details);

	const {
		_id,
		source,
		title,
		content,
		ratings,
		rejected,
		reviewerEmail,
		createdAt,
		campaignName,
	} = state;

	const handleChange = (evt) => {
		const [section, key] = evt.target.name.split('.');

		if (key) {
			setState((prevState) => ({
				...prevState,
				[section]: {
					...prevState[section],
					[key]: Number(evt.target.value),
					overall: getOverallRating({
						...ratings,
						[key]: Number(evt.target.value),
					}),
				},
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				[section]: evt.target.value,
			}));
		}
	};

	const handleCancelEditing = () => {
		setState(details);
		setIsEditing(false);
	};

	const handleAcceptEdit = () => {
		const editData = {
			title: state.title,
			content: state.content,
			ratings: state.ratings,
		};

		onEditReview(_id, editData);
		setIsEditing(false);
	};

	const handlePublishReview = () => {
		onEditReview(_id, { rejected: false });
	};

	return (
		<Paper
			elevation={1}
			sx={{
				p: 2,
				mb: 3,
				maxWidth: 600,
				fieldset: { display: 'grid', gap: '0.5em', mb: '0.5em' },
				'& label': { display: 'flex', gap: '0.3em' },
				textarea: { width: '100%' },
				'& .block': { display: 'block' },
			}}
		>
			<SuiTypography variant='h3' gutterBottom>
				Review Details
			</SuiTypography>
			<form>
				<fieldset disabled={!isEditing}>
					<label>
						Source:
						<span>{source}</span>
					</label>

					<label>
						Reviewer:
						<span>{reviewerEmail}</span>
					</label>

					<label>
						Date submitted:
						<span>{createdAt && formatDate(new Date(createdAt))}</span>
					</label>

					<label>
						Campaign:
						<span>{campaignName}</span>
					</label>

					<label>
						Title:
						<input
							type='text'
							name='title'
							onChange={handleChange}
							value={title}
						/>
					</label>

					<label className='block'>
						Content:
						<textarea
							name='content'
							rows='5'
							onChange={handleChange}
							value={content}
						/>
					</label>

					<div>
						Ratings: <br></br>
						<Stack spacing={1} ml='1em'>
							<label>
								overall:
								<span>{ratings?.overall}</span>
							</label>

							<label>
								communication:
								<input
									type='number'
									name='ratings.communication'
									step='0.1'
									value={ratings?.communication}
									onChange={handleChange}
								/>
							</label>

							<label>
								quality:
								<input
									type='number'
									name='ratings.quality'
									step='0.1'
									value={ratings?.quality}
									onChange={handleChange}
								/>
							</label>

							<label>
								delivery:
								<input
									type='number'
									name='ratings.delivery'
									step='0.1'
									value={ratings?.delivery}
									onChange={handleChange}
								/>
							</label>

							<label>
								value:
								<input
									type='number'
									name='ratings.value'
									step='0.1'
									value={ratings?.value}
									onChange={handleChange}
								/>
							</label>
						</Stack>
					</div>
				</fieldset>

				{rejected && (
					<div style={{ display: 'flex' }}>
						<CancelIcon /> Rejected reason: {details.rejectedReason}
					</div>
				)}
			</form>

			<Stack direction='row' spacing={2} mb={2}>
				<Button
					onClick={() => onDeleteReview(_id)}
					sx={{ backgroundColor: '#ea6c05' }}
					variant='contained'
					size='small'
				>
					Remove
				</Button>

				<Button
					onClick={() => setIsEditing(true)}
					color='warning'
					variant='contained'
					size='small'
				>
					Edit
				</Button>

				<Button
					onClick={handlePublishReview}
					color='warning'
					variant='contained'
					size='small'
				>
					Publish
				</Button>
			</Stack>

			{isEditing && (
				<Stack direction='row' spacing={2} justifyContent='flex-end'>
					<Button
						onClick={handleAcceptEdit}
						variant='contained'
						color='success'
						size='small'
					>
						Ok
					</Button>

					<Button
						onClick={handleCancelEditing}
						variant='contained'
						size='small'
						color='info'
					>
						Cancel
					</Button>
				</Stack>
			)}
		</Paper>
	);
}

function getOverallRating(ratings) {
	const _ratings = [
		ratings?.communication,
		ratings?.quality,
		ratings?.delivery,
		ratings?.value,
	];

	console.log(_ratings);

	const overallRating = _ratings.reduce((acc, r) => acc + r, 0);
	console.log(overallRating);

	return toFixed(overallRating / 4, 1);
}

function toFixed(num, fixed) {
	var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}

function formatDate(dateObj) {
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var MyDateString;

	dateObj.setDate(dateObj.getDate() + 20);

	MyDateString =
		dateObj.getFullYear() +
		'-' +
		('0' + (dateObj.getMonth() + 1)).slice(-2) +
		'-' +
		('0' + dateObj.getDate()).slice(-2);

	return MyDateString;
}
