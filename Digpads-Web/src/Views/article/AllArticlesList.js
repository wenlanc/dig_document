import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { device } from 'components/MediaSizes';
import { instance } from '../../controllers/axios';
import Footer from 'components/Footer';
import Header from 'components/Nav/Header';
import { PageTitle, Banner } from 'components/styled/Page';
import ArticlesSearch from 'components/Knowledge/ArticlesSearch';
import Spinner from 'components/Spinner';
import { Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { scaleService } from 'chart.js';

// #region StyledComponents
const StyledContainer = styled(Container)`
	max-width: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media screen and ${device.tablet} {
		max-width: 1280px;
	}
`;

const SearchContainer = styled.div`
	padding: 15px 5px 15px 5px;
`;

const Section = styled.section`
	padding: 1em 0;
`;

const AllArticles = styled(Section)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f2f4f6;
`;

const SearchList = styled.ul`
	list-style: none;
	margin: 0;
	display: flex;
	flex-flow: row wrap;
`;

const SearchItemTitle = styled(Typography).attrs(() => {})`
	font-weight: ${(props) => props.theme.fontSemiBold};
	line-height: 1.3;
	margin-bottom: 0.5em;
	text-align: center;
`;

const StyledCircularProgress = styled(Spinner).attrs(() => ({
	type: 'circular',
	size: '15rem',
}))`
	display: block;
	&.MuiCircularProgress-root {
		margin: 0 auto;
	}
`;
// #endregion StyledComponents

export default function AllArticlesList() {
	const [articles, setArticles] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	async function handleArticleSearchInput(value) {
		if (value != '') {
			setLoading(true);
			const res = await instance.get(`search?q=${value}&entity=articles`);
			if (res.status === 200) {
				let _articles = res.data;
				_articles.sort((a, b) =>
					a.title > b.title ? 1 : b.title > a.title ? -1 : 0
				);
				setArticles(_articles);
				setLoading(false);
			} else {
				console.error(res.statusText);
				setLoading(false);
			}
		} else {
			getArticles();
		}
	}

	const getArticles = async () => {
		const response = await instance.get('/getAllArticles');
		if (response.status === 200) {
			let _articles = response.data;
			_articles.sort((a, b) =>
				a.title > b.title ? 1 : b.title > a.title ? -1 : 0
			);
			setArticles(_articles);
			setLoading(false);
		}
	};

	React.useEffect(() => {
		setLoading(true);
		getArticles();
	}, []);

	return (
		<>
			<Header />
			<Banner>
				<PageTitle>All Our Articles</PageTitle>
			</Banner>

			<AllArticles>
				<SearchContainer>
					<ArticlesSearch
						onSubmit={(value) => handleArticleSearchInput(value)}
						page='allOurArticles'
					/>
				</SearchContainer>

				{loading ? (
					<StyledCircularProgress />
				) : (
					<StyledContainer>
						<SearchList>
							<ul>
								{articles?.map((article, index) => (
									<li key={article.urlSlug}>
										<Link
											to={'/article/' + article.urlSlug}
										>
											<SearchItemTitle>
												{article.title}
											</SearchItemTitle>
										</Link>
									</li>
								))}
							</ul>
						</SearchList>
					</StyledContainer>
				)}
			</AllArticles>
			<Footer />
		</>
	);
}
