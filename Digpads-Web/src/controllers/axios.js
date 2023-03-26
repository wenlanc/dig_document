import axios from 'axios';

//Creates instance
const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_URL,
});

//Request modifier
instance.interceptors.request.use(
	function (req) {
		delete req.config;
		return req;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

instance.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem(
			'access_token'
		)}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//Sets CSRF
instance.interceptors.response.use(
	(res) => {
		delete res.config;
		return res;
	},
	(error) => {
		if (!error.response) {
			error.response = 'unknown';
			return Promise.reject(error);
		}
		delete error.response.config;
		return Promise.reject(error);
	}
);

async function getCSRF() {
	await instance.get(`csrf`);
}
async function getCloudinarySignature() {
	return await instance.get(`presignedUrl`);
}

export { instance, getCSRF, getCloudinarySignature };
