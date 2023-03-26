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

// #region StyledComponents
const StyledContainer = styled(Container)`
	max-width: 600px;

	@media screen and ${device.tablet} {
		max-width: 1280px;
	}
`;

const Section = styled.section`
	padding: 1em 0;
`;

const AllArticles = styled(Section)`
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
`;
// #endregion StyledComponents

export default function AllPostsList() {
	const [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		const getPosts = async () => {
			const response = await instance.get('posts');

			if (response.status === 200) {
				setPosts(response.data);
			}
		};

		getPosts();
	}, []);

	return (
		<>
			<Header />
			<Banner>
				<PageTitle>All Our Posts</PageTitle>
			</Banner>
			<AllArticles>
				<StyledContainer>
					<SearchList>
						<ul>
							{posts?.map((post) => (
								<li key={post.slug}>
									<Link to={'/post/' + post.slug}>
										<SearchItemTitle>
											{post.title}
										</SearchItemTitle>
									</Link>
								</li>
							))}
						</ul>
					</SearchList>
				</StyledContainer>
			</AllArticles>
			<Footer />
		</>
	);
}
