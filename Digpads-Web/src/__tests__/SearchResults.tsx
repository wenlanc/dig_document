import React from 'react';
import SearchResults from 'components/Marketplace/SearchResults';
import { render } from '@testing-library/react';

test('must display profile cards', () => {
	// const { getByText } = render(
	// 	<SearchResults
	// 		profiles={sampleProfiles}
	// 		featuredProfiles={sampleFeaturedProfiles}
	// 	/>
	// );
	// const userName = getByText('Carl von dornhorn');
	// const areasServed = getByText('acmar(Alabama)');
	// const city = getByText('Los Angeles');
	// expect(userName).toBe('Carl von dornhorn');
	// expect(areasServed).toBe('acmar(Alabama)');
	// expect(city).toBe('Los Angeles');
});

const sampleProfiles = Array(70)
	.fill({
		user: { _id: '61adf570e4936d42c8ca486a', type: 'landlord' },
		starRating: 5,
		name: 'Carl von dornhorn',
		areasServed: ['acmar(Alabama)', 'alberta(Alabama)', 'Muajrxrr'],
		numProperties: 4,
		city: 'Los Angeles',
		state: 'California',
		zip: '168621',
	})
	.map((profile, i) => ({ ...profile, numProperties: i }));

const sampleFeaturedProfiles = Array(4).fill({
	user: { _id: '61adf570e4936d42c8ca486a', type: 'landlord' },
	starRating: 5,
	name: 'Mitsishi Himammoto',
	areasServed: ['loolxr', 'Calfiron', 'Muajrxrr'],
	numProperties: 4,
	city: 'Sacramento',
	state: 'California',
	zip: '168621',
	ad: true,
});
