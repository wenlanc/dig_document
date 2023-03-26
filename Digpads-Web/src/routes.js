import React, { lazy } from 'react';

import PrivateRoute from './components/PrivateRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
const CreatePost = lazy(() => import('./Views/posts/CreatePost'));
const ResetPass = lazy(() => import('./Views/ResetPass'));
const Post = lazy(() => import('./Views/posts/Post'));
const Verify = lazy(() => import('./Views/Verify'));
const ArticleNotFound = lazy(() => import('./Views/ArticleNotFound'));
const ArticleContainer = lazy(() => import('./Views/article/ArticleContainer'));
const Profile = lazy(() => import('./Views/user/Profile'));
const GetDocument = lazy(() => import('./Views/document/GetDocument'));
const ChartsPage = lazy(() => import('./Views/charts/index'));
const DocumentUpload = lazy(() => import('./Views/DocumentUploadHandler'));
const Page404 = lazy(() => import('./Views/404Page'));
const Signature = lazy(() => import('./components/Signature'));
const AdvertisingAndAffiliates = lazy(() =>
	import('./components/AdvertisingAndAffiliates')
);
const ContactUs = lazy(() => import('./Views/ContactUs'));
const PrivacyPolicy = lazy(() => import('./components/Auth/PrivacyPolicy'));
const ForumCommentsPoliciesAndRules = lazy(() =>
	import('./components/Auth/ForumCommentsPoliciesAndRules')
);
const TermsOfService = lazy(() => import('./components/Auth/TermsOfService'));
const FAQ = lazy(() => import('./Views/FAQ'));
const AllPostsList = lazy(() => import('./Views/posts/AllPostsList'));
const AllArticlesList = lazy(() => import('./Views/article/AllArticlesList'));
const TenantScreening = lazy(() =>
	import('./Views/service-guides/TenantScreening')
);
const VSdesign = lazy(() => import('./Views/VSdesign'));
const KnowledgePage = lazy(() => import('./Views/Knowledge'));
const UserDashboard = lazy(() => import('./Views/UserDashboard'));
const ServiceGuides = lazy(() => import('./Views/ServiceGuides'));
const HomePage = lazy(() => import('./Views/Home'));
const DocumentList = lazy(() => import('./Views/DocumentList'));
const ValuesAndMission = lazy(() => import('./components/ValuesAndMission'));
const AboutUs = lazy(() => import('./Views/AboutUs'));
const Settings = lazy(() => import('./Views/Settings'));
const SettingsProfile = lazy(() => import('./components/Settings/Profile'));
const Partnerships = lazy(() => import('./Views/Partnerships'));
const SearchPage = lazy(() => import('./components/SearchPage'));
const LandLordTools = lazy(() => import('./Views/SuiLandlordTools'));
const RentIncomeChart = lazy(() => import('./Views/charts/Charts'));
const HardMoneyCalculator = lazy(() =>
	import('./Views/charts/HardMoneyCalculator')
);
const TurnOverCalculator = lazy(() =>
	import('./Views/charts/TurnOverCalculator')
);
const MortgageExpenseCalculator = lazy(() =>
	import('./Views/charts/MortgageExpenseCalculator')
);
const MatchMe = lazy(() => import('./Views/MatchMe'));
const Tenant = lazy(() => import('./Views/Tenant'));
const Landlord = lazy(() => import('./Views/Landlord'));
const Landlords = lazy(() => import('./Views/marketplace/Landlords'));
const LandlordContractors = lazy(() =>
	import('./Views/marketplace/LandlordContractors')
);
const Tenants = lazy(() => import('./Views/marketplace/Tenants'));
const Contractors = lazy(() => import('./Views/marketplace/Contractors'));
const Contractor = lazy(() => import('./Views/Contractor'));
const LandlordContractor = lazy(() => import('./Views/Landlord&Contractor'));
const ClaimProfile = lazy(() => import('./Views/marketplace/ClaimProfile'));
const ReviewsManagement = lazy(() => import('./Views/ReviewsManagement'));
const Admin = lazy(() => import('./components/AdminPanel/Admin'));
const Users = lazy(() => import('./components/AdminPanel/users/Users'));
const Profiles = lazy(() =>
	import('./components/AdminPanel/profiles/Profiles')
);
const Content = lazy(() => import('./components/AdminPanel/content'));
const Campaigns = lazy(() => import('./components/AdminPanel/campaigns'));
const Reviews = lazy(() => import('./components/AdminPanel/reviews'));
const Downloads = lazy(() => import('./components/AdminPanel/downloads'));
const Marketplace = lazy(() => import('./Views/marketplace/Marketplace'));
const AddReviewChallengeInfo = lazy(() =>
	import('./components/AddReviewChallengeInfo')
);
const EditUserProfile = lazy(() =>
	import('./components/Settings/Profile/EditUserProfile')
);
import ReviewsDisplayForm from './components/ReviewsManagement/UseReviews/ReviewsDisplayForm';
// const ReviewsDisplayForm = lazy(() =>
// 	import('./components/ReviewsManagement/UseReviews/ReviewsDisplayForm')
// );
const CollectReviewForm = lazy(() =>
	import('./components/ReviewsManagement/CollectReviewForm')
);

