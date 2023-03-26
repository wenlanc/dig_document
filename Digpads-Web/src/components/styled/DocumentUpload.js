import styled from 'styled-components';

// reorder
export const StyledThumbContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 16px;
`;

export const StyledThumb = styled.div`
	display: inline-flex;
	border-radius: 2px;
	border: 1px solid #eaeaea;
	margin-bottom: 8px;
	margin-right: 8px;
	width: 200px;
	height: 200px;
	padding: 4px;
	box-sizing: border-box;
`;

export const StyledThumbInner = styled.div`
	display: flex;
	min-width: 0;
	overflow: hidden;
`;

export const StyledImage = styled.img`
	height: 100%;
	width: auto;
`;
