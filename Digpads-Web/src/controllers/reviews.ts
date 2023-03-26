import { instance, getCSRF } from './axios';
import {
	IGetReviewsResponse,
	IGetReviewsStatsResponse,
	ReviewChallenge,
	Attachment,
} from 'types';

export async function getReviewsStats() {
	let response: IGetReviewsStatsResponse;

	try {
		response = await instance.get('/reviews/stats');
	} catch (error) {
		Promise.reject(`Error fetching review stats: ${error}`);
	}

	let { stats } = response.data;
	stats = stats || [];

	return stats;
}

export async function getUsersStats() {
	try {
		const response = await instance.get('/users/stats');
		return response.data;
	} catch (error) {
		console.error(`Error fetching users stats: ${error}`);
	}
}

export async function getReviews(user?: string) {
	let response: IGetReviewsResponse;

	try {
		response = await instance.get(`/reviews/${user ? `?user=${user}` : ''}`);
	} catch (error) {
		Promise.reject(`Error fetching reviews: ${error}`);
	}

	let { reviews } = response.data;
	reviews = reviews || [];

	return reviews;
}

export async function fetchRejectedReviews() {
	let response: IGetReviewsResponse;

	try {
		response = await instance.get(`/reviews/?rejected`);
	} catch (error) {
		return Promise.reject(`Error fetching rejected reviews: ${error}`);
	}

	let { reviews } = response.data;
	reviews = reviews || [];

	return reviews;
}

export async function fetchChallengedReviews(user?: string) {
	let response: IGetReviewsResponse;

	try {
		const urlSearchParams = new URLSearchParams();
		if (user) {
			urlSearchParams.append('user', user);
		}

		response = await instance.get('/reviews/challenged', {
			params: urlSearchParams,
		});
	} catch (error) {
		return Promise.reject(`Error fetching challenged reviews: ${error}`);
	}

	let { reviews } = response.data;
	reviews = reviews || [];

	return reviews;
}

export async function removeReview(review: string) {
	try {
		await getCSRF();
		const response = await instance.patch(`/reviews/${review}/remove`);
		return response.data;
	} catch (error) {
		console.error(`Error removing review ${error}`);
	}
}

export async function editReview(review, data) {
	try {
		await getCSRF();
		const response = await instance.patch(`/reviews/${review}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error editing review ${error}`);
	}
}

export async function getUsedReviews(user) {
	let response: IGetReviewsResponse;

	try {
		await getCSRF();
		response = await instance.get(`/reviews/?user=${user}&used`);
	} catch (error) {
		Promise.reject(`Error fetching used reviews: ${error}`);
	}

	let { reviews } = response.data;
	reviews = reviews || [];

	return reviews;
}

export async function createReviewsDisplayForm(data) {
	try {
		await getCSRF();
		const response = await instance.post(`/reviewsDisplayForm`, data);
		return response.data;
	} catch (error) {
		console.error(`Error creating reviews display form: ${error}`);
	}
}

export async function fetchReviewsDisplayForm(user) {
	try {
		await getCSRF();
		const response = await instance.get(`/reviewsDisplayForm/?user=${user}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching reviews display form: ${error}`);
	}
}

export async function challengeReview(reviewId, challengeData) {
	try {
		await getCSRF();
		const response = await instance.post(
			`/reviews/challenge/${reviewId}`,
			challengeData
		);
	} catch (error) {
    return Promise.reject(`Error challenging a review: ${error}`);
	}
}

export async function respondToReview(reviewId, responseData) {
	try {
		await getCSRF();
		const response = await instance.post(
			`/reviews/respond/${reviewId}`,
			responseData
		);
		return response.data;
	} catch (error) {
		throw new Error(`Error responding to a review: ${error}`);
	}
}

export async function getOverallStarRating(user: string) {
	try {
		const response = await instance.get(
			`/marketplaceProfiles/${user}/?fields=star_rating`
		);
		return response.data?.starRating || 0;
	} catch (error) {
		throw new Error(
			`Error fetching overall star rating for user ${user}: ${error}`
		);
	}
}

export async function acceptReviewChallenge(
	challenge: string,
	decisionMessage
) {
	try {
		await getCSRF();
		await instance.patch(`/reviewChallenge/${challenge}`, {
			status: 'completed',
			accepted: true,
			adminMessage: decisionMessage,
		});
		return true;
	} catch (error) {
		throw new Error(`Error acceptng review challenge ${challenge}: ${error}`);
	}
}

export async function rejectReviewChallenge(
	challenge: string,
	decisionMessage
) {
	try {
		await getCSRF();
		await instance.patch(`/reviewChallenge/${challenge}`, {
			status: 'completed',
			accepted: false,
			adminMessage: decisionMessage,
		});
		return true;
	} catch (error) {
		throw new Error(`Error rejecting review challenge ${challenge}: ${error}`);
	}
}

export async function requestMoreInformation(
	challenge: string,
	decisionMessage
) {
	try {
		await getCSRF();
		await instance.post(`/reviewChallenge/${challenge}/?action=request-info`, {
			status: 'under review',
			adminMessage: decisionMessage,
		});
		return true;
	} catch (error) {
		throw new Error(`Error rejecting review challenge ${challenge}: ${error}`);
	}
}

export async function editReviewChallenge(
	reviewChallenge: string,
	data: Partial<ReviewChallenge>
) {
	try {
		await getCSRF();
		await instance.patch(`/reviewChallenge/${reviewChallenge}`, data);
		return true;
	} catch (error) {
		throw new Error(
			`Error editing review challenge ${reviewChallenge}: ${error}`
		);
	}
}

export async function addReviewChallengeInfo(
	reviewChallengeId: string,
	attachments: Attachment[]
) {
	try {
		await getCSRF();
		await instance.post(
			`/reviewChallenge/${reviewChallengeId}/attachments`,
			attachments
		);
		return true;
	} catch (error) {
		throw new Error(
			`Error editing review challenge ${reviewChallengeId}: ${error}`
		);
	}
}
