import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { device } from 'components/MediaSizes';

const Title = styled(Typography).attrs(() => ({
	gutterBottom: true,
}))`
	color: ${(props) => props.theme.primaryColor};
	font-weight: bold;
`;

const StyledRelatedArticle = styled.article`
	${Title} {
		margin-bottom: 1em;
	}

	.article-content {
		display: flex;
	}

	img {
		align-self: flex-start;
		width: 100%;
	}

	margin-bottom: 3em;

	.article-content {
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 2em;
		margin-right: 2em;
	}

	.article-content::after {
		content: '';
		height: 2px;
		width: 100%;
		position: absolute;
		bottom: -1em;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.divider {
		width: 100%;
		max-width: 330px;
		margin: 1.5em 0;
		background-color: rgba(0, 0, 0, 0.1);
		height: 2px;
		border: none;
	}

	.publication-date {
		color: gray;
		margin-bottom: 0.5em;
	}

	.MuiSvgIcon-root {
		vertical-align: top;
		font-size: 1.2rem;
		margin-right: 0.5em;
	}

	@media screen and ${device.mobileL} {
		width: 400px;

		img {
			width: 30%;
			margin-left: 1em;
		}

		.article-content {
			flex-direction: row;
		}
	}

	@media screen and ${device.laptop} {
		width: initial;

		.article-content ${Title} {
			font-size: 0.8rem;
		}

		.article-content {
			margin-right: 0;
		}
	}
`;

export default function RelatedArticle({
	title,
	published_at,
	image,
	urlSlug,
}) {
	return (
		<StyledRelatedArticle>
			<a href={urlSlug}>
				<div className='article-content'>
					<div>
						<Title variant='body1'>{title}</Title>
						<div className='publication-date'>
							<ScheduleIcon />
							<time>{`${
								formatPublicationDate(published_at).day
							} ${formatPublicationDate(published_at).month} ${
								formatPublicationDate(published_at).year
							}`}</time>
						</div>
					</div>
					<img
						src={image ? image : '../images/uploads/related1.png'}
					/>
				</div>
			</a>
		</StyledRelatedArticle>
	);
}

function formatPublicationDate(publicationDate) {
	const published_at = {
		day: new Date(publicationDate).toLocaleString('en-us', {
			day: 'numeric',
		}),

		month: new Date(publicationDate).toLocaleString('en-us', {
			month: 'short',
		}),

		year: new Date(publicationDate).toLocaleString('en-us', {
			year: 'numeric',
		}),
	};

	// add suffix: "22" => "22nd"
	published_at.day = published_at.day + nth(Number(published_at.day));

	return published_at;
}

function nth(n) {
	return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
}
