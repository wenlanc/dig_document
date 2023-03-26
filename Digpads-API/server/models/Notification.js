const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		message: {
			type: Schema.Types.String,
			required: true,
		},
        
		to: Schema.Types.String, // url href

		isRead: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Notification', NotificationSchema);
