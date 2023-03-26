import React from 'react';
import useSearchUsers from '../../../hooks/useSearchUsers';
import Stack from '@mui/material/Stack';
import TimeTable from '../TimeTable';

import { SectionSubtitle, InputLabel } from '../../styled/Admin';

import SearchUsers from '../users/SearchUsers';

export default function UsedReviewsTable({ reviews }) {
	return (
		<div>
			<TimeTable rows={reviews} />
		</div>
	);
}
