const { popularPosts } = require('../../controllers/posts');

const ctr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let data = await popularPosts(req.body);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json(data);
		return next();
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

module.exports = { ctr };
