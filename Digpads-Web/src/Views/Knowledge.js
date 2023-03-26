import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { scroller, Element } from 'react-scroll';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, useMediaQuery } from '@mui/material';

import { instance as axios } from '../controllers/axios';
import Footer from 'components/Footer/Footer';
import Header from 'components/Nav/Header';
import KnowledgeCategorySection from 'components/KnowledgeCategorySection';
import ArticleCard from 'components/ArticleCard';
import ArticlesSearch from 'components/Knowledge/ArticlesSearch';
import CategoriesNavbar from 'components/Knowledge/CategoriesNavbar';
import { SearchUtils } from '../utils';

import {
	PageTitle,
	PageSubtitle,
	Banner,
	NarrowHeader,
} from 'components/styled/Page';
import {
	KnowledgePageContainer,
	PageTitles,
	ArticlesContainer,
	StyledCircularProgress,
} from 'components/styled/knowledgeStyle';

function KnowledgePage() {
	const [categories, setCategories] = useState([
		{ categoryName: '', subcategories: [{ categoryName: '' }] },
	]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [isSearched, setisSearched] = useState(false);

	const params = useParams();
	const isCategorySelected = params.category;
	const xsUp = useMediaQuery('(min-width: 600px)', { noSsr: true });

	function articleFilterPredicate(article, category) {
		if (isSearched) {
			return article.category?.categoryName === category.categoryName || false;
		}
		if (isCategorySelected) {
			return (
				article.subcategory?.categoryName === category.categoryName ||
				(article.subcategory == undefined &&
					category.categoryName == 'General') ||
				false
			);
		} else {
			return article.category?.categoryName === category.categoryName || false;
		}
	}

	async function fetchCategories() {
		try {
			let url = '/categories';
			if (isCategorySelected) {
				url += `/?category=${encodeURIComponent(params.category)}`;
			}
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchArticles({ limitPerCategory, category, title }) {
		let url = '/articles/?fields=image,title,urlSlug,subcategory';

		// Initialize query options
		const _limitPerCategory = limitPerCategory
			? '&limitPerCategory=' + limitPerCategory
			: '';
		const _category = category
			? '&category=' + encodeURIComponent(category)
			: '';
		const _searchString = title ? '&searchBy=title&q=' + title : '';

		url += _limitPerCategory;
		url += _category;
		url += _searchString;

		const res = await axios.get(url);

		if (res.status === 200) {
			return res.data;
		} else {
			console.error(res.statusText);
		}
	}

	async function handleArticleSearchInput(value) {
		setIsLoading(true);
		let searchQuery = SearchUtils.unfoldCityAbbreviation(value);

		try {
			const res = await axios.get(`search?q=${searchQuery}&entity=articles`);
			setisSearched(true);
			setArticles(res.data.articles);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const scrollTo = useCallback(
		(element) => {
			let offset = !xsUp ? -300 : -130;

			scroller.scrollTo(element, {
				duration: 800,
				delay: 200,
				offset: offset,
				smooth: 'easeInOutQuart',
			});
		},
		[xsUp]
	);

	useEffect(() => {
		setIsLoading(true);
		setisSearched(false);

		// Fetch articles from server
		const fetchOptions = {
			...(params.subcategory || params.category ? {} : { limitPerCategory: 3 }),
			category: params.category ? params.category : '',
		};

		fetchCategories().then((categories) => {
			setCategories(categories);

			fetchArticles(fetchOptions).then((_articles) => {
				setArticles(_articles);
				setIsLoading(false);
				scrollTo(params.subcategory);
			});
		});
	}, [params.category, params.subcategory, scrollTo, isCategorySelected]);

	return (
		<>
			<NarrowHeader>
				<Header />
			</NarrowHeader>

			<Banner style={{ marginBottom: '16px' }}>
				<PageTitle>Knowledge</PageTitle>
				<PageTitles>
					{isCategorySelected && !isSearched && (
						<PageSubtitle inBanner='true' style={{ marginTop: '0.5em' }}>
							<Box fontWeight={400} color='white'>
								{params.category}
							</Box>
						</PageSubtitle>
					)}
				</PageTitles>
			</Banner>
			<KnowledgePageContainer maxWidth='lg'>
				{isLoading && <StyledCircularProgress />}

				{!isLoading && (
					<>
						<CategoriesNavbar
							categories={categories}
							variant={xsUp ? 'desktop' : 'mobile'}
						/>

						<Box display='flex' justifyContent='space-between'>
							{/* Breadcrumbs */}

							{params.category && ( // show only when category is selected
								<Breadcrumbs aria-label='breadcrumb'>
									<RouterLink color='inherit' to='/knowledge'>
										Knowledge
									</RouterLink>

									{params.category && (
										<RouterLink
											color='inherit'
											to={`/knowledge/${params.category}`}
										>
											{params.category}
										</RouterLink>
									)}

									{params.subcategory && (
										<RouterLink color='inherit' to={params.subcategory}>
											{params.subcategory}
										</RouterLink>
									)}
								</Breadcrumbs>
							)}

							<ArticlesSearch
								onSubmit={(value) => handleArticleSearchInput(value)}
							/>
						</Box>

						{/* Categories sections */}
						{categories
							.sort((a, b) => {
								if (a.categoryName < b.categoryName) return -1;
								if (a.categoryName > b.categoryName) return 1;
								return 0;
							})
							.map((category) => {
								return articles.filter((a) =>
									articleFilterPredicate(a, category)
								).length === 0 ? undefined : ( // do not render empty categories
									<Element
										style={{ paddingTop: '5em' }}
										name={category.categoryName}
										key={category._id}
									>
										<KnowledgeCategorySection
											title={category.categoryName}
											subcategories={category.subcategories}
										>
											<ArticlesContainer>
												{articles
													.filter((a) => articleFilterPredicate(a, category))
													.map((article) => (
														<ArticleCard
															key={article.urlSlug}
															title={article.title}
															image={article.image}
															href={`/article/${article.urlSlug}`}
														/>
													))}
											</ArticlesContainer>
										</KnowledgeCategorySection>
									</Element>
								);
							})}
					</>
				)}
			</KnowledgePageContainer>
			<Footer />
		</>
	);
}

export default KnowledgePage;
