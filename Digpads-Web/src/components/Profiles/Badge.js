import React from 'react';
import { Button } from '@mui/material';
import { scroller } from 'react-scroll';
import styled from 'styled-components';

const StyledBadge = styled(Button)`
	color: black;
	margin-right: 8px;
	text-transform: capitalize;
	margin-bottom: 8px;
`;

function Badge({ id, children }) {
	const handleBadgeClick = (element) => {
		scroller.scrollTo(element, {
			duration: 800,
			delay: 200,
			offset: -90,
			smooth: 'easeInOutQuart',
		});
	};

	return (
		<StyledBadge
			variant='outlined'
			href={`#${id}`}
			onClick={() => handleBadgeClick(id)}
		>
			{children}
		</StyledBadge>
	);
}

export default Badge;
