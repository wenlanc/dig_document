import statesAvgCoords from '../constants/states_avg_coords.json';

export function getUSStateFromCoordinates(latitude, longitude) {
	let closest = {
		latitude: Number.MAX_SAFE_INTEGER,
		longitude: Number.MAX_SAFE_INTEGER,
		prevLatitude: Number.MAX_SAFE_INTEGER,
		prevLongitude: Number.MAX_SAFE_INTEGER,
	};

	statesAvgCoords.forEach((s) => {
		if (
			Math.abs(s.latitude - latitude) < closest.prevLatitude &&
			Math.abs(s.longitude - longitude) < closest.prevLongitude
		) {
			closest.latitude = s.latitude;
			closest.prevLatitude = Math.abs(s.latitude - latitude);

			closest.longitude = s.longitude;
			closest.prevLongitude = Math.abs(s.longitude - longitude);
		}
	});

	const state = statesAvgCoords.find(
		(x) =>
			x.latitude === closest.latitude && x.longitude === closest.longitude
	).state;

	return state;
}
