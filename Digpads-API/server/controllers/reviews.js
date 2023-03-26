const Review = require('../models/Review');
const User = require('../models/User');
const ReviewCollectionCampaign = require('../models/ReviewCollectionCampaign');
const ReviewResponse = require('../models/ReviewResponse');
const ReviewChallenge = require('../models/ReviewChallenge');
const ReviewsDisplayForm = require('../models/ReviewsDisplayForm');
const { updateTotalStarRating, onReviewAdded } = require('./marketplaceProfile');
const { notifyUser } = require('./notifications');

const IPAddressToLocation = require('../services/IPAddressToLocation');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

function validate(handler) {
	switch (handler) {
		case 'addReview':
			return validator.body(addReviewSchema);
		default:
			throw new Exception('invalid validation handler: ', handler);
	}
}

async function challengeReview(reviewId, userId, data) {
	const review = await Review.findById(reviewId);
	const user = await User.findById(userId);

	if (review === null) {
		throw 'review not found';
	}

	if (user === null) {
		throw 'user not found';
	}

	const challenge = await ReviewChallenge.findOneAndUpdate(
		{ review: reviewId },
		{ ...data, review: review, challenger: user },
		{ upsert: true, new: true }
	);
	review.challenge = challenge;

	return review.save();
}

async function respondToReview(reviewId, userId, data) {
	const review = await Review.findById(reviewId);
	const user = await User.findById(userId);

	if (review === null) {
		throw 'review not found';
	}

	if (user === null) {
		throw 'user not found';
	}

	const response = await ReviewResponse.create({
		...data,
		review: review,
		author: user,
	});
	review.responses.push(response);

	return review.save();
}

async function editReview(id, data) {
	return Review.findByIdAndUpdate(id, data, { new: true });
}

async function getReviews(filter) {
	if (filter.used) {
		return getUsedReviews(filter.user);
	}

	const reviews = await Review.find(
		filter,
		'title content ratings source rejected rejectedReason createdAt',
		{ lean: true }
	).populate([
		{ path: 'user', select: 'email' },
		{ path: 'reviewer', select: 'first last email' },
		{ path: 'campaign', select: 'name' },
		{
			path: 'responses',
			populate: { path: 'author', model: 'User', select: 'name first last' },
			select: 'createdAt content',
		},
		{
			path: 'challenge',
			select: 'createdAt reason status accepted adminMessage',
		},
	]);

	return reviews;
}

async function getUsedReviews(user) {
	const forms = await ReviewsDisplayForm.find({ user: user }).populate([
		{
			path: 'reviews',
			populate: [
				{ path: 'reviewer', select: 'email' },
				{ path: 'campaign', select: 'name' },
			],
			select: 'title source createdAt',
		},
	]);
	const reviews = forms.map((form) => form.reviews).flat();
	return reviews;
}

async function getStats() {
	const reviews = await Review.find({}, 'rejected createdAt');
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

	// get review response count sorted by time
	const reviewResponses = await ReviewResponse.find({}, 'createdAt');
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

async function updateReview(reviewId, update) {
	try {
		return Review.findByIdAndUpdate(reviewId, update, { new: true });
	} catch (error) {
		console.error(`error deleting review: ${review} - ${error}`);
	}
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
		// Date is older than range
		return false;
	} else {
		// Date is not older than range
		return true;
	}
}

async function getRejected() {
	try {
		const reviews = await Review.find(
			{ rejected: true },
			'createdAt rejectedReason'
		)
			.populate({
				path: 'campaign',
				select: 'name',
			})
			.populate({ path: 'reviewer', select: 'first last name email' });

		return reviews;
	} catch (error) {
		console.eror(error);
		return [];
	}
}

const addReviewSchema = Joi.object({
	reviewer: Joi.object({
		id: Joi.string().alphanum().required(),
		first: Joi.string().required(),
		last: Joi.string().required(),
		middle: Joi.string().required(),
		email: Joi.string().email(),
	}),
	title: Joi.string().required(),
	campaign: Joi.string().required(),
	content: Joi.string().required(),
	ratings: Joi.object().required(),
});

async function addReview(reviewData, reviewerIpAddress) {
	const IpAddresses = {
		moscow: '195.60.236.2',
		usa: '24.207.189.255'
	}

	try {
		const campaign = await ReviewCollectionCampaign.findById(
			reviewData.campaign,
			'reviews state collectingOutOfState'
		).populate('user', '_id email');

		if (campaign === null) {
			throw new Error('campign not found');
		}


		const reviewer = await User.findById(reviewData.reviewer.id, '_id');

		if (reviewer === null) {
			throw 'Unknown reviewer';
		}

		const rejectedResult = await validateReviewRejected(
			reviewData.reviewer.email,
			campaign,
			process.env.NODE_ENV === 'development'
				? IpAddresses.usa
				: reviewerIpAddress
		);

		const review = new Review({
			user: campaign.user,
			reviewer,
			campaign: campaign,
			title: reviewData.title,
			content: reviewData.content,
			ratings: reviewData.ratings,
			rejected: rejectedResult.rejected,
			rejected: false,
			rejectedReason: rejectedResult.rejectedReason,
			rejectedReason: '',
		});

		await review.save();

		campaign.reviews.push(review);

		onReviewAdded(campaign.user);
		updateTotalStarRating(campaign.user);

		await campaign.save();
	} catch (error) {
		console.error(error);
	}
}


