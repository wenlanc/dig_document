import React from 'react';
import Timeline from '@mui/lab/Timeline';
import { TimelineItem as MuiTimelineItem } from '@mui/lab';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import Typography from '@mui/material/Typography';
import TimelineDot from '@mui/lab/TimelineDot';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import Icon from '@mui/material/Icon';
import { timelineServices as services } from './Services';
import useMediaQuery from '@mui/material/useMediaQuery';
import { device } from 'components/MediaSizes';

const TimelineText = styled.div`
	margin: 0 auto;
	margin-top: 30px;
	margin-bottom: 18px;
	b {
		display: block;
		margin-bottom: 5px;
		font-size: 1rem;
		line-height: 27px;
		font-weight: 700;
		color: #333333;
		text-align: center;
	}
`;

const TimelineList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;

	max-width: 1212px;
	margin: 0 auto;

	@media screen and ${device.laptopXL} {
		max-width: 1500px;
	}
`;

const TimelineImg = styled.div`
	img {
		width: 43.3%;
		display: block;
		margin: 0 auto;
	}
`;

const TimelineItem = styled.li`
	display: flex;
	width: 20%;
	flex-direction: column;

	& > :nth-child(1) {
		order: 1;
		height: 216px;
	}

	& > :nth-child(2) {
		order: 3;
	}

	& > :nth-child(3) {
		order: 2;
	}

	&.reverse > :nth-child(1) {
		order: 3;
	}

	&.reverse > :nth-child(2) {
		order: 1;
		height: 216px;
		margin-top: 0;
	}

	&::after {
		content: '';
		background: url('images/icons/timeline/arrow-bg.png');
		background-size: 100%;
		background-repeat: no-repeat;
		height: 35px;
		order: 2;
		margin-top: -30px;
		margin-bottom: -10px;
	}

	@media screen and ${device.laptopXL} {
		&::after {
			margin-top: 10px;
		}
	}
`;

const TimelineChecklist = styled.ul`
	list-style: none;
	margin: 0 auto;
	padding: 0;
	text-align: center;
	transform: translateX(-10px);

	li {
		position: relative;
		font-size: 0.9rem;
		color: #484848;
		font-weight: 400;

		&::before {
			content: '';
			display: inline-block;
			left: 0;
			margin-right: 8px;
			top: 5px;
			width: 14px;
			height: 11px;
			background-image: url('images/icons/timeline/check.png');
			background-repeat: no-repeat;
		}

		@media screen and ${device.laptopXL} {
			font-size: 1.1rem;
		}
	}
`;

const TimelineTitle = styled(Typography).attrs(() => ({
	variant: 'body1',
	component: 'h5',
}))`
	text-align: left;
	font-weight: bold;
	margin: 0.5em 0;

	@media screen and ${device.laptopXL} {
		font-size: 1.1rem;
	}
`;

const TimelineDescription = styled.div`
	font-weight: 500;
