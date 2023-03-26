import React, { useEffect, useState, useContext, useReducer } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TemplateDraggableBox from './TemplateDraggableBox';
import TemplatePage from './TemplatePage';

import { Document, Page, pdfjs } from 'react-pdf';
import { Grid, Box, InputLabel, Input, IconButton, Button } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function TemplateSignPad(props) {

	getCSRF();
	let { auth } = useContext(authContext);
	let navigate = useNavigate();
	const [template, dispatch] = useReducer(templateReducer, []);

	const handleCreateTemplate = async () => {
		console.log(template);
		try {
			
			let res = await instance.post(`/template/saveRequest`, { title: "test", fields : JSON.stringify(template)});	
			if (res.status === 200) {
				console.log(res);
				// Go to list of documents
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

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={mainDivSignature}>
				<div style={left} id='leftsidebar'>
					<div style={{ position : 'relative', display: 'flex', height: '30px'}}>
						<TemplateDraggableBox type='field' element_type="label" title='Label' width={100} height={30} />
					</div>
					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<TemplateDraggableBox type='field' element_type="text" title='Text' width={100} height={30} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<TemplateDraggableBox type='field' element_type="signature" title='Signature' width={100} height={50} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<TemplateDraggableBox type='field' element_type="date" title='Date' width={100} height={30} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<TemplateDraggableBox type='field' element_type="image" title='Image' width={100} height={50} />
					</div>
					
				</div>

				<div id='images' style={right}>
					<Grid direction='row' container>
						<Grid xs={12} direction='column' container item>
							<Grid container justifyContent='center'>
								<Grid item xs={1}>
									
								</Grid>
								<Grid item xs={10}>
									<TemplatePage
										fields={template}
										dispatch={dispatch} >
									</TemplatePage>
								</Grid>
								<Grid item xs={1}>
									
								</Grid>
							</Grid>
						</Grid>
					</Grid> 
				</div>
				<div id="actions" style= {{	width: '10vw',boxSizing: 'border-box',border: '1px solid' }} >
					<Box
						mb={5}
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
					</Box>						

					<Button onClick={handleCreateTemplate}>Create Template</Button>
				</div>							
			</div>
		</DndProvider>
	);
}


function templateReducer(state, action) { 
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
			state.push(action);
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
