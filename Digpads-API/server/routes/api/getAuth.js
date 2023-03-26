const Joi = require('joi');
const { authenticate } = require('../../controllers/users');
const User = require('../../models/User');	

/**
 * Succcess
 * @returns {User} first,last,name,email
 */
const ctr = async (req, res, next) => {
	try {
		
		if (!req?.user?.id) {
			return res.status(406).send();
		} 

		User.newLogin(req.user.id, (err, loginData) => {
			if(err) console.log(err);
		});
		
		const data = await authenticate(req?.user?.id);

		if (data) {
			res.status(200).json(data);
		} else {
			res.status(406).json();
		}
		
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = ctr;
