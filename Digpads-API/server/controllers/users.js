const bcrypt = require('bcrypt');
const { startOfDay, endOfDay } = require('date-fns');
const { User } = require('../models/db');
const Auth = require('../services/authenticate');
const Email = require('../services/emails');
const MarketplaceProfile = require('../models/MarketplaceProfile');
const { cloudinary } = require('../services/cloudinary');
const { uuid } = require('uuidv4');
const { createDefaultCampaign } = require('./reviewCollectionCampaign');

/**
 * Creates new user
 * ------REQUIRED PARAMS------
 * @param {String} body.psw
 * @param {String} body.first
 * @param {String} body.last
 * @param {Email} body.email
 * SUCCESS
 * @returns {User}
 * FAIL
 * @returns {Object.error} email used
 * @returns {Object.error} not verified
 * @returns {Error}
 */
exports.createUser = async (body) => {
	try {
		if (!body.psw || !body.first || !body.last || !body.email) {
			return { error: 'invalid params' };
		}
		let user = await User.findOne({ email: body.email }).select('email').lean();
		if (user) {
			// email activation required
			if (user.confirmedEmail) return { error: 'not verified' };
			return { error: 'email used' };
		}
		body.dateFirstJoined = new Date();
		body.displayUsername = null;
		body.hash = await bcrypt.hash(body.psw, 10);
		body.profilePicUrl =
			'https://res.cloudinary.com/digpads/image/upload/v1622153386/Static%20Images/profilepic_nhql3i.png';
		//Creates string for confirmed email
		body.confirmedEmail = uuid();
		delete body.psw;
		Email.signUpVerification(body);
		let newUser = new User(body);

		const marketplaceProfile = await MarketplaceProfile.create({
			user: newUser,
			name: body.profile_name
		});

		await newUser.save();
		await createDefaultCampaign(newUser);
		return newUser._id;
	} catch (e) {
		console.log({ error: e, message: 'createUser user controller' });
		return { error: 'u+nknown', message: 'user controller create user' };
	}
};

exports.createUnactivatedUser = async (body) => {
	try {
		// Check email already exists
		const user = await User.findOne({ email: body.email })
			.select('email')
			.lean();

		if (user) {
			return user._id;
		}

		const newUser = new User(body);
		await newUser.save();

		return newUser._id;
	} catch (error) {
		console.log(error);
	}
};

// get the number of active, new, deleted and banned users in the last
// 24h, last week, last month, last year
exports.getStats = async () => {
	const yearAgo = new Date();
	yearAgo.setFullYear(yearAgo.getFullYear() - 1);

	// users who have used the website in the last year
	const activeUsers = await User.find(
		{ lastLogin: { $gte: yearAgo } },
		'_id lastLogin'
	);

	// users who have deleted their account
	const deletedUsers = await User.find(
		{ deleted: true, deletedDate: { $gte: yearAgo } },
		'_id deletedDate'
	);

	// users who have joined digpads in the last year
	const newUsers = await User.find(
		{ dateFirstJoined: { $gte: yearAgo } },
		'_id dateFirstJoined'
	);

	// users that have been terminated or permanently deleted by the Admin
	const bannedUsers = await User.find(
		{ $or: [{ terminated: true }, { permanentlyDeleted: true }] },
		'dateTerminated'
	);

	return {
		activeUsers,
		deletedUsers,
		newUsers,
		bannedUsers,
	};

	// const usersCreatedDates = users.map((user) => user.dateFirstJoined);
	// active user is one who logged in in the last 24h, last week, last month, last year

	// const activeUsers = {name: 'activeUsers', content: [
	// 	User.find()
	// ]};
	// const deletedUsers = {name: 'deletedUsers', content: []};
	// const newUsers = {name: 'newUsers', content: []};
	// const bannedUsers = {name: 'bannedUsers', content: []};

	// const reviewsRejectCreatedDates = reviews
	// 	.filter((review) => review.rejected === true)
	// 	.map((review) => review.createdAt);

	// const reviewsRejected = {
	// 	name: 'reviewsRejected',
	// 	content: sortByTime(reviewsRejectCreatedDates),
	// };

	// const reviewsPublished = {
	// 	name: 'reviewsPublished',
	// 	content: reviewsCollected.content.map(
	// 		(item, index) => item - reviewsRejected.content[index]
	// 	),
	// };

	// // get review response count sorted by time
	// const reviewResponses = await ReviewResponse.find({}, 'createdAt');
	// const reviewsResponsesCreatedDates = reviewResponses.map((r) => r.createdAt);

	// const reviewsResponses = {
	// 	name: 'reviewsResponses',
	// 	content: sortByTime(reviewsResponsesCreatedDates),
	// };

	// return [
	// 	reviewsCollected,
	// 	reviewsRejected,
	// 	reviewsPublished,
	// 	reviewsResponses,
	// ];
};

