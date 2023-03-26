const Fixture = require('../models/Fixture');
// const Event = require('../models/Event');

exports.addFixture = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;
		const fixture = new Fixture(req.body);
		await fixture.save(function (err) {
			if (err) return next(err);
			Fixture.populate(
				fixture,
				[
					{
						path: 'property',
						model: 'Property',
					},
					{
						path: 'room',
						model: 'Room',
					},
				],
				function (err, populatedFixture) {
					return res.status(201).send(populatedFixture);
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

exports.getFixtures = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Fixture.find({
			user,
			property,
		}).populate('property room');
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

exports.getAllFixtures = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Fixture.find({
			user,
		}).populate('room property');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json({ data });
		else res.status(200).json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.editFixture = async (req, res) => {
	try {
		const { _id } = req.body;
		await Fixture.findByIdAndUpdate(_id, req.body);
		const updatedFixture = await Fixture.findById(_id).populate(
			'property room'
		);
		return res.status(201).send(updatedFixture);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteFixture = async (req, res) => {
	try {
		Fixture.findByIdAndDelete(req.body._id).then((data, err) => {
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
