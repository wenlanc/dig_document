import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'assets/theme/base/colors';

export const InfoTitle = styled(Typography)({
	textTransform: 'capitalize',
	fontFamily: 'Roboto !important',
	// fontWeight: 'bold',
});

export const InfoHeader = styled(Typography)({
	textTransform: 'uppercase',
	fontSize: 13,
	color: '#333232',
	// color: colors?.primary?.main,
	fontFamily: 'Roboto Condensed !important',
	fontWeight: 'bold',
});