const routes = [
	{ path: '/', component: HomePage },
	{ path: '/reset-pass/:token', component: ResetPass },
	{ path: '/landlordforum', component: UserDashboard },
	{ path: '/post/:slug', component: Post },
	{ path: '/404-not-found', component: ArticleNotFound },
	{ path: '/create-post', component: CreatePost },
	{ path: '/verify/:token', component: Verify },
	{ path: '/article/:slug', component: ArticleContainer },
	{ path: '/signature', component: Signature },
	{ path: '/advertisingAndAffiliates', component: AdvertisingAndAffiliates },
	{ path: '/partnerships', component: Partnerships },
	{ path: '/faq', component: FAQ },
	{ path: '/search', component: SearchPage },
	{ path: '/sign-document/:token', component: GetDocument },
	{ path: '/knowledge/:category/:subcategory', component: KnowledgePage },
	{ path: '/knowledge/:category', component: KnowledgePage },
	{ path: '/knowledge', component: KnowledgePage },
	{ path: '/privacyPolicy', component: PrivacyPolicy },
	{
		path: '/forumCommentsPoliciesAndRules',
		component: ForumCommentsPoliciesAndRules,
	},
	{ path: '/documentList', component: DocumentList },
	{ path: '/valuesMission', component: ValuesAndMission },
	{ path: '/documentupload', component: DocumentUpload },
	{ path: '/calculators/rentIncome', component: RentIncomeChart },
	{ path: '/calculators', component: ChartsPage },
	{
		path: '/calculators/hard-money-calculator',
		component: HardMoneyCalculator,
	},
	{
		path: '/calculators/turn-over-calculator',
		component: TurnOverCalculator,
	},
	{
		path: '/calculators/mortgage-calculator',
		component: MortgageExpenseCalculator,
	},
	{ path: '/aboutUs', component: AboutUs },
	{ path: '/not-found', component: Page404 },
	{ path: '/contactUs', component: ContactUs },
	{ path: '/termsOfService', component: TermsOfService },
	{ path: '/map/postlist', component: AllPostsList },
	{ path: '/map/articlelist', component: AllArticlesList },
	{ path: '/settings', component: Settings },
	{ path: '/serviceGuides', component: ServiceGuides },
	{ path: '/serviceGuides/tenant-screening', component: TenantScreening },
	{ path: '/match-me/tenant-screening', component: MatchMe },
	{ path: '/templates/guides/vsdesign', component: VSdesign },
	{ path: '/reviewsDisplayForm', component: ReviewsDisplayForm },
	{ path: '/claim-profile/:profileId', component: ClaimProfile },
];

