export interface IReview {
	_id: string;
	user: User;
	title: string;
	content: string;
	ratings: Ratings;
	campaign: {
		_id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
	rejected?: boolean;
	rejectedReason?: string;
	challenge?: ReviewChallenge;
	responses?: Array<ReviewResponse>;
	reviewer: User;
	source: string;
	isSelected: boolean;
}

export interface Comment {
	author: User;
	content: string;
	removed?: boolean;
	article: Article;
}

export interface Category {
	categoryName: string;
	created_by: User;
	createdAt: Date;
	updatedAt: Date;
	published_at: Date;
	updated_by: User;
	parentCategory: Category;
	subcategories: Category[];
}

export interface Article {
	title: string;
	content: string;
	image: string;
	comments: Comment[];
	category: Category;
	subcategory: Category;
	urlSlug: string;
	views: number;
	published_at: Date;
	created_by: User;
	updated_by: User;
}

export interface Like {
	likeType: string;
	user: User;
	post: Post;
}

export interface PostReply {
	author: User;
	post: Post;
	content: string;
	parent: PostReply;
	replies: PostReply[];
	comments: Comment[];
	likes: Like[];
	removed?: boolean;
}

export interface Post {
	_id: string;
	title: string;
	content: string;
	author: User | string;
	category: string;
	replies: PostReply[];
	slug: string;
	likes: Like[];
	state: { name: string };
	city: { name: string; state: string };
	images: string[];
	views: number;
	removed?: boolean;
	createdAt: string;
}

export interface Ratings {
	overall: number;
	communication: number;
	delivery: number;
	quality: number;
	value: number;
}

export interface ReviewChallenge {
	_id: string;
	createdAt: string;
	reason: string;
	content: string;
	attachments: Attachment[];
	status: string;
}

export interface ReviewResponse {
	_id: string;
	content: string;
	author: Partial<User>;
	createdAt: string;
}

export enum ReviewOption {
	allReviews = 'all-reviews',
	selectReviews = 'select-reviews',
}

export enum RequestStatus {
	idle = 'idle',
	pending = 'pending',
	fulfilled = 'fulfilled',
	rejected = 'rejected',
}

export interface ContactInfo {
	name?: string;
	address?: string;
	city?: string;
	state?: string;
	zip?: string;
	phone?: string;
	email?: string;
}

export interface MapLocationHours {
	sameLocation?: boolean;
	address?: string;
	city?: string;
	state?: string;
	zip?: number;
	hours?: {
		sunday?: { from: string; to: string };
		monday?: { from: string; to: string };
		tuesday?: { from: string; to: string };
		wednesday?: { from: string; to: string };
		thirsday?: { from: string; to: string };
		friday?: { from: string; to: string };
		saturday?: { from: string; to: string };
	};
}

export interface BusinessDetails {
	yearFounded?: number;
	numEmployees?: number;
	licenses?: string;
	headquarters?: string;
	ownership?: string;
	trainingEducation?: string;
}

export interface MarketplaceProfile {
	_id: string;
	user: User;
	name: String;
	starRating?: number;
	socialMediaLinks?: Array<{ label: string; to: string }>;
	logo?: string;
	numberOfReviews: number;
	contactInfo?: ContactInfo;
	aboutYou?: string;
	portfolio?: {
		videos?: string[];
		images?: string[];
	};
	servicesOffered?: {
		category: string;
		services: string[];
	}[];
	areasServed?: Array<{
		state: string;
		city: string;
	}>;
	availability?: string;
	mapLocationHours: MapLocationHours;
	businessDetails: BusinessDetails;
	businessTags?: Array<BusinessTag>;
	rentalHistory?: RentalHistory[];
	desiredRental?: DesiredRental;
	desiredAmenities?: Array<string>;
	neighborhoods?: Array<string>;
	createdAt?: string;
}

export interface RentalHistory {
	digpadsVerified?: boolean;
	neighborhood?: string;
	city?: string;
	state?: string;
	rentalType?: string;
	monthsLeased?: number;
	leasedFrom?: Date;
	leasedTo?: Date;
	confirmLease?: boolean;
	landlordEmailAddress?: string;
}

export interface DesiredRental {
	description?: string;
	canAffordFrom?: number;
	canAffordTo?: number;
	neighborhood?: string;
	city?: string;
	state?: string;
	rentalType?: string;
	bedrooms?: number;
	bathrooms?: number;
}

export interface BusinessTag {
	name: string;
	category: string;
	userType: string;
	custom: boolean;
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

export interface SentDocuments {
	sender: User;
	title: string;
	documentUrl: string;
	reciever: User;
	recieverEmail: string;
}

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
	marketplaceProfile: MarketplaceProfile;
	lastLogin: string;
}

export interface Campaign {
	_id: string;
	user?: User;
	name: string;
	logo?: string;
	description?: string;
	dateLaunched: string;
	state?: string;
	city?: string;
	reviews?: IReview[];
	isSelected?: boolean;
	deleted?: boolean;
	status?: string;
}

export type IGetReviewsResponse = {
	data: {
		reviews: IReview[];
	};
};

export interface IReviewsStat {
	name: string;
	content: number[];
}

export type IGetReviewsStatsResponse = {
	data: {
		stats: IReviewsStat[];
	};
};

export interface Attachment {
	format: string;
	url: string;
}

export interface Notification {
	_id?: string;
	message: string;
	to?: string;
	isRead: boolean;
}
