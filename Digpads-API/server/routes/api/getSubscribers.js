const { getSubscribers } = require('../../controllers/Subscribers');
const { getIsUserAdmin } = require('../../controllers/users');


const ctr = async (req, res, next) => {
	try {
		const user = req.user;
		const isAdmin = await getIsUserAdmin(user.id);

		if (!isAdmin) {
			return res.status(403).send();
		}

		const subscribers = await getSubscribers();
		res.status(200).send(subscribers);
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr };
