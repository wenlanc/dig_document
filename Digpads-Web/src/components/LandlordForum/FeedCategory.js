import React from 'react';
import { MenuContainer, StyledCategoryName } from '../styled/categories';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function FeedCategory(props) {
	return (
		<li
			onClick={() => {
				props.handleMultipleCategories(props.name);
			}}
		>
			<ListItemText>
				<MenuContainer>
					<Link
						to='/landlordforum'
						component={RouterLink}
						style={{
							textDecoration: 'none',
						}}
					>
						<Typography
							style={
								props.isSelected ? clickedLinkText : linkText
							}
						>
							{props.icon}
						</Typography>
					</Link>

					<ListItemText style={{ marginLeft: '0.5em' }}>
						<Link
							to='/landlordforum'
							style={{
								textDecoration: 'none',
							}}
						>
							<StyledCategoryName
								style={
									props.isSelected
										? clickedLinkText
										: linkText
								}
							>
								{props.name}
							</StyledCategoryName>
						</Link>
					</ListItemText>

					{props.isSelected && (
						<CloseIcon
							onClick={() => {
								props.unselectCategory(props.name);
							}}
						/>
					)}
				</MenuContainer>
			</ListItemText>
		</li>
	);
}

const linkText = {
	color: '#3C3C50',
};

const clickedLinkText = {
	color: 'blue',
	fontWeight: '500',
};

const iconStyle = {
	color: '#bdbdc5',
};
const selectedIconStyle = {
	color: 'blue',
};
