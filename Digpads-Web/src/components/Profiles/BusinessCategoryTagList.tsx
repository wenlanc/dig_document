import React from 'react';
import { Stack, Chip } from '@mui/material';
import styled from 'styled-components';

import { BusinessTag } from 'types';
import SuiTypography from 'components/SuiTypography';

type IProps = {
	category: string;
	tags: Array<BusinessTag>;
};

const StyledChip = styled(Chip)`
	border-radius: 100px !important;
	border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
	font-size: 13px !important;
	padding: 7px;
`;

const BusinessCategoryTagList = ({ category, tags }: IProps) => {
	return (
		<div>
			<SuiTypography variant='h3'>{category}</SuiTypography>

			<Stack direction='row' flexWrap='wrap' spacing={2}>
				{tags
					?.filter((tag) => tag.category === category)
					?.map((tag, i) => (
						<StyledChip key={i} label={tag.name} />
					))}
			</Stack>
		</div>
	);
};

export default BusinessCategoryTagList;
