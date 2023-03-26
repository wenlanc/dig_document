import React, { useState } from 'react';
import { SocialMediaButtonContainer } from './styled/share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const clickedColor = '#6c7a8f';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Share(props) {
	const twitterLink = `https://twitter.com/intent/tweet/?text=${props.post.content}%20https://www.digpads.com/landlordforum/post/${props.post.slug}`;
	const facebookLink = `https://facebook.com/sharer.php?u=https://www.digpads.com/landlordforum/post/${props.post.slug}`;
	const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=http://www.digpads.com/`;
	const whatsapLink = `whatsapp://send?text=${props.post.content}%20https://www.digpads.com/landlordforum/post/${props.post.slug}`;

	const [clicked, setClicked] = useState('#4055b5');
	const [alert, setAlert] = useState(false);
	const handleClose = () => {
		setAlert(false);
	};

	return (
		<>
			<SocialMediaButtonContainer>
				{/* Sharingbutton Twitter  */}
				<a
					href={twitterLink}
					rel='noopener'
					aria-label=''
					style={{ marginLeft: '5%' }}
				>
					<TwitterIcon color='primary' />
				</a>

				{/* Sharingbutton Facebook */}
				<a
					href={facebookLink}
					rel='noopener'
					aria-label=''
					style={{ marginLeft: '5%' }}
				>
					<FacebookIcon color='primary' />
				</a>

				{/* Sharingbutton LinkedIn  */}
				<a
					href={linkedinLink}
					rel='noopener'
					aria-label=''
					style={{ marginLeft: '5%' }}
				>
					<LinkedInIcon color='primary' />
				</a>

				{/* Sharingbutton WhatsApp  */}
				<a
					href={whatsapLink}
					rel='noopener'
					aria-label=''
					style={{ marginLeft: '5%' }}
				>
					<WhatsAppIcon color='primary' />
				</a>

				{/* Share post link */}

				<LinkIcon
					style={{
						marginRight: '2%',
						cursor: 'pointer',
						color: `${clicked}`,
					}}
					onClick={() => {
						setClicked(clickedColor);
						setAlert(true);
						navigator.clipboard.writeText(
							`https://www.digpads.com/landlordforum/post/${props.post.slug}/`
						);
					}}
				/>
			</SocialMediaButtonContainer>
			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='success'>
					sdfdsfa
				</Alert>
			</Snackbar>
		</>
	);
}

export default Share;
