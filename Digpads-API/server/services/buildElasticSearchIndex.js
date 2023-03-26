// Elastic Search - Index articles and posts
const { seedAndIndex } = require('elasticsearch-scripts');
const { Article, Post } = require('../models/db');
const { elasticSearch } = require('./elasticsearch');

build();

async function build() {
    const articles = await Article.find();
    
    if (articles.length === 0) {
        console.log("No articles found in DB");
        return;
      }
    
    const posts = await Post.find();
    
    if (posts.length === 0) {
        console.log("No posts found in DB");
        return;
      }
    
    
    seedAndIndex(articles, posts, elasticSearch);
}
