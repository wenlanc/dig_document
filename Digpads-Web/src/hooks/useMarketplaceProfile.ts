import React from 'react';
import {
	fetchMarketplaceProfile,
	updateProfile,
} from '../controllers/marketplaceProfile';

export default function useMarketplaceProfile(user?: string) {
	const [profile, setProfile] = React.useState(null);

	React.useEffect(() => {
		fetchMarketplaceProfile(user)
			.then((marketplaceProfile) => {
				setProfile(marketplaceProfile);
			})
			.catch((error) => {
				alert(error);
			});
	}, [user]);

	const updateUserProfile = (data, setData) =>
		updateProfile(data, setData, user);

	return [profile, setProfile, fetchMarketplaceProfile, updateUserProfile];
}

const initialData = {
	user: {
		_id: '123',
		first: 'John',
		last: 'Doe',
		name: 'John Doe',
	},

	starRating: 4.6,

	socialMediaLinks: [
		{ label: 'facebook', to: 'https://facebooks/awrr/share1/1315' },
	],

	logo: '/Logo-large.png',

	contactInfo: {
		name: 'John',
		address: 'Kalalr',
		city: 'Antra',
		state: 'USA',
		zip: '94612',
		phone: '150-162-1666',
		email: 'john.doe@gmaic.com',
	},

	aboutYou: `Fugiat duis amet cupidatat nostrud nostrud irure nostrud do officia. Culpa pariatur labore elit ex ipsum. Ex id excepteur eiusmod reprehenderit non do sit fugiat enim minim esse laborum. Eu dolor occaecat reprehenderit occaecat qui labore in elit consequat. Est ipsum adipisicing velit in proident eiusmod consequat dolor ea fugiat. Deserunt proident reprehenderit in reprehenderit magna qui duis eu cillum.
                  Exercitation do irure adipisicing pariatur do amet reprehenderit. Ut est labore magna ullamco commodo eiusmod amet qui irure veniam ullamco qui dolore sit. Aliquip adipisicing Lorem culpa commodo deserunt nisi dolore. Ea eiusmod minim ullamco do ex minim. Mollit do proident qui nisi. Lorem exercitation velit labore commodo non labore nostrud in cupidatat.`,

	portfolio: {
		videos: [`/sample-mp4-file-small.mp4`],
		images: ['/Logo-large.png'],
	},

	servicesOffered: [
		{
			category: 'web dev',
			services: ['SPA development', 'static development'],
		},
	],

	areasServed: [
		{
			state: 'Home',
			city: 'Chair',
		},
	],

	availability: '40hrs/week',

	mapLocationHours: {
		sameLocation: true,
		address: 'kahaaw',
		city: 'LNR',
		state: 'RAWRX',
		zip: 9151,
		hours: {
			sunday: { from: '07:30', to: '21:30' },
			monday: { from: '07:30', to: '21:30' },
			tuesday: { from: '07:30', to: '21:30' },
			wednesday: { from: '07:30', to: '21:30' },
			thirsday: { from: '07:30', to: '21:30' },
			friday: { from: '07:30', to: '21:30' },
			saturday: { from: '07:30', to: '21:30' },
		},
	},

	businessDetails: {
		yearFounded: 1996,
		numEmployees: 406,
		licenses: 'SPA GPL GNU',
		headquarters: 'WASH',
		ownership: 'ME!',
		trainingEducation: 'YES',
	},

	businessTags: [
		{
			name: 'contracting',
			category: 'business',
			userType: 'landlord',
			custom: false,
		},
		{
			name: 'mowing',
			category: 'business',
			userType: 'contractor',
			custom: false,
		},
		{
			name: 'grabbing',
			category: 'social',
			userType: 'contractor',
			custom: false,
		},
		{
			name: 'label2',
			category: 'social',
			userType: 'brooo2',
			custom: false,
		},
	],

	rentalHistory: [
		{
			digpadsVerified: true,
			neighborhood: 'booawr',
			city: 'awrxr',
			state: 'awrxr',
			rentalType: 'room',
			monthsLeased: 12,
			leasedFrom: new Date(),
			leasedTo: new Date(),
			confirmLease: true,
			landlordEmailAddress: 'awxrrx@gawrxrr.com',
		},
	],

	desiredRental: {
		description: 'new Date()awwar',
		canAffordFrom: 1261,
		canAffordTo: 15,
		neighborhood: 'good',
		city: '256rtsrsr',
		state: 'q251651',
		rentalType: '2521awawr',
		bedrooms: 11661,
		bathrooms: 1595,
	},

	desiredAmenities: ['shower!'],

	neighborhoods: ['bad!'],
};
