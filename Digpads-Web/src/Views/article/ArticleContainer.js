import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { instance, getCSRF } from '../../controllers/axios';
import Spinner from 'components/Spinner';
import Article from './Article';
import Grid from '@mui/material/Grid';

export default function ArticleContainer(props) {
	const [article, setArticle] = useState(null);
	const params = useParams();

	useEffect(() => {
		getCSRF();

		instance
			.get(`getArticle`, {
				params: { slug: params.slug },
			})
			.then((response) => {
				if (response.status === 200) {
					let article1 = response.data.data; // response.data.data is cumbersome

					formatPublicationDate(article1);
					article1.content = fixLinebreaks(article1.content);
					// Add related articles to the article
					fetchRelatedArticles(
						article1.category.categoryName // think this should be just .name
					).then((relatedArticles) => {
						if (relatedArticles) {
							article1.relatedArticles = relatedArticles;
							setArticle(article1);
						}
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [params.slug]);

	return article ? <Article {...article} /> : articleLoading();
}

/**
 * Fetches related articles with specified category
 * @param {String} category - category to find related articles
 * @param {Number} limit - max number of articles to fetch
 * @return {Promise<Array<Article>>} - related articles
 */
async function fetchRelatedArticles(category, limit = 5) {
	var _category = encodeURIComponent(category);
	try {
		const response = await instance.get(
			`relatedArticles?category=${_category}&limit=${limit}`
		);

		if (response.status === 200) {
			return response.data;
		} else {
			console.log(`Coudn't fetch related articles`);
		}
	} catch (error) {
		console.log(error);
	}
}

function formatPublicationDate(article) {
	const published_at = {
		day: new Date(article.published_at).toLocaleString('en-us', {
			day: 'numeric',
		}),

		month: new Date(article.published_at).toLocaleString('en-us', {
			month: 'short',
		}),

		year: new Date(article.published_at).toLocaleString('en-us', {
			year: 'numeric',
		}),
	};

	article.published_at = published_at;
}

/**
 * @description Replace <br> with \
 */
function fixLinebreaks(string) {
	return string.replace(/<br><br>/g, '');
}

function articleLoading() {
	return (
		<Grid container style={{ marginTop: '20vh' }} justifyContent='center'>
			<Spinner type='circular' size={'12rem'} />
		</Grid>
	);
}
