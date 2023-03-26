import React from 'react';

import { Stack } from '@mui/material';
import DashboardLayout from 'components/DashboardLayout';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import Footer from 'components/Footer';

import { fetchSubscribers } from 'controllers/users';
import { fetchRejectedReviews } from 'controllers/reviews';
import { CSV } from 'utils/fileUtils';

export default function downloads() {
	const handleDownloadBadReviews = () => {
		fetchRejectedReviews()
			.then((reviews) => {
				const reviewsData = reviews.map((r) => ({
					title: r.title,
					content: r.content,
					createdAt: r.createdAt,
					rejectedReason: r.rejectedReason,
					source: r.source,
				}));

				const result = csvmaker(
					['title', 'content', 'createdAt', 'rejectedReason', 'source'],
					reviewsData
				);
				download(result, 'bad-reviews.csv');
			})
			.catch((error) => {
				alert(error);
			});
	};

	const handleDownloadSubscribersList = () => {
		fetchSubscribers()
			.then((subscribers) => {
				const subscribersData = subscribers.map((s) => ({
					first: s.first,
					last: s.last,
					middle: s.middle,
					email: s.email,
					type: s.type,
					status: s.status,
				}));

				const result = csvmaker(
					['first', 'last', 'middle', 'email', 'type', 'status'],
					subscribersData
				);

				download(result, 'subscribers-list.csv');
			})
			.catch((error) => {
				alert(error);
			});
	};

	const csvmaker = function (headers, dataArr) {
		// Empty array for storing the values
		const csvRows = [];

		// As for making csv format, headers
		// must be separated by comma and
		// pushing it into array
		csvRows.push(headers.join(','));

		// Pushing Object values into array
		// with comma separation
		dataArr.forEach((d) => {
			const values = Object.values(d).join(',');
			csvRows.push(values);
		});

		// Returning the array joining with new line
		return csvRows.join('\n');
	};

	const download = function (data, fileName) {
		// Creating a Blob for having a csv file format
		// and passing the data with type
		const blob = new Blob([data], { type: 'text/csv' });

		// Creating an object for downloading url
		const url = window.URL.createObjectURL(blob);

		// Creating an anchor(a) tag of HTML
		const a = document.createElement('a');

		// Passing the blob downloading url
		a.setAttribute('href', url);

		// Setting the anchor tag attribute for downloading
		// and passing the download file name
		a.setAttribute('download', fileName);

		// Performing a download with click
		a.click();
	};

	return (
		<DashboardLayout sx={{ pb: '3em' }}>
			<SuiTypography variant='h2'>Downloads</SuiTypography>
			<Stack spacing={3} alignItems='flex-start'>
				<SuiButton color='primary' onClick={handleDownloadBadReviews}>
					Download bad reviews data
				</SuiButton>

				<SuiButton color='primary' onClick={handleDownloadSubscribersList}>
					Download subscriber's list
				</SuiButton>
			</Stack>
			<Footer renderSubscribe={false} />;
		</DashboardLayout>
	);
}
