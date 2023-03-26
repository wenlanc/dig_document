import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { device } from 'components/MediaSizes';

const StyledProviderPackage = styled.div`
	position: relative;
	padding-top: 1em;
	margin-bottom: 1em;

	@media screen and ${device.tablet} {
		display: grid;
		align-items: center;
		grid-template-columns: 2fr 3fr 2fr;

		package-name {
			align-self: center;
		}
	}
`;

export default function ProviderPackage(props) {
	return (
		<StyledProviderPackage className={props.className}>
			<Typography
				variant='body2'
				className='package-name'
				style={{ fontWeight: 'bold', paddingRight: '3em' }}
			>
				{props.name}
			</Typography>

			<Box component='ul' color='primary.main' fontWeight={500}>
				{props.includes &&
					props.includes.map((inc, i) => (
						<li key={i}>
							{inc.length === 0 ? (
								<br></br>
							) : (
								<li>
									<Box
										key={i}
										component='li'
										display='flex'
										mb={1}
									>
										<FiberManualRecordIcon
											style={{
												fontSize: '0.7rem',
												marginRight: '0.5em',
												position: 'relative',
												bottom: '-4px',
											}}
										/>
										<Box component='span'>{inc}</Box>
									</Box>
								</li>
							)}
						</li>
					))}
			</Box>

			<Box
				component={Typography}
				display='inline'
				color='primary.main'
				justifySelf='center'
				p={props.price.length > 4 ? '0.4em 0.5em' : '0.1em 0.7em'}
				bgcolor='#fff'
				border={2}
				borderRadius='undefinedpx'
				borderColor='#00000000'
				style={{
					fontWeight: 600,
					fontSize: '1.5rem',
				}}
			>
				{props.price}
			</Box>

			{/* <Box
				alignSelf='stretch'
				display='flex'
				flexDirection='column'
				alignItems='center'
			>
				<Typography
					variant='body2'
					style={{
						textTransform: 'uppercase',
						marginBottom: 'auto',
						fontWeight: 'bold',
						textDecoration: 'underline',
					}}
				>
					price
				</Typography>
			</Box> */}
		</StyledProviderPackage>
	);
}
