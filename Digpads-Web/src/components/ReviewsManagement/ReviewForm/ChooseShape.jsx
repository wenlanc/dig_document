import React from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { StyledButton } from 'components/styled/ReviewsManagement';

export default function ChooseShape({ onChange }) {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [selectedShape, setSelectedShape] = React.useState('Square');

	const handleSelectShape = (shape) => {
		setSelectedShape(shape);
		onChange(shape);
	};

	return (
		<div>
			<StyledButton
				component='label'
				sx={{
					display: 'flex',
					alignItems: 'center',
					lineHeight: '1',
					textAlign: 'center',
					border: 'none !important',
					transition: 'background-color 0.5s',
					boxShadow:
						'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
					'&:hover': {
						backgroundColor: '#656565',
					},
				}}
				onClick={() => setModalOpen(true)}
				color='gray'
				circular={true}
			>
				Choose Shape
			</StyledButton>

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Stack
					direction='row'
					spacing={3}
					justifyContent='center'
					alignItems='center'
					sx={{
						width: 300,
						height: 200,
						backgroundColor: 'gray',
						position: 'absolute',
						top: '40%',
						left: '50%',
						margin: '1em',
						transform: 'translate(-50%, -50%)',
						border: '2px solid #000',
						padding: '1em',
					}}
				>
					<Box
						sx={{
							backgroundColor: '#fff',
							width: 80,
							height: 50,
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
							border: selectedShape === 'Oval' ? '2px solid black' : 'none',
						}}
						onClick={() => handleSelectShape('Oval')}
					>
						Oval
					</Box>

					<Box
						sx={{
							backgroundColor: '#fff',
							width: 80,
							height: 80,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
							border: selectedShape === 'Square' ? '2px solid black' : 'none',
						}}
						onClick={() => handleSelectShape('Square')}
					>
						Square
					</Box>
				</Stack>
			</Modal>
		</div>
	);
}
