import React from 'react';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { green } from '@mui/material/colors';

const StyledTable = styled.table`
	text-align: center;
	border-collapse: collapse;

	tbody {
		border-left: 2px solid #b8b8b8;
	}

	.table-title {
		background-color: #008f00;
		color: white;
		text-align: left;
		padding: 0.8em;
		border-top-left-radius: 10px;
	}

	th,
	td {
		border-bottom: 1px solid #b8b8b8;
		border-right: 1px solid #b8b8b8;
	}

	thead th {
		background-color: #7a7a7a;
	}

	thead th:last-child {
		border-top-right-radius: 10px;
	}

	thead img {
		width: 95%;
	}

	tbody th {
		background-color: #f8fff8;
	}

	tbody tr:last-child th {
		border-bottom-left-radius: 10px;
	}

	tbody td {
		background-color: #fff;
	}

	.row-header {
		width: 160px;
		padding: 0.5em;
		text-align: left;
	}

	.cell {
		width: 100px;
		height: 57px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.currency {
		font-weight: bold;
		color: ${(props) => props.theme.primaryColor};
	}
`;

export default function ServicesList(props) {
	const { services } = props;

	const rows = [];
	createRows();

	function createRows() {
		tableHeaders.forEach((header) => {
			rows.push({ header: header });
		});

		rows.forEach((row) => {
			row.data = [];

			services.forEach((service) => {
				row.data.push(service.data[row.header]);
			});
		});
	}

	return (
		<div style={{ overflowX: 'scroll' }}>
			<StyledTable>
				<thead>
					<tr>
						<th className='table-title'>Tenant Background Check Services</th>
						{services.map((service) => (
							<th scope='col' key={service.logo}>
								{service.logoCaption ? (
									<div
										style={{
											background: 'linear-gradient(#0969c1, #042a4e)',
											padding: '5px 0',
										}}
									>
										<img
											style={{ width: '30px' }}
											src={service.logo}
											title={service.name}
											className='company-logo'
										/>
										<label
											style={{
												display: 'block',
												color: '#f2f0f0',
												fontSize: '0.7rem',
											}}
										>
											{service.logoCaption}
										</label>
									</div>
								) : (
									<img
										src={service.logoReverse || service.logo}
										title={service.name}
										className='company-logo'
									/>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.header}>
							<th>
								<div className='row-header'>{row.header}</div>
							</th>
							{Object.values(row.data).map((d, i) => (
								<td key={i}>
									<div className='cell'>
										{d === 'Y' ? (
											<CheckIcon style={{ color: green[500] }} />
										) : isNaN(d) ? (
											<ClearIcon color='error' />
										) : (
											<div className='currency'>
												{new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
												}).format(d)}
											</div>
										)}
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</StyledTable>
		</div>
	);
}

const tableHeaders = [
	'Basic Package Cost',
	'Criminal Background',
	'Credit Report',
	'Credit Score',
	'Bankruptcy',
	'Eviction',
	'Eviction All 50 States',
	'Instant Reports',
	'Tenant Verification',
	'Landlord/Tenant Pay Options',
	'SSN Verification',
	'Address History',
	'County Level Screening',
	'Judgments/Liens',
	'Sex Offender',
	'Terrorist/Homeland Security',
];
