import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import {
	Button,
	Box,
	Typography,
	Tab,
	AppBar,
	Toolbar,
	IconButton,
} from '@mui/material';

import {
	CategoriesContainer,
	SmScreenNavBar,
	StyledCollapse,
	StyledUl,
	StyledTabs,
	StyledLink,
} from '../styled/knowledgeStyle';

export default function CategoriesNavbar({ categories, variant }) {
	const [currentCategoryTabIndex, setCurrentCategoryTabIndex] = useState(0);
	const [categoriesExpanded, setCategoriesExpanded] = useState(false);
	const params = useParams();

	const desktopNavbar = (
		<CategoriesContainer>
			<StyledTabs
				value={currentCategoryTabIndex}
				onChange={(evt, tabIndex) =>
					setCurrentCategoryTabIndex(tabIndex)
				}
				variant='scrollable'
				scrollButtons='auto'
				indicatorColor='primary'
			>
				{categories
					.filter((c) => {
						if (params.category) {
							return true;
						} else if (!params.subcategory) {
							return c.subcategories?.length > 0;
						} else {
							return true;
						}
					})
					.sort((a, b) => {
						if (a.categoryName < b.categoryName) return -1;
						if (a.categoryName > b.categoryName) return 1;
						return 0;
					})
					.map((category, i) => (
						<StyledLink
							key={category._id}
							to={category.categoryName}
							onSetActive={() => setCurrentCategoryTabIndex(i)}
							smooth={true}
							offset={-60}
							duration={800}
							spy={true}
						>
							<Tab label={category.categoryName} />
						</StyledLink>
					))}
			</StyledTabs>
		</CategoriesContainer>
	);

	const mobileNavbar = (
		<SmScreenNavBar>
			<AppBar position='static' component={Box}>
				<Toolbar>
					<IconButton
						edge='start'
						size='large'
						onClick={() =>
							setCategoriesExpanded((expanded) => !expanded)
						}
					>
						<AppsIcon
							color={categoriesExpanded ? 'primary' : 'inherit'}
							fontSize='large'
						/>
					</IconButton>

					<Typography
						color={categoriesExpanded ? 'primary' : 'inherit'}
						style={{ marginLeft: '10px' }}
					>
						Navigate to Article
					</Typography>
				</Toolbar>
			</AppBar>

			<StyledCollapse
				in={categoriesExpanded}
				timeout={{ enter: 200, exit: 150 }}
			>
				<StyledUl className='feed-categories'>
					{categories.map((category) => (
						<Button
							variant='outlined'
							key={category._id}
							color='primary'
							onClick={() => {
								scrollTo(category.categoryName);
								setCategoriesExpanded((expanded) => !expanded);
							}}
						>
							{category.categoryName}
						</Button>
					))}
				</StyledUl>
			</StyledCollapse>
		</SmScreenNavBar>
	);

	if (variant === 'desktop') {
		return desktopNavbar;
	}

	if (variant === 'mobile') {
		return mobileNavbar;
	}

	throw new Error('Incorrect navbar variant: ', variant);
}
