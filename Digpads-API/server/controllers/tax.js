const Tax = require('../models/Tax');
const Event = require('../models/Event');

exports.addTax = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;
		const newDoc = new Tax(req.body);
		await newDoc.save(function (err) {
			if (err) return next(err);
			Tax.populate(newDoc, { path: 'property' }, function (err, populatedTax) {
				res.status(201).send(populatedTax);
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

exports.getTaxes = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Tax.find({
			user,
		}).populate('property user');
		let events = await Event.find({
			eventLocation: 'Taxes',
		})
			.populate({ path: 'parent', model: 'Tax' })
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

exports.editTax = async (req, res) => {
	try {
		const { _id } = req.body;
		await Tax.findByIdAndUpdate(_id, req.body);
		const updatedTax = await Tax.findById(_id).populate('property user');
		return res.status(201).json(updatedTax);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteTax = async (req, res) => {
	try {
		Tax.findByIdAndDelete(req.body._id).then((data, err) => {
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
