const MarketplaceProfile = require('../models/MarketplaceProfile');
const Review = require('../models/Review');
const User = require('../models/User');
const BusinessTag = require('../models/BusinessTag');
const { createUser } = require('./users');
const Filter = require('bad-words');
const { sendClaimProfile } = require('../services/emails');

const { uuid } = require('uuidv4');

const filter = new Filter();

async function getProfiles(filter, fields, query) {
	[];
	if (query) {
		const IDs = []; // elastic search - get ids of those profiles that match the query
		return await findProfilesByIds(IDs);
	} else {
		return await MarketplaceProfile.find(filter, fields).populate(
			'user',
			'name first last type accountType'
		);
	}
}

async function searchProfiles(filter, query) {
	let matchFilter = { type: { $eq: filter.type } };

	// The landlord-contractors page must show both landlords and contractors
	if (filter.type === 'landlord-contractor') {
		matchFilter = { $or: [{ type: 'landlord' }, { type: 'contractor' }] };
	}

	let profiles = await MarketplaceProfile.find({}, null, {
		lean: true,
	})
		.populate('businessTags')
		.populate({
			path: 'user',
			match: matchFilter,
			select: 'type',
		});

	if (filter.type !== 'landlord-contractor') {
		profiles = profiles.filter((p) => p.user?.type === filter.type);
	}

	if (filter.state) {
		profiles = profiles.filter((p) => p.contactInfo?.state === filter.state);
	}

	if (filter.city) {
		profiles = profiles.filter((p) => p.contactInfo?.city === filter.city);
	}

	if (filter.zip) {
		profiles = profiles.filter((p) => p.contactInfo?.zip === filter.zip);
	}

	if (filter.areasServed) {
		profiles = profiles.filter((p) => {
			const areasServed = p.areasServed;

			let hasAreaServed = false;
			areasServed?.forEach((area) => {
				if (filter.areasServed === `${area.city}, ${area.state}`) {
					hasAreaServed = true;
				}
			});

			return hasAreaServed;
		});
	}

	if (filter.servicesOffered) {
		profiles = profiles.filter((p) => {
			const servicesOfferedString = p.servicesOffered
				?.map((service) => service.services)
				.flat()
				.join(' ');

			return servicesOfferedString?.includes(filter.servicesOffered);
		});
	}

	if (filter.starRating) {
		switch (filter.starRating) {
			case '2':
				profiles = profiles.filter((p) => p.starRating > 2 && p.starRating < 3);
				break;
			case '3-5':
				profiles = profiles.filter((p) => p.starRating > 3 && p.starRating < 5);
				break;
			case '4':
				profiles = profiles.filter(
					(p) => p.starRating === Number(filter.starRating)
				);
				break;
			case '5':
				profiles = profiles.filter(
					(p) => p.starRating === Number(filter.starRating)
				);
		}
	}

	if (filter.numReviews) {
		switch (filter.numReviews) {
			case '1-10':
				profiles = profiles.filter(
					(p) => p.numberOfReviews > 0 && p.numberOfReviews < 11
				);
				break;
			case '11-50':
				profiles = profiles.filter(
					(p) => p.numberOfReviews > 10 && p.numberOfReviews < 50
				);
				break;
			case '50-100':
				profiles = profiles.filter(
					(p) => p.numberOfReviews > 50 && p.numberOfReviews < 100
				);
				break;
			case '100-500':
				profiles = profiles.filter(
					(p) => p.numberOfReviews > 99 && p.numberOfReviews < 500
				);
				break;
			case '500-1000':
				profiles = profiles.filter(
					(p) => p.numberOfReviews > 500 && p.numberOfReviews < 1001
				);
				break;
			case '1000+':
				profiles = profiles.filter((p) => p.numberOfReviews > 1000);
				break;
		}
	}

	if (filter.yearsInBusiness) {
		const currentYear = new Date().getFullYear();

		switch (filter.yearsInBusiness) {
			case '1':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 1
				);
				break;
			case '2-3':
				profiles = profiles.filter(
					(p) =>
						currentYear - p.businessDetails?.yearFounded === 2 ||
						currentYear - p.businessDetails?.yearFounded === 3
				);
				break;
			case '5':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 5
				);
				break;
			case '10':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 10
				);
				break;
			case '20':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 20
				);
				break;
			case '30':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 30
				);
				break;
			case '50':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 50
				);
				break;
			case '100':
				profiles = profiles.filter(
					(p) => currentYear - p.businessDetails?.yearFounded > 100
				);
				break;
		}
	}

	if (filter.photosVideos) {
		switch (filter.photosVideos) {
			case '1':
				profiles = profiles.filter((p) => p.portfolio?.images?.length > 1);
				break;
			case '5':
				profiles = profiles.filter((p) => p.portfolio?.images?.length > 5);
				break;
			case '10':
				profiles = profiles.filter((p) => p.portfolio?.images?.length > 10);
				break;
			case 'video':
				profiles = profiles.filter((p) => p.portfolio?.videos?.length > 1);
				break;
			case 'photosAndvideos':
				profiles = profiles.filter(
					(p) =>
						p.portfolio?.images?.length > 0 && p.portfolio?.videos?.length > 0
				);
				break;
		}
	}

	if (filter.categories) {
		profiles = profiles.filter((p) => {
			const businessTagsString = p.businessTags
				?.map((tag) => tag.name)
				?.join(' ');

			return businessTagsString
				.toLowerCase()
				?.includes(filter.categories.toLowerCase());
		});
	}

	if (query) {
		profiles = profiles.filter((p) => {
			const areasServedString = p.areasServed
				?.map((a) => a.city + ' ' + a.state)
				?.join();
			const businessDetailsString =
				p.businessDetails?.yearFounded +
				' ' +
				p.businessDetails?.numEmployees +
				' ' +
				p.businessDetails?.licenses +
				' ' +
				p.businessDetails?.headquarters +
				' ' +
				p.businessDetails?.ownership +
				' ' +
				p.businessDetails?.trainingEducation;

			return (
				p.contactInfo?.name?.toLowerCase()?.includes(query) ||
				p.aboutYou?.toLowerCase()?.includes(query) ||
				areasServedString?.toLowerCase()?.includes(query) ||
				businessDetailsString?.toLowerCase()?.includes(query)
			);
		});
	}

	return profiles;
}

