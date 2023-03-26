const axios = require('axios');
const combineURLs = require('axios/lib/helpers/combineURLs');

async function IPAddressToLocation(ipAddress) {
	try {
		const url = `${process.env.EZCMD_API_URL}/${process.env.EZCMD_API_KEY}/${process.env.EZCMD_USER_ID}/${ipAddress}`;
		const response = await axios.get(url);
        return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}

module.exports = IPAddressToLocation;