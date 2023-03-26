const nwc = (num) => {
	const formatted = (
		Number(num?.toString().replace(/\D/g, '')) || ''
	).toLocaleString();
	return formatted;
};

const nwoc = (num) => {
	try {
		const formatted = num?.toString().replace(/[^\d.-]/g, '');
		const hasComma = formatted.split('').includes(',');
		if (hasComma) {
			nwoc(formatted);
		} else {
			return Number(formatted);
		}
	} catch (e) {
		console.log('error in nwoc');
		console.log('number =>', num);
		console.log(e);

		return Number(0);
	}
};

module.exports = {
	nwc,
	nwoc,
};
