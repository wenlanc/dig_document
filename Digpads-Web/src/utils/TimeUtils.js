export function isDST(d, zone) {
	// let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
	// let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();

	let min, max;
	switch (zone) {
		case 'HST':
			return false;
		default:
			console.log('checking..');
			min = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
			max = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
			break;
	}
	console.log('okay', Math.max(min, max) !== d.getTimezoneOffset());

	return Math.max(min, max) !== d.getTimezoneOffset();
}

// const getOffset = async (zone) => {
// 	let url;
// 	switch (zone.short) {
// 		case 'HST':
// 			url = 'https://worldtimeapi.org/api/timezone/Pacific/Honolulu';
// 			break;
// 		case 'AKST':
// 			url = 'https://worldtimeapi.org/api/timezone/America/Juneau';
// 			break;
// 		case 'PST':
// 			url = 'https://worldtimeapi.org/api/timezone/America/Los_Angeles';
// 			break;
// 		case 'MST':
// 			url = 'https://worldtimeapi.org/api/timezone/America/Denver';
// 			break;
// 		case 'CST':
// 			url = 'https://worldtimeapi.org/api/timezone/America/Menominee';
// 			break;
// 		case 'EST':
// 			url = 'https://worldtimeapi.org/api/timezone/America/New_York';
// 			break;
// 		default:
// 			console.log(zone);
// 			console.log('no handler for:');
// 	}
// 	return await fetch(url)
// 		.then((res) => res.json())
// 		.then((res) => {
// 			console.log('response');
// 			console.log(res);
// 			return res.utc_offset;
// 		})
// 		.catch((e) => {
// 			console.log('error while fetching time');
// 			console.log(e.message);
// 			console.log('returning default time');
// 			return zone.offset;
// 		});
// };

export async function getOffsets() {
	let [hst, akst, pst, mst, cst, est] = await Promise.all([
		fetch('https://worldtimeapi.org/api/timezone/Pacific/Honolulu')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
		fetch('https://worldtimeapi.org/api/timezone/America/Juneau')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
		fetch('https://worldtimeapi.org/api/timezone/America/Los_Angeles')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
		fetch('https://worldtimeapi.org/api/timezone/America/Denver')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
		fetch('https://worldtimeapi.org/api/timezone/America/Menominee')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
		fetch('https://worldtimeapi.org/api/timezone/America/New_York')
			.then((r) => r.json())
			.then((res) => parseFloat(res.utc_offset.split(':')[0]))
			.catch((e) => null),
	]);

	const offsets = {
		hst,
		akst,
		pst,
		mst,
		cst,
		est,
	};
	return offsets;
}

export async function getDateWithUTCOffset(zone, offsets) {
	// let offset = zone.offset;
	// let offset = await getOffset(zone);
	let offset = offsets[zone?.short?.toLowerCase()] || zone?.offset;

	var now = new Date(); // get the current time
	try {
		var currentTzOffset = -now.getTimezoneOffset() / 60; // in hours, i.e. -4 in NY
		var deltaTzOffset = offset - currentTzOffset; // timezone diff
		var nowTimestamp = now.getTime(); // get the number of milliseconds since unix epoch
		var deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
		var outputDate = new Date(nowTimestamp + deltaTzOffsetMilli); // your new Date object with the timezone offset applied.
		return outputDate;
	} catch (e) {
		console.log('error while converting');
		console.log(e);
		return e;
	}
}

// module.exports = {
// 	getDateWithUTCOffset,
// 	getOffsets,
// };
