import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PageWrapper from '../PageWrapper';
import { PageTitle, Banner } from '../styled/Page';

const Section = styled.section`
	padding: 2em 0;
	max-width: 1000px;
	margin: 0 auto;

	.MuiTypography-root {
		font-weight: 500;
		margin-bottom: 1.5em;
		font-size: 0.75rem;
	}

	ul {
		list-style: disc;
		padding-left: 2.5rem;
	}

	li {
		margin-bottom: 1.5em;
	}
`;

const Title = styled(Typography).attrs(() => ({
	variant: 'body2',
}))`
	&.MuiTypography-root {
		font-weight: bold;
	}
`;

const Email = styled.a.attrs((props) => ({
	href: `mailto:${props.children}`,
}))``;

export default function PrivacyPolicy() {
	return (
		<PageWrapper>
			<Banner>
				<PageTitle>Privacy Policy</PageTitle>
			</Banner>

			<Section>
				<Container>
					<div>
						<Title>digpads Privacy Policy</Title>
						<Typography variant='body2'>
							Effective Date: March 25, 2021
						</Typography>
						<Typography variant='body2'>
							We appreciate you utilizing this service, which is
							owned and operated by digpads Inc. (“digpads,” “we,”
							“us,” and “our”). digpads owns and operates this
							website (this “Site”). The “User” and “you” refer to
							those utilizing the site. This Online Privacy Policy
							(this “Policy”) describes the information we collect
							from or about you through the digpads-owned websites
							and mobile apps on which it is posted (collectively
							referred to as this "site"). It also describes how
							we use and share that information and some of the
							steps we take to protect your privacy.
						</Typography>
					</div>
					<div>
						<Title>Scope of This Policy</Title>
						<Typography variant='body2'>
							digpads collects certain information about or
							related to you through this Site. Some of the
							information digpads collects may be “personal
							information”—information that identifies you
							personally, alone or in combination with other
							information available to us. Other information may
							be not personally identifiable, such as your IP
							address.
						</Typography>
						<Typography variant='body2'>
							digpads has provided this Policy so that you will
							know what information digpads collects, how digpads
							uses this information, the types of third parties
							with which digpads may share this information, and
							some of the choices that are available to you.
						</Typography>
						<Typography variant='body2'>
							This Policy may be supplemented or amended from time
							to time by additional privacy notices (“Privacy
							Notices”), provided at the time we collect your
							information. For example, certain pages of this Site
							may contain Privacy Notices providing more details
							about the information we collect on those particular
							pages, why we need that information, and choices you
							may have about the ways we use that information. In
							other cases, specific Privacy Notices may be
							required to comply with the privacy laws of one of
							the countries, provinces, or states in which we do
							business.
						</Typography>
					</div>
					<div>
						<Title>Your Consent</Title>
						<Typography variant='body2'>
							By using this Site, you are consenting to the
							collection, use, disclosure, and transfer of your
							information as described in this Policy (and any
							Privacy Notices that apply to you). We may share or
							disclose your information at your direction in
							connection with your use of the Services.
						</Typography>
						<Typography variant='body2'>
							If you do not consent to the collection, use,
							disclosure and transfer of your information as
							described in this Policy (and any Privacy Notices
							that apply to you), you may not use this Site. If
							you have questions about this Policy, or any Privacy
							Notice, please contact us via e-mail at{' '}
							<Email>info@digpads.com</Email>.
						</Typography>
					</div>
					<div>
						<Title>Our Terms of Services</Title>
						<Typography variant='body2'>
							This Policy is part of the Terms of Service that
							govern your use of this Site. A link to our{' '}
							<Link to='/termsOfService'>Terms of Service</Link>{' '}
							is provided at the bottom of each page of this Site.
						</Typography>
					</div>
					<div>
						<Title>Your Choices</Title>
						<Typography variant='body2'>
							<b>In General</b>. We respect your right to make
							choices about the ways we collect, use, and disclose
							your information. This Policy describes some of your
							choices, such as your choice to opt out of receiving
							“cookies” and to opt out of having your information
							shared with third parties for their own marketing
							purposes. In addition, and as required by applicable
							law, you can opt out of receiving promotional emails
							from us by clicking on the “unsubscribe” link at the
							bottom of each promotional email.
						</Typography>
						<Typography variant='body2'>
							We may ask you to indicate your choices at the time
							and on the page where you provide your information.
							In other situations, and consistent with this Site’s
							purpose as a networking platform, we make certain
							assumptions about how you want your information
							shared with others.
						</Typography>
						<Typography variant='body2'>
							However, you can view and change certain default
							privacy settings at{' '}
							<Link to='/settings'>
								https://www.digpads.com/settings
							</Link>
							. Otherwise, you can contact us at info@digpads.com.
						</Typography>
					</div>
					<div>
						<Title>Do Not Track Mechanisms</Title>
						<Typography variant='body2'>
							California law requires this policy to address how
							the Service responds to any “Do-Not-Track (“DNT”)
							signal” delivered by your browser. Because of the
							changing state of technology and indecision within
							the industry regarding the meaning of DNT signals,
							we currently do not make any guarantee that we will
							honor DNT signals.
						</Typography>
						<Title>This Policy May Change</Title>
						<Typography variant='body2'>
							digpads reserves the right to update or modify this
							Policy and any Privacy Notice, at any time and
							without prior notice, by posting the revised version
							of the Policy or Privacy Notice on this Site. These
							changes will only apply to the information we
							collect after we have posted the revised Policy or
							Privacy Notice on this Site.
						</Typography>
						<Typography variant='body2'>
							Your use of this Site following any such change
							constitutes your agreement that all information
							collected from or about you after the revised Policy
							is posted will be subject to the terms of the
							revised Policy. You may access the current version
							of this Policy at any time by clicking on the link
							marked “Privacy” at the bottom of each page of the
							public areas of this Site.
						</Typography>
					</div>
					<div>
						<Title>Information We Collect</Title>
						<Typography variant='body2'>
							<b>Information You Manually Provide</b>. digpads
							collects the information you manually provide (using
							your keyboard, mouse, or touchpad) when you use this
							Site. For example, we collect the information you
							provide when you contact us with questions, express
							interest in advertising on the Site, register with
							the Site and create a profile, participate in a
							forum discussion, or otherwise interact with this
							Site. Some of the information you manually provide
							may be personal information, such as your name and
							contact information.
						</Typography>
						<Typography variant='body2'>
							<b>
								Information Collected for Other Users for a
								Business Purpose
							</b>
							. If you are a Tenant and wish to submit a rental
							application for a unit on the Service, you will
							provide typical personal information necessary for
							the Manager to evaluate your application, such as:
							your name, email address, birthdate, primary phone
							number, secondary phone number, emergency phone
							number, mailing address, tenant history (including
							past addresses and landlord information), whether
							you have pets and how many, your vehicle
							information, your employment history, your current
							income information, whether or not you smoke,
							whether you have filed for bankruptcy in the past
							seven years, whether you have been convicted of a
							felony, whether you have ever been evicted from a
							tenancy, and whether you have ever refused to pay
							rent. All of this information is referred to as
							“Tenant Application Information”.
						</Typography>
						<Typography variant='body2'>
							Tenants who submit a rental application for a unit
							will also be redirected from our Site to the site of
							a third-party service provider to provide personal
							information, such as social security number and
							name, to allow that third-party service provider to
							run a Background Check to be used in the rental
							application. Neither digpads nor the Manager has
							access to the information you provide to the
							third-party service provider (notably your social
							security number) in order to perform the Background
							Check nor does digpads store this information on our
							servers. You will authorize this third-party service
							provider to share the results of the Background
							Check (the “Background Check Results”) with digpads
							and the Manager who owns or manages the unit you
							wish to rent. Once the Background Check Results are
							complete, the third-party service provider will
							grant digpads access to the Background Check Results
							via a secure API, and digpads will share the
							Background Check Results with the Manager through
							the Service for his evaluation of your rental
							application. The Manager will only have access to
							the Background Check Results until the rental
							application has been evaluated (accepted or
							rejected) by Manager. digpads does not store the
							Background Check Results on our servers nor will
							digpads retain a copy of the Background Check
							Results after the rental application has been
							evaluated (accepted or rejected) by the Manager.
							Under our Terms of Use, Manager is required to keep
							your personal Background Check Results private and
							only use it in connection with the lawful use of the
							Services.
						</Typography>
						<Typography variant='body2'>
							<b>
								Information From Third-Party Social Media
								Platforms
							</b>
							. You may be able to register with, log on to, or
							enhance your profile on this Site by choosing to
							automatically populate the requested data fields
							with information you previously provided to a
							third-party social media platform (such as Facebook
							or Twitter). By doing this, you are asking the
							third-party platform to send us information,
							including personal information, from your profile on
							that platform. We treat that information as we do
							any other information you give to us when you
							register, log on, or enhance your profile.
						</Typography>
						<Typography variant='body2'>
							<b>Information from your browser or device</b>.
							digpads collects information that is sent to us
							automatically by your web browser or mobile device.
							This information typically includes your IP address,
							the name of your operating system, the name and
							version of your browser, the date and time of your
							visit, and the pages you visit. The information we
							receive may depend on your browser or device
							settings.
						</Typography>
						<Typography variant='body2'>
							The information we receive from your web browser and
							device is not, in and of itself, personally
							identifiable. Generally, we use this information in
							the aggregate to help us improve this Site and make
							it more compatible with the technology used by our
							visitors. However, we may combine it with other
							information in an attempt to identify you or we may
							combine it with information that does identify you.
							We may also review our server logs for security
							purposes—for example, to detect intrusions into our
							network—and we might share our server logs, which
							contain visitors’ IP addresses, with the appropriate
							investigative authorities who could use that
							information to trace and identify you.
						</Typography>
						<Typography variant='body2'>
							<b>Your Location</b>. Using GPS technology, and with
							your opt-in consent, we may also collect precise,
							real-time location information from your mobile
							device and use that information to deliver tailored
							content through this Site. We may also share
							information about your location with your friends
							and other contacts, to the extent you interact with
							them using the social networking tools available on
							this Site.
						</Typography>
						<Typography variant='body2'>
							Your mobile device may allow you to adjust your
							settings so that location information is not
							available to any mobile website or application. If
							you have questions about the security and privacy
							settings of your mobile or tablet device, please
							refer to instructions from your mobile service
							provider or the manufacturer of your device.
						</Typography>
						<Typography variant='body2'>
							The information we receive from your mobile device
							is not personally identifiable, but we may link it
							to information that identifies you.
						</Typography>
						<div>
							<Typography variant='body2'>
								<b>
									Information Collected by Cookies and Other
									Technologies
								</b>
								. We use “cookies” and other technologies to
								collect information and support certain features
								of this Site. For example, we may use these
								technologies to:
							</Typography>
							<ul>
								<li>
									collect information about the ways visitors
									use this Site—which pages they visit, which
									links they use, and how long they stay on
									each page;
								</li>
								<li>
									support the features and functionality of
									this Site—for example, to save you the
									trouble of reentering information already in
									our database or to prompt the settings you
									established on previous visits;
								</li>
								<li>
									personalize your experience when you use
									this Site; and
								</li>
								<li>
									improve our marketing efforts, including
									through use of targeted advertising.
								</li>
							</ul>
							<Typography variant='body2'>
								The information we collect using cookies and
								similar technologies is not, in and of itself,
								personally identifiable, but we may link it to
								personal information that you provide. If you do
								not wish to receive cookies, you may set your
								browser to reject cookies or to alert you when a
								cookie is placed on your computer. Although you
								are not required to accept cookies when you
								visit this Site, you may be unable to use all of
								the functionality of this Site if your browser
								rejects our cookies.
							</Typography>
						</div>
					</div>
					<div>
						<Title>Information About Third-Party Cookies</Title>
						<Typography variant='body2'>
							In addition to the cookies digpads delivers to your
							computer or mobile device through this Site, certain
							third parties may deliver cookies to you for a
							variety of reasons. For example, we may use Google
							Analytics, including the following Google Analytics
							Advertising Features: Adsense, Adwords, Doubleclick,
							Remarketing. To learn more about Google Analytics,
							click here. Please note that the Google Analytics
							opt-out browser add-on does not prevent information
							from being sent to digpads.
						</Typography>
						<Typography variant='body2'>
							Other third parties may also deliver cookies to your
							computer or mobile device for the purpose of
							tracking your online behaviors across non-affiliated
							websites and delivering targeted advertisements
							either on this Site or on other websites.
						</Typography>
						<Typography variant='body2'>
							If you would like to opt-out of having participating
							entities collect your online behavior for
							advertising purposes when you are browsing websites,
							click here for a "Website Opt Out." You will be
							directed to an industry-developed website that
							allows you to choose whether each listed entity may
							collect and use data for interest-based advertising
							purposes. It may be that some of the third parties
							that collect interest-based information on this Site
							do not participate in the Website Opt Out, in which
							case the best way to avoid the third-party tracking
							of your online behaviors may be through your browser
							settings and deletion of cookies.
						</Typography>
						<Typography variant='body2'>
							The Website Opt Out described above only works on
							websites. To opt out of having participating
							entities track your behaviors for advertising
							purposes when you are using our mobile apps,
							download and use the Digital Advertising Alliance's
							"App Choices" app. As with the Website Opt Out, the
							"Mobile App Opt Out" prevents tracking only by
							participating entities.
						</Typography>
						<Typography variant='body2'>
							Please note that the Website Opt Out and Mobile App
							Opt Out are device specific. If you wish to opt-out
							from having interest-based information collected by
							participating entities across all devices, you need
							to take the steps outlined above from each device.
						</Typography>
					</div>
					<div>
						<Title>How We Use Your Information</Title>
						<Typography variant='body2'>
							digpads utilizes information collected as outlined
							in this privacy policy
						</Typography>
						<ul>
							<li>
								to provide the information, products and
								services you request;
							</li>
							<li>
								to provide you with effective customer service;
							</li>
							<li>
								to provide you with a personalized experience
								when you use this Site;
							</li>
							<li>
								to contact you with information and notices
								related to your use of this Site;
							</li>
							<li>
								to contact you with special offers and other
								information we believe will be of interest to
								you (in accordance with any privacy preferences
								you have expressed to us);
							</li>
							<li>
								to invite you to participate in surveys and
								provide Feedback to us (in accordance with any
								privacy preferences you have expressed to us);
							</li>
							<li>
								to improve the content, functionality and
								usability of this Site;
							</li>
							<li>
								to better understand your needs and interests;
							</li>
							<li>to improve our products and services;</li>
							<li>
								to improve our marketing and promotional
								efforts;
							</li>
							<li>
								to keep the Site free by selling advertisements;
							</li>
							<li>
								for security, credit or fraud prevention
								purposes;
							</li>
							<li>
								for any other purpose identified in an
								applicable Privacy Notice, click-through
								agreement
							</li>
							<li>
								to contact you about our own and third parties'
								goods and services that may be of interest to
								you or that you may have requested information
								about;
							</li>
							<li>
								in any other way we may describe when you
								provide the information;{' '}
							</li>
							<li>
								to fulfill any other purpose for which you
								provide it; and
							</li>
							<li>for any other purpose with your consent.</li>
						</ul>
					</div>
					<div>
						<Title>How We Share Your Information</Title>
						<Typography variant='body2'>
							<b>With Third–Party Vendors</b>. digpads shares
							information collected through this Site with
							third-party vendors who act for us or on our behalf.
							For example, we may use third-party vendors to
							design and operate this Site; to conduct surveys;
							and to help us with our promotional efforts. These
							third-party vendors may need information about you
							to perform their functions. Additionally, we will
							share your information with third-party vendors when
							you request us to do so. For instance, you may
							request that we provide your information to hard
							money lenders so that you may receive information
							about offers and rates.
						</Typography>
						<Typography variant='body2'>
							<b>With Other Users of this Site</b>. UGC. One of
							this Site’s goals is to provide tools and resources
							to enhance real estate knowledge, networking,
							dealmaking, and marketing. Thus, User-Generated
							Content you post on this Site can be read,
							collected, and used by others. (In this Policy,
							“User-Generated Content” or “UGC” refers to your
							publicly available profile information and all
							content that you post using the social networking
							tools we make available to you. UGC does not include
							“Feedback” (as that term is defined in our Terms of
							Services.) In addition, we may feature you and your
							activity on this Site on our “stats” page at
							http://www.digpads.com/stats or on our newsletter or
							via other automated emails to our members. For
							example, if you visit the profile or click on an ad
							of a Pro member, we may notify the Pro member of
							your interest so he/she can reach out to you. We may
							also use UGC you submit for advertising campaigns
							and other promotions. We may or may not use your
							name in connection with such use, and we may or may
							not seek your consent before using the content for
							such purposes. You should have no expectation of
							privacy with respect to UGC you submit on or through
							this Site.
						</Typography>
						<Typography variant='body2'>
							<b>
								Tenant Screening, Tenant Management &amp;
								Property Management
							</b>
							. Users may elect to provide their information to
							other Users of the Site for tenant screening of
							prospective tenants, for interactions with existing
							landlord and tenant relationships, and for ongoing
							property management purposes.
						</Typography>
						<Typography variant='body2'>
							<b>With Third-Party Social Media Platforms</b>. We
							may provide functionality on this Site that allows
							you to automatically post information about the
							actions you take on this Site to a third-party
							social media platform (such as Facebook or Twitter).
							If you choose to take advantage of this
							functionality, people with access to your profile on
							the third-party platform may be able to see the
							actions you have taken—for example, the items you
							have purchased. Thus, you should have no expectation
							of privacy in those actions. Further, if you choose
							to link your profile on this Site with an account on
							a third-party social media platform, we may share
							the information in your profile with that
							third-party platform. We may share or provide some
							of your information, such as an email address, to
							third-party social media platforms so that we can
							identify you in order to engage with you on those
							platforms.
						</Typography>
						<Typography variant='body2'>
							<b>With Our Affiliates</b>. digpads may share the
							information collected through this Site with other
							digpads entities. These affiliate companies are
							permitted to use your information for their own
							marketing purposes and in a manner otherwise
							consistent with this Policy.
						</Typography>
						<Typography variant='body2'>
							<b>
								With Other, Carefully Selected Business Partners
							</b>
							. From time to time, we may share your information
							with selected third parties for their own marketing
							purposes. For example, we may partner with third
							parties to sponsor contests or other promotions, and
							we may share with these third parties the
							information you submit to us to participate in the
							contest or take advantage of the promotion. Before
							doing so, however, we may offer you the opportunity
							to “opt out” or “opt in,” as required by applicable
							law.
						</Typography>
						<Typography variant='body2'>
							<b>In Aggregate or De-identified Form</b>. We use
							information collected through this Site to create a
							compiled, aggregate view of usage patterns. We may
							share aggregate information with third parties so
							they can better understand our user base. We may
							also share with third parties information about how
							particular individuals use this Site, but only on a
							de-identified basis (“Individualized Data”).
							Individualized Data is not personally identifiable,
							but it does reflect the usage patterns of a
							particular Site user, as opposed to Site users
							collectively. We may provide basic demographic
							information (gender and age) in conjunction with
							providing Individualized Data. Third parties
							typically use this information for analytical
							purposes and to market their own products and
							services. It is possible that third parties will
							attempt to “re-identify” de-identified data, and you
							should know that this is possible using external
							points of reference.
						</Typography>
						<Typography variant='body2'>
							<b>As Part of a Business Transfer</b>. Your
							information may be transferred to successor
							organization if, for example, we transfer the
							ownership or operation of this Site to another
							organization or if we merge with another
							organization. If such a transfer occurs, the
							successor organization’s use of your information
							will still be subject to this Policy and the privacy
							preferences you have expressed to us.
						</Typography>
						<Typography variant='body2'>
							<b>
								To Comply with Laws and Protect Our Rights and
								the Rights of Others
							</b>
							. We may disclose your information when we, in good
							faith, believe disclosure is appropriate to comply
							with the law, a court order or a subpoena. We may
							also disclose your information to prevent or
							investigate a possible crime, such as fraud or
							identity theft; to protect the security of this
							Site; to enforce or apply our online Terms of
							Services or other agreements; or to protect our own
							rights or property or the rights, property or safety
							of our users or others.
						</Typography>
						<Typography variant='body2'>
							<b>
								As Described in a Privacy Notice or
								click-through agreement
							</b>
							. We reserve the right to disclose your information
							as described in any Privacy Notice posted on a page
							of this Site where you provide that information. By
							providing your information on that page you will be
							consenting to the disclosure of your information as
							described in that privacy notice. We also reserve
							the right to disclose your information as described
							in any click–through agreement to which you have
							agreed.
						</Typography>
					</div>
					<div>
						<Title>How We Protect Your Information</Title>
						<Typography variant='body2'>
							digpads takes reasonable precautions to provide a
							level of security appropriate to the sensitivity of
							the information we collect. Although we use
							reasonable measures to help protect your information
							against unauthorized use or disclosure, we cannot
							guarantee the security of information provided over
							the Internet or stored in our databases and will not
							be responsible for breaches of security beyond our
							reasonable control.
						</Typography>
					</div>
					<div>
						<Title>A Note About Children’s Privacy</Title>
						<Typography variant='body2'>
							You must be at least 13 years old to have our
							permission to use this Site. We do not knowingly
							collect, use or disclose personal information about
							visitors under 13 years of age. If you are under the
							age of 13, you can use this service only in
							conjunction with your parent’s or guardian’s
							permission.
						</Typography>
					</div>
					<div>
						<Title>Links to Other Websites</Title>
						<Typography variant='body2'>
							This Policy applies only to this Site. If you visit
							another digpads website, please take a moment to
							review the privacy policy posted on that site to
							learn what information may be collected through that
							site and how it is processed.
						</Typography>
						<Typography variant='body2'>
							This Site may also contain links to websites that
							are not operated by digpads or its affiliates. These
							links are provided for your reference and
							convenience only and do not imply any endorsement of
							the products sold or information provided through
							these websites, nor any association with their
							operators. digpads does not control these websites
							and is not responsible for their data practices. Any
							information you provide to third parties on their
							websites is covered under their privacy and data
							collection policies and is not covered by this
							Policy. We urge you to review the privacy policy
							posted on any site you visit before using the site
							or providing any personal information.
						</Typography>
					</div>
					<div>
						<Title>Access to Your Information</Title>
						<Typography variant='body2'>
							If you would like to review, correct and update the
							personal information you have provided to us through
							this Site, you may be able to do so at{' '}
							<Link to='/profile/basics'>
								https://www.digpads.com/profile/basics
							</Link>
							.
						</Typography>
						<Typography variant='body2'>
							Otherwise, please contact us by email at{' '}
							<Email>info@digpads.com</Email>. We will respond to
							your request within the time limit set out by the
							applicable privacy legislation. We will use
							reasonable efforts to comply with your request as
							required by applicable law.
						</Typography>
					</div>
					<div>
						<Title>Retention of Personal Information</Title>
						<Typography variant='body2'>
							digpads retains the personal information collected
							on this Site as long as necessary to provide the
							services, products and information you request or as
							permitted by applicable law.
						</Typography>
					</div>
					<div>
						<Title>
							This Site Is Hosted on Servers Located in the United
							States
						</Title>
						<Typography variant='body2'>
							digpads is a U.S. corporation. The servers that
							support this Site are located in the United States.
							While it is in our possession, your information will
							generally be stored in digpads databases or
							databases maintained by our third-party service
							providers on servers and data storage devices
							located in the United States. U.S. data protection
							laws may not provide as much protection as the data
							protection laws in force in some other countries,
							however, we will process your information in
							accordance with this Policy no matter where our data
							is stored. If you are located in a country outside
							the United States, by using this Site you consent to
							the transfer of your information to the United
							States.
						</Typography>
					</div>
					<div>
						<Title>Governing Law</Title>
						<Typography variant='body2'>
							This Policy shall be governed under the laws of the
							State of Missouri, United States of America without
							regard to its conflicts of law provisions.
						</Typography>
					</div>
					<div>
						<Title>
							Questions About This Policy or digpads’s Data
							Practices
						</Title>
						<Typography variant='body2'>
							If you have questions or concerns about this Policy,
							any Privacy Notice, or digpads’s data practices,
							please contact us by email at{' '}
							<Email>info@digpads.com</Email>.
						</Typography>
					</div>
				</Container>
			</Section>
		</PageWrapper>
	);
}
