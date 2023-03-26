export function getUserTypeUrlParameter(userType: string) {
	let param;

	switch (userType) {
		case 'landlord':
			param = 'landlords';
			break;
		case 'landlord-contractor':
			param = 'landlord-contractors';
			break;
		case 'contractor':
			param = 'contractors';
			break;
		case 'tenant':
			param = 'tenants';
			break;
		default:
			throw new Error(`invalid user type: ${userType}`);
	}

	return param;
}
