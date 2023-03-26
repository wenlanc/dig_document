const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Schema.ObjectId is type for ID
const userSchema = new Schema({
	isActive: Boolean,
	email: {
		type: String,
		unique: true,
		required: true,
	},
	first: {
		type: String,
		required: true,
	},
	last: {
		type: String,
		required: true,
	},
	middle: {
		type: String,
	},
	username: {
		type: String,
	},
	forumName: {
		type: String,
	},
	forumFirstName: {
		type: String,
	},
	forumState: {
		type: String,
	},
	forumCity: {
		type: String,
	},
	displayUsername: {
		type: Boolean,
	},
	homeCity: {
		type: String,
	},
	homeState: {
		type: String,
	},
	accountType: { // individual or company
		type: String
	},
	companyName: {
		type: String,
	},
	type: {
		type: String,
		default: 'landlord',
	},
	favoritedCommunities: {
		type: Array,
	},
	addNewCommunity: {
		type: String,
	},
	hash: {
		type: String,
	},

	profilePicUrl: {
		type: String,
	},

	status: {
		// Current, Blocked, Suspended, Reinstated, Permanently Banned
		type: String,
	},

	lastIpAddress: {
		type: String,
	},

	confirmedEmail: String,

	pToken: String,

	sentDocuments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Document',
		},
	],

	createdTemplates: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Template',
		},
	],

	documentToSign: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Document',
		},
	],

	dateFirstJoined: {
		type: Schema.Types.Date,
	},

	dateFirstComment: {
		type: Schema.Types.Date,
	},

	dateLastComment: {
		type: Schema.Types.Date,
	},

	dateLastPasswordChange: {
		type: Schema.Types.Date,
	},

	adminActionsTaken: [
		{
			action: String,
			reason: String,
		},
	],

	blockedFromCommenting: {
		type: Boolean,
		default: false,
	},

	blockedFromCommentingExpirationDate: {
		type: Schema.Types.Date,
	},

	suspended: {
		type: Boolean,
		default: false,
	},

	suspendedExpirationDate: {
		type: Schema.Types.Date,
	},

	onProbation: {
		type: Boolean,
		default: false,
	},

	onProbationExpirationDate: {
		type: Schema.Types.Date,
	},

	// user can't access their account unless they are reinstated
	// user profile is not listed anywhere on the website
	// user marketplace profile page is blank
	terminated: {
		type: Boolean,
		default: false,
	},

	terminatedDate: {
		type: Date,
	},

	// user can access their account after being terminated
	reinstated: {
		type: Boolean,
		default: false,
	},

	// has user has deleted their account?
	deleted: {
		type: Boolean,
		default: false,
	},

	// when user deleted their account
	deletedDate: {
		type: Date
	},

	permanentlyDeleted: {
		type: Boolean,
		default: false,
	},

	timezone: {
		type: Object,
		default: {
			offset: -5,
			name: 'Eastern Standard Time',
			short: 'EST',
		},
	},

	marketplaceProfile: {
		type: Schema.Types.ObjectId,
		ref: 'MarketplaceProfile',
	},

	lastLogin: {
        type: Date,
        default: Date.now
    },
});

userSchema.virtual('name').get(function () {
	return `${this.first} ${this.last}`;
});

// refer https://mongoosejs.com/docs/tutorials/virtuals.html for documentation
userSchema.plugin(mongooseLeanVirtuals);

userSchema.statics.newLogin = function login(id, callback) {
    return this.findByIdAndUpdate(id, {'$set' : { 'lastLogin' : Date.now()} }, { new : true }, callback	);
 }

const User = mongoose.model('User', userSchema);

userSchema.set('toJSON', { virtuals: true });

module.exports = User;
