import slugify from 'slugify';

export default function Slugify(stringToSlugify) {
	let slug = slugify(stringToSlugify);

	return slug;
}
