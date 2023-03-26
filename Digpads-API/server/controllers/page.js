const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Post = mongoose.model('Post');

async function incrementPageViews(entity, id) {
	if (entity === 'post') {
		const post = await Post.findById(id, 'views title');

		if (!post) {
			throw 'post not found';
		}

		post.views += 1;
		post.save();
	}

	if (entity === 'article') {
		const article = await Article.findById(id, 'views');

		if (!article) {
			throw 'article not found';
		}

		article.views += 1;
		article.save();
	}
}

module.exports = { incrementPageViews };
