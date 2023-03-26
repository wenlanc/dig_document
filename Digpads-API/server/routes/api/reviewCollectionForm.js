const express = require('express');
const router = express.Router();

const { getReviewCollectionForm, validate } = require('../../controllers/reviewCollectionCampaign');

router.get('/', validate('getReviewCollectionForm'), async (req, res) => {
	try {
		const campaignId = req.query.campaign;
		const formId = req.query.form;
		const form = await getReviewCollectionForm(campaignId, formId);

		res.status(200).send(form);
	} catch (e) {
		console.error(e);
		res.status(500).send('Error retrieving review collection form');
	}
})

module.exports = router;