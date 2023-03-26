const Property = require('../models/Property');
const Utilities = require('../models/Utilities');
const OtherCosts = require('../models/OtherCost');
const PhysicalProperty = require('../models/PhysicalProperty');
const Tax = require('../models/Tax');
const Insurance = require('../models/Insurance');
const Maintenance = require('../models/Maintenance');
const Room = require('../models/Room');
const RepairAndRemodels = require('../models/RepairAndRemodel');

/**
 * @return {Promise<Property | null>} added property
 */
exports.addProperty = async (req, res) => {
	const newProperty = new Property({
		userId: req.user.id,
		propertyName: req.body.propertyName,
		livingSquaredFootage: req.body.livingSquaredFootage,
		propertySquareFootage: req.body.propertySquareFootage,
		streetAddress: req.body.streetAddress,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		propertyType: req.body.propertyType,
		bedrooms: req.body.bedrooms,
		bathrooms: req.body.bathrooms,
		occupancy: req.body.occupancy,
		lastRentAmount: req.body.lastRentAmount,
		acquiredDate: req.body.acquiredDate,
		images: req.body.images,
		units: req.body.units,
	});

	return newProperty.save().then((property) => {
		return property;
	});
};

/**
 * @return {Promise<Property | null>} edit property
 */
exports.editProperty = async (req, res) => {
	try {
		const p = await Property.findByIdAndUpdate(
			req.body._id,
			req.body,
			(err, data) => {
				console.log(err);
			}
		);
		return p;
	} catch (e) {
		console.log(e);
	}
};

/**
 * @return {Promise<Property | null>} get property
 */
exports.getProperty = async (req, res) => {
	const propertys = await Property.find({
		userId: req.user.id,
		isDeleted: { $ne: true },
	});
	return propertys;
};

/**
 * @return {Promise<Property | null>} delete property
 */
exports.deleteProperty = async (req, res) => {
	// const propertys = await Property.deleteOne({ _id: req.body.id });

	// const newProperty = new Property({
	// 	userId: req.user.id,
	// 	reason: req.body.reason,
	// });

	const p_id = req.body.id;
	console.log('id got ', p_id);
	console.log('req body', req.body);
	const property = await Property.findById(p_id);
	property.isDeleted = true;
	property.reason = req.body.reason;

	return property.save().then(async (data, err) => {
		if (err) return next(err);
		const utilites = await Utilities.find({ property: p_id });
		const costs = await OtherCosts.find({ property: p_id });
		const pp = await PhysicalProperty.find({ property: p_id });
		const tax = await Tax.find({ property: p_id });
		const insurance = await Insurance.find({ property: p_id });
		const maintenance = await Maintenance.find({ property: p_id });
		const room = await Room.find({ property: p_id });
		const rnr = await RepairAndRemodels.find({ property: p_id });
		await utilites.forEach(async (data) => {
			console.log('deleting', data._id);
			await Utilities.findByIdAndDelete(data._id);
		});
		await costs.forEach(async (data) => {
			console.log('deleting', data._id);
			await OtherCosts.findByIdAndDelete(data._id);
		});
		await pp.forEach(async (data) => {
			console.log('deleting', data._id);
			await PhysicalProperty.findByIdAndDelete(data._id);
		});
		await tax.forEach(async (data) => {
			console.log('deleting', data._id);
			await Tax.findByIdAndDelete(data._id);
		});
		await insurance.forEach(async (data) => {
			console.log('deleting', data._id);
			await Insurance.findByIdAndDelete(data._id);
		});
		await maintenance.forEach(async (data) => {
			console.log('deleting', data._id);
			await Maintenance.findByIdAndDelete(data._id);
		});
		await room.forEach(async (data) => {
			console.log('deleting', data._id);
			await Room.findByIdAndDelete(data._id);
		});
		await rnr.forEach(async (data) => {
			console.log('deleting', data._id);
			await RepairAndRemodels.findByIdAndDelete(data._id);
		});
		return data;
	});

	// const newProperty = new Property({
	// 	userId: req.user.id,
	// 	reason: req.body.reason,
	// });
	// newProperty.save();

	// return property;
};

/**
 * @return {Promise<Property | null>} search property
 */
exports.searchProperty = async (req, res) => {
	const propertys = await Property.find({
		userId: req.user.id,
		propertyName: { $regex: new RegExp('^' + req.body.propertyName, 'i') },
	});

	return propertys;
};

exports.addPropertyListing = async (req, res) => {
	const { _id, document } = req.body;
	const property = await Property.findById(_id);
	property.documents.push(document);
	await property.save();
	return res.send(property);
};
