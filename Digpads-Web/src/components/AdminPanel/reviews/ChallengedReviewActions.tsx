import React from 'react';
import { Stack, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SuiInput from 'components/SuiInput';

type Props = {
	onSubmit: (action, actionMessage) => void;
	onCancel: () => void;
};

export default function ChallengedReviewActions({ onSubmit, onCancel }: Props) {
	const [action, setAction] = React.useState<string>('acceptChallenge');
	const [actionMessage, setActionMessage] = React.useState('');

	const handleSubmit = () => {
		onSubmit(action, actionMessage);
	};

	const handleCancel = () => {
		onCancel();
	};

	const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAction((event.target as HTMLInputElement).value);
	};

	const handleActionMessageChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setActionMessage(event.target.value);
	};

	return (
		<>
			<FormControl sx={{ mb: 2 }}>
				<FormLabel id='admin-action'>Action</FormLabel>
				<RadioGroup
					row
					value={action}
					onChange={handleActionChange}
					aria-labelledby='admin-actions'
					name='admin-actions'
					sx={{ '& .MuiFormControlLabel-root': { marginLeft: '0' } }}
				>
					<FormControlLabel
						value='acceptChallenge'
						control={<Radio />}
						label='Accept Challenge'
					/>
					<FormControlLabel
						value='rejectChallenge'
						control={<Radio />}
						label='Reject Challenge'
					/>
					<FormControlLabel
						value='requestMoreInfo'
						control={<Radio />}
						label='Request More Information'
					/>
				</RadioGroup>
			</FormControl>

			<SuiInput
				value={actionMessage}
				onChange={handleActionMessageChange}
				aria-label='action-message'
				minRows={3}
				placeholder='message'
				style={{ marginBottom: '1em' }}
				multiline
			/>

			<Stack direction='row' spacing={2} justifyContent='flex-end'>
				<Button variant='contained' color='primary' onClick={handleSubmit}>
					Submit
				</Button>
				<Button variant='contained' color='warning' onClick={handleCancel}>
					Cancel
				</Button>
			</Stack>
		</>
	);
}
