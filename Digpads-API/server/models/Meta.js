const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetaSchema = new Schema(
	{
        name: String,
        content: String
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Meta', MetaSchema);
