const Insurance = require('../models/Insurance');
const Event = require('../models/Event');

exports.addInsurance = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;
		const newDoc = new Insurance(req.body);

		await newDoc.save(function (err) {
			if (err) return next('Error while saving...');
			Insurance.populate(newDoc, { path: 'property' }, function (
				err,
				populatedInsurance
			) {
				res.status(201).send(populatedInsurance);
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.getInsurances = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Insurance.find({
			user,
		}).populate('property user');
		let events = await Event.find({
			eventLocation: 'Insurance',
		})
			.populate({ path: 'parent', model: 'Insurance' })
			.populate('property');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json({ data, events });
		else res.status(200).json({ data, events });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.editInsurance = async (req, res) => {
	try {
		const { _id } = req.body;
		await Insurance.findByIdAndUpdate(_id, req.body);
		const updatedInsurance = await Insurance.findById(_id).populate('property');
		return res.status(201).json(updatedInsurance);
		// if ((typeof data == 'object' && 'error' in data) || !data)
		// 	res.status(406).json(data);
		// else res.status(200).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteInsurance = async (req, res) => {
	try {
		Insurance.findByIdAndDelete(req.body._id).then((data, err) => {
			if (err) return res.status(406).json(data);
			return res.status(200).json({ data });
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};
