const router = require('express').Router();
const jwt = require('express-jwt');
const { decodeACT } = require('../utils/jwt');
//routes
const signUp = require('./api/signUp');
const login = require('./api/login');
const verify = require('./api/verify');
const forgotPass = require('./api/forgotPass');
const resetPass = require('./api/resetPass');
const createPost = require('./api/createPost');
const sendArticle = require('./api/getArticle');
const sendPost = require('./api/getPost');
const userProfile = require('./api/userProfile');
const updateProfile = require('./api/updateProfile');
const feedPosts = require('./api/feedPost');
const addPostComment = require('./api/addPostComment');
const addProperty = require('./api/addProperty');
const getProperty = require('./api/getProperty');
const likeAndReaction = require('./api/likeAndReaction');
const saveDocument = require('./api/saveDocument');
const getDocument = require('./api/getDocument');
const presignedUrl = require('./api/presignedUrl');
const logout = require('./api/logout');
const comments = require('./api/comments');
const search = require('./api/search');
const searchProperty = require('./api/searchProperty');
const contactUs = require('./api/contactUs');
const reportContent = require('./api/reportContent');
const posts = require('./api/posts');
const checkPassword = require('./api/checkPassword');

const addSubscriber = require('./api/addSubscriber');
const getSubscribers = require('./api/getSubscribers');
const getDocuments = require('./api/getDocuments');
const popularPosts = require('./api/popularPosts');
const article = require('./api/article');
const relatedArticles = require('./api/relatedArticles');
const pageView = require('./api/pageView');
const editPostComment = require('./api/editPostComment');
const postComments = require('./api/postComments');
const editProperty = require('./api/editProperty');
const deletePostComment = require('./api/deletePostComment');
const addCommentReply = require('./api/addCommentReply');
const getCommentReply = require('./api/getCommentReply');
const articles = require('./api/articles');
const getAllArticles = require('./api/getAllArticles');
const deletePost = require('./api/deletePost');
const updatePost = require('./api/updatePost');
const favoriteCommunities = require('./api/favoriteCommunities');
const categories = require('./api/categories');
const users = require('./api/users');
const editComment = require('./api/editComment');
const getCommentsMadeByUser = require('./api/getCommentsMadeByUser');
const deleteProperty = require('./api/deleteProperty');
const reviewCollectionCampaigns = require('./api/reviewCollectionCampaigns');
const reviewCollectionForm = require('./api/reviewCollectionForm');
const reviews = require('./api/reviews');
const reviewChallenge = require('./api/reviewChallenge');
const signUpUnactivated = require('./api/signUpUnactivated');
const { addPropertyListing } = require('../controllers/property');

const utilityController = require('../controllers/utilities');
const otherCostController = require('../controllers/otherCost');
const repairAndRemodelController = require('../controllers/repairAndRemodel');
const maintenanceController = require('../controllers/maintenance');
const insuranceController = require('../controllers/insurance');
const taxController = require('../controllers/tax');
const physicalPropertyController = require('../controllers/physicalProperty');
const marketplaceProfile = require('./api/marketplaceProfiles');
const getMyMarketplaceProfile = require('./api/getMyMarketplaceProfile');
const roomController = require('../controllers/room');
const eventController = require('../controllers/event');
const fixtureController = require('../controllers/fixture');
const edocumentController = require('../controllers/edocuments');
const systemController = require('../controllers/systems');
const businessTags = require('./api/businessTags');

const saveEdocument = require('./api/saveEdocument');
const getEdocuments = require('./api/getEdocuments');
const getEdocument = require('./api/getEdocument');
const updateEdocument = require('./api/updateEdocument');

const saveTemplate = require('./api/saveTemplate');
const getTemplates = require('./api/getTemplates');
const getTemplate = require('./api/getTemplate');
const updateTemplate = require('./api/updateTemplate');
const reviewsDisplayForm = require('./api/reviewsDisplayForm');

//creates API router
//Public endpoints
//Post endpoints
router.post('/contactUs', contactUs.ctr);
router.post(
	'/signUpUnactivated',
	signUpUnactivated.validate,
	signUpUnactivated.ctr
);
router.get('/search', search.validate, search.ctr);
router.post('/searchProperty', searchProperty.ctr);
router.post('/signUp', signUp.validate, signUp.ctr);
router.post('/login', login.validate, login.ctr);
router.post('/checkPassword', checkPassword.validate, checkPassword.ctr);
router.get('/logout', logout.ctr);
router.post('/verify', verify.validate, verify.ctr);
router.post('/forgotPass', forgotPass.validate, forgotPass.ctr);
router.post('/resetPass', resetPass.validate, resetPass.ctr);
router.post('/createPost', createPost.validate, createPost.ctr);
router.post('/updateProfile', updateProfile.ctr);
router.get('/getFeedPosts', decodeACT, feedPosts.ctr);
router.get('/getProperty', getProperty.ctr);
router.post('/addPostComment', addPostComment.validate, addPostComment.ctr);
router.post('/reportContent', reportContent.validate, reportContent.ctr);
router.post('/addCommentReply', addCommentReply.validate, addCommentReply.ctr);
router.patch('/editPostComment', editPostComment.validate, editPostComment.ctr);
router.post('/editProperty', editProperty.ctr);
router.post('/addPropertyListing', addPropertyListing);
router.post('/pageView', pageView.validate, pageView.ctr);
router.get('/getCommentsMadeByUser', getCommentsMadeByUser);

