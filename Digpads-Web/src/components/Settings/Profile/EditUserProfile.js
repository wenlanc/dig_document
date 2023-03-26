// This is a component that allows Admin to view and edit User marketplace profile
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './EditProfile';
import useUserType from '../../../hooks/useUserType';

export default function EditUserProfile() {
	const params = useParams();
	const user = params.user;

	const userType = useUserType(user);

	return <Profile user={user} userType={userType} />;
}