`;

/**
 * Creates a timeline item using props
 * @param {String} icon - Path to icon
 * @param {title} title - The title to display alongside timeline item
 * @return {React.Component} TimelineItem
 */
function MobileTimelineItem({ icon, title, descriptions }) {
	return (
		<MuiTimelineItem>
			<TimelineSeparator>
				<TimelineDot color='primary'>
					<Icon>
						<img src={icon} alt='Time line dot' />
					</Icon>
				</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<TimelineTitle className='timeline-title'>
					{title}
				</TimelineTitle>

				{descriptions}
			</TimelineContent>
		</MuiTimelineItem>
	);
}

function DesktopTimelineItem({ icon, title, descriptions }) {
	return (
		<TimelineItem>
			<div className='timeline__tooltip'>
				<TimelineImg>
					<img src={`timeline/${icon}`} alt='Time line image' />
				</TimelineImg>
				<TimelineText>
					<TimelineTitle>{title}</TimelineTitle>
					<TimelineChecklist>{descriptions}</TimelineChecklist>
				</TimelineText>
			</div>
		</TimelineItem>
	);
}

export default function CustomizedTimeline() {
	const desktopMatch = useMediaQuery('(min-width: 1260px)');

	const TimelineItemComponent = desktopMatch
		? DesktopTimelineItem
		: MobileTimelineItem;

	const timelineItems = services.map((serviceItem, i) => (
		<TimelineItemComponent
			key={i}
			icon={serviceItem.icon}
			title={serviceItem.title}
			descriptions={mapItemDescriptions(serviceItem.descriptions)}
		/>
	));

	const mobileTimeline = <Timeline>{timelineItems}</Timeline>;

	const desktopTimeline = (
		<div className='timeline timeline-desktop'>
			<TimelineList>
				<TimelineItem>
					<TimelineImg>
						<img
							src='images/icons/timeline/research.png'
							alt='Time line image'
						/>
					</TimelineImg>
					<TimelineText>
						<TimelineTitle>
							Research and Learn about Landlording Topics
						</TimelineTitle>
						<TimelineChecklist>
							<li>Renting Industry News</li>
							<li>
								Research on New Products, Services, and
								Strategies
							</li>
							<li>How To and Advise Articles</li>
						</TimelineChecklist>
					</TimelineText>
				</TimelineItem>

				<TimelineItem className='reverse'>
					<TimelineImg>
						<img
							src='images/icons/timeline/analyze.png'
							alt='Utilize our Calculators to Analyze a Investment Opportunity'
						/>
					</TimelineImg>
					<TimelineText>
						<TimelineTitle>
							Utilize our Calculators to make the best decisions
						</TimelineTitle>
						<TimelineChecklist>
							<li>Income to Rent Ratio Calculator</li>
							<li>Turnover Cost Estimator</li>
							<li>Hard Money Loan</li>
						</TimelineChecklist>
					</TimelineText>
				</TimelineItem>

				<TimelineItem>
					<TimelineImg>
						<img
							src='images/icons/timeline/collaborate.png'
							alt='Collaborate with other experienced landlords'
						/>
					</TimelineImg>
					<TimelineText>
						<TimelineTitle>
							Collaborate with other experienced landlords
						</TimelineTitle>
						<TimelineChecklist>
							<li>Share experiences</li>
							<li>Gather advice from other landlords</li>
							<li>Keep informed on trends in the industry</li>
						</TimelineChecklist>
					</TimelineText>
				</TimelineItem>

				<TimelineItem className='reverse'>
					<TimelineImg>
						<img
							src='images/icons/timeline/utilize.png'
							alt='online tools and rentals management'
						/>
					</TimelineImg>
					<TimelineText>
						<TimelineTitle>
							Utilize Tools to Lease and Manage Your
							Rentals(Coming Soon)
						</TimelineTitle>
						<TimelineChecklist>
							<li>Document Storage and Management</li>
							<li>Leasing management and screening</li>
							<li>Electronic document signature</li>
						</TimelineChecklist>
					</TimelineText>
				</TimelineItem>

				<TimelineItem>
					<TimelineImg>
						<img
							src='images/icons/timeline/suggestions.png'
							alt='suggestions on service providers'
						/>
					</TimelineImg>
					<TimelineText>
						<TimelineTitle>
							Find the best service providers(Coming Soon)
						</TimelineTitle>
						<TimelineChecklist>
							<li>Extensive research on products and services</li>
							<li>
								Proprietary analysis and rating of each provider
							</li>
							<li>Advise on best provider for unique needs</li>
						</TimelineChecklist>
					</TimelineText>
				</TimelineItem>
			</TimelineList>
		</div>
	);

	const timeline = desktopMatch ? desktopTimeline : mobileTimeline;

	return timeline;
}

function mapItemDescriptions(descriptions) {
	return descriptions.map((descriptionItem, i) => (
		<TimelineDescription className='check' key={i}>
			<CheckIcon style={{ verticalAlign: 'top' }} color='primary' />
			{descriptionItem}
		</TimelineDescription>
	));
}
