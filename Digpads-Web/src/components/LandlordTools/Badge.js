import React from 'react';
import styled from 'styled-components';

const StyledBadge = styled.div`
	flex-grow: 1;
	padding: 4px 8px;
	text-transform: uppercase;
	font-size: 10px;
	border-radius: 4px;
	font-weight: bold;
`;

function Badge({ key, variant, children }) {
	switch (variant) {
		case 'total':
			return (
				<StyledBadge
					key={key}
					style={{
						color: '#2643e9',
						background: 'rgba(38, 67, 233, 0.2)',
					}}
				>
					{children}
				</StyledBadge>
			);
			break;
		case 'success':
			return (
				<StyledBadge
					key={key}
					style={{
						color: '#1aae6f',
						background: 'rgba(26, 174, 111, 0.2)',
					}}
				>
					{children}
				</StyledBadge>
			);
			break;
		case 'pending':
			return (
				<StyledBadge
					key={key}
					style={{
						background: 'rgba(255, 55,9, 0.2)',
						color: '#ff3709',
					}}
				>
					{children}
				</StyledBadge>
			);
			break;
		default:
			return <StyledBadge key={key}>{children}</StyledBadge>;
			break;
	}
}

export default Badge;