async function validateReviewRejected(
	reviewerEmail,
	campaign,
	reviewerIPAddress
) {
	let rejected = false;
	let rejectedReason = '';

	// Mark review as rejected if from the same email address
	const reviewExists = await validateReviewExists(reviewerEmail, campaign);
	if (reviewExists) {
		rejected = true;
		rejectedReason = 'Review with specified email already exists';
	}

	const reviewerLocation = await IPAddressToLocation(reviewerIPAddress);

	if (!reviewerLocation) {
		rejected = true;
		rejectedReason = 'Unknown reviewer location';
		return { rejected, rejectedReason };
	}

	/**
	 * Reject reviews from outside USA
	 */
	const isOutsideUSA = reviewerLocation.ip_info.country_code !== 'US';
	if (isOutsideUSA) {
		rejected = true;
		rejectedReason = 'Review is from outide USA';
	}

	/**
	 * Reject reviews from the same state as the collector unless
	 * the collector is collecting out of state
	 */
	if (!campaign.collectingOutOfState) {
		const collectorState = campaign.state?.toLowerCase();
		const reviewerState = reviewerLocation?.ip_info?.region_name?.toLowerCase();
		if (collectorState && (collectorState !== reviewerState)) {
			rejected = true;
		}
	}

	/**
	 * Reject reviews from the same email address as the
	 * creator of the campaign has. (Forbid writing reviews on yourself)
	 */
	if (reviewerEmail.toLowerCase() === campaign.user.email.toLowerCase()) {
		rejected = true;
		rejectedReason = `Specified email is the same as collectors' email`;
	}

	/**
	 * Reject reviews coming from a IP address that has been used to submit a different review for this campaign
	 */
	if (process.env.NODE_ENV === 'production') { // only in production because localhost address is always ::1
		// is there exists a review with reviewer.lastIpAddress === reviewerIpAddress
		const reviews = await Review.find({ campaign: campaign }, '_id').populate({
			path: 'reviewer',
			select: 'lastIpAddress', // User doesn't have lastIpAddress because it was not stored. registerUnactivatedUser
		});
		const ips = reviews.map((r) => r.reviewer.lastIpAddress);

		if (ips.some((ip) => ip === reviewerIPAddress)) {
			rejected = true;
			rejectedReason = `Reviewer ip address has been used on a different review`;
		}
	}

	return { rejected, rejectedReason };
}

async function validateReviewExists(email, campaign) {
	const reviews = await Review.find({ campaign: campaign }, '_id').populate(
		'reviewer',
		'email'
	);

	if (
		reviews.some(
			(r) => r.reviewer?.email?.toLowerCase() === email?.toLowerCase()
		)
	) {
		return true;
	}

	return false;
}

async function getChallengedReviews() {
	try {
		return Review.find(
			{ challenge: { $exists: true } },
			'user campaign title challenge createdAt'
		)
			.populate({ path: 'user', select: 'first last name' })
			.populate({ path: 'reviewer', select: 'email' })
			.populate({ path: 'campaign', select: 'name dateLaunched' })
			.populate({
				path: 'challenge',
				select: 'createdAt status accepted reason content attachments',
			});
	} catch (error) {
		console.error(`Error getting challenged reviews: ${error}`);
	}
}

/**
 *
 * @param {string} user user id
 * @returns challenged reviews of a specific user
 */
async function getChallengedReviewsByUser(user) {
	try {
		return Review.find(
			{ user: user, challenge: { $exists: true } },
			'campaign title challenge createdAt'
		)
			.populate({ path: 'user', select: 'first last name' })
			.populate({ path: 'campaign', select: 'name' })
			.populate({ path: 'challenge', select: 'createdAt reason' });
	} catch (error) {
		console.error(`Error getting challenged reviews: ${error}`);
	}
}

async function patchReviewChallenge(reviewChallenge, body) {
	try {
		const challenge = await ReviewChallenge.findByIdAndUpdate(
			reviewChallenge,
			body,
			{ new: true }
		);
	} catch (error) {
		console.error(`Error patching review challenge: ${error}`);
	}
}

async function requestMoreInformation(reviewChallenge, body) {
	try {
		const challenge = await ReviewChallenge.findById(reviewChallenge).populate({
			path: 'review',
			select: 'user',
		});
		await ReviewChallenge.findByIdAndUpdate(reviewChallenge, body, {
			new: true,
		});

		const notification = {
			message: body.adminMessage,
			to: `/reviewChallenge/${challenge._id}/add_info`,
		};
		await notifyUser(challenge.review.user, notification);
	} catch (error) {
		console.error(`Error requesting more information: ${error}`);
	}
}

async function addAttachments(reviewChallengeId, attachments) {
	try {
		return ReviewChallenge.findByIdAndUpdate(reviewChallengeId, {
			$push: {
				attachments: {
					$each: attachments,
				},
			},
		});
	} catch (error) {
		console.error(`Error requesting more information: ${error}`);
	}
}

module.exports = {
	validate,
	getRejected,
	addReview,
	getStats,
	getReviews,
	updateReview,
	getChallengedReviews,
	getChallengedReviewsByUser,
	editReview,
	challengeReview,
	respondToReview,
	patchReviewChallenge,
	requestMoreInformation,
	addAttachments,
};
