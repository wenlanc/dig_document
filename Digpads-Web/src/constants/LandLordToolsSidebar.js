function LandLordToolsSidebar(title, submenu) {
	this.title = title;
	this.submenu = submenu;
}

export const landlordToolsSidebar = [
	new LandLordToolsSidebar('Dashboard'),
	new LandLordToolsSidebar('Active Rentals'),
	new LandLordToolsSidebar('Rented'),
	new LandLordToolsSidebar('Activities'),
	new LandLordToolsSidebar('Properties'),
	new LandLordToolsSidebar('People'),
	new LandLordToolsSidebar('Documents'),
	new LandLordToolsSidebar('Finance'),
	new LandLordToolsSidebar('Contractors'),
	new LandLordToolsSidebar('Legal'),
	new LandLordToolsSidebar('Reviews'),
	new LandLordToolsSidebar('My Profile'),
];

export const todoLists = [
	'Standup meeting',
	'Order for Granny tonight',
	'Design and Development',
	'Standup meeting',
];

export const status = [
	{
		variant: 'total',
		count: 3,
	},
	{
		variant: 'success',
		count: 0,
	},
	{
		variant: 'pending',
		count: 3,
	},
];

export const visitors = [
	{
		devices: 'mobile',
		percentage: '80',
	},
	{
		devices: 'tablet',
		percentage: '60',
	},
	{
		devices: 'desktop',
		percentage: '90',
	},
];

export const nontifications = [
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		date: '30 minutes ago',
		status: 'warning',
	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		date: '30 minutes ago',
		status: 'success',
	},
];

export const ourListing = [
	{
		title: 'Difference Between',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		image: 'Group 6027@2x.png',
		status: 'New Offers',
	},
	{
		title: 'Difference Between',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		image: 'Group 6028@2x.png',
		status: 'New Offers',
	},
	{
		title: 'Difference Between',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		image: 'Group 6029@2x.png',
		status: 'New Offers',
	},
];
