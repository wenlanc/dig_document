const slugify = require('slugify');

function SlugifyPostTitle(postTitle){
	let slug = slugify(postTitle);

	// Limit slug length to 80 characters
	slug = slug.slice(0, 80);
    
	// And make it lowercase
	slug = slug.toLowerCase();

	return slug;
}

module.exports = SlugifyPostTitle;