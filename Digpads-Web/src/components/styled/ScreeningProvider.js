import styled from 'styled-components';
import { device } from '../MediaSizes';

export const SectionContainer = styled.div`
	border-radius: 10px;
	border-width: ${(props) => (props.variant === 'solid' ? '2px' : '1px')};
	border-style: ${(props) =>
		props.variant === 'solid' ? 'solid' : 'dashed'};
	border-color: ${(props) =>
		props.variant === 'solid'
			? 'rgb(188, 214, 240)'
			: 'rgba(0, 0, 0, 0.54)'};

	${(props) => props.variant === 'dashed' && 'background-color: #f1f5fd'};

	margin-bottom: 1em;
	padding: 1em 1.2em;

	@media screen and ${device.tablet} {
		padding: 1em 1.5em;
	}

	@media screen and ${device.laptop} {
		padding: 1.8em 2.5em;
	}
`;
