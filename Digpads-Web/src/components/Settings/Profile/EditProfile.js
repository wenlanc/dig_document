import React from 'react';
import { Container, Box } from '@mui/material';
import SuiTypography from 'components/SuiTypography';

import { authContext } from 'contexts/AuthContext';
import {
	uploadImage,
	uploadImages,
	uploadVideos,
} from 'controllers/cloudinary';
import { createCustomTag } from 'controllers/marketplaceProfile';
import { updateUser } from 'controllers/users';
import useMarketplaceProfile from 'hooks/useMarketplaceProfile';
import useBusinessTags from 'hooks/useBusinessTags';
import {
	SocialMediaLinks,
	ContactInfo,
	AboutYou,
	Portfolio,
	ServicesOffered,
	BusinessDetails,
	MapLocationHours,
	BusinessCategories,
	MyRentalHistory,
	MyDesiredRental,
	MyNeighborhoods,
	MyDesiredAmenities,
} from '.';
import AreasServedSelect from './AreasServedSelect';
import AreasServedList from './AreasServedList';
import AvailabilitySelect from './AvailabilitySelect';
import UserTypeSetting from './UserTypeSetting';
import { placeholderLinks } from './SocialMediaLinks';
import { EditProfilePage, SectionTitle } from 'components/styled/EditProfile';
import AccountTypeSetting from './AccountTypeSetting';

