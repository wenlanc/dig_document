const BusinessTag = require('../models/BusinessTag');

function getBusinessTags(userType) {
	let filter = {};

	if (userType) {
		if (userType === 'landlord/contractor') {
			filter = { userType: { $in: ['landlord', 'contractor'] } };
		} else {
			filter = { userType: userType };
		}
	}

	return BusinessTag.find(filter, null, { lean: true });
}

function updateBusinessTags(tags) {
	return BusinessTag.update({}, tags, { overwrite: true } );
}

function deleteBusinessTag(tag) {
	return BusinessTag.remove({ _id: tag });
}

module.exports = { getBusinessTags, updateBusinessTags, deleteBusinessTag }
