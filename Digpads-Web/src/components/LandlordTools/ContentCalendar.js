import React from 'react';
import {
	Card,
	CardHeader,
	Avatar,
	Typography,
	TableContainer,
	TableHead,
	TableCell,
	TableRow,
	Table,
	TableBody,
	Paper,
	IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import styled from 'styled-components';

const Root = styled.div`
	width: 100%;
`;

const StyleTableHeading = styled(TableHead)`
	background: #f3f1f4;
`;

const StyleTableCellHead = styled(TableCell)`
	color: #0063c8;
	font-weight: bold;
	text-align: left;
`;

const StyleTableCell = styled(TableCell)`
	color: #6c757d;
	font-weight: 500;
	text-align: left;
`;

const Heading = styled(Typography)`
	font-weight: bold;
	min-height: 32px;
	font-size: 20px;
`;

const StyledIconButton = styled(IconButton)`
	background-color: #0063c8;
	height: 16px;
	width: 16px;
	:hover {
		background: #0063c8;
	}
`;

const StyledAdd = styled(Add)`
	color: #fff;
`;

const StyleTable = styled(Table)``;

const rows = [
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
	{
		currentCampaign: 'Darryl Dish Washer',
		PM: '',
		contentType: 'Brochure',
		content: 'Done',
		artwork: 'Done',
		proofreading: `it's good`,
	},
];

function ContentCalendar({ title }) {
	return (
		<Root>
			<Card>
				<CardHeader
					title={
						<Heading variant='body1' component='h2'>
							{title}
						</Heading>
					}
				/>
			</Card>
			<TableContainer component={Paper}>
				<StyleTable>
					<StyleTableHeading>
						<TableRow>
							<StyleTableCellHead>
								Current Campaign
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								PM
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								Content Type
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								Content
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								Artwork
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								Proofreading
							</StyleTableCellHead>
							<StyleTableCellHead align='left'>
								<StyledIconButton
									onClick={() => {
										alert('Add content calendar');
									}}
								>
									<StyledAdd />
								</StyledIconButton>
							</StyleTableCellHead>
						</TableRow>
					</StyleTableHeading>
					<TableBody>
						{rows.map((row, i) => (
							<TableRow key={i}>
								<StyleTableCell component='th' scope='row'>
									{row.currentCampaign}
								</StyleTableCell>
								<StyleTableCell align='left'>
									<Avatar
										style={{
											height: 32,
											width: 32,
										}}
									/>
								</StyleTableCell>
								<StyleTableCell align='left'>
									{row.contentType}
								</StyleTableCell>
								<StyleTableCell align='left'>
									{row.content}
								</StyleTableCell>
								<StyleTableCell align='left'>
									{row.artwork}
								</StyleTableCell>
								<StyleTableCell align='left'>
									{row.proofreading}
								</StyleTableCell>
								<StyleTableCell align='left'></StyleTableCell>
							</TableRow>
						))}
					</TableBody>
				</StyleTable>
			</TableContainer>
		</Root>
	);
}

export default ContentCalendar;
