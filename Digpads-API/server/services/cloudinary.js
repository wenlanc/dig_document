const cloudinary = require('cloudinary').v2;
const { v4 } = require('uuid');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPreSignedUrl = async () => {
	const timestamp = Math.round(new Date().getTime() / 1000);
	const rand = v4();
	const uploadResponse = await cloudinary.utils.api_sign_request(
		{
			timestamp: timestamp,
			public_id: rand,
		},
		process.env.CLOUDINARY_API_SECRET
	);
	return { signature: uploadResponse, timestamp: timestamp, public_id: rand };
};
module.exports = { cloudinary, getPreSignedUrl };
