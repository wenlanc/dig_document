import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function ArticleCard({ title, image, href }) {
	function resizeCloudinaryImage(url, width = 345) {
		// original https://res.cloudinary.com/digpads/image/upload/v1641397768/Article%20Pictures%20for%20Knowledge/Cash_vs_accrual_accounting_for_landlords_sshi7g.jpg
		// end result https://res.cloudinary.com/digpads/image/upload/w_345,c_scale/v1641397768/Article%20Pictures%20for%20Knowledge/Cash_vs_accrual_accounting_for_landlords_sshi7g.jpg
		const endPosition = url.indexOf('/upload/');
		const result = [
			url.slice(0, endPosition),
			`/upload/w_${width},c_scale/`,
			url.slice(endPosition + 8, url.length),
		].join('');
		return result;
	}

	return (
		<Link to={href || '#0'} component={RouterLink}>
			<Card
				sx={{
					maxWidth: '345px',
					minHeight: '400px',
					display: 'flex',
					flexDirection: 'column',
					pt: '2em',
				}}
			>
				<CardMedia
					image={resizeCloudinaryImage(image)}
					title={title}
					sx={{ height: '230px', backgroundSize: 'cover' }}
				/>
				<CardHeader title={title} sx={{ my: 'auto' }} />
			</Card>
		</Link>
	);
}
