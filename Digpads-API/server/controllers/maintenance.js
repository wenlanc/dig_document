const Maintenance = require('../models/Maintenance');
const Event = require('../models/Event');
exports.addMaintenance = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;

		const newDoc = new Maintenance(req.body);

		await newDoc.save(function (err) {
			if (err) return next(err);
			Maintenance.populate(
				newDoc,
				[{ path: 'property' }, { path: 'room' }],
				function (err, populatedMaintenance) {
					res.status(201).send(populatedMaintenance);
				}
			);
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.getMaintenances = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Maintenance.find({
			user,
		}).populate('property room');
		let mainEvents = await Event.find({
			// trageting eventType here as Maintenance Items doesn't have a event from itself
			eventType: 'Maintenance',
		})
			.populate({ path: 'parent', model: 'Maintenance' })
			.populate('property');

		let secondaryEvents = await Event.find({
			secondaryType: 'Maintenance',
		})
			.populate({ path: 'parent', model: 'Maintenance' })
			.populate('property');

		let events = [...mainEvents, ...secondaryEvents];
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

exports.editMaintenance = async (req, res) => {
	try {
		const { _id } = req.body;
		await Maintenance.findByIdAndUpdate(_id, req.body);
		const updatedMaintenance = await Maintenance.findById(_id).populate(
			'property room'
		);
		return res.status(201).send(updatedMaintenance);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteMaintenance = async (req, res) => {
	try {
		Maintenance.findByIdAndDelete(req.body._id).then((data, err) => {
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
