const PhysicalProperty = require('../models/PhysicalProperty');
const Event = require('../models/Event');

exports.addPhysicalProperty = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;
		const newDoc = new PhysicalProperty(req.body);
		await newDoc.save(function (err) {
			if (err) {
				console.log('err while saving property');
				return next(err);
			}
			PhysicalProperty.populate(
				newDoc,
				[{ path: 'property' }, { path: 'room' }],
				function (popErr, populatedPhysicalProperty) {
					if (popErr) return next(popErr);
					return res.status(201).send(populatedPhysicalProperty);
				}
			);
		});
	} catch (error) {
		console.log('error');
		res.status(500).send({ msg: 'error' });
	}
};

exports.getPhysicalProperty = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await PhysicalProperty.find({
			user,
			isDeleted: { $ne: true },
		}).populate('property room');
		let events = await Event.find({
			eventLocation: 'Physical Property',
		})
			.populate([
				{ path: 'parent', model: 'PhysicalProperty' },
				{ path: 'room', model: 'Room' },
			])
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

exports.editPhysicalProperty = async (req, res) => {
	try {
		const { _id } = req.body;
		await PhysicalProperty.findByIdAndUpdate(_id, req.body);
		const updatedPhysicalProperty = await PhysicalProperty.findById(
			_id
		).populate('property room');
		res.status(201).json(updatedPhysicalProperty);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deletePhysicalProperty = async (req, res) => {
	try {
		const { id, reason } = req.body;
		const data = await PhysicalProperty.findById(id);
		data.isDeleted = true;
		data.reason = reason;
		await data.save();
		return res.status(200).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};
