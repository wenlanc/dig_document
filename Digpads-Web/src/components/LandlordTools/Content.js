import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
} from '@mui/material';
import styled from 'styled-components';
import Overviews from './Overviews';
import Preferences from './Preferences';
import ReviewForm from './ReviewForm';
import Rented from './Rented';
import SettingsProfile from 'components/Settings/Profile';
import Footer from '../Footer';
import ReviewsManagement from '../../Views/ReviewsManagement';

// Propperties Details
import Properties from './Properties/Properties';
import Utilities from './Properties/Utilities/Utilities.jsx';
import OtherCosts from './Properties/OtherCosts/OtherCosts.jsx';
import RepairAndRemodels from './Properties/RepairAndRemodels/RepairAndRemodels';
import Maintenance from './Properties/Maintenance/Maintenance';
import Insurance from './Properties/Insurance/Insurance';
import Taxes from './Properties/Taxes/Taxes.jsx';
import PhysicalProperty from './Properties/PhysicalProperty/PhysicalProperty';
import Fixture from './Properties/Fixture/Fixture';
import RecordEvent from './Properties/Events/RecordEvent';
import Rooms from './Properties/Rooms/Rooms';
import AllEvents from './Properties/Events/AllEvents';
import { useDispatch, useSelector } from 'react-redux';
import { GetPropertiesList } from '../../store/actions/Property/propertiesAction';
import { GetUtilityList } from '../../store/actions/Property/utilityAction';
import { GetMaintenanceList } from '../../store/actions/Property/maintenanceAction';
import { GetTaxList } from '../../store/actions/Property/taxAction';
import { GetRepairList } from '../../store/actions/Property/repairAction';
import { GetInsuranceList } from '../../store/actions/Property/insuranceAction';
import { GetPhysicalList } from '../../store/actions/Property/physicalPropertyAction';
import { GetOtherCostList } from '../../store/actions/Property/otherCostAction';
import { GetAllRooms } from '../../store/actions/Property/roomAction';
import { GetAllFixtures } from '../../store/actions/Property/fixtureAction';
import { GetEventList } from '../../store/actions/Property/eventAction';

// Document Management
import DocumentsManagement from '../../Views/DocumentsManagement';
import DocumentCreateForm from '../DocumentManagement/DocumentCreateForm';
import DocumentDetail from '../DocumentManagement/DocumentDetail';
import DocumentEditForm from '../DocumentManagement/DocumentEditForm';

// Template management
import TemplatesManagement from '../../Views/TemplatesManagement';
import TemplateCreate from '../TemplatesManagement/TemplateCreate';
import TemplateDetail from '../TemplatesManagement/TemplateDetail';
import DocumentTemplateDetail from '../DocumentManagement/TemplateDetail';

//webform management
//import WebformDetail from '../DocumentManagement/WebformDetail';
//import DocumentWebformEdit from '../DocumentManagement/WebformEdit';

import Systems from './Properties/Systems/Systems';
import { GetSystemList } from 'store/actions/Property/systemAction';
import Activities from './Activities';

const Root = styled.div`
	background: #f8f9fa;
	// background-color: '#F8F9FA',

	// margin-left: 300px;
	width: 100%;
	@media screen and (max-width: 900px) {
		margin-left: 0;
	}
	overflow-x: hidden;
`;

