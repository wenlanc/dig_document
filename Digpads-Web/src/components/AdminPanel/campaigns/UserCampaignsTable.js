import React from 'react';
import TimeTable from '../TimeTable';
import { Paper, Typography } from '@mui/material';

export default function UserCampaignsTable({ userReviews }) {
	return (
		<div>
			<TimeTable rows={formatReviews(userReviews)} />
		</div>
	);
}

// formate reviews for displaying in the TimeTable
function formatReviews(reviews) {
	const reviewsCreatedDates = reviews.map((r) => r.createdAt);
	const reviewsCollected = {
		name: 'reviewsCollected',
		content: sortByTime(reviewsCreatedDates),
	};

	const reviewsRejectCreatedDates = reviews
		.filter((review) => review.rejected === true)
		.map((review) => review.createdAt);

	const reviewsRejected = {
		name: 'reviewsRejected',
		content: sortByTime(reviewsRejectCreatedDates),
	};

	const reviewsPublished = {
		name: 'reviewsPublished',
		content: reviewsCollected.content.map(
			(item, index) => item - reviewsRejected.content[index]
		),
	};

	const reviewResponses = reviews.map((r) => r.responses).flat();

	const reviewsResponsesCreatedDates = reviewResponses.map((r) => r.createdAt);

	const reviewsResponses = {
		name: 'reviewsResponses',
		content: sortByTime(reviewsResponsesCreatedDates),
	};

	return [
		reviewsCollected,
		reviewsRejected,
		reviewsPublished,
		reviewsResponses,
	];
}

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
		return false;
	} else {
		return true;
	}
}
