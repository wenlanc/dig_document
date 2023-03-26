import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export const StyledChallengeReason = styled.div<{ isSelected: boolean }>`
	width: 200px;
	text-align: center;
	box-shadow: ${(props) =>
		props.isSelected === true
			? '0rem 0.5rem 1.625rem -0.25rem rgb(20 20 20 / 15%), 0rem 0.5rem 0.5625rem -0.3125rem rgb(20 20 20 / 6%)'
			: 'none'};
	.name,
	.description {
		cursor: pointer;
	}

	.name {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
		height: 100px;
		font-size: 22px;
		width: 100%;
	}
`;

type ChallengeReasonProps = {
	name: string;
	description: string[];
	bgColor: string;
	isSelected: boolean;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ChallengeReason({
	name,
	description,
	bgColor,
	isSelected,
	onClick,
}: ChallengeReasonProps) {
	React.useEffect(() => {
		// wrap links
		var nodes = document.querySelectorAll('.description');
		nodes.forEach((node) => {
			var str = node.textContent;
			var key = 'Review Collection Rules and Policies';
			var esc = `(?!(?:[^<]+>|[^>]+<\\/a>))\\b(${key})\\b`;
			var rgx = new RegExp(esc, 'g');
			var txt = str.replace(rgx, `<a href="${'https://example.com'}">$1</a>`);
			node.innerHTML = txt;
		});
	}, []);

	return (
		<StyledChallengeReason onClick={onClick} isSelected={isSelected}>
			<label className='name' style={{ backgroundColor: bgColor }}>
				{name}
			</label>

			{description.map((content, i) => {
				return (
					<Typography
						className='description'
						key={i}
						sx={{
							fontSize: '12px',
							padding: '0.5em',
						}}
					>
						{content}
					</Typography>
				);
			})}
		</StyledChallengeReason>
	);
}
