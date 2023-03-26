import React from 'react';
import styled from 'styled-components';
import ServiceItem from './ServiceItem';
import { introServices as services } from '../../../constants/Services';
import { Grid } from '@mui/material';

// const StyledServiceList = styled.ul`
// 	display: flex;
// 	justify-content: center;
// 	flex-wrap: wrap;
// 	.service__title {
// 		font-weight: normal;
// 	}

// 	text-align: left;

// 	.service__title span {
// 		font-weight: bold;
// 	}
// `;

export default function IntroServiceList() {
	// const serviceItems = services.map((service) => (
	// 	<ServiceItem
	// 		key={service.title}
	// 		image={service.image}
	// 		title={service.title}
	// 		description={service.description}
	// 		href={service.href}
	// 	/>
	// ));

	return (
		<Grid container sx={{ margin: 'auto' }}>
			{services.map((service, index) => {
				return (
					<Grid
						style={{ margin: 'auto' }}
						item
						sm={12}
						md={3}
						key={index}
					>
						<ServiceItem
							key={service.title}
							image={service.image}
							title={service.title}
							description={service.description}
							href={service.href}
						/>
					</Grid>
				);
			})}
		</Grid>
	);

	// return <StyledServiceList>{serviceItems}</StyledServiceList>;
}
