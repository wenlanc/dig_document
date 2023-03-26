const OtherCost = require('../models/OtherCost');
const Event = require('../models/Event');
const User = require('../models/User');

exports.addCost = async (req, res, next) => {
	try {
		const user = req.user.id;
		const {
			property,
			room,
			name,
			type,
			company,
			amount,
			payor,
			model,
			frequency,
			startDate,
			endDate,
			incurredDate,
			notes,
			newType,
		} = req.body;
		const otherCost = new OtherCost({
			property,
			room,
			name,
			type,
			amount,
			payor,
			company,
			model,
			frequency,
			startDate,
			endDate,
			incurredDate,
			notes,
			user,
		});

		// if user adds a new general expense type (previously known as Other Cost Type)
		if (newType) {
			const dbUser = await User.findById(user);
			if (dbUser.customOptions.hasOwnProperty('generalExpenses')) {
				dbUser.customOptions = {
					...dbUser.customOptions,
					generalExpenses: [...dbUser.customOptions.generalExpenses, newType],
				};
			} else {
				dbUser.customOptions['generalExpenses'] = [newType];
			}
			await dbUser.save();
		}

		await otherCost.save(function (err) {
			if (err) return next(err);
			OtherCost.populate(otherCost, { path: 'property' }, function (
				err,
				populatedCost
			) {
				res.status(201).send(populatedCost);
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

exports.getCosts = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await OtherCost.find({
			user,
		}).populate('property user room');

		let events = await Event.find({
			eventLocation: 'General Expenses',
		})
			.populate({ path: 'parent', model: 'OtherCost' })
			.populate('property room');

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

exports.editCost = async (req, res) => {
	try {
		const { _id } = req.body;
		await OtherCost.findByIdAndUpdate(_id, req.body);
		const updatedOtherCost = await OtherCost.findById(_id).populate('property');
		return res.status(201).send(updatedOtherCost);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteCost = async (req, res) => {
	try {
		OtherCost.findByIdAndDelete(req.body._id).then((data, err) => {
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
