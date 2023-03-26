function unfoldCityAbbreviation(abbreviation) {
	// if value is NYC or LA we replace the value with Los Angeles or New York respectively
	var fullCityName = '';
	switch (abbreviation.toUpperCase()) {
		case 'NYC':
			fullCityName = 'New York';
			break;
		case 'LA':
			fullCityName = 'Los Angeles';
			break;
		default:
			fullCityName = abbreviation;
			break;
	}

	return fullCityName;
}

module.exports = {
	unfoldCityAbbreviation: unfoldCityAbbreviation,
};
