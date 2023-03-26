import React, { useRef } from 'react';
import Header from 'components/Nav/Header';
import SettingLeftSide from 'components/Settings/SettingsLeftSide';
import SettingRightSide from 'components/Settings/SettingsRightSide';
import { Container } from '@mui/material';
import styled from 'styled-components';
import { Scrollspy } from '@makotot/ghostui';

import { PageTitle, Banner } from 'components/styled/Page';

const Root = styled.div`
	background: #fff;
`;

const SettingsContainer = styled(Container)`
	display: flex;
	margin-top: 5em;
`;

const SettingsLeftSideBarContainer = styled.div`
	max-width: 140px;
	height: 90vh;
	position: sticky;
	top: 50px;
`;

const SettingsRightSideBarContainer = styled.div`
	width: calc(90% - 140px);
	border-left: 1px solid #ccc6c6;
	margin-left: 20px;
`;

function Settings() {
	const sectionRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	return (
		<Root>
			<Header />
			<Banner>
				<PageTitle>Settings</PageTitle>
			</Banner>
			<Scrollspy sectionRefs={sectionRefs}>
				{({ currentElementIndexInViewport }) => (
					<SettingsContainer>
						<SettingsLeftSideBarContainer>
							<SettingLeftSide
								currentElementIndexInViewport={
									currentElementIndexInViewport
								}
							/>
						</SettingsLeftSideBarContainer>
						<SettingsRightSideBarContainer>
							<SettingRightSide
								currentElementIndexInViewport={
									currentElementIndexInViewport
								}
								sectionRefs={sectionRefs}
							/>
						</SettingsRightSideBarContainer>
					</SettingsContainer>
				)}
			</Scrollspy>
		</Root>
	);
}

export default Settings;
