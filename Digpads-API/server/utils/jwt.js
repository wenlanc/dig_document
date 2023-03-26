const expJWT = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config;
// Handles JWT auth and revoking
function jwt() {
	try {
		return expJWT({
			secret: process.env.AU_SECRET,
			algorithms: ['HS256'],
			requestProperty: 'user',
			getToken: function fromHeaderOrQuerystring(req) {
				if (req.headers.cookie) {
					if (req.headers.cookie.indexOf('ACT=') != -1) {
						let a = req.headers.cookie;
						a = a.substring(a.indexOf('ACT=') + 4);
						if (a.substring(0, a.indexOf(';'))) {
							return a.substring(0, a.indexOf(';'));
						}
						return a;
					}
				}
				return null;
			},
			// isRevoked,
		}).unless({
			// endpoints that are public
			path: [
				'/api/signUp',
				'/api/login',
				'/api/csrf',
				'/api/verify',
				'/api/forgotPass',
				'/api/resetPass',
				'/api/getArticle',
				'/api/getPost',
				'/api/getFeedPosts',
				'/api/popularPosts',
				'/api/search',
				'/api/subscribe',
				'/api/contactUs',
				'/api/articles/',
				'/api/mostRecentArticles',
				'/api/relatedArticles',
				'/api/posts',
				'/api/article/knowledge',
				'/api/pageView',
				'/api/getAllArticles',
				'/api/getCommentReply',
				'/api/reviewCollectionForm',
				'/api/signUpUnactivated',
				'/api/categories',
				'/api/claim-profile',
				'/api/reviews/collect',
				/^\/api\/categories.*/,
				{ url: /^\/api\/users.*/, methods: ['GET'] },
				{ url: /^\/api\/reviews\/.*/, methods: ['GET'] },
				{ url: /^\/api\/marketplaceProfiles\//, methods: ['GET'] },
				{ url: /^\/api\/marketplaceProfiles\/search/, methods: ['GET'] },
				/^\/api\/reviewCollectionCampaigns\/default.*/,
			],
		});
	} catch (e) {
		console.log(e);
	}
}

function decodeACT(req, res, next) {
	let token = '';
	if (req.headers.cookie) {
		if (req.headers.cookie.indexOf('ACT=') != -1) {
			let a = req.headers.cookie;
			a = a.substring(a.indexOf('ACT=') + 4);
			if (a.substring(0, a.indexOf(';'))) {
				token = a.substring(0, a.indexOf(';'));
				jsonWebToken.verify(token, process.env.AU_SECRET, function (
					err,
					decoded
				) {
					if (err) {
						console.log(err);
					}
					req.user = decoded;
				});
			} else {
				token = a;
				jsonWebToken.verify(token, process.env.AU_SECRET, function (
					err,
					decoded
				) {
					req.user = decoded;
				});
			}
		}
	}
	next();
}

module.exports = { jwt, decodeACT };
