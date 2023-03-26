import React from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { device } from './MediaSizes';
import Box from '@mui/material/Box';

const CategoryHeader = styled.div`
	display: flex;
	align-items: center;
`;

const CategoryTitle = styled(Typography)`
	font-size: 1.975rem;
	margin-right: 0.2em;
	font-family: inherit;

	@media screen and ${device.laptop && device.tablet} {
		font-size: 2.098rem;
	}
`;

const StyledItemText = styled(Typography)`
	font-size: 0.8rem;
	font-weight: 500;
	cursor: pointer;

	@media screen and ${device.laptop && device.tablet} {
		font-size: 0.96rem;
	}
`;

export default function KnowledgeCategorySection({
	title,
	subcategories,
	children,
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const params = useParams();

	return (
		<>
			<CategoryHeader>
				<CategoryTitle variant='h2'>
					<Box fontWeight={600} color='primary.main'>
						{params.category ? (
							<Box>{title}</Box>
						) : (
							<Link
								to={`/knowledge/${title}`}
								component={RouterLink}
								underline='none'
								color='inherit'
							>
								{title}
							</Link>
						)}
					</Box>
				</CategoryTitle>

				{/* Do not show "Categories" if category or subcategory is selected */}
				{!params.subcategory && !params.category && (
					<>
						<List component='nav' aria-label='subcategories'>
							<ListItem
								aria-haspopup='true'
								aria-label='subcategories'
								onClick={(evt) => setAnchorEl(evt.currentTarget)}
							>
								<ListItemText>
									<StyledItemText color='textSecondary'>
										Categories
									</StyledItemText>
								</ListItemText>
							</ListItem>
						</List>

						<Menu
							id='subcategories-menu'
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={() => setAnchorEl(null)}
						>
							{subcategories
								?.sort(function (a, b) {
									if (
										a.categoryName.toLowerCase() < b.categoryName.toLowerCase()
									) {
										return -1;
									}
									if (
										a.categoryName.toLowerCase() > b.categoryName.toLowerCase()
									) {
										return 1;
									}
									return 0;
								})
								.map((subcategory) => (
									<MenuItem
										key={subcategory._id}
										onClick={() => setAnchorEl(null)}
									>
										<Link
											to={`/knowledge/${title}/${subcategory.categoryName}`}
											component={RouterLink}
										>
											{subcategory.categoryName}
										</Link>
									</MenuItem>
								))}
						</Menu>
					</>
				)}
			</CategoryHeader>

			{children}
		</>
	);
}