router.use('/marketplaceProfiles', marketplaceProfile);
router.get('/getMyMarketplaceProfile', getMyMarketplaceProfile);
router.use('/users', users);
router.use('/reviews', reviews);
router.use('/reviewCollectionForm', reviewCollectionForm);
router.use('/businessTags', businessTags);
router.use('/reviewChallenge', reviewChallenge);
router.use('/comments', comments);

router.patch('/articles/:id/comments', editComment.validate, editComment.ctr);
router.use('/articles', articles);
router.use('/posts', posts);
router.use('/favoriteCommunities', favoriteCommunities);
router.use('/categories', categories);
router.use('/reviewCollectionCampaigns', reviewCollectionCampaigns);
router.use('/reviewsDisplayForm', reviewsDisplayForm);
router.use('/postComments', postComments);
router.use('/assign-profile', require('./api/assignProfile'));
router.use('/claim-profile', require('./api/claimProfile'));


router.patch('/editPostComment', editPostComment.validate, editPostComment.ctr);

// like and rections endpoint
router.post('/likeAndReaction', likeAndReaction.validate, likeAndReaction.ctr);
router.post(
	'/postReplyLikeAndReaction',
	likeAndReaction.validatePostReply,
	likeAndReaction.PostReplyCtr
);

router.post('/addPostComment', addPostComment.validate, addPostComment.ctr);

//Get endpoints
router.get('/csrf', require('./api/csrf'));
router.get('/getAuth', decodeACT, require('./api/getAuth'));
router.get('/getArticle', sendArticle.validate, sendArticle.ctr);
router.get('/getAllArticles', getAllArticles.ctr);
router.get('/article/knowledge', article.ctr);
router.get('/mostRecentArticles', article.fiveNewArticles);
router.get('/presignedUrl', presignedUrl.ctr);
router.get('/userProfile', userProfile.ctr);
router.get('/getPost', sendPost.validate, decodeACT, sendPost.ctr);
router.get('/popularPosts', popularPosts.ctr);
router.get('/getCommentReply', getCommentReply.ctr);
router.post('/addProperty', addProperty.ctr);
router.patch('/deletePost/:postId', decodeACT, deletePost.deleteSinglePost);
router.post('/deleteProperty', deleteProperty.ctr);
router.patch('/updatePost/:postId', decodeACT, updatePost.updateSinglePost);
// user documents
router.post('/saveDocument', saveDocument.validate, saveDocument.ctr);
router.post('/getDocument', getDocument.validate, getDocument.ctr);
router.get('/getDocuments', getDocuments.validate, getDocuments.ctr);
router.get('/relatedArticles', relatedArticles.validate, relatedArticles.ctr);

//Subscriber email
router.post('/subscribe', addSubscriber.validate, decodeACT, addSubscriber.ctr);
router.get('/getSubscribers', getSubscribers.ctr);
//Private
//Post endpoints
//Get endpoints
//middleware

router.patch('/deletePostComment/:id', deletePostComment.ctr);

// Utilites Routes
router.post('/utilities/addUtility', utilityController.addUtility);
router.get('/utilities/getUtilities', utilityController.getUtilities);
router.post('/utilities/searchUtility', utilityController.searchUtility);
router.post('/utilities/editUtility', utilityController.editUtility);
router.post('/utilities/deleteUtility', utilityController.deleteUtility);

// Systems Routes
router.get('/systems/getSystems', systemController.getSystems);
router.post('/systems/addSystem', systemController.addSystem);
router.post('/systems/editSystem', systemController.editSystem);
router.post('/systems/deleteSystem', systemController.deleteSystem);

// Other Costs Routes
router.post('/otherCosts/addCost', otherCostController.addCost);
router.get('/otherCosts/getCosts', otherCostController.getCosts);
router.post('/otherCosts/editCost', otherCostController.editCost);
router.post('/otherCosts/deleteCost', otherCostController.deleteCost);

