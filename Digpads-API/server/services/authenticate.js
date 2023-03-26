const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createJWT = async (id, days) => {
	return await jwt.sign({ id: id }, process.env.AU_SECRET, {
		expiresIn: `${days}d`,
	});
};

module.exports = { createJWT };