export default function EditProfile({ user, editUserType }) {
	const { auth } = React.useContext(authContext);
	let userType = auth.data?.type;

	if (editUserType) {
		userType = editUserType;
	}

	const [profile, setProfile, refresh, updateProfile] =
		useMarketplaceProfile(user);
	const [fixedBusinessTags] = useBusinessTags({ userType });

	const {
		socialMediaLinks,
		contactInfo,
		logo,
		portfolio,
		aboutYou,
		mapLocationHours,
		businessDetails,
		businessTags,
		rentalHistory,
		desiredRental,
		desiredAmenities,
		neighborhoods,
		servicesOffered,
		availability,
		areasServed = [],
	} = profile || {};

	const handleUserTypeChange = async (userType) => {
		try {
			const user = await updateUser(null, { type: userType });
		} catch (error) {
			alert(error);
		}
	};

	const handleAccountTypeChange = async (accountType) => {
		try {
			const user = await updateUser(null, { accountType });
		} catch (error) {
			alert(error);
		}
	};

	function onAddServiceOffered({ category, service }) {
		const updatedServices = servicesOffered.map((s) => ({
			category: s.category,
			services: [...s.services],
		}));

		let categoryToUpdate = findCategoryInServices(category, updatedServices);

		if (categoryToUpdate === undefined) {
			// if category doesn't exist - add it
			categoryToUpdate = { category, services: [service] };
			addCategoryToServices(categoryToUpdate, updatedServices);
		} else {
			// check whether it has the service
			const _service = findServiceInCategory(categoryToUpdate, service);
			// if it doesn't have the service, add it to the category services
			if (_service === undefined) {
				addServiceToCategory(categoryToUpdate, service);
			} else {
				alert('the service is already in the list');
			}
		}

		updateProfile({ servicesOffered: updatedServices }, (servicesOffered) =>
			setProfile((prevProfile) => ({
				...prevProfile,
				servicesOffered,
			}))
		);
	}

	function findCategoryInServices(category, services) {
		return services.find((s) => s.category === category);
	}

	function addCategoryToServices(category, services) {
		services.push(category);
	}

	function findServiceInCategory(category, service) {
		return category.services.find((s) => s === service);
	}

	function addServiceToCategory(category, service) {
		category.services = [...category.services, service];
	}

	function onDeleteServiceOffered({ category, service }) {
		const updatedServices = servicesOffered.map((s) => ({
			category: s.category,
			services: [...s.services],
		}));

		let categoryToUpdate = findCategoryInServices(category, updatedServices);

		removeServiceFromCategory(categoryToUpdate, service);

		// if category has no services, remove the category
		if (categoryToUpdate.services.length === 0) {
			removeCategoryFromServices(category, updatedServices);
		}

		updateProfile({ servicesOffered: updatedServices }, (servicesOffered) =>
			setProfile((prevProfile) => ({
				...prevProfile,
				servicesOffered,
			}))
		);
	}

	function removeServiceFromCategory(category, service) {
		category.services.splice(category.services.indexOf(service), 1);
	}

	function removeCategoryFromServices(category, services) {
		const position = services.findIndex((s) => s.category === category);
		services.splice(position, 1);
	}

	/**
	 * @param {Number} index index of the changed link
	 * @param {String} value the new URL
	 */
	function handleSocialMediaLinksChange(index, value) {
		if (profile.socialMediaLinks.length === 0) {
			profile.socialMediaLinks = placeholderLinks;
		}

		const updatedLinks = profile.socialMediaLinks.map((lnk) => ({
			label: lnk.label,
			to: lnk.to,
		}));

		const updatedLink = updatedLinks[index];
		updatedLink.to = value;

		setProfile((prev) => ({ ...prev, socialMediaLinks: updatedLinks }));
	}

	function handleDeleteAreaServed(index) {
		const updatedAreasServed = [...areasServed];
		updatedAreasServed.splice(index, 1);
		console.log(index);

		updateProfile(
			{
				areasServed: updatedAreasServed,
			},
			(data) => setProfileState('areasServed', data)
		);
	}

	function handleSelectAreaServed(area) {
		// is area already in the list?
		const areaAdded =
			areasServed.findIndex(
				(_area) => _area.state === area.state && _area.city === area.city
			) !== -1;

		if (areaAdded) {
			return alert('The area is already in the list');
		}

		const updatedAreasServed = [...areasServed, area];

		updateProfile({ areasServed: updatedAreasServed }, (data) =>
			setProfileState('areasServed', data)
		);
	}

	function handleMapLocationHoursChange(name, value, ...rest) {
		if (name === 'hours') {
			const day = rest[0];
			const side = rest[1]; // from or to

			const newHours = JSON.parse(JSON.stringify(mapLocationHours.hours));
			newHours[day][side] = value;

			setProfile((prevProfile) => ({
				...prevProfile,
				mapLocationHours: {
					...prevProfile.mapLocationHours,
					hours: newHours,
				},
			}));
		} else {
			setProfile((prevProfile) => ({
				...prevProfile,
				mapLocationHours: {
					...prevProfile.mapLocationHours,
					[name]: value,
				},
			}));
		}
	}

	function handleAvailabilityChange(value) {
		updateProfile({ availability: value }, (data) =>
			setProfileState('availability', data)
		);
	}

	function handleDeleteBusinessTag(tag) {
		const updatedTags = businessTags.map((tag) => ({
			_id: tag._id,
			name: tag.name,
			category: tag.category,
		}));

		const indexOfDeleteTag = updatedTags.findIndex(
			(_tag) => _tag.name === tag.name
		);

		if (indexOfDeleteTag === -1) {
			alert('Tag not found');
		} else {
			updatedTags.splice(indexOfDeleteTag, 1);
		}

		updateProfile({ businessTags: updatedTags }, (data) =>
			setProfileState('businessTags', data)
		);
	}

	function handleAddBusinessTag(tag, reason) {
		if (reason === 'select') {
			const updatedTags = businessTags.map((tag) => ({
				...tag,
			}));

			const _tag = updatedTags.find(
				(t) => t.name.toLowerCase() === tag.name.toLowerCase()
			);

			updatedTags.push(tag);

			if (_tag === undefined) {
				updateProfile({ businessTags: updatedTags }, (data) =>
					setProfileState('businessTags', data)
				);
			}
		} else if (reason === 'create') {
			tag.userType = userType;

			createCustomTag(tag).then((newTag) => {
				const updatedTags = [...businessTags];
				updatedTags.push(newTag);
				updateProfile({ businessTags: updatedTags }, (data) =>
					setProfileState('businessTags', data)
				);
			});
		}
	}

	function handleRentalHistoryEdit(index, history) {
		const updatedRentalHistory = rentalHistory.map((r) => ({
			...r,
			leasedFrom: new Date(r.leasedFrom),
			leasedTo: new Date(r.leasedTo),
		}));

		updatedRentalHistory[index] = history;

		updateProfile({ rentalHistory: updatedRentalHistory }, (data) =>
			setProfileState('rentalHistory', data)
		);
	}

	function handleRentalHistoryChange(row, name, value) {
		const updateRow = rentalHistory[row];
		if (!updateRow) {
			alert('incorrect row');
			return;
		}
		updateRow[name] = value;

		setProfile((prevProfile) => ({
			...prevProfile,
			rentalHistory: [...prevProfile.rentalHistory],
		}));
	}

	function handleDesiredAmenitiesChange(action, amenity, index) {
		const updatedAmenities = [...desiredAmenities];

		if (action === 'add') {
			updatedAmenities.push(amenity);
		} else if (action === 'delete') {
			updatedAmenities.splice(index, 1);
		}

		updateProfile({ desiredAmenities: updatedAmenities }, (data) =>
			setProfileState('desiredAmenities', data)
		);
	}

	function setProfileState(name, value) {
		setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
	}

	function handleDeleteNeighborhood(index) {
		const updatedNeighborhoods = [...neighborhoods];
		updatedNeighborhoods.splice(index, 1);

		updateProfile(
			{
				neighborhoods: updatedNeighborhoods,
			},
			(data) => setProfileState('neighborhoods', data)
		);
	}

	/**
	 * @param {FileList} images
	 */
	async function handleUploadImages(images) {
		// show to user that we are loading images
		const imageObjects = Array.from(images).map((img) => ({
			src: URL.createObjectURL(img),
			isUploading: true,
		}));

		setProfile((prevProfile) => ({
			...prevProfile,
			portfolio: {
				...prevProfile.portfolio,
				images: [...prevProfile.portfolio.images, ...imageObjects],
			},
		}));

		// upload images and save their URLs
		try {
			const imagesData = await uploadImages(images);
			console.log(imagesData);
			const uploadedImages = imagesData.map((imgData) => imgData.secure_url);

			// save URLs into db
			updateProfile(
				{
					portfolio: {
						...profile.portfolio,
						images: [...profile.portfolio.images, ...uploadedImages],
					},
				},
				(data) => setProfileState('portfolio', data)
			);

			setProfile((prevProfile) => ({
				...prevProfile,
				portfolio: {
					...prevProfile.portfolio,
					images: prevProfile.portfolio.images.map((img) => ({
						src: img.src,
						isUploading: false,
					})),
				},
			}));
		} catch (error) {
			console.log(error);
		}
	}

	function handleDeleteImage(index) {
		const updatedImages = profile.portfolio.images.map((img) => img);
		updatedImages.splice(index, 1);

		updateProfile(
			{
				portfolio: { ...profile.portfolio, images: updatedImages },
			},
			(data) => setProfileState('portfolio', data)
		);
	}

	/**
	 * @param {FileList} videos
	 */
	async function handleUploadVideos(videos) {
		// show to user that we are loading images
		const videoObjects = Array.from(videos).map((video) => ({
			src: URL.createObjectURL(video),
			isUploading: true,
		}));

		setProfile((prevProfile) => ({
			...prevProfile,
			portfolio: {
				...prevProfile.portfolio,
				videos: [...prevProfile.portfolio.videos, ...videoObjects],
			},
		}));

		// upload images and save their URLs
		try {
			const videosData = await uploadVideos(videos);
			console.log(videosData);
			const uploadedVideos = videosData.map((video) => video.secure_url);

			console.log(portfolio);
			// save URLs into db
			updateProfile(
				{
					portfolio: {
						...profile.portfolio,
						videos: [...profile.portfolio.videos, ...uploadedVideos],
					},
				},
				(data) => setProfileState('portfolio', data)
			);

			console.log(portfolio);

			setProfile((prevProfile) => ({
				...prevProfile,
				portfolio: {
					...prevProfile.portfolio,
					videos: prevProfile.portfolio.videos.map((video) => ({
						src: video.src,
						isUploading: false,
					})),
				},
			}));

			console.log(portfolio);
		} catch (error) {
			console.error(error);
		}
	}

	function handleDeleteVideo(index) {
		const updatedVideos = profile.portfolio.videos.map((video) => video);
		updatedVideos.splice(index, 1);

		updateProfile(
			{
				portfolio: { ...profile.portfolio, videos: updatedVideos },
			},
			(data) => setProfileState('portfolio', data)
		);
	}

	/**
	 * @param {string} name changed field name
	 * @param {Object} value changed field value
	 */
	function handleContactInfoChange(name, value) {
		const updatedContactInfo = { ...contactInfo };
		updatedContactInfo[name] = value;
		setProfileState('contactInfo', updatedContactInfo);
	}

	async function handleContactInfoLogoUpload(logo) {
		setProfile((prevProfile) => ({
			...prevProfile,
			contactInfo: {
				...prevProfile.contactInfo,
				logo: { src: '', isUploading: true },
			},
		}));

		try {
			const imageData = await uploadImage(logo);

			// save URLs into db
			updateProfile(
				{
					logo: imageData.secure_url,
				},
				(data) => setProfileState('logo', { src: data, isUploading: false })
			);
		} catch (error) {
			console.log(error);
		}
	}

	function handleMyDesiredRentalChange(name, value) {
		const updatedDesiredRental = { ...desiredRental };
		updatedDesiredRental[name] = value;
		setProfileState('desiredRental', updatedDesiredRental);
	}

	function handleBusinessDetailsChange(name, value) {
		const updatedBusinessDetails = { ...businessDetails };
		updatedBusinessDetails[name] = value;
		setProfileState('businessDetails', updatedBusinessDetails);
	}

	return (
		<EditProfilePage>
			<SuiTypography align='center' variant='h1' gutterBottom>
				Edit Profile
			</SuiTypography>

			<section id='user'>
				<div className='profile-card'>
					<UserTypeSetting
						currentUserType={userType}
						onChange={handleUserTypeChange}
					/>

					<AccountTypeSetting
						currentAccountType={profile?.accountType || 'individual'}
						onChange={handleAccountTypeChange}
					/>
				</div>
			</section>

			<section id='social-media-links' className='social-media-links'>
				<div className='profile-card'>
					<SocialMediaLinks
						links={socialMediaLinks}
						onChange={handleSocialMediaLinksChange}
						onSave={() =>
							updateProfile({ socialMediaLinks }, (data) =>
								setProfileState('socialMediaLinks', data)
							)
						}
						onCancel={refresh}
					/>
				</div>
			</section>

			<section id='contact-info' className='contact-info'>
				<Box
					sx={{
						boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
						borderRadius: '15px',
						padding: '2em',
					}}
				>
					<ContactInfo
						{...contactInfo}
						logo={logo}
						onChange={handleContactInfoChange}
						onLogoChange={handleContactInfoLogoUpload}
						onSave={() =>
							updateProfile({ contactInfo }, (data) =>
								setProfileState('contactInfo', data)
							)
						}
						onCancel={refresh}
					/>
				</Box>
			</section>

			<section id='about-you' className='about-you'>
				<Box
					sx={{
						boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
						borderRadius: '15px',
						padding: '2em',
					}}
				>
					<AboutYou
						aboutYouText={aboutYou}
						onChange={(data) => setProfileState('aboutYou', data)}
						onSave={() =>
							updateProfile({ aboutYou }, (data) =>
								setProfileState('aboutYou', data)
							)
						}
						onCancel={refresh}
					/>
				</Box>
			</section>

			<section id='portfolio'>
				<Box
					sx={{
						boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
						borderRadius: '15px',
						padding: '2em',
					}}
				>
					<Portfolio
						videos={portfolio?.videos}
						onUploadVideos={handleUploadVideos}
						onDeleteVideo={handleDeleteVideo}
						images={portfolio?.images}
						onUploadImages={handleUploadImages}
						onDeleteImage={handleDeleteImage}
					/>
				</Box>
			</section>

			{(userType === 'contractor' || userType === 'landlord/contractor') && (
				<section id='services-offered'>
					<Box
						sx={{
							boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
							borderRadius: '15px',
							padding: '2em',
						}}
					>
						<ServicesOffered
							servicesOffered={servicesOffered}
							onAdd={onAddServiceOffered}
							onDelete={onDeleteServiceOffered}
						/>
					</Box>
				</section>
			)}

			{userType !== 'tenant' && (
				<section id='areas-served'>
					<Box
						sx={{
							boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
							borderRadius: '15px',
							padding: '2em',
						}}
					>
						<SuiTypography variant='h2' gutterBottom>
							Areas Served
						</SuiTypography>

						<AreasServedSelect onSelect={handleSelectAreaServed} />

						<AreasServedList
							areasServed={areasServed}
							onDelete={handleDeleteAreaServed}
						/>
					</Box>
				</section>
			)}

			{(userType === 'contractor' || userType === 'landlord/contractor') && (
				<AvailabilitySelect
					currentAvailaility={availability}
					onChange={handleAvailabilityChange}
				/>
			)}

			{userType !== 'tenant' && (
				<section id='map-location-hours'>
					<Box
						sx={{
							boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
							borderRadius: '15px',
							padding: '2em',
						}}
					>
						<MapLocationHours
							{...mapLocationHours}
							onChange={handleMapLocationHoursChange}
							onSave={() =>
								updateProfile({ mapLocationHours }, (data) =>
									setProfileState('mapLocationHours', data)
								)
							}
							onCancel={refresh}
						/>
					</Box>
				</section>
			)}

			{userType !== 'tenant' && (
				<section id='business-details'>
					<Box
						sx={{
							boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
							borderRadius: '15px',
							padding: '2em',
						}}
					>
						<BusinessDetails
							{...businessDetails}
							onSave={() =>
								updateProfile({ businessDetails }, (data) =>
									setProfileState('businessDetails', data)
								)
							}
							onCancel={refresh}
							onChange={handleBusinessDetailsChange}
						/>
					</Box>
				</section>
			)}

			{userType !== 'tenant' && (
				<section id='business-categories'>
					<Box
						sx={{
							boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
							borderRadius: '15px',
							padding: '2em',
						}}
					>
						<BusinessCategories
							businessTags={fixedBusinessTags}
							userBusinessTags={businessTags}
							onAddTag={handleAddBusinessTag}
							onDeleteTag={handleDeleteBusinessTag}
						/>
					</Box>
				</section>
			)}

			{userType === 'tenant' && (
				<>
					<SectionTitle>My Rental History</SectionTitle>
					<MyRentalHistory
						rentals={rentalHistory}
						onAddHistory={(history) => {
							updateProfile(
								{
									rentalHistory: [...rentalHistory, history],
								},
								(data) => setProfileState('rentalHistory', data)
							);
						}}
						onEditHistory={handleRentalHistoryEdit}
						onChange={handleRentalHistoryChange}
					/>

					<MyDesiredRental
						desiredRental={desiredRental}
						onChange={handleMyDesiredRentalChange}
						onSave={() =>
							updateProfile({ desiredRental }, (data) =>
								setProfileState('desiredRental', data)
							)
						}
						onCancel={refresh}
					/>

					<MyDesiredAmenities
						amenities={desiredAmenities}
						onChangeAmenity={handleDesiredAmenitiesChange}
					/>

					<div>
						<SectionTitle>My Neighborhoods</SectionTitle>
						<MyNeighborhoods
							neighborhoods={neighborhoods}
							onAdd={(neighborhood) =>
								updateProfile(
									{
										neighborhoods: [...neighborhoods, neighborhood],
									},
									(data) => setProfileState('neighborhoods', data)
								)
							}
							onDelete={handleDeleteNeighborhood}
						/>
					</div>
				</>
			)}
		</EditProfilePage>
	);
}
