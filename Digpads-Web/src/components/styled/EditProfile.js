import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

export const PageTitle = styled.h1`
	text-align: center;
	font-size: 1.5rem;
	margin-bottom: 1em;
`;

export const SectionTitle = styled.h2`
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 1.125em;
`;

export const EditProfilePage = styled.main`
	max-width: 660px;
	margin: auto;
	padding: 25px 16px 50px 16px;
	font-family: Roboto;
	& section {
		margin-bottom: 60px;
	}

	.profile-card {
		box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
		border-radius: 15px;
		padding: 2em;
	}
`;

export const Fieldset = styled.fieldset`
	alignitems: center;
	border: none;
	display: flex;
	column-gap: 0.5em;
	padding: 0;
	margin: 0.5em 0;
	& input {
		flex-grow: 1;
	}

	& label {
		width: 120px;
		color: rgb(103, 116, 142);
		fontweight: 700;
	}
`;

export const BusinessCategory = styled.div`
	margin-bottom: 2em;
`;

export const BusinessCategoryTagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
`;

export const BusinessTag = styled(Chip).attrs(({ name, onDelete, key }) => ({
	label: name,
	onDelete: onDelete,
	key: key,
}))`
	border-radius: 100px !important;
	border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
	font-size: 13px !important;
	padding: 7px;
`;
