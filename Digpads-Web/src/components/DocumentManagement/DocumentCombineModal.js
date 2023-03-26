import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { PostCombineDocuments } from '../../store/actions/Document/combineAction';
import { useDispatch } from 'react-redux';
import { modalStyles } from '../styled/Modal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
  //position:'static!important',
  top: 'auto !important',
  left: 'auto !important'
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '100%',
  height:'100%'
});

const DocumentCombineModal = ({
	data,
	setData,
	title,
	open,
	onClose,
	handleClose,
}) => {
	const [loading, setLoading] = useState(false);
	const [docs, setDocs] = useState([]);
	const dispatch = useDispatch();
	
	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));

	const classes = useStyles();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		//await setTimeout(() => {}, 5000);
		e.preventDefault();
		await dispatch(PostCombineDocuments(docs));
		setLoading(false);

		// await getCSRF();
		// if (title === 'Add') {
		// 	instance
		// 		.post('addProperty', {
		// 			...data,
		// 			images: images,
		// 		})
		// 		.then((response) => {
		// 			console.log('success');
		// 		});
		// } else {
		// 	instance
		// 		.post('editProperty', {
		// 			...data,
		// 			images: images,
		// 		})
		// 		.then((response) => {
		// 			console.log('success');
		// 		});
		// }

		// handleAdd([]);
		handleClose();
	};

	useEffect(() => {
		console.log(data);
	}, [open]);

	useEffect(() => {
		setDocs(data);
	}, [data]);


	function onDragEnd(result) {
		const { source, destination } = result;
		// dropped outside the list
		if (!destination) {
		  	return;
		}
		const items = reorder(docs, source.index, destination.index);
		setDocs(items);
	}

	return (
		<Modal
			open={open}
			onClose={() => {
				onClose();
			}}
		>
			<Box className={classes.modal} sx={modalStyles}>
				<form onSubmit={handleSubmit} style={{ position: 'relative'}}>
					<Box display='flex' justifyContent='space-between'>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							{title}
						</Typography>
						<div onClick={onClose}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Typography sx={{ mt: 2 }} key={true}>
						<Grid container spacing={2} mt={1}>
							<Grid item xs={12} md={12}>
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable droppableId="droppable">
									{(provided, snapshot) => (
										<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
										{...provided.droppableProps}
										>
										{docs.map((item, index) => (
											<Draggable
											key={item._id}
											draggableId={item._id}
											index={index}
											>
											{(provided, snapshot) => (
												<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style
												)}
												>
												<div
													style={{
													//display: "flex",
													//justifyContent: "space-around"
													}}
												>
													{item.title}
													<button
													type="button"
													onClick={() => {
														const newDocs = [...docs];
														newDocs.splice(index, 1);
														setDocs(
															newDocs  //.filter(group => group.length)
														);
													}}
													>
													delete
													</button>
												</div>
												</div>
											)}
											</Draggable>
										))}
										{provided.placeholder}
										</div>
									)}
									</Droppable>
								</DragDropContext>
							</Grid>
						</Grid>
					</Typography>

					<LoadingButton
						variant='contained'
						style={{
							marginBottom: 16,
							paddingLeft: 16,
							paddingRight: 16,
							minWidth: 160,
							textAlign: 'center',
						}}
						type='submit'
						onClick={handleSubmit}
						disabled={docs.length < 2}
					>
						Combine
					</LoadingButton>
					
				</form>

			</Box>
		</Modal>
	);
};

export default DocumentCombineModal;
