const campaignController = require('../../controllers/reviewCollectionCampaign');

const ctr = async (req, res, next) => {
	try {
		const campaign = req.params.campaign;
		const form = await campaignController.getReviewCollectionForm(campaign);

		res.status(200).send(form);
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = ctr;
