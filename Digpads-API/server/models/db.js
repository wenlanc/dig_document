const mongoose = require('mongoose');
require('dotenv').config();

const live = process.env.MONGO_URL;
const dev = process.env.MONGO_URL_DEVELOPMENT;

const dbUrl = process.env.NODE_ENV === 'production' ? live : dev;

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.catch((e) => {
		console.log(e);
	})
	.then(() => {
		console.log(`Connected to ${dbUrl}`);
	});

module.exports.User = require('./User');
module.exports.PostReply = require('./PostReply');
module.exports.PostReplyLikes = require('./PostReplyLikes');
module.exports.Post = require('./Post');
module.exports.Article = require('./Article');
module.exports.Meta = require('./Meta');
module.exports.Like = require('./Likes');
module.exports.Document = require('./Document');
module.exports.Edocument = require('./Edocument');
module.exports.EdocumentHistory = require('./EdocumentHistory');
module.exports.Template = require('./Template');
module.exports.TemplateFolder = require('./TemplateFolder');
module.exports.Signature = require('./Signature');
module.exports.Webform = require('./Webform');
module.exports.WebformAnswer = require('./WebformAnswer');
module.exports.Comment = require('./Comment');
module.exports.Category = require('./Category');
module.exports.State = require('./State');
module.exports.City = require('./City');
module.exports.FavoritedCommunity = require('./FavoritedCommunity');
