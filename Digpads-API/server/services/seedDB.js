/**
 * This script is used to populate MongoDB database with sample data.
 * Data includes: articles and users.
 */
const { Article, User } = require('../models/db');
const ObjectId = require('mongoose').Types.ObjectId;

const users = [
	new User({
		_id: '6060400b1368ec188887dd1d',
		first: 'Mahatma',
		last: 'Gandhi',
		email: 'gandhi@hotmail.com',
		hash: '123abc',
		profilePicUrl: 'images/user/avatar3.png',
	}),
	new User({
		_id: '6060400b1368ec188887dd1e',
		first: 'Bill',
		last: 'Gates',
		email: 'gates@microsoft.com',
		hash: '123cbd',
		profilePicUrl: 'images/user/avatar2.png',
	}),
	new User({
		_id: '6060400b1368ec188887dd1f',
		first: 'Gabe',
		last: 'Newel',
		email: 'gaben@valve.com',
		hash: 'abc123',
		profilePicUrl: 'images/user/avatar2.png',
	}),
];

const articles = [
	new Article({
		_id: '6060400b1368ec188887dd20',
		created_by: users[0]._id,
		title: 'Is it Time to Invest in Rental Property?',
		content:
			'So maybe you’ve been thinking about it for a long time and have been a little hesitant to venture off into the great untamed frontier of real estate. Possibly you’ve dabbled in mutual funds, a few stocks and even a CD or two – but there is nothing quite like the real estate market… and it always seems a little riskier for some reason. Well, the reason it’s riskier is the number of hidden pitfalls. Well, there is no better time to begin than today. So let’s take that bull by the horns and ride it…\nThere is nothing like being in the right place at the right time. Most people have been there at some point over the course of their lives, but have unfortunately failed to seize that moment. So all you have to do is to reconstruct that moment and know when to seize it – and it all begins with the search. Whether it’s the lower-than-market price, owner-friendly financing, location – or anything else that appeals to your liking – it’s all good…\n1. The property must be in good condition or will be with minor repairs that you are qualified to perform yourself or can afford to have done for you without exhausting your cash reserves. It is generally recommended that your repairs be limited to no more than the equivalent of 12 months of the property’s anticipated rental income – which is actually quite a stretch for a beginner.',
		published_at: new Date(),
	}),
	new Article({
		_id: '6060400b1368ec188887dd21',
		created_by: users[1]._id,
		title: 'Don’t Overstep Flooring for Your Rental',
		content:
			'Okay, this is simple and has already been mentioned in reference to the kitchen, but still needs a little reiteration and elaboration. The two best items that are (conveniently) the least expensive and easiest to install, remove and replace are vinyl and carpeting. These materials are so affordable; you could remodel every couple of years. Unless your unit commands a luxury rate, ignore the following temptations: wood, marble and tile – it’s just a rental. Wait until you are ready to move back in or to sell before upgrading your flooring. If the unit came already equipped with a higher grade material, then you’re a winner! Keep it if it’s in good shape; otherwise, replace it with a more affordable material.\nThe majority of the unit should be carpeted with inexpensive fibers and padding, regardless of what type of warranty is thrown your way. The reason is that after about five years, you’ll invariably be replacing the carpet anyway – good luck then on trying to exercise your warranty rights, because the exclusions will get you. The estimated replacement time, incidentally, takes into account that there are no dogs or toddlers residing in the unit (or drunken party goers, for that matter) to wreak havoc on the carpeting. Raspberry punch, anyone…?\nIt’s well understood that every individual will have their own vision and tastes to bring to their rental property, but keep in mind that your property is (at least, for the time being) just a rental property. Try to keep your amenities practical, not problematic, and your décor universal, not restrictive. No one else will ever appreciate your property and all your extra touches and tender loving care as much as you do, so try not to set yourself up for disappointment when you discover that some tenants exhibit no emotional attachment to the property whatsoever (i.e., they neglect it, because it is not their own). Just do your best to make sure your rental vacancy “functions” completely safely and that it appears clean between tenants – this will definitely entice more cattle to graze, so you can pick the best of the herd.',
		published_at: new Date(),
	}),
	new Article({
		_id: '6060400b1368ec188887dd22',
		created_by: users[2]._id,
		title: 'Will an Eviction Affect a Tenant’s Credit Score',
		content:
			'A tenant’s credit score is not impacted by an eviction lawsuit. When a landlord obtains a credit report from a tenant screening service such as that uses official consumer credit data, the algorithm used to generate the three digit score will not factor any eviction data into the equation.\nThe interesting thing to note, though, is that many apartment communities don’t bother filing evictions  (if possible) because of the cost, time, and lack of reporting. Instead, if a tenant defaults on the rent or causes damage and skips out in the middle of the night.',
		published_at: new Date(),
	}),
];

const seed = async () => {
	console.log('\n=== Seeding Database ===');
	try {
		await seedUsers();
		await seedArticles();
	} catch (error) {
		console.log(error);
		Promise.reject(error);
	}
};

// ============ SEED USERS =============
async function seedUsers() {
	const usersSeeded = await isUsersSeeded();

	if (usersSeeded) {
		console.log('Users already seeded');
		return;
	} else {
		console.log('Seeding users');
	}

	const seededUsers = await User.insertMany(users);

	console.log(`database seeded with ${seededUsers.length} users`);
}

// Check wether DB already have sample users
const isUsersSeeded = async () => {
	const user = await User.findOne(users[0]);

	return user !== null;
};

//  ========= SEED ARTICLES ==========
async function seedArticles() {
	const articlesSeeded = await isArticlesSeeded();

	if (articlesSeeded) {
		console.log('Articles already seeded');
		return;
	}

	const seededArticles = await Article.insertMany(articles);

	console.log(`Database seeded with ${seededArticles.length} articles`);
}

async function isArticlesSeeded() {
	const article = await Article.findById(articles[0]._id);

	return article !== null;
}

module.exports = seed;
module.exports.articles = articles;
