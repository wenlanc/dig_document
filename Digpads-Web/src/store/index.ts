import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { PropertiesListReducer } from 'store/reducers/Property/PropertiesListReducer';
import { UtilityListReducer } from 'store/reducers/Property/UtilityListReducer';
import { MaintenanceListReducer } from 'store/reducers/Property/MaintenanceListReducer';
import { TaxListReducer } from 'store/reducers/Property/TaxListReducer';
import { RepairListReducer } from 'store/reducers/Property/RepairListReducer';
import { InsuranceListReducer } from 'store/reducers/Property/InsuranceListReducer';
import { PhysicalPropertyListReducer } from 'store/reducers/Property/PhysicalPropertyListReducer';
import { OtherCostListReducer } from 'store/reducers/Property/OtherCostListReducer';
import { FixtureListReducer } from 'store/reducers/Property/FixtureListReducer';
import { EventListReducer } from 'store/reducers/Property/EventListReducer';
import { RoomListReducer } from 'store/reducers/Property/RoomListReducer';
import { SystemListReducer } from 'store/reducers/Property/SystemListReducer';
import signatureReducer from 'components/DocumentManagement/signatureSlice';
import selectedSignatureReducer from 'components/DocumentManagement/selectedSignatureSlice';
import savedSignaturesReducer from 'components/DocumentManagement/savedSignaturesSlice';

import campaignsReducer from 'components/ReviewsManagement/campaignsSlice';
import reviewsReducer from 'components/ReviewsManagement/reviewsSlice';
import marketplaceProfilesReducer from 'features/marketplaceProfile/marketplaceProfileSlice';
import commentsReducer from 'features/comments/commentsSlice';
import postsReducer from 'features/posts/postsSlice';

const rootReducer = combineReducers({
	PropertiesList: PropertiesListReducer,
	UtilityList: UtilityListReducer,
	MaintenanceList: MaintenanceListReducer,
	TaxList: TaxListReducer,
	RepairList: RepairListReducer,
	InsuranceList: InsuranceListReducer,
	PhysicalList: PhysicalPropertyListReducer,
	OtherCostList: OtherCostListReducer,
	FixtureList: FixtureListReducer,
	RoomList: RoomListReducer,
	EventList: EventListReducer,
	SystemList: SystemListReducer,
	signature: signatureReducer,
	selectedSignature: selectedSignatureReducer,
	savedSignatures: savedSignaturesReducer,
	campaigns: campaignsReducer,
	reviews: reviewsReducer,
	marketplaceProfiles: marketplaceProfilesReducer,
	comments: commentsReducer,
	posts: postsReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
