import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import TodoList from './TodoList';
import OurVisitors from './OurVisitors';

const Root = styled.div`
	background: #fff;
	height: 100%;
	max-width: 300px;
	width: 100%;
	background: #fff;
	box-shadow: 0.125rem 0 0.25rem rgba(0, 0, 0, 0.075);
	overflow-y: auto;
	position: fixed;
	left: 0;
	top: 100px;
`;

function Sidebar({
	landlordToolsSidebar,
	status,
	visitors,
	todoLists,
	toggleDrawer = () => {},
}) {
	const [newTodo, setNewTodo] = useState('');
	const [todoList, setTodoList] = useState(todoLists);

	return (
		<Root>
			<Menu
				landlordToolsSidebar={landlordToolsSidebar}
				toggleDrawer={toggleDrawer}
			/>
			<TodoList
				title='Todo List'
				todoList={todoList}
				setTodoList={setTodoList}
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				status={status}
			/>
			<OurVisitors
				title='Our Visitors'
				description='Different devices used to visit'
				visitors={visitors}
			/>
			<div style={{ height: 64 }} />
		</Root>
	);
}

export default Sidebar;
