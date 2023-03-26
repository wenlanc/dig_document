/**
 *
 * @param {File} file
 * @returns base64 file
 */
export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

// Returns a csv from an array of objects with
// values separated by tabs and rows separated by newlines
export function CSV(array) {
	// Use first element to choose the keys and the order
	var keys = Object.keys(array[0]);

	// Build header
	var result = keys.join('\t') + '\n';

	// Add the rows
	array.forEach(function (obj) {
		result += keys.map((k) => obj[k]).join('\t') + '\n';
	});

	return result;
}
