const { getProfile } = require('../../controllers/marketplaceProfile');

const ctr = async (req, res, next) => {
	const user = req.user;

	if (!user) {
		return res.status(401).send('user not found');
	}

	try {
		const profile = await getProfile(user);

		if (profile === null) {
			res.status(404).send('Profile not found or deleted');
		}
		res.status(200).send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
};

module.exports = ctr;