/**
 * Logs in a user
 * ------REQUIRED PARAMS------
 * @param {String} body.psw
 * @param {Email} body.email
 * SUCCESS
 * @returns {Object.token, Object.id}
 * FAIL
 * @returns {Object.error} no email found
 * @returns {Object.error} wrong password
 * @returns {Error}
 */

exports.login = async (body) => {
	try {
		if (!body.psw || !body.email) {
			return { error: 'invalid params' };
		}
		let user = await User.findOne({ email: body.email }).lean();
		if (!user) return { error: 'email not found' };
		try {
			let correct = await bcrypt.compare(body.psw, user.hash);
			if (!correct) return { error: 'email not found' };
		} catch (e) {
			console.log(e);
			return { error: 'unknown' };
		}
		if (user.confirmedEmail != null && user.confirmedEmail != '') {
			return { error: 'email not verified' };
		}
		let token = await Auth.createJWT(user._id, body.rememberMe);
		return { token: token, id: user._id };
	} catch (e) {
		console.log({ error: e, message: 'login user controller' });
		return { error: 'unknown' };
	}
};

/**
 * Verifies user's email
 * ------REQUIRED PARAMS------
 * @param {Email} user.confirmedEmail
 * SUCCESS
 * @returns {True}
 * FAIL
 * @returns {False} Not found
 */
exports.verifyUser = async (user) => {
	try {
		let cUser = await User.findOne({
			confirmedEmail: user.vToken,
		}).select('confirmedEmail');
		if (cUser && cUser.confirmedEmail == user.vToken) {
			cUser.confirmedEmail = null;
			await cUser.save();
			return { message: 'Success' };
		}
		return { error: 'user not found' };
	} catch (e) {
		console.log({ error: err, message: 'user controller verifyUser' });
		return { error: err, message: 'Internal server error' };
	}
};

/**
 * forgot Password
 * ------REQUIRED PARAMS------
 * @param {User} user.email
 * SUCCESS
 * @returns {message : success} Pass reset link sent
 * FAIL
 * @returns {error : some error} Link not sent
 */

exports.sendResetMail = async (body) => {
	try {
		let user = await User.findOne({ email: body.email }).select(
			'email first last'
		);
		if (!user) {
			return { error: 'User not found' };
		}
		let pToken = uuid();
		await Email.ResetPass(user, pToken);
		console.log('email sent');
		user.pToken = pToken;
		await user.save();
		return { message: 'Success' };
	} catch (err) {
		console.log({ error: err, message: 'user controller sendResetMail' });
		return { error: err, message: 'Internal server error' };
	}
};

/**
 * Reset Password
 * ------REQUIRED PARAMS------
 * @param {User} user.pass and pToken (password reset token)
 * SUCCESS
 * @returns {message : success} Pass reset link sent
 * FAIL
 * @returns {error : some error} Link not sent
 */

exports.resetPass = async (body) => {
	try {
		let user = await User.findOne({ pToken: body.pToken }).select('hash');
		if (user) {
			user.hash = await bcrypt.hash(body.psw, 10);
			user.pToken = '';
			user.dateLastPasswordChange = new Date();
			await user.save();
			return { message: 'Success' };
		}
		return { error: 'link expired' };
	} catch (err) {
		console.log({ error: err, message: 'user controller resetPass' });
		return { error: err, message: 'Internal server error' };
	}
};

