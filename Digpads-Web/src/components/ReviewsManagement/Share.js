import React, { useState } from 'react';
import { Stack, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';
import { BorderedContainer, StyledModal } from '../styled/ReviewsManagement';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Share({ shareURL }) {
	const links = [
		{
			name: 'Facebook',
			href: `https://facebook.com/sharer.php?u=${shareURL}#reviews`,
			icon: '/images/icons/share/facebook.svg',
		},
		{
			name: 'LinkedIN',
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}#reviews`,
			icon: '/images/icons/share/linkedin.svg',
		},
		{
			name: 'Instagram',
			href: `https://facebook.com/sharer.php?u=https://www.digpads.com/profiles/tenants123#reviews`,
			icon: '/images/icons/share/instagram.svg',
		},
		{
			name: 'Nextdoor',
			href: `https://www.nextdoor.com/api/share/?title=${shareURL}`,
			icon: '/images/icons/share/nextdoor.svg',
		},
	];

	const [alert, setAlert] = useState(false);

	const handleCopyProfileURLClick = () => {
		navigator.clipboard.writeText(location.href);
		setAlert(true);
	};

	const handleClose = () => {
		setAlert(false);
	};

	return (
		<StyledModal>
			<BorderedContainer
				variant='solid'
				style={{ padding: '10px 10px 23px 20px' }}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					textAlign='center'
					spacing={1}
				>
					<IconButton
						sx={{ flexDirection: 'column' }}
						onClick={handleCopyProfileURLClick}
					>
						<img
							src='/images/icons/share/get-link.svg'
							style={{
								marginBottom: '15px',
								width: '78px',
								height: '85px',
							}}
						/>
						<span
							style={{
								color: '#929292',
								fontSize: '16px',
								fontWeight: 'normal',
							}}
						>
							Get<br></br>Link
						</span>
					</IconButton>

					{links.map((link) => (
						<a
							style={{ color: 'black', fontWeight: 'normal' }}
							key={link.href}
							href={link.href}
							target='_blank'
							rel='noreferrer'
						>
							<img
								src={link.icon}
								style={{
									marginBottom: '15px',
									width: '78px',
									height: '85px',
								}}
							/>
							<span
								style={{
									display: 'block',
									color: 'black',
									fontWeight: 'normal',
								}}
							>
								Share on {link.name}
							</span>
						</a>
					))}
				</Stack>
			</BorderedContainer>

			<Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					Link copied.
				</Alert>
			</Snackbar>
		</StyledModal>
	);
}
