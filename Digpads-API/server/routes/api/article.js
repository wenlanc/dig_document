const {
	sendArticles,
	fiveMostRecentArticles,
} = require('../../controllers/article');

/**
 * Succcess
 * @returns {Articles}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await sendArticles();
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json(data);
		return next();
	} catch (e) {
		return next(e);
	}
};
/**
 * Succcess
 * @returns {Articles}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const fiveNewArticles = async (req, res, next) => {
	try {
		let data = await fiveMostRecentArticles();
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, fiveNewArticles };
