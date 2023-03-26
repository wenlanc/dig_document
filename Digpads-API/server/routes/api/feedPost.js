const { sendFeedPost } = require('../../controllers/posts');

/**
 * Succcess
 * @returns {Posts}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const ctr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let data = await sendFeedPost(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr };
