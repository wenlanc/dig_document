import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const StyledAccordion = styled(Accordion)`
	border: 1px solid #f1f1f1;

	&.MuiPaper-root {
		box-shadow: none;
	}

	.Mui-expanded {
		.question {
			font-weight: 700;
			color: ${(props) => props.theme.primaryColor};
		}
	}
`;

const StyledQuestion = styled(Typography)`
	font-size: 1.3rem;
	font-weight: 500;
	color: #7a7a7a;
`;

export default function FAQuestion(props) {
	return (
		<Box style={{ width: '100%' }} mb={1}>
			<StyledAccordion defaultExpanded={props.defaultExpanded}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<StyledQuestion className='question' variant='h3'>
						{props.question}
					</StyledQuestion>
				</AccordionSummary>

				<AccordionDetails style={{ display: 'block' }}>
					{props.answers &&
						props.answers.map((answer, i) => (
							<Typography key={i} paragraph variant='body2'>
								{answer}

								{props.withLink ? (
									<Link
										to='/match-me/tenant-screening'
										style={{
											fontWeight: '500',
											textTransform: 'uppercase',
										}}
									>
										{props.linkText}
									</Link>
								) : (
									''
								)}
							</Typography>
						))}
				</AccordionDetails>
			</StyledAccordion>
		</Box>
	);
}

FAQuestion.propTypes = {
	question: PropTypes.string.isRequired,
	answers: PropTypes.arrayOf(PropTypes.string),
};
