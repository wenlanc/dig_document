const { getPreSignedUrl } = require('../../services/cloudinary');
/**
 * Succcess
 * @returns {Object} keys: signature, timestamp, public_id
 * Fail
 * @returns {res.error} [406] []
 */
const ctr = async (req, res, next) => {
	try {
		let body = await getPreSignedUrl();
		res.status(200).json(body);
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr };
