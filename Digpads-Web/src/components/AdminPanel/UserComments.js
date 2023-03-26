import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

export default function UserComments({ comments }) {
	const [sortModel, setSortModel] = React.useState([
		{
			field: 'Date of comment',
			sort: 'asc',
		},
	]);

	const renderCellCallback = (params) => (
		<Tooltip title={params.value || ''}>
			<span>{params.value}</span>
		</Tooltip>
	);

	// create rows and columns
	const rows = comments.map((comment) => ({
		id: comment._id,
		'Article Title': comment.article?.title || 'comment',
		'Date of comment': new Date(comment.createdAt),
		Comment: comment.content,
		Replies: comments
			.filter((c) => c.parent === comment._id)
			.map((c) => c.content)
			.join(', '),
	}));

	const columns = [
		{
			field: 'Article Title',
			width: 100,
			renderCell: renderCellCallback,
		},
		{
			field: 'Date of comment',
			width: 100,
			type: 'date',
		},
		{
			field: 'Comment',
			width: 260,
			renderCell: renderCellCallback,
		},
		{
			field: 'Replies',
			width: 195,
			renderCell: renderCellCallback,
		},
	];

	return (
		<div
			style={{
				height: 400,
				display: 'flex',
				maxWidth: '800px',
				margin: '0 auto',
			}}
		>
			<div style={{ flexGrow: 1 }}>
				<DataGrid
					sx={{
						'.MuiInputBase-root': { width: '100px !important' },
						'.MuiDataGrid-virtualScroller': { overflowX: 'hidden' },
						'.MuiTablePagination-displayedRows': { margin: '0' },
						'.MuiTablePagination-selectLabel': { margin: '0' },
						backgroundColor: '#fff',
					}}
					rows={rows}
					columns={columns}
					sortModel={sortModel}
					onSortModelChange={(model) => setSortModel(model)}
				/>
			</div>
		</div>
	);
}
