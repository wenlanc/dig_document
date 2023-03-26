import styled from 'styled-components';
import SuiTypography from 'components/SuiTypography';

export const StyledAdminPanel = styled.div`
	font-family: Roboto, Helvetica, Arial, sans-serif;
	letter-spacing: 0.00938em;

	& section {
		margin-bottom: 4em;
	}

	.MuiInputLabel-root {
		font-size: 1rem;
		line-height: normal;
		transform: translate(14px, 12px) scale(1);
	}

	& .MuiTypography-h2 {
		margin-bottom: 1em;
	}
`;

export const PageTitle = styled.h1`
	font-size: 30px;
	margin-top: 1em;
	margin-bottom: 0;
	font-weight: 700;
	text-align: center;
`;

export const SectionTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.7em;
`;

export const SectionSubtitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 0.5em;
	margin-top: 0;
	text-decoration: underline;
`;

export const Section = styled.section`
	margin-bottom: 1.5em;
`;

export const InputLabel = styled.div`
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 1em;
	text-decoration: underline;
`;

export const UserDetailsList = styled.ul`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px;
    margin-bottom: 26px;
    font-size: 13px;
    white-space: nowrap;

    max-height: 500px;
	min-height: 350px;
	overflow-y: scroll;
	& span: {
		font-weight: 600;
	},
`;
