import React, { useEffect, useState, useContext, useReducer } from 'react';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import TemplatePage from './TemplatePage';
import { Grid, Box, InputLabel, Input, IconButton, Button } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

export default function TemplateDetail(props) {
	getCSRF();
	let { auth } = useContext(authContext); // auth.data.id, auth.data._id
	const [err, setError] = useState('');

	const [templateData, setTemplateData] = useState('');
	const [templateItems, setTemplateItems] = useState([]);
	const [templateDetail, dispatch] = useReducer(templateDetailReducer, []);
	let navigate = useNavigate();

	useEffect(() => {
		async function getTemplate() { 
			try {
				let data = { templateId: props.id };
				let res = await instance.post(`getTemplate`, data);
				if (res.status === 200) {
					console.log(res);
					setTemplateData(res.data);
					
					let content = JSON.parse(res.data.content);
					if (content.length && content.length > 0) {
						for(let i = 0 ; i < content.length ; i++){
							dispatch({
								type: 'APPEND_FIELD',
								payload : content[i]
							});
						}
					}

					setTemplateItems(templateDetail);

				}
			} catch (e) {
				if (!e.response) {
					console.log(e);
					return;
				}
				console.log(e.response.data);
				setError(e.response.data.error);
			}
		}
		if (!auth.loading && auth.authenticated) {
			getTemplate();
		}
	}, [props.id, auth.loading, auth.authenticated]);  // 
	
	const handleUpdateTemplate = async () => {
		try {
			let res = await instance.post(`/template/update`,  { 'fields' : JSON.stringify(templateDetail), 'template_id' : props.id, title: 'test' });	
			if (res.status === 200) {
				// Go to list of templates
				navigate('/landlord-tools/templates');
			}
		} catch (e) {
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}

	}

	if (!auth.loading && auth.authenticated ) {
		return (
			<DndProvider backend={HTML5Backend}>
			<div style={mainDivSignature}>
				<div style={left} >
					{ templateData && templateData.creator && (
					<div>
						This template was uploaded by{' '}
						{templateData.creator.first}{' '}
						{templateData.creator.last}
					</div>
					)}
				</div>
				<div id='images' style={right}>
				{ templateItems && templateItems.length > 0 && (
					<Grid direction='row' container>
						<Grid xs={12} direction='column' container item>
							<Grid container justifyContent='center'>
								<Grid item xs={1}>
									
								</Grid>
								<Grid item xs={10}>
									<TemplatePage
										fields={templateItems}
										dispatch={dispatch} >
									</TemplatePage>
								</Grid>
								<Grid item xs={1}>
									
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
				</div>
					<div id="actions" style= {{	width: '10vw',boxSizing: 'border-box',border: '1px solid' }} >

						<Box
							mb={5}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
						>
							{/* <InputLabel htmlFor='receiverEmails'>
								Emails
							</InputLabel>
							<Input
								id='receiverEmails'
								name='receiverEmails'
								variant='outlined'
								value={receiverEmails}
								onChange={( event )=> { setReceiverEmails(event.target.value) }}
							/> */}
						</Box>						

						<Button onClick={handleUpdateTemplate}>Update</Button>
					</div>
				

			</div>
			</DndProvider>
		);
	} else if (err !== '') {
		return <div>{err}</div>;
	} else {
		return <div>Loading...</div>;
	}
}

function templateDetailReducer(state, action) { 

	console.log(state)
	console.log(action)

	switch (action.type) {
		case 'ADD_FIELD': {
			delete action.type;
			action.id = state.length;
			action.property = {};
			state.push(action);
			return state;
			break;
		}
		case 'UPDATE_FIELD': {
			delete action.type;
			state[action.id].left = action.left;
			state[action.id].top = action.top;
			state[action.id].width = action.width;
			state[action.id].height = action.height;
			return state;
			break;
		}
		case 'APPEND_FIELD': {
			delete action.type;
			state.push(action.payload);
			return state;
			break;
		}
		case 'UPDATE_FIELD_PROPERTY' : {
			delete action.type;
			state[action.id].property = { ...state[action.id].property, ...action.payload };
			return state;
			break;
		}
		default: {
			break;
		}
	}
}


const mainDivSignature = {
	display: 'flex',
	width: '80vw',
	border: '1px solid',
	boxSizing: 'border-box',
};

const left = {
	width: '10vw',
	boxSizing: 'border-box',
	// border: '1px solid',
	height: 'max-content',
	position: 'sticky',
	top: '10px',
	marginLeft: '20px',
	display: 'flex',
    flexDirection: 'column'
};
const right = {
	width: '40vw',
	boxSizing: 'border-box',
	border: '1px solid',
	// height: '500px',
};
