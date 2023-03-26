const Joi = require('joi');

/**
 * Succcess
 * @returns {CSRF}
 */
const ctr = async (req, res, next) => {
	try {
		res.cookie(`X-XSRF-TOKEN`, req.csrfToken(), {
			httpOnly: true,
			sameSite: 'None',
			maxAge: 60 * 60 * 24 * 14,
			secure: true,
		});
		res.status(200).json();
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = ctr;