const adminRoutes = [
	{
		name: 'Users',
		path: 'users',
		component: Users,
	},
	{
		name: 'Profiles',
		path: 'profiles',
		component: Profiles,
	},
	{
		name: 'Content',
		path: 'content',
		component: Content,
	},
	{
		name: 'Campaigns',
		path: 'campaigns',
		component: Campaigns,
	},
	{
		name: 'Reviews',
		path: 'reviews',
		component: Reviews,
	},
	{
		name: 'Downloads',
		path: 'downloads',
		component: Downloads,
	},
];

const softUIThemedRoutes = [
	{
		name: 'Admin panel',
		path: '/admin',
		component: Admin,
		children: adminRoutes,
	},
	{ path: '/settings/edit-profile/:user', component: EditUserProfile },
	{ path: '/settings/profile', component: SettingsProfile },
	{ path: '/landlord-tools', component: LandLordTools, private: true },
	{
		path: '/landlord-tools/reviews',
		component: LandLordTools,
		private: true,
	},
	{ path: '/landlord-tools/dashboard', component: LandLordTools },
	{ path: '/landlord-tools/preferences', component: LandLordTools },
	{ path: '/landlord-tools/reviewform', component: LandLordTools },
	{ path: '/landlord-tools/rented', component: LandLordTools },
	{ path: '/landlord-tools/contractors', component: LandLordTools },
	{ path: '/landlord-tools/legal', component: LandLordTools },
	{ path: '/landlord-tools/my-profile', component: LandLordTools },
	{ path: '/landlord-tools/finance', component: LandLordTools },
	{ path: '/landlord-tools/active-rentals', component: LandLordTools },
	{ path: '/landlord-tools/activities', component: LandLordTools },
	{
		path: '/landlord-tools/activities-maintenance',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/activities-repair-&-remodel',
		// path: '/landlord-tools/activities-remodels-and-repairs',
		component: LandLordTools,
	},
	{ path: '/landlord-tools/properties', component: LandLordTools },
	{
		path: '/landlord-tools/properties-rooms',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-utilities',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-general-expenses',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-systems',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-repairs',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-maintenance',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-insurance',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-taxes',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-fixture-management',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-physical-property',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-record',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-all-events',
		component: LandLordTools,
	},
	{
		path: '/landlord-tools/properties-repair-&-remodel',
		component: LandLordTools,
	},
	{
		path: '/marketplace',
		component: Marketplace,
		children: [
			{ path: 'landlords', component: Landlords },
			{ path: 'contractors', component: Contractors },
			{ path: 'landlord-contractors', component: LandlordContractors },
			{ path: 'tenants', component: Tenants },
			{ path: 'landlords/:userId', component: Landlord },
			{ path: 'contractors/:userId', component: Contractor },
			{
				path: 'landlord-contractors/:userId',
				component: LandlordContractor,
			},
			{ path: 'tenants/:userId', component: Tenant },
		],
	},

	{ path: '/landlord-tools/people', component: LandLordTools },
	{ path: '/reviews-management', component: ReviewsManagement },
	{ path: '/reviewChallenge/:id/add_info', component: AddReviewChallengeInfo },
	{ path: '/collect-review', component: CollectReviewForm },

	{ path: '/landlord-tools/documents', component: LandLordTools },
	{ path: '/landlord-tools/document-detail/:id', component: LandLordTools },
	{ path: '/landlord-tools/document-edit/:id', component: LandLordTools },
	{ path: '/landlord-tools/documents/create', component: LandLordTools },
	{ path: '/landlord-tools/templates', component: LandLordTools },
	{ path: '/landlord-tools/template-detail/:id', component: LandLordTools },
	{
		path: '/landlord-tools/template-detail-use/:id',
		component: LandLordTools,
	},
	{ path: '/landlord-tools/templates/create', component: LandLordTools },
	{ path: '/landlord-tools/webform-detail/:id', component: LandLordTools },
	{ path: '/landlord-tools/webform-edit/:id', component: LandLordTools },
	{ path: '/landlord-tools/webform-delete/:id', component: LandLordTools },
];

export { routes, softUIThemedRoutes, adminRoutes };
const allRoutes = routes.concat(softUIThemedRoutes);
export default allRoutes;
