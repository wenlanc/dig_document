import React from 'react';
import {
	PostCardsContainer,
	OnePostCardContainer,
	ImageStyles,
	PostTitleContainer,
	PostCategoryTitle,
} from 'components/styled/knowledgeStyle';

import Typography from '@mui/material/Typography';

export default function CardRow({ data }) {
	return (
		<div
			style={{ marginTop: '2em', marginBottom: '10em' }}
			id={data.categoryName}
		>
			{window.location.pathname !== '/charts' ? (
				<PostCategoryTitle>{data.categoryName}</PostCategoryTitle>
			) : (
				''
			)}
			<PostCardsContainer>
				{data.categoryData.slice(0, 3).map((itemData, key) => {
					return (
						<OnePostCardContainer
							component='a'
							key={key}
							href={itemData.href ? itemData.href : null}
						>
							<Typography variant='body2'>
								This is a placeholder text for a brief
								description
							</Typography>
							<div
								style={{
									width: '100%',
									height: '65%',
								}}
							>
								<ImageStyles
									src={
										itemData.image
											? itemData.image
											: 'images/placeholder.png'
									}
									alt='item icon'
								/>
							</div>
							<PostTitleContainer>
								{itemData.title}
							</PostTitleContainer>
						</OnePostCardContainer>
					);
				})}
			</PostCardsContainer>
		</div>
	);
}
