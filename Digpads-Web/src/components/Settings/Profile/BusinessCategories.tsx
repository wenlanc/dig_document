import React from 'react';
import {
	BusinessCategory,
	BusinessCategoryTagList,
	BusinessTag,
} from '../../styled/EditProfile';

import Stack from '@mui/material/Stack';
import SuiSelect from 'components/SuiSelect';
import AddCustomTag from './AddCustomTag';

import SuiTypography from 'components/SuiTypography';

interface BusinessTag {
	name: string;
	category: string;
	userType: string;
	custom?: boolean;
}

interface Props {
	businessTags: BusinessTag[];
	userBusinessTags: BusinessTag[];
	onAddTag: (tag: BusinessTag, action: string) => void;
	onDeleteTag: (tag: BusinessTag) => void;
	selectUserType: boolean;
}

export default function BusinessCategories({
	businessTags = [],
	userBusinessTags = [],
	onAddTag,
	onDeleteTag,
	selectUserType = false,
}: Props) {
	function handleChange(tag: { label: string; value: BusinessTag }) {
		if (tagExists(tag.value, userBusinessTags)) {
			alert('the tag is already applied');
		} else {
			onAddTag(tag.value, 'select');
		}
	}

	function tagExists(tag: BusinessTag, tags: BusinessTag[]) {
		const sameName = (_tag) =>
			_tag.name.toLowerCase() === tag.name.toLowerCase();

		const sameCategory = (_tag) =>
			_tag.category.toLowerCase() === tag.category.toLowerCase();

		const sameTag = (_tag) => sameName(_tag) && sameCategory(_tag);

		return tags.findIndex(sameTag) !== -1;
	}

	return (
		<>
			<SuiTypography variant='h2' gutterBottom>
				Business Categories
			</SuiTypography>

			<Stack direction='row' spacing={2} alignItems='center' mb={1}>
				<SuiSelect
					placeholder='Add Tags'
					options={businessTags.map((tag) => ({
						value: tag,
						label: tag.name,
					}))}
					onChange={handleChange}
					style={{
						maxWidth: 400,
						width: '50%',
					}}
				/>

				<AddCustomTag
					onAddTag={(tag) => onAddTag(tag, 'create')}
					selectUserType={selectUserType}
					tagExists={(tag) => tagExists(tag, businessTags)}
				/>
			</Stack>

			<BusinessCategory>
				<SuiTypography variant='h6' component='h3' gutterBottom>
					Social
				</SuiTypography>

				<BusinessCategoryTagList>
					{userBusinessTags
						.filter((tag) => tag.category === 'social')
						.map((tag, i) => (
							<BusinessTag
								key={i}
								name={tag.name}
								onDelete={() => onDeleteTag(tag)}
							/>
						))}
				</BusinessCategoryTagList>
			</BusinessCategory>

			<BusinessCategory>
				<SuiTypography variant='h6' component='h3' gutterBottom>
					Business
				</SuiTypography>

				<BusinessCategoryTagList>
					{userBusinessTags
						.filter((tag) => tag.category === 'business')
						.map((tag, i) => (
							<BusinessTag
								key={i}
								name={tag.name}
								onDelete={() => onDeleteTag(tag)}
							/>
						))}
				</BusinessCategoryTagList>
			</BusinessCategory>
		</>
	);
}
