import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

import MarketplaceSearch from './MarketplaceSearch';
import SuiSelect from 'components/SuiSelect';
import { useStates } from 'hooks';
import usaCities from 'constants/usaCities';
import { fetchBusinessTags } from 'controllers/marketplaceProfile';
import { BusinessTag } from 'types';
import {
	searchProfiles,
	selectProfiles,
} from 'features/marketplaceProfile/marketplaceProfileSlice';

import { services } from 'constants/ContractorServices';

export default function Contractors() {
	const {
		states,
		cities,
		zipCodes,
		selectedState,
		selectedCity,
		selectedZipCode,
		onChange,
	} = useStates();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const contractorServices = React.useMemo(
		() =>
			services
				.map((service) => service.services)
				.flat()
				.map((service) => ({ label: service, value: service })),
		[]
	);

	const [contractorFilters, setContractorFilters] = useState([
		{
			name: 'areasServed',
			label: 'Areas Served',
			options: usaCities.map((city) => ({
				label: `${city.city}(${city.state})`,
				value: `${city.city}, ${city.state}`,
			})),
		},
		{
			name: 'servicesOffered',
			label: 'Services Offered',
			options: contractorServices,
		},
		{
			name: 'starRating',
			label: 'Star Rating',
			options: [
				{ label: '2 stars', value: '2' },
				{ label: '3-5 stars', value: '3-5' },
				{ label: '4 stars', value: '4' },
				{ label: '5 stars', value: '5' },
			],
		},
		{
			name: 'numReviews',
			label: '# of Reviews',
			options: [
				{ label: '1-10 reviews', value: '1-10' },
				{ label: '11-50 reviews', value: '11-50' },
				{ label: '50-100 reviews', value: '50-100' },
				{ label: '100-500 reviews', value: '100-500' },
				{ label: '500-1,000 reviews', value: '500-1000' },
				{ label: '1,000+ reviews', value: '1000+' },
			],
		},
		{
			name: 'yearsInBusiness',
			label: 'Years in Business',
			options: [
				{ label: '1+ Year', value: '1' },
				{ label: '2-3 Years', value: '2-3' },
				{ label: '5+ Years', value: '5' },
				{ label: '10+ Years', value: '10' },
				{ label: '20+ Years', value: '20' },
				{ label: '30+ Years', value: '30' },
				{ label: '50+ Years', value: '50' },
				{ label: '100+ Years', value: '100' },
			],
		},
		{
			name: 'photosVideos',
			label: 'With Photos/Videos',
			options: [
				{ label: '1+ Photos', value: '1' },
				{ label: '5+ Photos', value: '5' },
				{ label: '10+ Photos', value: '10' },
				{ label: 'Video', value: 'video' },
				{ label: 'Photos & Videos', value: 'photosAndvideos' },
			],
		},
	]);
	const [filterText, setFilterText] = useState('');
	let currentUrlParams = new URLSearchParams(window.location.search);

	const handleFilterTextChange = (text) => {
		setFilterText(text);
		currentUrlParams.set('q', text);
		navigate(window.location.pathname + '?' + currentUrlParams.toString());
	};

	const handleFilterChange = (option, action) => {
		switch (action.name) {
			case 'state':
				onChange('state', option.value);
				currentUrlParams.set(action.name, option.value.name);
				currentUrlParams.delete('city');
				break;
			case 'city':
				onChange('city', option.value);
				currentUrlParams.set(action.name, option.value);
				break;
			case 'zip':
				onChange('zip', option.value);
				currentUrlParams.set(action.name, option.value);
				break;
			case 'areasServed':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'servicesOffered':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'starRating':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'numReviews':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'yearsInBusiness':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'photosVideos':
				currentUrlParams.set(action.name, option.value);
				break;
			case 'categories':
				currentUrlParams.set(action.name, option.value);
				break;
			default:
				throw Error(`invalid action name ${action.name}`);
		}

		navigate(window.location.pathname + '?' + currentUrlParams.toString());
	};

	React.useEffect(() => {
		fetchBusinessTags().then((tags) => {
			const businessTagsOptions = {
				name: 'categories',
				label: 'Categories',
				options: tags.map((tag) => ({
					label: tag.name,
					value: tag.name,
				})),
			};
			const updatedContractorFilters = [
				...contractorFilters,
				businessTagsOptions,
			];
			setContractorFilters(updatedContractorFilters);
		});
	}, []);

	React.useEffect(() => {
		dispatch(
			searchProfiles(
				`marketplaceProfiles/search/?type=contractor&${currentUrlParams.toString()}`
			)
		);
	}, [currentUrlParams.toString()]);

	return (
		<MarketplaceSearch
			filterText={filterText}
			onFilterTextChange={handleFilterTextChange}
			profileTypeGroup='contractors'
		>
			<Stack direction='row' mb={2} gap='1em' flexWrap='wrap'>
				<SuiSelect
					placeholder='state'
					options={states.map((s) => ({
						label: s.name,
						value: s,
					}))}
					onChange={handleFilterChange}
					name='state'
				/>

				<SuiSelect
					value={
						selectedCity ? { label: selectedCity, value: selectedCity } : ''
					}
					placeholder='city'
					options={cities.map((city) => ({
						label: city,
						value: city,
					}))}
					onChange={handleFilterChange}
					name='city'
				/>

				<SuiSelect
					placeholder='zip'
					options={zipCodes.map((zip) => ({
						label: zip,
						value: zip,
					}))}
					onChange={handleFilterChange}
					name='zip'
				/>

				{contractorFilters?.map((filter, i) => (
					<SuiSelect
						key={i}
						placeholder={filter.label}
						options={filter.options}
						onChange={handleFilterChange}
						name={filter.name}
					/>
				))}
			</Stack>
		</MarketplaceSearch>
	);
}
