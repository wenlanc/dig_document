const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getCommentReply } = require('../../controllers/posts');

// Schema validator
const schema = Joi.object({
    content: Joi.string().required(),
    post: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {success}
 * Fail
 * @returns {res.error} [406] ['error in uploading', 'unknown']
 */
const ctr = async (req, res, next) => {
    try {
        req.body.parent = req.query.commentID
        let data = await getCommentReply(JSON.parse(JSON.stringify(req.body)));
        if ((typeof data == 'object' && 'error' in data) || !data)
            res.status(406).json(data);
        else res.status(200).json({ data });
    } catch (e) {
        return next(e);
    }
};

module.exports = { ctr, validate };