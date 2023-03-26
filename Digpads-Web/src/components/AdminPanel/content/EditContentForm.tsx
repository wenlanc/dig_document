import React from 'react';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';

type Props = {
	content: { content: string; title?: string };
	onSubmit: (content) => void;
	onCancel: () => void;
};

export default function EditContentForm({
	content,
	onSubmit,
	onCancel,
}: Props) {
	const [contentValue, setContentValue] = React.useState({});

	const handleChange = (entity, value) => {
		setContentValue({ ...contentValue, [entity]: value });
	};

	const handleSubmit = () => {
		onSubmit(contentValue);
	};

	return (
		<>
			{content.title && (
				<SuiInput
					defaultValue={content.title}
					autoFocus
					onChange={(evt) => handleChange('title', evt.target.value)}
					type='text'
					name='content'
					rows={4}
					columns={10}
					sx={{ display: 'block', mb: '1em' }}
				/>
			)}

			<SuiInput
				defaultValue={content.content}
				autoFocus
				onChange={(evt) => handleChange('content', evt.target.value)}
				type='text'
				name='content'
				multiline
				rows={4}
				columns={10}
				sx={{ display: 'block', mb: '1em' }}
			/>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<SuiButton onClick={handleSubmit} variant='contained' color='primary'>
					Submit
				</SuiButton>

				<SuiButton
					variant='contained'
					color='warning'
					onClick={onCancel}
					sx={{ ml: '1em' }}
				>
					Cancel
				</SuiButton>
			</div>
		</>
	);
}
