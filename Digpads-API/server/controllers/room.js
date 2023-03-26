const Room = require('../models/Room');
const Event = require('../models/Event');

exports.addRoom = async (req, res, next) => {
	try {
		const user = req.user.id;
		req.body.user = user;
		const newRoom = new Room(req.body);
		await newRoom.save(function (err) {
			if (err) return next(err);
			Room.populate(newRoom, { path: 'property' }, function (
				err,
				populatedRoom
			) {
				res.status(201).send(populatedRoom);
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

// Returns rooms from all properties
exports.getAllRooms = async (req, res) => {
	try {
		const user = req.user.id;
		const data = await Room.find({
			user,
		}).populate('property');
		const events = await Event.find({
			room: { $ne: null },
		}).populate('property room');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data, events });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.getRooms = async (req, res) => {
	try {
		const user = req.user.id;
		const property = req.body.property;
		const data = await Room.find({
			user,
			property,
		}).populate('property user');
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json(data);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error occurred on the server',
			error,
		});
	}
};

exports.editRoom = async (req, res) => {
	try {
		const { _id } = req.body;
		await Room.findByIdAndUpdate(_id, req.body);
		const updatedRoom = await Room.findById(_id).populate('property');
		return res.status(201).json(updatedRoom);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error occurred on the server',
			error,
		});
	}
};

exports.deleteRoom = async (req, res) => {
	try {
		const { _id } = req.body;
		const room = await Room.findByIdAndDelete(_id);
		return res.status(201).send(room);
	} catch (error) {
		console.log(error);
	}
};

// CURRENTLY NOT BEING USED...
// exports.addItem = async (req, res, next) => {
// 	try {
// 		const user = req.user.id;
// 		req.body.user = user;
// 		const { roomId, propertyId, item } = req.body;

// 		const room = await Room.findById(roomId);
// 		console.log(room.property);
// 		console.log(req.body);

// 		if (propertyId == room.property) {
// 			room.items.push(item);
// 			await room.save(function (err) {
// 				if (err) return next(err);
// 				Room.populate(room, { path: 'property' }, function (
// 					err,
// 					populatedRoom
// 				) {
// 					return res.status(201).send(populatedRoom);
// 				});
// 			});
// 		} else {
// 			return res.status(404).json({
// 				message: 'Room/Property not found',
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({
// 			message: 'Error occurred on the server',
// 			error,
// 		});
// 	}
// };

// exports.editItem = async (req, res, next) => {
// 	try {
// 		const { roomId, itemId, item } = req.body;
// 		const room = await Room.findById(roomId);
// 		room.items = room.items.map((i) => {
// 			if (i._id == itemId) return item;
// 			else return i;
// 		});
// 		await room.save(function (err) {
// 			if (err) return next(err);
// 			Room.populate(room, { path: 'property' }, function (err, populatedRoom) {
// 				return res.status(201).send(populatedRoom);
// 			});
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({
// 			msg: 'Error occurred on the server',
// 			error,
// 		});
// 	}
// };

// exports.deleteItem = async (req, res) => {
// 	try {
// 		const { roomId, itemId } = req.body;
// 		console.log(req.body);
// 		const room = await Room.findById(roomId);
// 		console.log(room.items);
// 		room.items = room.items.filter((item) => item._id != itemId);
// 		console.log(room.items);
// 		await room.save(function (err) {
// 			if (err) return next(err);
// 			Room.populate(room, { path: 'property' }, function (err, populatedRoom) {
// 				return res.status(201).send(populatedRoom);
// 			});
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({
// 			msg: 'Error occurred on the server',
// 			error,
// 		});
// 	}
// };
