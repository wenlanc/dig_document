const { Client } = require('@elastic/elasticsearch');
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

const client = new Client({
	cloud: {
		id: process.env.ELASTICSEARCH_CLOUD_ID,
	},
	auth: {
		username: process.env.ELASTIC_USERNAME,
		password: process.env.ELASTIC_PASSWORD,
	},
	ssl: {
		rejectUnauthorized: false,
	},
});

async function insertNonexistingArticles() {
	/**
	 * Retreive all articles
	 * If article doesn't have a elasticId assigned to it,
	 * index that article and assign it a elasticId
	 */
	try {
		const articles = await Article.find({}, 'title elasticId', { lean: true });

		articles.forEach(async (article) => {
			if (!article.elasticId) {
				// load article title & content
				article = await Article.findById(article._id, 'title content');

				// index article
				const response = await client.index({
					index: 'articles',
					body: {
						id: article._id.toString(),
						title: article.title,
						content: article.content,
					},
				});

				// update article with elasticId
				await Article.findByIdAndUpdate(article._id.toString(), {
					elasticId: response.body._id,
				});

				console.log('updated ', article._id);
			}
		});
	} catch (error) {
		console.error(error);
	}
}

async function deleteAllArticles() {
	await client.deleteByQuery({
		index: 'articles',
		body: {
			query: {
				match_all: {},
			},
		},
	});
}

async function indexMarketplaceProfile({
	id,
	name,
	aboutYou,
	areasServed,
	businessDetails,
	businessTags,
}) {
	try {
		console.log(`indexing marketplace profile...`);
		console.log(id, name, aboutYou, areasServed, businessDetails, businessTags);
		
		const response = await client.index({
			index: 'marketplaceProfiles',
			body: {
				id: id,
				name,
				aboutYou,
				areasServed,
				businessDetails,
				businessTags,
			},
		});

		console.log(`index marketplace profile, elastic ID: ${response.body._id}`)
	} catch (error) {
		console.error(error);
	}
}

module.exports.elasticSearch = client;
module.exports.insertNonexistingArticles = insertNonexistingArticles;
