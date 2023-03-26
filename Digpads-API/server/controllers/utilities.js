const Utility = require('../models/Utilities');
const Event = require('../models/Event');

exports.addUtility = async (req, res, next) => {
	try {
		const {
			property,
			name,
			company,
			type,
			frequency,
			amount,
			model,
			payor,
			startDate,
			endDate,
			incurredDate,
			endteredDate,
			notes,
			room,
		} = req.body;
		const userId = req.user.id;
		const utility = new Utility({
			user: userId,
			room,
			property,
			name,
			company,
			type,
			frequency,
			amount,
			model,
			notes,
			payor,
			startDate,
			endDate,
			incurredDate,
			endteredDate,
			notes,
		});

		await utility.save(function (err) {
			// if (err) return next(err);
			if (err) return next(err);
			Utility.populate(
				utility,
				[{ path: 'property' }, { path: 'room' }],
				function (err, populatedUtility) {
					res.status(201).send(populatedUtility);
				}
			);
		});
		// res.status(201).send(utility);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};

exports.getUtilities = async (req, res) => {
	try {
		const userId = req.user.id;
		let data = await Utility.find({
			user: userId,
		}).populate('property room');
		let events = await Event.find({
			eventLocation: 'Utilities',
		})
			.populate({ path: 'parent', model: 'Utility' })
			.populate('property room');

		// events = events.map((e) => {
		// 	e._doc.status = e.eventStatus ? 'Done' : 'Pending';
		// 	return e;
		// });

		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json({ data, events });
		else res.status(200).json({ data, events });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};

exports.searchUtility = async (req, res) => {
	try {
		const data = await Utility.find({
			user: req.user.id,
			name: { $regex: new RegExp('^' + req.body.name, 'i') },
		}).populate('property room');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};

exports.editUtility = async (req, res) => {
	try {
		await Utility.findByIdAndUpdate(req.body._id, req.body);

		const updatedUtility = await Utility.findById(req.body._id).populate(
			'property room'
		);
		return res.status(201).send(updatedUtility);

		// if ((typeof data == 'object' && 'error' in data) || !data)
		// 	res.status(406).json(data);
		// else res.status(200).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};

exports.deleteUtility = async (req, res) => {
	try {
		Utility.findByIdAndDelete(req.body._id).then((data, err) => {
			if (err) return res.status(406).json(data);
			return res.status(200).json({ data });
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};
