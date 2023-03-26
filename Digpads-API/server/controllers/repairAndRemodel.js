const RepairAndRemodel = require('../models/RepairAndRemodel');
const Event = require('../models/Event');

exports.addReportAndRemodel = async (req, res, next) => {
	try {
		const user = req.user.id;

		const newDoc = new RepairAndRemodel({
			user,
			...req.body,
		});

		await newDoc.save(function (err) {
			if (err) return next(err);
			RepairAndRemodel.populate(
				newDoc,
				[{ path: 'property' }, { path: 'room' }],
				function (err, populatedRepairAndRemodel) {
					res.status(201).send(populatedRepairAndRemodel);
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

exports.getRepairAndRemodels = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await RepairAndRemodel.find({
			user,
		}).populate('property room');
		let events = await Event.find({
			eventLocation: 'Repairs & Remodels',
		})
			.populate({ path: 'parent', model: 'Utility' })
			.populate('property room');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data, events);
		else res.status(200).json({ data, events });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.editRepairAndRemodels = async (req, res) => {
	try {
		const { _id } = req.body;
		await RepairAndRemodel.findByIdAndUpdate(_id, req.body);
		const updatedRnR = await RepairAndRemodel.findById(_id).populate(
			'property room'
		);
		return res.status(201).json(updatedRnR);

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

exports.deleteRepairAndRemodels = async (req, res) => {
	try {
		RepairAndRemodel.findByIdAndDelete(req.body._id).then((data, err) => {
			if (err) return res.status(406).json(data);
			return res.status(200).json(data);
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};