/**
 * User Profile
 * ------REQUIRED PARAMS------
 * @param {User} user._id
 * SUCCESS
 * @returns {data : user} user profile sent
 * FAIL
 * @returns {error : some error} user not found
 */

exports.getUserProfile = async (userBody) => {
	try {
		let user = await User.findById(userBody.id).select(
			'email forumName forumFirstName forumState forumCity first last username realName homeCity homeState customOptions timezone accountType companyAccount type favoriteCommunity1 favoriteCommunity2 favoriteCommunity3 addNewCommunity profilePicUrl sentDocuments documentToSign favoritedCommunities'
		);
		if (user) {
			return { data: user };
		}
		return { error: 'User not found' };
	} catch (err) {
		console.log({ error: err, message: 'user controller userProfile' });
		return { error: err, message: 'Internal server error' };
	}
};

exports.getUser = async (userId) => {
	try {
		let user = await User.findById(userId).select('type');
		console.log(user);

		if (user) {
			return user;
		}

		return { error: 'User not found' };
	} catch (err) {
		console.error(err);
		throw 'Database error';
	}
};

exports.getUsers = async (query) => {
	let filter;
	let users;

	try {
		if ('name' in query) {
			filter = { name: { $regex: query.name, $options: 'i' } };
			users = await findByName(query.name);
		} else {
			filter = getFindUserFilter(query);
			users = await User.find(filter);
		}

		return { status: 'ok', users: users };
	} catch (err) {
		console.log(err);
		return { status: 'error', message: 'Internal server error' };
	}
};

function getFindUserFilter(query) {
	let filter;

	if ('blockedFromCommenting' in query) {
		filter = { blockedFromCommenting: true };
	} else if ('suspended' in query) {
		filter = { suspended: true };
	} else if ('onProbation' in query) {
		filter = { onProbation: true };
	} else if ('reinstated' in query) {
		filter = { reinstated: true };
	} else if ('unactivated' in query) {
		filter = { isActive: false };
	}

	return filter;
}

function findByName(name) {
	filter = { name: { $regex: name, $options: 'i' } };

	return User.aggregate([
		{
			$project: {
				name: { $concat: ['$first', ' ', '$last'] },
				first: 1,
				last: 1,
				status: 1,
				accountType: 1,
				homeCity: 1,
				homeState: 1,
				lastIpAddress: 1,
				email: 1,
				dateFirstJoined: 1,
				dateFirstComment: 1,
				dateLastComment: 1,
				dateLastPasswordChange: 1,
				adminActionsTaken: 1,
				blockedFromCommenting: 1,
				suspended: 1,
				onProbation: 1,
				reinstated: 1,
				timezone: 1,
				displayName: 1,
				type: 1,
				favoritedCommunities: 1,
				lastLogin: 1,
			},
		},
		{ $match: filter },
	]);
}

/**
 * Upadet User Profile
 * ------REQUIRED PARAMS------
 * @param {}
 * SUCCESS
 * @returns {success} profile updated
 * FAIL
 * @returns {error : some error} some error
 */

exports.updateProfile = async (body) => {
	try {
		if (body.hash) {
			body.hash = await bcrypt.hash(body.hash, 10);
		}

		if (body.base64) {
			// body contains user image
			const uploadResponse = await cloudinary.uploader.upload(body.base64, {
				upload_preset: 'user_profiles',
			});
			body.profilePicUrl = uploadResponse.url;
		}
		body.dateLastPasswordChange = new Date();
		let user = await User.findByIdAndUpdate(body.user.id, body);

		return { success: true };
	} catch (err) {
		console.log({ error: err, message: 'user controller updateProfile' });
		return { error: err, message: 'Internal server error' };
	}
};

exports.updateMyProfile = async (userId, update) => {
	try {
		const user = await User.findByIdAndUpdate(userId, update, { new: true });
		return user;
	} catch (err) {
		console.error(err);
		return Promise.reject(`Error updating user profile`);
	}
};