function Content({ nontifications, ourListing }) {
	const dispatch = useDispatch();
	const [firstFlag, setFirstFlag] = React.useState(true);
	// Initiliazes all data
	const initDispatcher = () => {
		// Properties data for current user
		dispatch(GetPropertiesList());
		dispatch(GetUtilityList());
		dispatch(GetMaintenanceList());
		dispatch(GetTaxList());
		dispatch(GetRepairList());
		dispatch(GetInsuranceList());
		dispatch(GetPhysicalList());
		dispatch(GetOtherCostList());
		dispatch(GetAllRooms());
		dispatch(GetAllFixtures());
		dispatch(GetSystemList());
	};
	const eventList = useSelector((state) => state.EventList);

	useEffect(() => {
		initDispatcher();
		dispatch(GetEventList());
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		initDispatcher();
		// console.log('calling all');
		// if (!firstFlag) initDispatcher();
		// else {
		// 	setFirstFlag(false);
		// 	GetEventList();
		// }
		//eslint-disable-next-line
	}, [eventList.data]);

	const location = useLocation();

	const [passwordModal, setPasswordModal] = useState(
		process.env.NODE_ENV === 'production' ? true : false
	);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const checkPassword = () => {
		password === 'er54Gp5#1' ? setPasswordModal(false) : setPasswordError(true);
	};

	const renderForm = () => {
		return (
			<Dialog open={passwordModal} onClose={() => ''}>
				<DialogTitle>Password</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter password to access Landlord tools
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						placeholder='Password'
						type='password'
						fullWidth
						variant='standard'
						onChange={(e) => setPassword(e.target.value)}
						error={passwordError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={checkPassword}>Submit</Button>
				</DialogActions>
			</Dialog>
		);
	};
	const currentUrl = location.pathname.split('/')[2]?.toLowerCase() || '';
	return (
		<Root>
			{passwordModal ? (
				renderForm()
			) : (
				<Container
					//maxWidth='xl'
					maxWidth= {false}
					sx={{
						mt: 3,

					}}
				>
					{currentUrl === 'dashboard' && (
						<Overviews
							nontifications={nontifications}
							ourListing={ourListing}
						/>
					)}

					{currentUrl === 'preferences' && <Preferences />}
					{currentUrl === 'reviewform' && <ReviewForm />}
					{currentUrl === 'rented' && <Rented />}
					{currentUrl === 'my-profile' && <SettingsProfile />}

					{/* Activities */}
					{currentUrl === 'activities' && <Activities />}
					{currentUrl === 'activities-maintenance' && <Maintenance />}
					{currentUrl === 'activities-remodels-and-repairs' && (
						<RepairAndRemodels />
					)}

					{/* Properties */}
					{currentUrl === 'properties' && <Properties />}
					{currentUrl === 'properties-rooms' && <Rooms />}
					{currentUrl === 'properties-utilities' && <Utilities />}
					{currentUrl === 'properties-systems' && <Systems />}
					{currentUrl === 'properties-general-expenses' && <OtherCosts />}
					{currentUrl === 'properties-repair-&-remodel' && (
						<RepairAndRemodels />
					)}
					{currentUrl === 'properties-maintenance' && <Maintenance />}
					{currentUrl === 'properties-insurance' && <Insurance />}
					{currentUrl === 'properties-taxes' && <Taxes />}
					{currentUrl === 'properties-fixture-management' && <Fixture />}
					{currentUrl === 'properties-physical-property' && (
						<PhysicalProperty />
					)}

					{currentUrl === 'properties-record' && <RecordEvent />}
					{currentUrl === 'properties-all-events' && <AllEvents />}

					{/* {currentUrl === 'people' && <People />} */}
					{currentUrl === 'reviews' && <ReviewsManagement />}

					{currentUrl === 'documents' &&
						(location.pathname.split('/').length == 4 &&
						location.pathname.split('/')[3] == 'create' ? (
							<DocumentCreateForm />
						) : (
							<DocumentsManagement />
						))}

					{currentUrl === 'document-detail' && (
						<DocumentDetail id={location.pathname.split('/')[3]} />
					)}

					{currentUrl === 'document-edit' && (
						<DocumentEditForm id={location.pathname.split('/')[3]} />
					)}

					{currentUrl === 'templates' &&
						(location.pathname.split('/').length == 4 &&
						location.pathname.split('/')[3] == 'create' ? (
							<TemplateCreate />
						) : (
							<TemplatesManagement />
						))}

					{currentUrl === 'template-detail' && (
						<DocumentTemplateDetail
							isUse={false}
							id={location.pathname.split('/')[3]}
						/>
					)}
					{currentUrl === 'template-detail-use' && (
						<DocumentTemplateDetail
							isUse={true}
							id={location.pathname.split('/')[3]}
						/>
					)}
					{/* {currentUrl === 'webform-detail' && (
						<WebformDetail
							id={location.pathname.split('/')[3]}
						/>
					)} */}
				</Container>
			)}

			<Footer renderSubscribe={false} />
		</Root>
	);
}

export default Content;
