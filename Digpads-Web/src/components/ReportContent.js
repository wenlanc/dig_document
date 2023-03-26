import React, { useRef } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

const StyledReportIcon = styled(ReportIcon)`
	&.MuiSvgIcon-root {
		padding: 0.2em;
		box-sizing: content-box;
		vertical-align: middle;
	}

	&.MuiSvgIcon-root:hover {
		cursor: pointer;
	}
`;

export default function ReportContent(props) {
	return (
		<Tooltip title='report comment'>
			<StyledReportIcon color='error' onClick={props.onClick} />
		</Tooltip>
	);
}
