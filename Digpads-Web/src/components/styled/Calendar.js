import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const DashboardContainer = styled.div`
	width: 55%;
	margin-left: 2%;
	min-height: 250px;
	border-radius: 30px;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 11px 18px,
		rgba(0, 0, 0, 0.12) 0px 10px 10px;
	padding-top: 2%;
	@media (max-width: 1280px) {
		width: 60%;
	}
`;

export const Calendartitle = styled.div`
	font-weight: bold;
	margin-left: 3%;
`;

export const CalendarBody = styled.div`
	margin-top: 4%;
`;

export const StyledTable = styled(Table)`
	min-width: 100%;
`;
export const StyledTableHeader = styled(TableHead)`
	background-color: #dcdcdc;
`;
export const StyledTableCell = styled(TableCell)`
	color: #0063c8;
	height: 10px;
	font-weight: bold;
	font-size: 11px;
	border-bottom: 1px dotted #dcdcdc;
`;

export const StyledTableCellContainer = styled(TableCell)`
	height: 40px;
	border-bottom: 1px dotted #dcdcdc;
	border-right: 1px dotted #dcdcdc;
	font-size: 13px;
	color: #7a7a7a;
	font-weight: bold;
`;

export const StyledTableRow = styled(TableRow)`
	color: red;
	background-color: white;
	border-bottom: 1px dotted #dcdcdc;
`;
