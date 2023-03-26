const csurf = require('csurf');

module.exports = cs = (req, res, next) =>
	csurf({
		cookie: {
			key: '_csrf',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60, // 1-hour
			sameSite: 'None',
		},
	});