exports.updateProfilePicture = async (userId, profilePicture) => {
	try {
		await User.findByIdAndUpdate(userId, { profilePicUrl: profilePicture });
		return profilePicture;
	} catch (error) {
		console.error({
			error: err,
			message: 'error updating user profile picture',
		});
		return false;
	}
};

/**
 * Check password
 * ------REQUIRED PARAMS------
 * @param {String} body.password
 * @param {Email} body.email
 * SUCCESS
 * @returns {Boolean}
 * FAIL
 * @returns {Object.error} wrong password
 * @returns {Error}
 */

exports.checkPassword = async (body) => {
	try {
		if (!body.password) {
			return { error: 'invalid params' };
		}
		let user = await User.findOne({ email: body.email }).lean();

		try {
			let correct = await bcrypt.compare(body.password, user.hash);
			if (!correct) return { error: 'password is not correct' };
			return correct;
		} catch (e) {
			console.log(e);
			return { error: 'unknown' };
		}
	} catch (e) {
		console.log({ error: e, message: 'login user controller' });
		return { error: 'unknown' };
	}
};

exports.authenticate = async (id) => {
	try {
		const user = await User.findById(id)
			.select(
				'first last _id email username displayUsername suspended suspendedExpirationDate permanentlyDeleted timezone type'
			)
			.lean({ virtuals: true })
			.exec();

		if (user.suspended) {
			const now = new Date();

			if (now > user.suspendedExpirationDate) {
				user.suspended = false; // suspension expired
			} else {
				return false; // user is still suspended
			}
		}

		if (user.permanentlyDeleted) {
			return false;
		}

		if (user?.displayUsername) {
			let userWithDisplayUsername = await User.findById(id).select(
				'_id email username displayUsername timezone type'
			);
			return userWithDisplayUsername;
		} else if (!user?.displayUsername) {
			let userWithRealName = await User.findById(id)
				.select('first last _id email displayUsername timezone type')
				.lean({ virtuals: true })
				.exec();
			return userWithRealName;
		} else if (user) {
			return user;
		}
		return false;
	} catch (e) {
		console.log('Error at user controller authenticate' + e);
		return false;
	}
};

exports.update = async (userId, action, duration = { weeks: 9999 }, reason) => {
	let user;

	try {
		user = await User.findById(userId);

		if (!user) {
			return { status: 'error', message: 'user not found' };
		}

		switch (action) {
			case 'block':
				user.blockedFromCommenting = true;
				user.blockedFromCommentingExpirationDate = getExpirationDate(duration);
				break;
			case 'suspend':
				user.suspended = true;
				user.suspendedExpirationDate = getExpirationDate(duration);
				break;
			case 'probation':
				user.onProbation = true;
				user.onProbationExpirationDate = getExpirationDate(duration);
				break;
			case 'terminate':
				user.terminated = true;
				user.terminatedDate = new Date();
				break;
			case 'reinstate':
				user.terminated = false;
				user.reinstated = true;
				break;
			case 'delete':
				user.permanentlyDeleted = true;
			default:
				console.log('invalid admin action');
				break;
		}

		// record taken action
		user.adminActionsTaken.push({ action: action, reason: reason });

		await user.save();

		return user;
	} catch (error) {
		throw new Error('internal server error');
	}
};

/**
 * @param {String} userId - user id
 */
exports.getIsUserAdmin = async (userId) => {
	const user = await User.findById(userId);

	if (
		user.email === 'andy@digpads.com' ||
		user.email === 'logos.slava@gmail.com'
	) {
		return true;
	} else {
		return false;
	}
};

exports.userExists = async (filter) => {
	const user = await User.findById(filter);
	return user !== null;
}

function getExpirationDate({ hours, days, weeks }) {
	const date = new Date();
	hours && date.setHours(date.getHours() + Number.parseInt(hours));
	days && date.setDate(date.getDate() + Number.parseInt(days));
	weeks && date.setDate(date.getDate() + Number.parseInt(weeks) * 7);

	return date;
}
