import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/material';
import SuiSelect from 'components/SuiSelect';
import SuiTypography from 'components/SuiTypography';

import { services as contractorServices } from '../../../constants/ContractorServices';

const categories = contractorServices.map((s) => s.category);

function SelectCategory({ label, categories, selectedCategory, onSelect }) {
	return (
		<FormControl fullWidth>
			<SuiSelect
				id='category-select'
				placeholder={label}
				options={categories.map((category) => ({
					value: category,
					label: category,
				}))}
				onChange={(category) => {
					onSelect?.(category.value);
				}}
				value={
					selectedCategory
						? { value: selectedCategory, label: selectedCategory }
						: null
				}
				style={{
					maxWidth: 400,
					width: '50%',
				}}
			/>
		</FormControl>
	);
}

export default function ServicesOffered({ servicesOffered, onAdd, onDelete }) {
	const [services, setServices] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedService, setSelectedService] = useState('');

	return (
		<>
			<SuiTypography variant='h2' gutterBottom>
				Services Offered
			</SuiTypography>

			{onAdd && (
				<Box display='flex' flexWrap='wrap' gap='1em' mb='2em'>
					<SelectCategory
						label='categories'
						categories={categories}
						selectedCategory={selectedCategory}
						onSelect={(category) => {
							setSelectedCategory(category);
							setSelectedService('');
							setServices(
								contractorServices.find((s) => s.category === category).services
							);
						}}
					/>
					<SelectCategory
						label='subcategories'
						categories={services}
						selectedCategory={selectedService}
						onSelect={(service) => {
							setSelectedService(service);
						}}
					/>

					<Button
						disabled={!selectedCategory || !selectedService}
						onClick={() =>
							onAdd({
								category: selectedCategory,
								service: selectedService,
							})
						}
						variant='contained'
						size='small'
					>
						Add
					</Button>
				</Box>
			)}

			<List
				sx={{
					width: '100%',
					bgcolor: 'background.paper',
					position: 'relative',
					overflowY: 'scroll',
					maxHeight: 300,
					zIndex: '0',
					border: '1px solid #dfe3e4',
					'& ul': { padding: 0 },
				}}
				subheader={<li />}
			>
				{servicesOffered?.map((service, i) => (
					<li key={`section-${i}`}>
						<ul>
							<ListSubheader sx={{ fontWeight: 'bold' }}>
								{service.category}
							</ListSubheader>
							{service.services.map((item, i) => (
								<ListItem
									sx={{ p: '0 2em' }}
									key={i}
									secondaryAction={
										onDelete && (
											<IconButton
												onClick={() =>
													onDelete({
														category: service.category,
														service: item,
													})
												}
											>
												<ClearIcon />
											</IconButton>
										)
									}
								>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</ul>
					</li>
				))}
			</List>
		</>
	);
}