// Repair and Remodel
router.post(
	'/rnr/addRepairAndRemodel',
	repairAndRemodelController.addReportAndRemodel
);
router.get(
	'/rnr/getRepairAndRemodels',
	repairAndRemodelController.getRepairAndRemodels
);
router.post(
	'/rnr/editRepairAndRemodels',
	repairAndRemodelController.editRepairAndRemodels
);
router.post(
	'/rnr/deleteRepairAndRemodels',
	repairAndRemodelController.deleteRepairAndRemodels
);

// Maintenance
router.post(
	'/maintenance/addMaintenance',
	maintenanceController.addMaintenance
);
router.post(
	'/maintenance/editMaintenance',
	maintenanceController.editMaintenance
);
router.get(
	'/maintenance/getMaintenances',
	maintenanceController.getMaintenances
);
router.post(
	'/maintenance/deleteMaintenance',
	maintenanceController.deleteMaintenance
);

// Insurance
router.post('/insurance/addInsurance', insuranceController.addInsurance);
router.get('/insurance/getInsurances', insuranceController.getInsurances);
router.post('/insurance/editInsurance', insuranceController.editInsurance);
router.post('/insurance/deleteInsurance', insuranceController.deleteInsurance);

// Tax
router.post('/tax/addTax', taxController.addTax);
router.get('/tax/getTaxes', taxController.getTaxes);
router.post('/tax/editTax', taxController.editTax);
router.post('/tax/deleteTax', taxController.deleteTax);

// Physical Property
router.post(
	'/physicalProperty/addPhysicalProperty',
	physicalPropertyController.addPhysicalProperty
);
router.get(
	'/physicalProperty/getPhysicalProperty',
	physicalPropertyController.getPhysicalProperty
);
router.post(
	'/physicalProperty/editPhysicalProperty',
	physicalPropertyController.editPhysicalProperty
);
router.post(
	'/physicalProperty/deletePhysicalProperty',
	physicalPropertyController.deletePhysicalProperty
);

router.post('/rooms/addRoom', roomController.addRoom);
router.post('/rooms/editRoom', roomController.editRoom);
router.post('/rooms/getRooms', roomController.getRooms);
router.post('/rooms/getAllRooms', roomController.getAllRooms);
router.post('/rooms/deleteRoom', roomController.deleteRoom);

// Fixture
router.post('/fixture/addFixture', fixtureController.addFixture);
router.post('/fixture/editFixture', fixtureController.editFixture);
router.post('/fixture/getAllFixtures', fixtureController.getAllFixtures);
router.post('/fixture/deleteFixture', fixtureController.deleteFixture);

// Events
router.get('/events/getAllEvents', eventController.getAllEvents);
router.post('/events/recordEvent', eventController.recordEvent);
router.post(
	'/events/recordConditionChangeEvent',
	eventController.recordConditionChangeEvent
);
router.post('/events/convertToRecorded', eventController.convertToRecorded);
router.post('/events/archiveEvent', eventController.archiveEvent);

// E-document
router.post('/edocument/saveRequest', saveEdocument.ctr);
router.get('/getEdocuments', getEdocuments.validate, getEdocuments.ctr);
router.post('/getEdocument', getEdocument.validate, getEdocument.ctr);
router.post('/edocument/update', updateEdocument.ctr);
router.post('/edocument/combine', edocumentController.combineDocuments);
router.post('/edocument/saveSignature', edocumentController.saveSignature);
router.post('/edocument/saveCustomField', edocumentController.saveCustomField);
router.post('/edocument/saveWebForm', edocumentController.saveWebForm);
router.get('/edocument/getWebforms', edocumentController.getWebforms);
router.post('/edocument/getWebform', edocumentController.getWebform);
router.post('/edocument/answerWebform', edocumentController.answerWebform);
router.get(
	'/edocument/getSavedSignatures',
	edocumentController.getSavedSignatures
);
router.post(
	'/edocument/removeSavedSignature',
	edocumentController.removeSavedSignature
);
router.post(
	'/edocument/processQuickSend',
	edocumentController.processQuickSend
);
// Template
router.post('/template/saveRequest', saveTemplate.ctr);
router.get('/getTemplates', getTemplates.validate, getTemplates.ctr);
router.post('/getTemplate', getTemplate.validate, getTemplate.ctr);
router.post('/template/update', updateTemplate.ctr);
router.get('/getTemplateFolders', edocumentController.getTemplateFolders);
router.post('/saveTemplateFolder', edocumentController.saveTemplateFolder);
router.post('/saveSelectTemplateFolder', edocumentController.saveSelectTemplateFolder);

//
router.post('/edocument/saveFileRequest', edocumentController.saveFileRequest);
router.post('/edocument/saveSendRequest', edocumentController.saveSendRequest);
router.post('/edocument/cancelRequest', edocumentController.cancelRequest);

module.exports = router;
