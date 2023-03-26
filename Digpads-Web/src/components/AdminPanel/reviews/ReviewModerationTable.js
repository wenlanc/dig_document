import React from 'react';
import TimeTable from '../TimeTable';

export default function ReviewModerationTable({ reviews }) {
	const challengedReviews = reviews.filter(
		(r) => r.challenge?.status === 'sent' || r.challenge.status === 'in review'
	);
	const challengedReviewsDates = challengedReviews.map(
		(r) => r.challenge?.createdAt
	);

	const challengedRejectedReviews = reviews.filter(
		(r) => r.challenge?.status === 'rejected'
	);
	const challengedRejectedDates = challengedRejectedReviews.map(
		(r) => r.challenge?.createdAt
	);

	const challengedAcceptedReviews = reviews.filter(
		(r) => r.challenge?.accepted
	);
	const challengedAcceptedDates = challengedAcceptedReviews.map(
		(r) => r.challenge?.createdAt
	);

	const rows = reviews
		? [
				{
					name: 'challengedReviews',
					content: sortByTime(challengedReviewsDates),
				},
				{
					name: 'challengedRejected',
					content: sortByTime(challengedRejectedDates),
				},
				{
					name: 'challengedAccepted',
					content: sortByTime(challengedAcceptedDates),
				},
		  ]
		: initialRows;

	return <TimeTable rows={rows} />;
}

const initialRows = [
	{
		name: 'Challenged Reviews',
		content: [15, 52, 929, 195],
	},
	{
		name: 'Challenged Rejected',
		content: [25, 16, 75, 261],
	},
	{
		name: 'Challenged Accepted(Removed Reviews)',
		content: [11, 212, 616, 261],
	},
];

function sortByTime(dates) {
	const counts = [0, 0, 0, 0];
	const last = {
		day: 24 * 60 * 60 * 1000,
		week: 7 * 24 * 60 * 60 * 1000,
		month: 30 * 24 * 60 * 60 * 1000,
		year: 12 * 30 * 24 * 60 * 60 * 1000,
	};

	dates.forEach((date) => {
		// 2022-02-01
		if (fallsWithin(date, last.day)) {
			counts[0]++;
		} else if (fallsWithin(date, last.week)) {
			counts[1]++;
		} else if (fallsWithin(date, last.month)) {
			counts[2]++;
		} else if (fallsWithin(date, last.year)) {
			counts[3]++;
		}
	});

	return counts;
}

function fallsWithin(date, range) {
	const pastTime = new Date(date);
	const now = new Date();

	const timeDiffInMs = now.getTime() - pastTime.getTime();

	if (timeDiffInMs >= range) {
		// Date is older than range
		return false;
	} else {
		// Date is not older than range
		return true;
	}
}
