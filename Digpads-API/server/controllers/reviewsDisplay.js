const ReviewsDisplayForm = require('../models/ReviewsDisplayForm');

async function createReviewsDisplayForm(data) {
    const user = data.user;
    // create form if doesn't exist, update otherwise
    const reviewsDisplayForm = await getReviewsDisplayForm(user);
    if (reviewsDisplayForm === null) {
        return ReviewsDisplayForm.create(data);
    } else {
        return ReviewsDisplayForm.findOneAndUpdate({ user: user }, data, { new: true })
    }
}

async function getReviewsDisplayForm(user) {
    return ReviewsDisplayForm.findOne({user: user}).populate([
        { path: 'user', select: 'name first last' },
        { path: 'reviews', select: 'ratings title content' }
    ]);
}

module.exports = {
    createReviewsDisplayForm,
    getReviewsDisplayForm
}