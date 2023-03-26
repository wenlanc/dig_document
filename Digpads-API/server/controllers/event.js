const Event = require('../models/Event');
const Utility = require('../models/Utilities');
const GeneralExpense = require('../models/OtherCost');
const PhysicalProperty = require('../models/PhysicalProperty');
const Insurance = require('../models/Insurance');
const Maintenance = require('../models/Maintenance');
const Fixture = require('../models/Fixture');
const RepairAndRemodel = require('../models/RepairAndRemodel');
const System = require('../models/Systems');
const OtherCost = require('../models/OtherCost');
const CronJob = require('../models/CronJobs');

exports.recordEvent = async (req, res, next) => {
	try {
		const user = req.user.id;
		const {
			property,
			location,
			parentData,
			room,
			eventTag,
			eventAction,
			eventType,
			eventData,
			eventStatus,
			parentName,
			scheduleDate,
			eventNature,
		} = req.body;
		const event = new Event({
			user,
			property,
			eventNature,
			parent: parentData?._id,
			parentName: parentData?.name || parentName,
			room: room?._id || room,
			eventLocation: location,
			eventType,
			eventAction,
			eventStatus,
			eventTag,
			eventData,
			scheduleDate,
		});

		if (eventNature === 'Record') {
			let model;
			let amount = 0;
			if (eventType === 'Invoice/Expense' || eventType === 'Payment') {
				switch (location) {
					case 'Utilities':
						model = Utility;
						break;
					case 'General Expenses':
					case 'Other Costs':
						model = GeneralExpense;
						break;
					case 'Physical Property':
						model = PhysicalProperty;
						break;
					// case 'Taxes':
					// 	model = Taxes;
					// 	break;
					case 'Insurance':
						model = Insurance;
						break;
					case 'Maintenance':
						model = Maintenance;
						break;
					case 'Fixture':
						model = Fixture;
						break;
					case 'Remodel & Repair':
						model = RepairAndRemodel;
						break;
					case 'Systems':
						model = System;
						break;
					default:
						console.log('unknown model');
				}

				const data = await model.findById(parentData?._id);
				amount = data?.policyCost || data?.amount;
				amount = amount - eventData?.amountPaid;
				data.policyCost = amount || 0; // for Insurance
				data.amount = amount; // for Everything else
				await data.save();
			}
		}

		await event.save(async function (err) {
			if (err) return next(err);
			if (eventNature === 'Schedule') {
				await new CronJob({
					data: event,
					scheduleDate,
				}).save('cron job saved with event');
			}
			Event.populate(
				event,
				[
					{ path: 'property', model: 'Property' },
					{ path: 'room', model: 'Room' },
					{ path: 'parent', model: getModel(location) },
				],
				(err, populatedEvent) => {
					if (err) return next(err);
					res.status(201).send(populatedEvent);
				}
			);
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

exports.recordConditionChangeEvent = async (req, res, next) => {
	try {
		const user = req.user.id;
		const {
			property,
			location,
			parentData,
			room,
			eventTag,
			eventAction,
			eventType,
			eventData,
			eventStatus,
			scheduleDate,
		} = req.body;
		let updatedData;
		switch (eventData?.condtionChangeType) {
			case 'Replaced':
				if (location == 'Physical Property') {
					await PhysicalProperty.findByIdAndUpdate(
						eventData?.oldData._id,
						eventData?.newData
					);
					updatedData = await PhysicalProperty.findById(
						eventData?.oldData._id
					).populate('property room');
				} else {
					await Fixture.findByIdAndUpdate(
						eventData?.oldData._id,
						eventData?.newData
					);
					updatedData = await Fixture.findById(eventData?.oldData._id).populate(
						'property room'
					);
				}
				break;
			case 'Destroyed':
				console.log('Destroy', location);
				if (eventData?.newData?.replacement) {
					if (location == 'Physical Property') {
						await PhysicalProperty.findByIdAndUpdate(
							eventData?.oldData._id,
							eventData?.newData
						);
						updatedData = await PhysicalProperty.findById(
							eventData?.oldData._id
						).populate('property room');
					} else {
						await Fixture.findByIdAndUpdate(
							eventData?.oldData._id,
							eventData?.newData
						);
						updatedData = await Fixture.findById(
							eventData?.oldData._id
						).populate('property room');
					}
				} else {
					if (location == 'Physical Property') {
						await PhysicalProperty.findByIdAndDelete(
							eventData?.oldData._id,
							eventData?.newData
						);
					} else {
						await Fixture.findByIdAndDelete(
							eventData?.oldData._id,
							eventData?.newData
						);
					}
				}
				// if (location == 'Physical Property') {
				// 	await PhysicalProperty.findByIdAndUpdate(oldData._id, updatedData);
				// 	updatedData = await PhysicalProperty.findById(oldData._id).populate(
				// 		'property room'
				// 	);
				// } else {
				// 	await Fixture.findByIdAndUpdate(oldData._id, updatedData);
				// 	updatedData = await Fixture.findById(oldData._id).populate(
				// 		'property room'
				// 	);
				// }
				break;
			case 'Condition Change':
				console.log('case condtion change');
				break;
			default:
				console.log(
					'fell in default cause eventType => ',
					eventData?.condtionChangeType
				);
				break;
		}
		const event = new Event({
			user,
			property,
			parent: parentData?._id,
			parentName: eventData?.newData?.name,
			room: room?._id,
			eventLocation: location,
			eventType,
			eventAction,
			eventStatus,
			eventTag,
			eventData,
			scheduleDate,
		});
		await event.save(function (err) {
			if (err) return next(err);
			Event.populate(
				event,
				[
					{ path: 'property' },
					{ path: 'room' },
					{ path: 'parent', model: getModel(location) },
				],
				(err, populatedEvent) => {
					if (err) return next(err);
					return res.status(201).send(populatedEvent);
				}
			);
		});
		console.log('could not populate');
		return res.status(201).send(event);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

exports.getAllEvents = async (req, res) => {
	try {
		const user = req.user.id;
		const events = await Event.find({ user }).populate('property user room');
		res.status(200).json({ data: events });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

exports.archiveEvent = async (req, res) => {
	try {
		console.log('Archive evnet');
		const user = req.user.id;
		const { _id } = req.body;
		const event = await Event.findById(_id);
		if (event.user != user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		event.archived = true;
		await event.save();
		res.status(200).json({ message: 'Event Archived Successfully!', event });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

exports.convertToRecorded = async (req, res) => {
	try {
		const user = req.user.id;
		const { _id } = req.body;
		const event = await Event?.findById(_id);
		if (event?.user != user) {
			console.log(event.user, user);
			return res.status(401).json({ error: 'Unauthorized' });
		}
		event.eventNature = 'Record';
		await event?.save();
		const populatedEvent = Event.populate(
			event,
			[
				{ path: 'property', model: 'Property' },
				{ path: 'room', model: 'Room' },
				{ path: 'parent', model: getModel(location) },
			],
			(err, populatedEvent) => {
				if (err) return next(err);
				res.status(201).send(populatedEvent);
			}
		);
		return res.status(200).json({
			message: 'Event converted to Record successfully',
			event: populatedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

function getModel(loc) {
	let _string;
	switch (loc) {
		case 'Utilities':
			_string = 'Utility';
			break;
		case 'Taxes':
			_string = 'Tax';
			break;
		case 'General Expenses':
			_string = 'OtherCost';
			break;
		case 'Systems':
			_string = 'System';
			break;
		default:
			_string = loc;
	}
	return _string;
}
