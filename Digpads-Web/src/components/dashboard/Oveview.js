import React from 'react';
import DashboardNotification from './DashboardNotification';
import DashboardCalendar from './DashboardCalendar';
import {
	StyledBoxContainer,
	StyledBox1,
	StyledBox2,
	TitleContainer,
	DescriptionContainer,
	Description,
	OverViewContainer,
	CardsContainer,
} from 'components/styled/Overview';
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const drawerWidth = 240;

const Overview = (props) => {
	return (
		<OverViewContainer>
			<StyledBoxContainer>
				<StyledBox1></StyledBox1>
				<StyledBox2>
					<TitleContainer>
						<p>Overview</p>
					</TitleContainer>
					<DescriptionContainer>
						<Description>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Vestibulum quis tortor leo. Mauris ac ultrices
							ex. Aliquam sollicitudin felis mattis tortor
							ullamcorper, nec pharetra mauris luctus{' '}
						</Description>
					</DescriptionContainer>
				</StyledBox2>
			</StyledBoxContainer>
			<CardsContainer>
				<DashboardNotification />
				<DashboardCalendar />
			</CardsContainer>
		</OverViewContainer>
	);
};

export default Overview;
