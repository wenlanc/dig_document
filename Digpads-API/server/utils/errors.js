//Handles generic errors
const handleError = (err, res, next) => {
	// Error handling for when no JWT is found
	if (err.code == 'credentials_required') {
		res.status(401);
		return res.json({
			name: err.name,
			message: err.inner.message,
			status: err.status,
		});
	} else if (err.name == 'TypeError') {
		next();
		// return res.status(401).json({
		// 	name: err.name,
		// 	message: err.lineNumber,
		// 	status: err.status,
		// });
	} else if (err.name == 'ReferenceError') {
		console.log('Error: ' + err.message);
		return res.status(500).json({
			name: err.name,
		});
	} else if (err.name == 'ForbiddenError') {
		console.log('Error: ' + err.message);
		return res.status(500).json({
			name: err.name,
		});
	} else {
		res.status(422);
		res.json({ name: err.name, status: err.status });
		console.log(err);
	}
	return;
};

module.exports = { handleError };
