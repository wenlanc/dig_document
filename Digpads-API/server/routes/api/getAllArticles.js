const express = require('express');
const router = express.Router();

const { getAllArticles } = require('../../controllers/article');




const ctr = async (req, res, next) => {
    try {
        const articles = await getAllArticles();
        if ((typeof articles == 'object' && 'error' in articles) || !articles)
            res.status(406).json(articles)
        else res.status(200).send(articles);
        return next();
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

module.exports = { ctr };