/**
 * @param {Array<string>} IDs - IDs of articles to look for
 * @returns {Promise<Array>} profiles
 */
async function findProfilesByIds(IDs) {
	const profiles = await MarketplaceProfile.find({ _id: { $in: IDs } }, fields);
	return profiles;
}

async function getProfile(user, fields = '') {
	if (fields.includes('star_rating')) {
		const profile = await MarketplaceProfile.findOne(
			{ user: user.id, deleted: { $ne: true } },
			'starRating',
			{
				lean: true,
			}
		);
		return profile;
	}

	const profile = await MarketplaceProfile.findOne({
		user: user.id,
		deleted: { $ne: true },
	})
		.populate('businessTags')
		.populate('user', 'type accountType')
		.lean();

	if (!profile) {
		return null;
	}

	const tags = filterBadWords(profile.businessTags);

	return { ...profile, businessTags: tags };
}

function filterBadWords(businessTags) {
	const result = businessTags.map((tag) => ({
		...tag,
		name: filter.clean(tag.name),
	}));
	return result;
}

async function deleteProfile(user) {
	try {
		await MarketplaceProfile.findOneAndUpdate(
			{ user: user.id },
			{ deleted: true }
		);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function createProfile(user) {
	try {
		const { name, firstName, lastName, profileType, marketplaceType } = user;

		const newUser = await User.create({
			first: firstName,
			last: lastName,
			accountType: profileType === 'individual' ? 'individual' : 'company',
			type: marketplaceType,
			email: uuid(),
		});
		const profile = await MarketplaceProfile.create({
			name: name,
			user: newUser,
			unclaimed: true,
		});
		return profile;
	} catch (error) {
		console.error(error);
		return `Error creating marketplace profile for user ${user}`;
	}
}

async function updateProfile(user, data) {
	let property = '';

	try {
		if ('socialMediaLinks' in data) {
			property = 'socialMediaLinks';
		} else if ('contactInfo' in data) {
			property = 'contactInfo';
		} else if ('aboutYou' in data) {
			property = 'aboutYou';
		} else if ('mapLocationHours' in data) {
			property = 'mapLocationHours';
		} else if ('businessDetails' in data) {
			property = 'businessDetails';
		} else if ('businessTags' in data) {
			property = 'businessTags';
		} else if ('desiredRental' in data) {
			property = 'desiredRental';
		} else if ('neighborhoods' in data) {
			property = 'neighborhoods';
		} else if ('rentalHistory' in data) {
			property = 'rentalHistory';
		} else if ('servicesOffered' in data) {
			property = 'servicesOffered';
		} else if ('portfolio' in data) {
			property = 'portfolio';
		} else if ('desiredAmenities' in data) {
			property = 'desiredAmenities';
		} else if ('logo' in data) {
			property = 'logo';
		} else if ('availability' in data) {
			property = 'availability';
		} else if ('areasServed' in data) {
			property = 'areasServed';
		}

		const profile = await MarketplaceProfile.findOneAndUpdate(
			{ user: user.id },
			{ $set: { [property]: data[property] } },
			{ new: true }
		);

		if (property === 'businessTags') {
			const updatedResult = await MarketplaceProfile.findOne(
				{ user: user.id },
				'businessTags',
				{ lean: true }
			).populate('businessTags');

			updatedResult.businessTags = updatedResult.businessTags.map((tag) => ({
				...tag,
				name: filter.clean(tag.name),
			}));

			return updatedResult.businessTags;
		}

		return profile[property];
	} catch (error) {
		console.log(error);
		throw new Error('Error updating marketplace profile');
	}
}

async function assignProfile(profileId, email) {
	try {
		const unclaimedProfile = await MarketplaceProfile.findById(profileId);
		const user = await User.findOne({ email });
		const userExists = user !== null;

		if (userExists) {
			await assignMarketplaceProfileTo(unclaimedProfile, user);
		} else {
			sendClaimProfile(email, unclaimedProfile._id);
		}
	} catch (error) {
		console.error(error);
		throw `Error trying to assign profile ${profileId} to email ${email}: ${error}`;
	}
}

async function claimProfile(profileId, userData) {
	try {
		const profile = await MarketplaceProfile.findById(profileId);

		if (!profile) {
			throw new Error('Profile not found');
		}

		if (!profile.unclaimed) {
			throw new Error('The profile is already claimed');
		}

		// create new user using <userData>
		const userId = await createUser({
			...userData,
			profile_name:
				userData.accountType === 'individual'
					? `${userData.first} ${userData.last}`
					: userData.companyName,
		});

		profile.user = userId;
		profile.unclaimed = false;
		await profile.save();

		return profile;
	} catch (error) {
		console.error(error);
		throw `Error trying to claim profile ${profileId} for user ${userId}: ${error}`;
	}
}

async function assignMarketplaceProfileTo(profile, user) {
	// make old user profile unclaimed
	const oldProfile = await MarketplaceProfile.findOne({ user: user });
	if (oldProfile) {
		oldProfile.user = null;
		oldProfile.unclaimed = true;
		await oldProfile.save();
	}

	await user.save();

	profile.user = user;
	await profile.save();
}

async function createCustomTag(tag) {
	try {
		return BusinessTag.create(tag);
	} catch (error) {
		console.error('error creating custom tag ', error);
	}
}

async function updateTotalStarRating(user) {
	try {
		const starRating = await calculateStarRating(user);
		return await MarketplaceProfile.findOneAndUpdate(
			{ user: user },
			{ starRating }
		);
	} catch (error) {
		return Promise.reject(`Error updating total star rating: ${error}`);
	}
}

async function calculateStarRating(user) {
	try {
		const reviews = await Review.find({ user: user }, '_id ratings');
		if (reviews.length > 0) {
			const overallRatings = reviews.map((r) => r.ratings.overall);
			const overallTotalRating =
				overallRatings.reduce((acc, rating) => acc + rating) / reviews.length;
			return overallTotalRating;
		} else {
			return 0;
		}
	} catch (error) {
		return Promise.reject(`Error calculating total star rating: ${error}`);
	}
}

async function onReviewAdded(user) {
	try {
		await MarketplaceProfile.findOneAndUpdate(
			{ user: user },
			{ $inc: { numberOfReviews: 1 } }
		);
		return true;
	} catch (error) {
		console.error(`Error updating number of reviews for user: ${user}`);
		return false;
	}
}

module.exports = {
	getProfile,
	getProfiles,
	onReviewAdded,
	searchProfiles,
	updateProfile,
	updateTotalStarRating,
	deleteProfile,
	createProfile,
	createCustomTag,
	assignProfile,
	claimProfile,
};
