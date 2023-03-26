const { User, Document } = require('../models/db');
const { uuid } = require('uuidv4');
const emails = require('../services/emails');
require('dotenv').config();

/**
 * Save document
 * ------REQUIRED PARAMS------
 * @param {String} body.title
 * @param {String} body.documentUrl
 * @param {array} body.recievers
 * SUCCESS
 * @returns {true}
 * FAIL
 * @returns {Error}
 */
exports.saveDocument = async (body) => {
	try {
		if (!body.title || !body.documentUrl || !body.recievers) {
			return { error: 'invalid params' };
		}
		body.sender = body.user.id;
		let user = await User.findById(body.user.id);
		let documents = [];
		for (let i = 0; i < body.recievers.length; i++) {
			body.recieverEmail = body.recievers[i];
			let document = await Document.create(body);
			await user.sentDocuments.push(document);
			await user.save();
			documents.push(document);
		}
		if (documents) {
			// send email to recievers
			documents.forEach(async (document) => {
				await emails.sendDocument({
					email: document.recieverEmail,
					documentUrl: `${process.env.ORIGIN_URL}/sign-document/${String(
						document._id
					)}`,
					first: user.first,
					last: user.last,
				});
			});
		}
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};

/**
 * Get document
 * ------REQUIRED PARAMS------
 * @param {String} documentId
 * SUCCESS
 * @returns {Document}
 * FAIL
 * @returns {Error}
 */
exports.getDocument = async (body) => {
	try {
		if (!body.documentId) {
			return { error: 'invalid params' };
		}
		let document = await Document.findById(body.documentId).populate(
			'sender',
			'first last'
		);

		if (!document) {
			return { error: 'Document not found' };
		} else {
			if (document.sender.id === body.user.id) return document;
			if (!document.reciever) {
				let user = await User.findById(body.user.id);
				if (user.email !== document.recieverEmail) {
					return { error: 'Unauthorized' };
				}
				document.reciever = body.user.id;
				await document.save();
			} else {
				if (document.reciever != body.user.id) {
					return { error: 'Unauthorized' };
				}
			}
			return document;
		}
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};

exports.getDocuments = async ({ page, limit, user }) => {
	try {
		const documents = await Document.find({
			$or: [{ sender: user.id }, { recieverEmail: user.email }],
		})
			.populate('sender', 'email first last')
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await Document.countDocuments({ sender: user.id });

		return {
			documents,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			limit,
		};
	} catch (e) {
		console.log(e);
	}
};
