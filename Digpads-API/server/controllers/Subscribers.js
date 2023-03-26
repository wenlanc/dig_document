const User = require('../models/User');
const SubscribedEmail = require('../models/SubscribedEmail');

exports.addSubscriber = async ({ email }) => {
	try {
		if (await SubscribedEmail.findOne({ email })) {
			throw Error('email already exist');
		}
		const subscribedEmail = new SubscribedEmail({ email });
		const user = await User.findOne({ email });
		console.log(user);
		if (user) {
			subscribedEmail.user = user.id;
		}
		await subscribedEmail.save();
		return {
			sucess: true,
		};
	} catch (e) {
		console.log({ error: e, message: 'Subscriber addSubscriber controller' });
		return {
			error: e.name == 'Error' ? e.message : 'Internal Server Error',
		};
	}
};

exports.getSubscribers = async () => {
	return SubscribedEmail.find().populate('user', 'first last middle email type status');
}