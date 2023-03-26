const System = require('../models/Systems');
const Event = require('../models/Event');

exports.addSystem = async (req, res, next) => {
	try {
		const room = req.body.room._id;
		const user = req.user.id;
		const system = new System({ ...req.body, room, user });
		await system.save(function (err) {
			// if (err) return next(err);
			if (err) return next(err);
			System.populate(
				system,
				[{ path: 'property' }, { path: 'room' }],
				function (e, populatedSystem) {
					if (e) return next(e);
					res.status(201).send(populatedSystem);
				}
			);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Error ocurred on the server',
			error,
		});
	}
};

exports.getSystems = async (req, res, next) => {
	try {
		const userId = req.user.id;
		let data = await System.find({
			user: userId,
		}).populate('property room');
		let events = await Event.find({
			eventLocation: 'Systems',
		})
			.populate({ path: 'parent', model: 'System' })
			.populate('property room');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json({ data, events });
		else res.status(200).json({ data, events });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Error ocurred on the server',
			error,
		});
	}
};

exports.editSystem = async (req, res) => {
	try {
		const room = req.body.room._id;
		await System.findByIdAndUpdate(req.body._id, { ...req.body, room });
		const updatedSystem = await System.findById(req.body._id).populate(
			'property room'
		);
		return res.status(201).send(updatedSystem);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occured on the server',
			error,
		});
	}
};

exports.deleteSystem = async (req, res) => {
	try {
		System.findByIdAndDelete(req.body._id).then((data, err) => {
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
