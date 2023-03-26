import axios from 'axios';
import { getCloudinarySignature } from './axios';
import { toBase64 } from '../utils/fileUtils';

const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

export const upload = async (files, params) => {
	try {
		params.file = files;
		params.api_key = process.env.REACT_APP_CLOUDINARY_API_KEY;
		return await axios.post(
			'https://api.cloudinary.com/v1_1/digpads/image/upload',
			params
		);
	} catch (e) {
		throw e;
	}
};

/**
 *  @param {File} image - image file
 *  @param {Object} config - request configuration
 *  @returns {Object} uploaded image data
 */
export const uploadImage = async (image, config) => {
	try {
		const response = await getCloudinarySignature();
		const signature = response.data;
		const base64Image = await toBase64(image);

		const uploadResponse = await upload(base64Image, {
			...signature,
			...config,
		});

		return uploadResponse.data;
	} catch (error) {
		console.error(`Error uploading image to Cloudinary:, ${error}`);
	}
};

/**
 *  @param {Array<File>} images - image files
 *  @param {Object} config - request configuration
 *  @returns {Array<Object>} array of uploaded image data
 */
export const uploadImages = async (images, config) => {
	try {
		const response = await getCloudinarySignature();
		const signature = response.data;

		const promises = Array.from(images).map(async (image) => {
			const base64Image = await toBase64(image);

			return upload(base64Image, {
				...signature,
				...config,
			});
		});

		return (await Promise.all(promises)).map((response) => response.data);
	} catch (error) {
		throw new Error(`Error uploading images to Cloudinary:, ${error}`);
	}
};

/**
 *  @param {Array<File>} videos - image files
 *  @param {Object} config - request configuration
 *  @returns {Array<Object>} array of uploaded videos data
 */
export const uploadVideos = async (videos) => {
	const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`;

	try {
		const response = await getCloudinarySignature();
		const signature = response.data;

		const promises = Array.from(videos).map(async (video) => {
			const base64Video = await toBase64(video);

			const requestConfig = {
				...signature,
				api_key: API_KEY,
				file: base64Video,
			};

			return axios.post(uploadUrl, requestConfig);
		});

		return (await Promise.all(promises)).map((response) => response.data);
	} catch (error) {
		console.error(`Error uploading videos to Cloudinary:, ${error}`);
	}
};
