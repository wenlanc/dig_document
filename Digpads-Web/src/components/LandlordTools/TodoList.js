import React from 'react';
import {
	Paper,
	Typography,
	Box,
	TextField,
	InputAdornment,
	MenuItem,
	MenuList,
	ListItemIcon,
	ListItemText,
	IconButton,
	Checkbox,
} from '@mui/material';
import { ArrowForward, Delete, Edit } from '@mui/icons-material';
import styled from 'styled-components';
import Badge from './Badge';

const StyledPaper = styled(Paper)`
	margin-bottom: 64px;
	margin-left: 12px;
	margin-right: 12px;
	padding: 12px;
	border: 1px dotted #0063c8;
	border-radius: 16px;

	.PrivateSwitchBase-root-10 {
		padding: 0 4px 0 0 !important;
		height: 16px;
	}
`;

const StyledTextField = styled(TextField)`
	width: 100%;
	.MuiOutlinedInput-input {
		padding: 12px 14px;
	}
`;

const StyledBadgeContainer = styled.div`
	display: flex;
	& > *:not(:last-child) {
		margin-right: 4px;
	}
	margin-bottom: 12px;
`;

const StyledListItemIcon = styled(({ active, ...props }) => (
	<ListItemIcon {...props} />
))`
	min-width: unset;
	padding-right: 0px;
	color: ${(props) => props.active && '#0063c8'};
`;

const StyledIconButton = styled(IconButton)`
	background: #f1f1f1;
	padding: 4px;
`;

const StyledEdit = styled(Edit)`
	color: #1aae6f;
	width: 16px;
	height: 16px;
`;

const StyledDelete = styled(Delete)`
	color: #ff3709;
	width: 16px;
	height: 16px;
`;

const StyledMenuItem = styled(MenuItem)`
	padding-left: 0;
	padding-right: 0;
	.MuiTypography-body1 {
		font-size: 12px;
	}
`;

const StyledCheckbox = styled(Checkbox)`
	.MuiSvgIcon-root {
		width: 0.75em;
		height: 0.75em;
	}
`;

const Heading = styled(Typography)`
	font-weight: 700;
`;

function TodoList({
	title,
	newTodo,
	setNewTodo,
	todoList,
	setTodoList,
	status,
}) {
	const handleAdd = () => {
		if (newTodo) {
			setTodoList([...todoList, newTodo]);
			setNewTodo('');
		}
	};

	const handleDelete = (idx) => {
		const stateTodoList = todoList.filter((todo, index) => {
			return index !== idx;
		});
		setTodoList([...stateTodoList]);
	};

	return (
		<StyledPaper>
			<Heading gutterBottom component='h2' variant='h6'>
				{title}
			</Heading>
			<StyledBadgeContainer>
				{status.map(({ variant, count }, index) => (
					<div key={index}>
						<Badge variant={variant}>
							{variant + ': ' + count}
						</Badge>
					</div>
				))}
			</StyledBadgeContainer>
			<StyledTextField
				variant='outlined'
				placeholder='Enter new To-Do'
				onChange={(event) => {
					setNewTodo(event.target.value);
				}}
				value={newTodo}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position='end'
							style={{
								color: '#0063c8',
								fontWeight: 'bold',
								cursor: 'pointer',
							}}
							onClick={handleAdd}
						>
							<ArrowForward />
						</InputAdornment>
					),
				}}
			/>
			<MenuList>
				{todoList.map((todo, index) => (
					<StyledMenuItem key={index}>
						<StyledListItemIcon>
							<StyledCheckbox color='primary' defaultChecked />
						</StyledListItemIcon>
						<ListItemText style={{ fontSize: 12 }}>
							{todo}
						</ListItemText>
						<Box display='flex'>
							<StyledIconButton
								onClick={() => {
									alert('Edit todo list');
								}}
							>
								<StyledEdit />
							</StyledIconButton>
							<StyledIconButton
								onClick={() => {
									handleDelete(index);
								}}
								style={{ marginLeft: 4 }}
							>
								<StyledDelete />
							</StyledIconButton>
						</Box>
					</StyledMenuItem>
				))}
			</MenuList>
		</StyledPaper>
	);
}

export default TodoList;
