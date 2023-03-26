const ctr = async (req, res, next) => {
	try {
		res.clearCookie('ACT', {
			secure: true,
			sameSite: 'None',
		});
		res.status(200).json({ success: true, message: 'User logged out' });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr };
