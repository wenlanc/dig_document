import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import HouseIcon from '@mui/icons-material/House';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GavelIcon from '@mui/icons-material/Gavel';
import ViewListIcon from '@mui/icons-material/ViewList';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import { MenuContainer } from './styled/categories';

const linkIcon = {
	color: 'none',
};
const clickedLinkIcon = {
	color: 'blue',
};

const linkText = {
	fontSize: '15px',
	color: '#3C3C50',
};

const clickedLinkText = {
	fontSize: '15px',
	color: 'blue',
};

function CategoryLinks() {
	const [location, setLocation] = useState('/');

	return (
		<Grid
			container
			style={{
				width: '100%',
				marginTop: '15px',
			}}
		>
			<div>
				{/* Overview */}
				{/* <ListItem
					button
					onClick={() => {
						setLocation('/feed');
					}}
				> */}
				<MenuContainer>
					<ListItemIcon>
						<HouseIcon
							style={
								location === '/feed' || location === '/'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link to='/feed' style={{ textDecoration: 'none' }}>
							<Typography
								style={
									location === '/feed' || location === '/'
										? clickedLinkText
										: linkText
								}
							>
								Home
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>
				{/* </ListItem> */}

				{/*  Business & economy */}
				<MenuContainer>
					<ListItemIcon>
						<BusinessCenterIcon
							style={
								location === '/feed/business'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/business'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/business'
										? clickedLinkText
										: linkText
								}
							>
								Business & Economy
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>
				{/* Laws & regulations */}
				<MenuContainer>
					<ListItemIcon>
						<GavelIcon
							style={
								location === '/feed/laws'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/laws'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/laws'
										? clickedLinkText
										: linkText
								}
							>
								Laws and Regulations
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Services recommendation */}
				<MenuContainer>
					<ListItemIcon>
						<ViewListIcon
							style={
								location === '/feed/services'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/services'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/services'
										? clickedLinkText
										: linkText
								}
							>
								Service Recommendations
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Tenant management */}
				<MenuContainer>
					<ListItemIcon>
						<PermIdentityIcon
							style={
								location === '/feed/tenants'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/tenants'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/tenants'
										? clickedLinkText
										: linkText
								}
							>
								Tenant Management
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Financing */}
				<MenuContainer>
					<ListItemIcon>
						<MonetizationOnIcon
							style={
								location === '/feed/finacing'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/finacing'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/finacing'
										? clickedLinkText
										: linkText
								}
							>
								Financing
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Property Management */}
				<MenuContainer>
					<ListItemIcon>
						<HomeWorkIcon
							style={
								location === '/feed/property'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/property'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/property'
										? clickedLinkText
										: linkText
								}
							>
								Property Management
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Innovation */}
				<MenuContainer>
					<ListItemIcon>
						<TurnedInNotIcon
							style={
								location === '/feed/innovation'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/innovation'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/innovation'
										? clickedLinkText
										: linkText
								}
							>
								Innovation
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Strategies */}
				<MenuContainer>
					<ListItemIcon>
						<SettingsIcon
							style={
								location === '/feed/strategies'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/strategies'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/strategies'
										? clickedLinkText
										: linkText
								}
							>
								Strategies
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>

				{/* Miscellaneous */}
				<MenuContainer>
					<ListItemIcon>
						<BusinessIcon
							style={
								location === '/feed/miscellaneous'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText>
						<Link
							to='/feed/miscellaneous'
							style={{ textDecoration: 'none' }}
						>
							<Typography
								style={
									location === '/feed/miscellaneous'
										? clickedLinkText
										: linkText
								}
							>
								Miscellaneous
							</Typography>
						</Link>
					</ListItemText>
				</MenuContainer>
			</div>
		</Grid>
	);
}

export default CategoryLinks;
