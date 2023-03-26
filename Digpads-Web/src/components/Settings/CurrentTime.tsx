import React from 'react';
import { getDateWithUTCOffset, getOffsets } from 'utils/TimeUtils';
import { User } from 'types';

export default function CurrentTime({ timezone }: Pick<User, 'timezone'>) {
	const [currentTime, setCurrentTime] = React.useState(null);

	React.useEffect(() => {
		let interval;
		getOffsets().then((_allOffsets) => {
			interval = setInterval(async () => {
				const timeNow = await getDateWithUTCOffset(timezone, _allOffsets).then(
					(t) => t.toLocaleTimeString()
				);
				setCurrentTime(timeNow);
			}, 1000);
		});
		return () => clearInterval(interval);
	}, [timezone]);

	return (
		<small>
			Current Time: {currentTime === null ? 'Select Timezone' : currentTime}
		</small>
	);
}
