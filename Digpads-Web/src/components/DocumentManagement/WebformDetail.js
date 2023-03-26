import {
	Container,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Grid,
	Checkbox,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};
import { useDispatch, useSelector } from 'react-redux';
// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import Card from '@mui/material/Card';

import {
	ReactFormBuilder,
	ReactFormGenerator,
	ElementStore,
} from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import { useAlert } from 'react-alert';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';

function WebformDetail(props) {
	getCSRF();
	const { auth } = React.useContext(authContext);
	const [webform, setWebform] = useState({});
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();
	const webformId = props.id;

	useEffect(() => {
		async function getWebform() {
			try {
				let data = { webformId };
				let res = await instance.post(`edocument/getWebform`, data);
				if (res.status === 200 && res.data) {
					setWebform(res.data.webform);
					setFormData(JSON.parse(res.data.webform.content));
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
			getWebform();
		}
	}, [props.id, auth.loading, auth.authenticated]);

	return (
		<Container style={{ marginTop: '2rem' }}>
			<SuiBox mt={1} mb={20}>
				<Card sx={{ overflow: 'visible' }}>
					<Grid container justifyContent='center'>
						<Grid item xs={12} lg={12}>
							<SuiBox p={2} mt={1}>
								{ webform && webform.title }
							</SuiBox>
							<Divider />
						</Grid>
						<Grid item xs={12} lg={12}>
							<SuiBox p={2} mt={1} mb={20}>
								{formData && formData.task_data && (
									<ReactFormGenerator
										data={formData.task_data}
										//toolbarItems={items}
										//onChange={handleUpdate}
										//onSubmit={handleSubmit}
										//actionName="Set this to change the default submit button text"
										//submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
										//backButton={<a href="/" className="btn btn-default btn-cancel btn-big">Back</a>}
									
										//form_action="/path/to/form/submit"
										//form_method="POST"
										//task_id={12} // Used to submit a hidden variable with the id to the form from the database.
										//answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
										//authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
										//data={JSON_QUESTION_DATA} // Question data

										//download_path=""
										//back_action="/"
										//back_name="Back"
										//action_name="Save"
										//read_only={true}
										//variables={this.props.variables}
										hide_actions={true} 
										//display_short={true}
									/> 
								)}
							</SuiBox>
						</Grid>
						<Grid item xs={12} lg={12}>
							<SuiBox ml={2} mr={2} mt={2} mb={2}>
								<Divider />
								<SuiButton
									variant='gradient'
									color='info'
									size='small'
									style={{ fontSize: '0.75rem' }}
									onClick={() => navigate(-1)}
								>
									Back
								</SuiButton>
							</SuiBox>
						</Grid>
					</Grid>
				</Card>
			</SuiBox>
		</Container>
	);
}

export default withRouter(WebformDetail);
