const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	entity: {
		type: String,
	},
	year: {
		type: String,
	},
	amount: {
		type: Number,
		required: true,
	},
	timingOfPayment: {
		type: String,
	},
	dueDate: {
		type: Date,
	},
	// lateFees: {
	// 	// 	name: 'Fixed $ Amount Each Month',
	// 	// 	value: 1,
	// 	// 	name: 'Fixed % Increase Each Month',
	// 	// 	value: 2,
	// 	// 	name: '% Increase Each Month',
	// 	// 	value: 3,
	// 	// 	name: 'Different Amounts Each Month',
	// 	// 	value: 4,
	// 	model: Object,
	// 	basis: Number,
	// 	cycle: String,
	// 	sameAsAmount: Boolean,
	// 	month1: Number,
	// 	month2: Number,
	// 	month3: Number,
	// 	month4: Number,
	// 	month5: Number,
	// 	month6: Number,
	// 	month7: Number,
	// 	month8: Number,
	// 	month9: Number,
	// 	month10: Number,
	// 	month11: Number,
	// 	month12: Number,
	// 	otherDay: Number,
	// 	endMonth: Boolean,
	// 	compounding: Boolean,
	// },
	notes: {
		type: String,
	},
	images: {
		type: Array,
		default: [],
	},
	attachments: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model('Tax', TaxSchema);
