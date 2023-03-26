const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

router.get('/', async (req, res) => {
	const filter = {};
	let parentCategory = {};
	if (req.query.category) {
		parentCategory = await Category.find({ categoryName: req.query.category });
		filter.parentCategory = parentCategory;
	}

	try {
		let categories = await Category.find(filter, 'categoryName parentCategory', {
			lean: true,
		}).populate('subcategories', 'categoryName');

		// assign subcategories
        categories.forEach((category) => {
            const subcategories = categories.filter(
                (c) => c.parentCategory?.toString() === category._id.toString()
            );
            category.subcategories = subcategories;
        })

		res.status(200).send(categories);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error');
	}
});

module.exports = router;
