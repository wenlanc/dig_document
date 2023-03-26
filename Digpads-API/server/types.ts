export interface User {
	_id: string;
	first: string;
	last: string;
	email: string;
	name: string;
	isActive: boolean;
	middle: string;
	username: string;
	displayUsername: boolean;
	homeCity: string;
	homeState: string;
	accountType: string;
	companyName: string;
	type: UserType;
	favoritedCommunities: FavoritedCommunity[];
	addNewCommunity: string;
	hash: string;
	profilePicUrl: string;
	status: string;
	lastIpAddress: string;
	confirmedEmail: string;
	pToken: string;
	sentDocuments: Document[];
	// createdTemplates: Template[];
	documentToSign: Document[];
	dateFirstJoined: Date;
	dateFirstComment: Date;
	dateLastComment: Date;
	dateLastPasswordChange: Date;
	adminActionsTaken: {
		action: String;
		reason: String;
	}[];
	blockedFromCommenting: boolean;
	blockedFromCommentingExpirationDate: Date;
	suspended: boolean;
	suspendedExpirationDate: Date;
	onProbation: boolean;
	onProbationExpirationDate: Date;
	terminated: boolean;
	terminatedDate: Date;
	reinstated: boolean;
	deleted: boolean;
	deletedDate: Date;
	permanentlyDeleted: boolean;
	timezone: {
		offset: number;
		name: string;
		short: string;
	};
	lastLogin: string;
}

export type UserType =
	| 'tenant'
	| 'landlord'
	| 'contractor'
	| 'landlord/contractor';

export interface FavoritedCommunity {
	user: User;
	state: string;
	city: string;
}
