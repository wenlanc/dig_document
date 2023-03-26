import React, { useEffect, useRef, useState, useContext } from 'react';

import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import SuiInput from 'components/SuiInput';
import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Switch } from '@mui/material';
import { useAlert } from 'react-alert';
import { usePapaParse } from 'react-papaparse';
import { authContext } from '../../contexts/AuthContext';
import DataTable from 'components/DataTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Divider from '@mui/material/Divider';
import SuiSelect from 'components/SuiSelect';

function FormField({ label, ...rest }) {
	return (
		<>
			<SuiBox mb={1} ml={0.5} lineHeight={0} display='inline-block'>
				<SuiTypography
					component='label'
					variant='caption'
					fontWeight='bold'
					textTransform='capitalize'
				>
					{label}
				</SuiTypography>
			</SuiBox>
			<SuiInput {...rest} />
		</>
	);
}

// typechecking props for FormField
FormField.propTypes = {
	label: PropTypes.string.isRequired,
};

export default function DocumentSigners(props) {
	const alert = useAlert();
	const csvRef = useRef();
	const [newSignerName, setNewSignerName] = useState('');
	const [newSignerEmail, setNewSignerEmail] = useState('');
	const [newSignerRole, setNewSignerRole] = useState('');
	const [newSignerPermission, setNewSignerPermission] = useState('receiver');

	const [bulkTableData, setBulkTableData] = useState([]);
	const [bulkTableHeader, setBulkTableHeader] = useState([]);

	const { readString } = usePapaParse();
	let { auth } = useContext(authContext);
	const [currentUserName, setCurrentUserName] = useState(auth.data.username);

	useEffect(() => {
		if (auth.data)
			props.setSigners([
				{
					name: auth.data.username,
					email: auth.data.email,
					role: 'Sender',
					permission: 'sender',
					status: 'Sent',
					isSender: true,
				},
			]);
	}, [auth.data]);

	useEffect(() => {
		props.setSigners((prev) =>
			{
				prev[0].name = currentUserName;
				return prev;
			}
		);
	}, [currentUserName]);

	function checkIfEmailInString(text) {
		var re =
			/(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
		return re.test(text);
	}

	const checkExist = (item) => {
		for (let i = 0; i < props.signers.length; i++) {
			if (
				props.signers[i].email == item.email ||
				props.signers[i].role == item.role
			)
				return true;
		}
		return false;
	};

	const quickSend = () => {
		if (props.signers && props.signers.length > 1) {
			props.handleQuickSend();
		} else {
			alert.success('Please add signers.');
		}
	};

	const addSigner = () => {
		if (props.isBulkSend) {
			if (!newSignerRole) return;
			if (!checkExist({ role: newSignerRole })) {
				props.setSigners((prev) =>
					prev.concat({
						name: 'Bulk Send Recipient Name',
						email: 'Bulk Send Recipient Email',
						role: newSignerRole,
						permission: newSignerPermission,
					})
				);
				setNewSignerEmail('');
				setNewSignerName('');
				setNewSignerRole('');
				setNewSignerPermission('receiver');
			} else {
				alert.error('Please be correct with new signer.');
			}
		} else {
			if (!newSignerEmail || !newSignerName || !newSignerRole) return;

			if (
				checkIfEmailInString(newSignerEmail) &&
				!checkExist({
					name: newSignerName,
					email: newSignerEmail,
					role: newSignerRole,
					permission: newSignerPermission,
				})
			) {
				props.setSigners((prev) =>
					prev.concat({
						name: newSignerName,
						email: newSignerEmail,
						role: newSignerRole,
						permission: newSignerPermission,
					})
				);
				setNewSignerEmail('');
				setNewSignerName('');
				setNewSignerRole('');
				setNewSignerPermission('receiver');
			} else {
				alert.error('Please be correct with new signer.');
			}
		}
	};

	const downloadSampleFile = (e) => {
		//e.preventDefault()
		// Headers for each column
		let headers = [];
		for (let i = 0; i < props.signers.length; i++) {
			if (props.signers[i].role != 'Sender') {
				headers.push(props.signers[i].role + '_Email');
				headers.push(props.signers[i].role + '_Name');
			}
		}

		// Convert users data to a csv
		// let usersCsv = props.signers.reduce((signerData, signer, index) => {
		//   const { name, email } = signer
		//   signerData.push([' ',' '].join(','))
		//   return signerData
		// }, [])

		downloadFile({
			data: [headers.join(',')].join('\n'),
			fileName: 'sample.csv',
			fileType: 'text/csv',
		});
	};

	const downloadFile = ({ data, fileName, fileType }) => {
		const blob = new Blob([data], { type: fileType });
		const a = document.createElement('a');
		a.download = fileName;
		a.href = window.URL.createObjectURL(blob);
		const clickEvt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		a.dispatchEvent(clickEvt);
		a.remove();
	};

	const grid = 5;
	const getListStyle = (isDraggingOver) => ({
		background: isDraggingOver ? 'lightblue' : 'transparent',
		//padding: grid,
		//width: 250
	});

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		//padding: grid * 2,
		//margin: `0 0 ${grid}px 0`,
		marginTop: '0px',
		// change background colour if dragging
		background: isDragging ? 'lightgreen' : 'transparent',

		// styles we need to apply on draggables
		...draggableStyle,
	});

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	return (
		<SuiBox>
			<SuiTypography variant='h5'>Signers</SuiTypography>

			<Grid container spacing={3} mt={0}>
				<Grid item xs={12} sm={8} textAlign={'end'}>
					<SuiBox display='flex' mt={-1} alignItems='end' alignContent={'end'}>
						<SuiBox>
							<Switch
								checked={props.isBulkSend}
								onChange={(event) => {
									props.setIsBulkSend(event.target.checked);
								}}
							/>
						</SuiBox>
						<SuiBox ml={1}>
							<SuiTypography variant='button' fontWeight='regular' color='text'>
								Bulk Send
							</SuiTypography>
						</SuiBox>

						{props.isBulkSend && (
							<>
								<SuiBox ml={4}>
									<SuiButton
										size='small'
										variant='outlined'
										color='secondary'
										onClick={() => {
											downloadSampleFile();
										}}
									>
										Download Sample CSV file
									</SuiButton>
								</SuiBox>
								<SuiBox ml={4}>
									<input
										name='bulkListFile'
										ref={csvRef}
										onChange={(e) => {
											const [file] = e.target.files;
											const fileReader = new FileReader();
											fileReader.onload = function (event) {
												const csvOutput = event.target.result;
												readString(csvOutput, {
													worker: true,
													header: true,
													complete: (results) => {
														console.log('---------------------------');
														console.log(results);
														console.log('---------------------------');
														let bulkSigners = [];
														if (results.data && results.data.length > 0) {
															// const rows = results.data;
															// let cols = rows.splice(0, 1)[0];
															// setBulkTableHeader(cols);
															// const result = rows.map((row) => {
															// 	return row.reduce((res, val, idx) => {
															// 		const prop = cols[idx];
															// 		res[prop] = val;
															// 		return res;
															// 	}, {});
															// });
															// console.log(result)
															// setBulkTableData(result);

															setBulkTableHeader(results.meta.fields);
															setBulkTableData(results.data);

															for (let i = 0; i < results.data.length; i++) {
																let bulkItem = [
																	{
																		name: auth.data.username,
																		email: auth.data.email,
																		role: 'Sender',
																		status: 'Sent',
																		isSender: true,
																	},
																];
																let item = results.data[i];
																let itemKeys = Object.keys(item);
																for (let j = 0; j < itemKeys.length; j += 2) {
																	let role = itemKeys[j].split('_Email')[0];
																	let email = item[itemKeys[j]];
																	let name = item[itemKeys[j + 1]];
																	bulkItem.push({ role, name, email });
																}
																bulkSigners.push(bulkItem);
															}
															props.setBulkSenderData(bulkSigners);
														}
													},
													skipEmptyLines: true,
												});
											};
											fileReader.readAsText(file);
										}}
										type='file'
										id='bulkListFile'
										hidden
										multiple={false}
										accept={'.csv'}
									/>
									<SuiButton
										size='small'
										variant='outlined'
										color='success'
										onClick={() => {
											csvRef.current.click();
										}}
									>
										Import Bulk List
									</SuiButton>
								</SuiBox>
							</>
						)}
					</SuiBox>
				</Grid>
				<Grid item display='flex' xs={12} sm={4} textAlign={'end'}>
					<SuiBox>
						<Switch
							checked={props.isSetSignerOrder}
							onChange={(event) => {
								props.setIsSetSignerOrder(event.target.checked);
							}}
						/>
					</SuiBox>
					<SuiBox pl={1} pr={2}>
						<SuiTypography variant='button' fontWeight='regular' color='text'>
							Set singer order
						</SuiTypography>
					</SuiBox>

					{!props.isBulkSend && (
						<SuiButton
							variant='gradient'
							color='info'
							onClick={() => {
								quickSend();
							}}
						>
							{'Quick Send'}
						</SuiButton>
					)}
				</Grid>
			</Grid>

			<SuiBox mt={1} p={3}>
				<Grid container spacing={3}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={0.5}></Grid>
						<Grid item xs={12} sm={3}>
							<FormField
								type='text'
								label='name'
								placeholder=''
								//disabled
								onChange={(event) => setCurrentUserName(event.target.value)}
								value={currentUserName}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<FormField
								type='text'
								label='email'
								placeholder=''
								disabled
								value={auth.data.email}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<FormField
								type='text'
								label='role'
								placeholder=''
								disabled
								value={'Sender'}
							/>
						</Grid><Grid item xs={12} sm={2}>
							<FormField
								type='text'
								label='permission'
								placeholder=''
								disabled
								value={'Sender'}
							/>
						</Grid>
						<Grid
							item
							style={{
								display: 'flex',
								paddingTop: '48px',
								alignItems: 'center',
							}}
							xs={12}
							sm={1.5}
						>
							<span></span>
						</Grid>
					</Grid>
					<Grid container>
						<DragDropContext
							onDragEnd={(result) => {
								if (!result.destination) {
									return;
								}
								const items = reorder(
									props.signers,
									result.source.index,
									result.destination.index
								);
								props.setSigners(items);
							}}
						>
							<Droppable droppableId='droppable'>
								{(provided, snapshot) => (
									<Grid
										container
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{props.signers.map((signer, index) =>
											signer.isSender ? null : (
												<Draggable
													key={index}
													draggableId={index + '_'}
													index={index}
													isDragDisabled={!props.isSetSignerOrder}
												>
													{(provided, snapshot) => (
														<Grid
															container
															spacing={2}
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<Grid item xs={12} sm={0.5} textAlign={'end'} marginTop={'auto'}>{index}</Grid>
															<Grid item xs={12} sm={3}>
																{!props.isBulkSend ? (
																	<FormField
																		type='text'
																		value={signer.name}
																		label={'name '}
																		placeholder=''
																	/>
																) : (
																	<FormField
																		type='text'
																		value={'Bulk Send Receipient Name ' + index}
																		label='name'
																		placeholder=''
																	/>
																)}
															</Grid>
															<Grid item xs={12} sm={3}>
																{!props.isBulkSend ? (
																	<FormField
																		type='text'
																		value={signer.email}
																		label={'email '}
																		placeholder=''
																	/>
																) : (
																	<FormField
																		type='text'
																		value={
																			'Bulk Send Receipient Email ' + index
																		}
																		label='email'
																		placeholder=''
																	/>
																)}
															</Grid>
															<Grid item xs={12} sm={2}>
																<FormField
																	type='text'
																	label={'role '}
																	placeholder=''
																	value={signer.role}
																/>
															</Grid>
															<Grid item xs={12} sm={2}>
																<FormField
																	type='text'
																	label={'permission '}
																	placeholder=''
																	value={signer.permission}
																/>
															</Grid>
															<Grid item mt={3} xs={12} sm={1.5}>
																<IconButton
																	color='primary'
																	component='span'
																	variant='gradient'
																	onClick={() => {
																		props.setSigners((prev) =>
																			prev.filter((item) => item != signer)
																		);
																	}}
																>
																	<RemoveCircleOutlineIcon />
																</IconButton>
															</Grid>
														</Grid>
													)}
												</Draggable>
											)
										)}
										{provided.placeholder}
									</Grid>
								)}
							</Droppable>
						</DragDropContext>
					</Grid>
					<Grid container spacing={2} mt={1} >
						<Grid item xs={12} sm={0.5}></Grid>
						<Grid item xs={12} sm={3}>
							{props.isBulkSend ? (
								<FormField
									type='text'
									value={'Bulk Send Recipient Name'}
									disabled
									label='name'
									placeholder=''
								/>
							) : (
								<FormField
									type='text'
									value={newSignerName}
									onChange={(event) => setNewSignerName(event.target.value)}
									label='name'
									placeholder=''
								/>
							)}
						</Grid>
						<Grid item xs={12} sm={3}>
							{props.isBulkSend ? (
								<FormField
									type='text'
									value={'Bulk Send Recipient Email'}
									disabled
									label='email'
									placeholder=''
								/>
							) : (
								<FormField
									type='text'
									value={newSignerEmail}
									onChange={(event) => setNewSignerEmail(event.target.value)}
									label='email'
									placeholder=''
								/>
							)}
						</Grid>
						<Grid item xs={12} sm={2}>
							<FormField
								type='text'
								value={newSignerRole}
								onChange={(event) => setNewSignerRole(event.target.value)}
								label='role'
								placeholder=''
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<SuiBox mb={1} ml={0.5} lineHeight={0} display='inline-block'>
								<SuiTypography
									component='label'
									variant='caption'
									fontWeight='bold'
									textTransform='capitalize'
								>
									{'Permission'}
								</SuiTypography>
							</SuiBox>
							<SuiSelect
								//value={newSignerPermission}
								defaultValue={{
									value: 'receiver',
									label: 'Receiver',
								}}
								onChange={(item) => {
									setNewSignerPermission(item.value);
								}}
								options={[
									{
										value: 'receiver', label:'Receiver'
									},
									{
										value: 'collaborator', label:'Collaborator'
									}
								]}
							/>
						</Grid>
						<Grid item mt={3} xs={12} sm={1.5}>
							<IconButton
								color='info'
								component='span'
								variant='gradient'
								onClick={addSigner}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</SuiBox>

			{props.isBulkSend && bulkTableData && bulkTableData.length > 0 && (
				<SuiBox mt={1} p={3}>
					<SuiTypography variant='h6'>Bulk Sender List</SuiTypography>
					<SuiBox display={'flex'}>
						<DataTable
							canSearch={true}
							table={{
								columns: bulkTableHeader.map((item) => ({
									Header: item,
									accessor: item,
								})),
								rows: bulkTableData,
							}}
							title={'Bulk Sender List'}
						/>
					</SuiBox>
				</SuiBox>
			)}
		</SuiBox>
	);
}
