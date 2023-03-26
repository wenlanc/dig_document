const { User, Template } = require('../models/db');
const { uuid } = require('uuidv4');
const fs = require('fs');
const path = require("path");
const emails = require('../services/emails');
require('dotenv').config();

exports.saveTemplate = async (body) => {
	try {

		if ( !body.title ) {
			return { error: 'invalid params' };
		}
		// 
		let user = await User.findById(body.user.id);
		//let receiverEmails = body.receiverEmails.split(',');

		let pdfBuffer = fs.readFileSync(body.documentUrl);
		const ext = path.extname(body.documentUrl);
		const originalname = `${uuid()}${ext}`;

		const pa = 'uploads/templates';	
		if (!fs.existsSync(pa)) {
			fs.mkdirSync(pa);
		}

		await fs.writeFileSync( 'uploads/templates/' + originalname , pdfBuffer);

		let template = await Template.create( { 
			creator: body.user.id,
			title:body.title,  
			envelope_content : body.envelope_content,
			document_path : 'uploads/templates/' + originalname,
			documentUrl : 'uploads/templates/' + originalname,
			signers : body.signers
		});
		await user.createdTemplates.push(template);
		await user.save();
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'template saveTemplate controller' });
		return { error: 'internal sever error' };
	}
};

exports.updateTemplate = async (body) => {
	try {

		if (!body.template_id) {
			return { error: 'invalid params' };
		}
		let template = await Template.findById(body.template_id);
		template.content = body.fields;
		template.title = body.title;
		await template.save();
		
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'template saveTemplate controller' });
		return { error: 'internal sever error' };
	}
};


/**
 * Get document
 * ------REQUIRED PARAMS------
 * @param {String} templateId
 * SUCCESS
 * @returns {Template}
 * FAIL
 * @returns {Error}
 */
exports.getTemplate = async (body) => {
	try {
		if (!body.templateId) {
			return { error: 'invalid params' };
		}
		let template = await Template.findById(body.templateId).populate([
			{
				path: 'creator',
				select: 'first last'
			},
			{
				path: 'folder',
				select: 'title description'
			}
		]);

		if (!template) {
			return { error: 'Template not found' };
		} else {
			return template;
		}
	} catch (e) {
		console.log({ error: e, message: 'template saveTemplate controller' });
		return { error: 'internal sever error' };
	}
};

exports.getTemplates = async ({ page, limit, user }) => {
	try {
		const templates = await Template.find({
			$or: [{ creator: user.id }],
		}).populate([
			{
				path: 'creator',
				select: 'first last'
			},
			{
				path: 'folder',
				select: 'title description'
			}
		])
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await Template.countDocuments({ creator: user.id });

		return {
			templates,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			limit,
		};
	} catch (e) {
		console.log(e);
	}
};
