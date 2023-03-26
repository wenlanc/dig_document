import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Share({ sharer, shareText, shareURL }) {
	const [alert, setAlert] = useState(false);

	const handleClose = () => {
		setAlert(false);
	};

	const handleCopyProfileURLClick = () => {
		navigator.clipboard.writeText(location.href);
		setAlert(true);
	};

	const socialLinks = [
		{
			href: `https://facebook.com/sharer.php?u=${shareURL}`,
			icon: <FacebookIcon color='primary' fontSize='large' />,
		},
		{
			href: `https://twitter.com/intent/tweet/?text=${sharer}%0A${encodeURIComponent(
				shareText
			)}%0A${shareURL}`,
			icon: <TwitterIcon color='primary' fontSize='large' />,
		},
		{
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`,
			icon: <LinkedInIcon color='primary' fontSize='large' />,
		},
		{
			href: `https://gab.com/compose?url=${encodeURIComponent(
				shareURL
			)}&text=${encodeURIComponent(shareText)}`,
			icon: <img src='/images/gab.png' style={{ height: 36, width: 36 }} />,
		},
		{
			href: `https://www.truthsocial.com/api/share/?title=${sharer}`,
			icon: (
				<img
					src='/images/Truth_Social_logo.svg'
					style={{ height: 36, width: 36 }}
				/>
			),
		},
		{
			href: `https://www.nextdoor.com/api/share/?title=${sharer}`,
			icon: (
				<img src='/images/nextdoor.png' style={{ height: 36, width: 36 }} />
			),
		},
	];

	return (
		<>
			<Stack component='ul' spacing={2} direction='row'>
				{socialLinks.map((socialLink) => (
					<SocialLink key={socialLink.href} to={socialLink.href}>
						{socialLink.icon}
					</SocialLink>
				))}
				<CopyProfileURL onClick={handleCopyProfileURLClick} />
			</Stack>

			<Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					Link copied.
				</Alert>
			</Snackbar>
		</>
	);
}

function SocialLink({ to, children }) {
	return (
		<li>
			<a href={to} target='_blank' rel='noreferrer'>
				{children}
			</a>
		</li>
	);
}

function CopyProfileURL({ onClick }) {
	return (
		<li>
			<a target='_blank' rel='noreferrer' onClick={onClick}>
				<LinkIcon style={{ cursor: 'pointer' }} fontSize='large' />
			</a>
		</li>
	);
}

export default Share;
