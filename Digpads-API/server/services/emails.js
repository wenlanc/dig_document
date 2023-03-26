const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SG_ID);

/**
 *
 * @param {Object} sender keys: email and name
 * @param {Object} recipient keys: email and name
 * @param {String} template_id
 * @param {Object} data keys required for the email
 */
const universalFunc = async (sender, recipient, template_id, data) => {
	const msg = {
		to: recipient,
		from: sender,
		templateId: template_id,
		dynamic_template_data: data,
	};
	try {
		await sgMail.send(msg);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};
/**
 * Required keys
 * @param {Object} user keys: first, last, email, and confirmedEmail
 */
const signUpVerification = async (user) => {
	let data = {
		first: user.first,
		last: user.last,
		link: `${process.env.ORIGIN_URL}/verify/${user.confirmedEmail}`,
	};
	let to = {
		name: user.first + user.last,
		email: user.email,
	};
	let from = {
		email: 'info@digpads.com',
		name: 'Andy',
	};
	let a = await universalFunc(
		from,
		to,
		'd-329d8ce87d684a5e8ebebb236e8ddc11',
		data
	);
	console.log(a);
};
// change it later according to needs
const ResetPass = async (user, pToken) => {
	let data = {
		first: user.first,
		last: user.last,
		link: `${process.env.ORIGIN_URL}/reset-pass/${pToken}`,
	};
	let to = {
		name: user.first + user.last,
		email: user.email,
	};
	let from = {
		email: 'info@digpads.com',
		name: 'Andy',
	};
	let a = await universalFunc(
		from,
		to,
		'd-15c4e47966d04ea2bad1a14495bd9679',
		data
	);
	console.log(a);
};

//send document
const sendDocument = async ({ first, last, documentUrl, email }) => {
	let data = {
		first,
		last,
		link: documentUrl,
	};
	let to = {
		name: first + last,
		email: email,
	};
	let from = {
		email: 'info@digpads.com',
		name: 'Andy',
	};
	let a = await universalFunc(
		from,
		to,
		'd-e6e695b1e88c46e59bccb64338dc1f86',
		data
	);
	console.log('a:', a);
};

const sendReportContent = async ({ content, contentURL }) => {
	const from = {
		name: 'varun',
		email: 'varun@digpads.com',
	};

	const to = {
		name: 'varun',
		email: 'varun@digpads.com',
	};

	const data = {
		content,
		contentURL,
	};

	const success = await universalFunc(
		from,
		to,
		'd-e6e695b1e88c46e59bccb64338dc1f86', // TODO add correct template id
		data
	);

	return success;
};

async function sendClaimProfile(email, profileId) {
	const from = {
		name: 'Digpads',
		email: 'varun@digpads.com',
	};

	const to = {
		name: '',
		email: email,
	};

	const msg = {
		from,
		to,
		subject: 'digpads has assigned you a profile',
		templateId: 'd-4c5cbdc19ff44162855d05b75b2a23a8',
		dynamic_template_data: {
			link: `https://www.digpads.com/claim-profile/${profileId}`,
		},
	};
	try {
		await sgMail.send(msg);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

module.exports = {
	signUpVerification,
	ResetPass,
	sendDocument,
	sendReportContent,
	sendClaimProfile,
};
