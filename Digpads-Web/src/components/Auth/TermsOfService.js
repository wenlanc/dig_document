import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import PageWrapper from '../PageWrapper';
import { PageTitle, Banner } from '../styled/Page';

const Section = styled.section`
	padding: 2em 0;
	max-width: 1000px;
	margin: 0 auto;

	ul {
		list-style: disc;
		padding-left: 2em;
	}

	li {
		font-size: 10.5px;
	}
`;

const TermsTitle = styled(Typography).attrs(() => ({
	variant: 'subtitle1',
	component: 'h1',
}))`
	font-size: 16.5px;
	line-height: 1.3;
	margin-bottom: 1em;
	font-weight: bold;
`;

const TermsSubtitle = styled(Typography).attrs(() => ({
	variant: 'body2',
	component: 'h2',
}))`
	font-size: 12.5px;
	margin-bottom: 1.3em;
	font-weight: bold;
`;

const TermsText = styled(Typography).attrs(() => ({
	variant: 'caption',
	component: 'p',
}))`
	font-size: 10.5px;
	margin-bottom: 1em;
`;

const Email = styled.a.attrs((props) => ({
	href: `mailto: ${props.children}`,
}))``;

export default function TermsOfService() {
	return (
		<PageWrapper>
			<Banner>
				<PageTitle>Terms of Service</PageTitle>
			</Banner>

			<Section>
				<Container>
					<div>
						<TermsTitle>
							digpads ® Terms of Service<br></br>
							Effective Date: 03/25/2021
						</TermsTitle>
						<TermsText>
							Thank you for visiting this Site, which is owned and
							operated by digpads INC. These Terms of Use govern
							your use of this Site. Capitalized terms are defined
							below. digpads INC is a Wyoming registered company
							headquartered in Missouri.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Your Acceptance of These Terms of Use
						</TermsSubtitle>
						<TermsText>
							These Terms of Use apply to all users of this Site,
							whether or not you are a registered member. By using
							this Site you are agreeing to comply with and be
							bound by these Terms of Use. If you do not agree to
							these Terms of Use, you may not access or use this
							Site.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Your Acceptance of Our Privacy Policy
						</TermsSubtitle>
						<TermsText>
							By agreeing to these Terms of Use, you agree to the
							terms of our{' '}
							<Link to='/privacyPolicy'>Privacy Policy</Link> and
							to our{' '}
							<Link to='/commentPolicies'>
								Forum and Comment Policies and Rules
							</Link>
							, which is expressly incorporated herein. Before
							using this Site, please carefully review our Privacy
							Policy. All personal information provided to us as a
							result of your use of this Site will be handled in
							accordance with our Privacy Policy. To the extent
							there are inconsistencies between these Terms of Use
							and our Privacy Policy, these Terms of Use control.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Your Consent to Other Agreements
						</TermsSubtitle>
						<TermsText>
							When you use a special feature of this Site, you may
							be asked to agree to special or additional terms
							governing your use of the special feature. In such
							cases, you may be asked to expressly consent to the
							special terms, for example, by checking a box or
							clicking on a button marked “I agree.” This type of
							agreement is known as a “click-through” agreement.
							If any of the terms of the click-through agreement
							are different than the terms of these Terms of Use,
							the terms of the click-through agreement will
							supplement or amend these Terms of Use, but only
							with respect to the matters governed by the
							“click-through agreement.”
						</TermsText>
					</div>
					<div>
						<div>
							<TermsSubtitle>
								Ownership of this Site and its Content
							</TermsSubtitle>
							<TermsText>
								This Site, including all its Content are
								protected under applicable intellectual property
								and other laws, including without limitation the
								laws of the United States and other countries.
								All Content and intellectual property rights
								therein are the property of digpads or digpads’
								partners and is protected pursuant to applicable
								copyright and trademark laws, except as outlined
								below.
							</TermsText>
							<ul>
								<li>
									Your computer may temporarily store copies
									of such materials incidental to your
									accessing and viewing those materials.
								</li>
								<li>
									You may store files that are automatically
									cached by your Web browser for display
									enhancement purposes.
								</li>
								<li>
									You may print one copy of a reasonable
									number of pages of the Website for your own
									personal, non-commercial use and not for
									further reproduction, publication or
									distribution.
								</li>
							</ul>
							<TermsText>You may not:</TermsText>
							<ul>
								<li>
									Modify copies of any materials from the
									Website.
								</li>
								<li>
									Use any illustrations, photographs, video or
									audio sequences or any graphics separately
									from the accompanying text.
								</li>
								<li>
									Delete or alter any copyright, trademark or
									other proprietary rights notices from copies
									of materials from the Website.
								</li>
								<li>
									If you wish to make any use of material on
									the Website other than that set out in this
									section, please address your request to:
									info@digpads.com.
								</li>
							</ul>
							<TermsText>
								The presence of any Content on this Site does
								not constitute a waiver of any right in such
								Content. You do not acquire ownership rights to
								any such Content viewed through this Site.
								Except as otherwise provided herein, none of
								this Content may be used, copied, reproduced,
								distributed, republished, downloaded, modified,
								displayed, posted or transmitted in any form or
								by any means, including, but not limited to,
								electronic, mechanical, photocopying, recording,
								or otherwise, without our express prior written
								permission.
							</TermsText>
							<TermsText>
								Permission is hereby granted to the extent
								necessary to lawfully access and use this Site
								and to display, download, or print portions of
								this Site on a temporary basis and for your
								personal, educational, noncommercial use only,
								provided that you (i) do not modify the Content;
								(ii) you retain any and all copyright and other
								proprietary notices contained in the Content;
								and (iii) you do not copy or post the Content on
								any network computer or broadcast the Content in
								any media. All rights in and to the Site and
								Content not expressly granted are hereby
								reserved by digpads.
							</TermsText>
						</div>
					</div>
					<div>
						<TermsSubtitle>Trademarks</TermsSubtitle>
						<TermsText>
							The digpads names and logos (including, without
							limitation, those of its affiliates), all product
							and service names, all graphics, all button icons,
							and all trademarks, service marks and logos
							appearing within this Site, unless otherwise noted,
							are trademarks (whether registered or not), service
							marks and/or trade dress of digpads and/or its
							affiliates (the “digpads Marks”). All other
							trademarks, product names, company names, logos,
							service marks and/or trade dress mentioned,
							displayed, cited or otherwise indicated within this
							Site are the property of their respective owners.
							You are not authorized to display or use the digpads
							Marks in any manner without our prior written
							permission. You are not authorized to display or use
							trademarks, product names, company names, logos,
							service marks and/or trade dress of other owners
							featured within this Site without the prior written
							permission of such owners. The use or misuse of the
							digpads Marks or other trademarks, product names,
							company names, logos, service marks and/or trade
							dress or any other materials contained herein,
							except as permitted herein, is expressly prohibited.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Responsibility for User-Generated Content Posted on
							or Through this Site
						</TermsSubtitle>
						<TermsText>
							<em>
								You are responsible for User-Generated Content
								that you post
							</em>
							. Under no circumstances will we be liable in any
							way for any UGC.
						</TermsText>
						<TermsText>
							This means that you, not digpads, are entirely
							responsible for all UGC that you post and that you
							can be held personally liable for comments that are
							defamatory, obscene, or libelous, or that violate
							these Terms of Use, an obligation of
							confidentiality, or the rights of others. If any
							part of the UGC you post is not your original work,
							it is your responsibility to obtain any necessary
							permission to post it. Because we do not control the
							UGC posted on or through this Site, we cannot and do
							not warrant or guarantee the truthfulness,
							integrity, suitability, or quality of that UGC. You
							also agree and understand that by accessing this
							Site, you may encounter UGC that you may consider to
							be objectionable. We have no responsibility for any
							UGC, including without limitation any errors or
							omissions therein. We are not liable for any loss or
							damage of any kind you may claim was incurred as a
							result of the use of any UGC posted, emailed,
							transmitted or otherwise made available on or
							through this Site. The UGC posted on or through this
							Site expresses the personal opinions of the
							individuals who posted it and does not necessarily
							reflect the views of digpads or any person or entity
							associated with digpads.
						</TermsText>
						<TermsText>
							<em>
								<b>
									You own Your User-Generated Content, but we
									may use it
								</b>
							</em>
							. You own the copyright in any original UGC you
							post. We do not claim any copyrights in UGC.
							However, by using this Site you are granting us and
							our subsidiaries, affiliates, successors and
							assigns, a nonexclusive, fully paid, worldwide,
							perpetual, irrevocable, royalty-free, transferable
							license (with the right to sublicense through
							unlimited levels of sublicensees) to use, copy,
							modify, distribute, publicly display and perform,
							publish, transmit, remove, retain repurpose, and
							commercialize UGC you post in any and all media or
							form of communication whether now existing or
							hereafter developed, without obtaining additional
							consent, without restriction, notification, or
							attribution, and without compensating you in any
							way, and to authorize others to do the same. For
							this reason, we ask that you not post any UGC that
							you do not wish to license to us, including any
							photographs, videos, confidential information, or
							product ideas.
						</TermsText>
						<TermsText>
							digpads and its Partners reserve the right to
							display advertisements in connection with your UGC
							and to use your UGC for advertising and promotional
							purposes.
							<em>
								We may disclose and/or remove User-Generated
								Content
							</em>
							. digpads has certain rights. We have the right (but
							do not assume the obligation) to:
						</TermsText>
						<ul>
							<li>monitor all UGC;</li>
							<li>require that you avoid certain subjects;</li>
							<li>
								remove or block any UGC at any time without
								notice at our sole and absolute discretion;
							</li>
							<li>
								disclose any UGC and the identity of the user
								who posted it in response to a subpoena or
								whenever we believe that disclosure is
								appropriate to comply with the law or a court
								order, to prevent or investigate a possible
								crime or other violation of law, to protect the
								rights of digpads or others, or to enforce these
								Terms of Use; and
							</li>
							<li>
								terminate your access to and use of this Site,
								or to modify, edit or block your transmissions
								thereto, for any reason and in our sole
								discretion.
							</li>
						</ul>
						<TermsText>
							You agree that our exercise of such discretion shall
							not render us the owners of UGC you post, and that
							you will retain ownership thereof as described
							above.
						</TermsText>
						<TermsText>
							<em>
								<b>Restrictions on User-Generated Content</b>
							</em>
							. It is a condition of these Terms of Use that you
							do not:
						</TermsText>
						<ul>
							<li>
								upload, post, transmit or otherwise make
								available
							</li>
							<li>
								any UGC that is unlawful, harmful, hateful,
								threatening, abusive, harassing, libelous,
								defamatory, obscene, vulgar, pornographic,
								profane, racially disparaging, indecent, or
								invasive of another’s privacy;
							</li>
							<li>
								any UGC that constitutes or encourages activity
								illegal under criminal or civil law;
							</li>
							<li>
								any UGC that is false, misleading, or
								fraudulent;
							</li>
							<li>
								any UGC that you do not have a right to make
								available under any law or under contractual or
								fiduciary relationships (such as inside
								information or proprietary and confidential
								information learned or disclosed as part of
								employment relationships or under nondisclosure
								agreements);
							</li>
							<li>
								any UGC that violates or infringes upon the
								rights of others, including UGC which violates
								the patent rights, copyrights, trademark rights,
								privacy rights, publicity rights, trade secret
								rights, confidentiality rights, contract rights,
								or any other rights of any individual, living or
								deceased, or any legal entity;
							</li>
							<li>
								any UGC that contains the image, name or
								likeness of anyone other than yourself, unless
								(i) that person is at least eighteen years old
								and you have first obtained his/her express
								permission or (ii) that person is under eighteen
								years old but you are his/her parent or legal
								guardian;
							</li>
							<li>
								any request for or solicitation of any personal
								or private information from any individual to
								the extent such request is not consistent with
								the networking goals of this Site;
							</li>
							<li>
								any request for or solicitation of money, goods,
								or services for private gain;
							</li>
							<li>
								any UGC that contains advertising, promotions or
								marketing, or which otherwise has a commercial
								purpose, except for those portions or features
								of the Site that expressly intend to allow
								advertising, promoting, or marketing Your
								services, products or business. ;
							</li>
							<li>
								any material that contains software viruses or
								any other computer code, files or programs
								designed to interrupt, destroy or limit the
								functionality of any computer software or
								hardware or telecommunications equipment; or
							</li>
							<li>
								impersonate any person or entity or falsely
								state or otherwise misrepresent your affiliation
								with a person or entity; or
							</li>
							<li>
								violate any local, state, national or
								international law, rule or regulation.
							</li>
						</ul>
						<TermsText>
							By posting User-Generated Content, you represent and
							warrant that (i) you own or otherwise control all of
							the rights to the UGC and have the right to grant
							the license set forth in these Terms of Use; (ii)
							the UGC is accurate, and (iii) you have read and
							understood—and your UGC fully complies with—these
							Terms of Use and applicable laws and will not cause
							injury to any person or entity.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Removal of Content</TermsSubtitle>
						<TermsText>
							<em>
								<b>In general</b>
							</em>
							. You can seek removal of objectionable UGC, and
							lodge complaints against particular users, by
							contacting us at
							<Link to='/contact'>
								http://www.digpads.com/contact
							</Link>
							. We will endeavor to review such requests and to
							remove UGC and users that we determine should be
							removed, in our sole discretion and in accordance
							with these Terms of Use and applicable law. However,
							by providing a mechanism for the submission of
							complaints, we make no promises that we will review
							all such complaints or that we will take any action
							in response to such complaints. Please be aware,
							however, that if the UGC has already been
							distributed to other websites or published in other
							media, we will not be able to recapture and delete
							it. Also, a back-up or residual copy of the UGC we
							remove from this Site may remain on back-up servers.
						</TermsText>
						<TermsText>
							<em>
								<b>Violation of copyrights</b>
							</em>
							. digpads does not knowingly violate or permit
							others to violate the copyrights of others. We will
							promptly remove or disable access to material that
							we know is infringing or if we become aware of
							circumstances from which infringing activity is
							apparent. If you are requesting removal of content
							because of a violation of your copyrights, please
							note that the Digital Millennium Copyright Act of
							1998 (the “DMCA”) provides recourse for copyright
							owners who believe that material appearing on the
							Internet infringes their rights under U.S. copyright
							law. If you believe that your own work, or the work
							of a third party for whom you are authorized to act,
							is featured on this Site or has been otherwise
							copied and made available on this Site in a manner
							that constitutes copyright infringement, please
							notify us immediately. Your notice must be in
							writing and must include
						</TermsText>
						<ul>
							<li>
								an electronic or physical signature of the
								copyright owner or of the person authorized to
								act on behalf of the owner of the copyright
								interest;
							</li>
							<li>
								a description of the copyrighted work that you
								claim has been infringed;
							</li>
							<li>
								a description of where the material that you
								claim is infringing is located on this Site
								(including the URL, title and/or item number if
								applicable, or other identifying
								characteristics);
							</li>
							<li>
								your name, address, telephone number, and email
								address, and, if you are not the owner of the
								copyright, the name of the owner; and
							</li>
							<li>
								a written statement by you that you have a
								good-faith belief that the disputed use is not
								authorized by the copyright owner, its agent, or
								the law; and
							</li>
							<li>
								a statement by you, made under penalty of
								perjury, that the above information in your
								notice is accurate and that you are the
								copyright owner or authorized to act on the
								copyright owner's behalf.
							</li>
						</ul>
						<TermsText>
							Your statement must be addressed as follows:
						</TermsText>
						<TermsText>
							Copyright Agent<br></br>
							digpads INC (℅ Andrew Polacek)<br></br>
							2209 Cherokee St.<br></br>
							St. Louis, MO 63118<br></br>
							<Email>info@digpads.com</Email>
						</TermsText>
						<TermsText>
							Any notification by a copyright owner or a person
							authorized to act on its behalf that fails to comply
							with requirements of the DMCA shall not be
							considered sufficient notice and shall not be deemed
							to confer upon us actual knowledge of facts or
							circumstances from which infringing material or acts
							are evident.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Your Feedback</TermsSubtitle>
						<TermsText>
							Although we do not claim ownership of User-Generated
							Content you post using this Site, the Feedback you
							provide to us through this Site will be and remain
							our exclusive property. Your submission of Feedback
							will constitute an assignment to us of all worldwide
							rights, title and interests in your Feedback,
							including all copyrights and other intellectual
							property rights in your Feedback. We will be
							entitled to reduce to practice, exploit, make, use,
							copy, disclose, display or perform publicly,
							distribute, improve and modify any Feedback you
							submit for any purpose whatsoever, without
							restriction and without compensating you in any way.
							For this reason, we ask that you not send us any
							Feedback that you do not wish to assign to us.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Your Obligations</TermsSubtitle>
						<TermsText>
							In consideration of your use of this Site, you agree
							that to the extent you provide personal information
							to digpads it will be true, accurate, current, and
							complete and that you will update all personal
							information as necessary. You also agree that you
							will use an image of yourself that you are
							authorized to use for your profile picture. Company
							logos may only be posted by authorized
							representatives of the respective company.
						</TermsText>
						<TermsText>
							To the extent you create an account through this
							Site, you understand and agree that any account you
							create, including your username and password, are
							personal to you and may not be used by anyone else.
							You are responsible for maintaining the
							confidentiality of your username and password and
							are fully responsible for all activities that occur
							under your username and password by you or by anyone
							else using your username and password, whether or
							not authorized by you. You agree to change your
							password immediately if you believe your password
							may have been compromised or used without
							authorization. You also agree to immediately inform
							us of any apparent breaches of security such as
							loss, theft or unauthorized disclosure or use of
							your username or password by contacting us using the
							information provided here:{' '}
							<Link to='/contact'>
								http://www.digpads.com/contact
							</Link>
							. Until we are so notified you will remain liable
							for any unauthorized use of your account.
						</TermsText>
						<TermsText>
							You agree to use this Site in accordance with any
							and all applicable rules and regulations. You agree
							not to upload or transmit through this Site any
							computer viruses, trojan horses, worms or anything
							else designed to interfere with, interrupt or
							disrupt the normal operating procedures of a
							computer. Any unauthorized modification, tampering
							or change of any information; any interference with
							the availability of or access to this Site; or any
							unauthorized scraping of the Content on this Site is
							strictly prohibited. We reserve all rights and
							remedies available to us, including but not limited
							to the right to terminate your access to this Site.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Calculators, Analysis Tools & Advise
						</TermsSubtitle>
						<TermsText>
							The calculators, spreadsheets, & analysis tools
							found on this Site (“Tools”) are designed to be used
							for informational and educational purposes only and
							do not constitute investment or financial advice.
							digpads recommends that you: (a) seek the advice of
							professional advisors, including real estate
							professionals, before making any type of investment
							or real estate decision (including, without
							limitation, the purchase of or investment in real
							estate), and (b) independently verify any
							calculation or output obtained from a Tool. Your use
							of Tools and Content found on the Site is at your
							own risk. The results from Tools and Content
							presented may not reflect the actual return of your
							own investments. digpads is not responsible for the
							consequences of any decisions or actions taken in
							reliance upon or as a result of the information
							provided by these Tools. Furthermore, digpads is not
							responsible for any human or mechanical errors or
							omissions.
						</TermsText>
						<TermsText>
							Additionally, digpads may offer opportunities to
							receive feedback or information directly or
							indirectly from digpads’s personnel (“Feedback”).
							The Feedback is informational in nature and are not
							legal, financial, real estate, or tax advice, and
							digpads is not engaged in the provision of legal,
							tax or any other advice. You should seek your own
							advice from professional advisors, including lawyers
							and accountants, regarding the legal, tax, and
							financial implications of any real estate
							transaction you contemplate. digpads does not make,
							and hereby disclaims, any representations and
							warranties regarding the content of the Feedback,
							whether express or implied, including implied
							warranties of merchantability or fitness for a
							particular purpose. You use the advice and
							information provided in the Feedback at your own
							risk. digpads hereby disclaims any liability to you
							for any loss, damage, or cost arising from or
							related to the Feedback, including, without
							limitation, the accuracy, appropriateness, quality,
							or completeness of the information provided in the
							Feedback, regardless of the cause. digpads is not
							liable or responsible to you with respect to any
							lost profits, loss or damage, including, without
							limitation, incidental, indirect, or consequential
							damages caused, or alleged to have been caused,
							directly or indirectly, by the Feedback.
						</TermsText>
						<TermsText>
							<em>
								<b>Termination</b>
							</em>
							. digpads may terminate this license upon written
							notice (where email is acceptable) to you in the
							event you breach any term or condition in this
							section. Upon termination of this license you shall
							permanently delete all copies of the BP eBook in
							your possession or control.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Landlord Tools, digpads Scribe &amp; Scribe +
						</TermsSubtitle>
						<TermsText>
							<b>digpads Landlord Tools, Scribe or Scribe +</b>.
							If you use digpads’ Landlord Tools, Scribe, and/or
							Scribe+ you accept the Terms of the digpads’
							Landlord Tools, Scribe or Scribe + Schedule below.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Fees and Payments</TermsSubtitle>
						<TermsText>
							digpads members may utilize the free services as
							long as they like with no pressure to upgrade so
							long as they are being utilized in accordance with
							their stated purpose and not in connection with
							illegal or unethical behavior. digpads reserves the
							right to terminate free service to any user for any
							reason at any time if we deem their behavior to be
							against community, societal or company interests.
						</TermsText>
						<TermsText>
							If users elect to upgrade their account to a level
							that requires payment or to purchase another
							subscription service offered by digpads they are
							charged a subscription fee for the use of said
							services. digpads reserves the right to change the
							fees at any time, upon notice to you. By registering
							for a paid account level, or other subscription
							service, you agree to pay digpads the fees for the
							services applicable to the account level chosen. For
							any upgrade or downgrade in plan level, the credit
							card that you provided will automatically be charged
							at the new rate immediately.
						</TermsText>
						<TermsText>
							All fees are paid in advance and are non-refundable.
							There will be no refunds or credits for partial
							months of service, upgrade/downgrade refunds,
							refunds for accounts that have had access to
							particular services restricted, refunds for accounts
							that have had upgrades canceled for any reason
							including violations of these Terms, or refunds for
							months unused.
						</TermsText>
						<TermsText>
							We reserve the right to deactivate your access to
							the services for your failure to pay applicable fees
							or for violations of these Terms. If you provide us
							with a credit card that expires during the term of
							these Terms of Service, we reserve the right to
							charge any renewal card issued to you as a
							replacement. You agree to promptly pay digpads in
							the event of any refusal of your credit card issuer
							to pay any amount to digpads for any reason. You
							agree to pay all costs of collection, including
							attorneys’ fees and costs, on any outstanding
							balance. In the event you fail to pay any amount
							when due, digpads may immediately suspend or
							terminate your access to any or all of our services.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Automatic Renewal</TermsSubtitle>
						<TermsText>
							Your paid account level or paid subscription will
							renew automatically, unless you cancel your
							subscription (see Cancellation on how to cancel).
							You must cancel your subscription before the
							calendar day it renews (the day of the month you are
							to be charged) to avoid billing of the subscription
							fees for the renewal term to your credit card.
							Additionally, we may terminate your subscription for
							a violation of these Terms.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Promotional or Trial Period Pricing
						</TermsSubtitle>
						<TermsText>
							We may elect to offer free or discounted pricing for
							use of paid account levels or other subscription
							services (a "Trial"). If you do not cancel your
							subscription prior to the expiration of the Trial,
							then your credit card will be billed for the
							subscription fees. You agree to comply with any
							additional terms, restrictions or limitations we
							impose in connection with any Trial. You may not
							sign-up for multiple Accounts in order to receive
							additional benefits under any Trial.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Cancellation</TermsSubtitle>
						<TermsText>
							You may cancel your subscription(s) at any time by
							logging into your digpads account, going to your
							account preferences and clicking on the "Please
							cancel my digpads account" link. Other subscriptions
							may be cancelled via the settings on the pages
							associated with their features. If you cancel the
							services before the last day of your current paid up
							month, your cancellation will take effect
							immediately and you will not be charged again.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Disclaimers</TermsSubtitle>
						<TermsText>
							WE MAKE NO REPRESENTATIONS OR WARRANTIES WITH
							RESPECT TO THIS SITE OR ITS CONTENT, OR ANY TOOL,
							FEEDBACK, PRODUCT, OR SERVICE AVAILABLE ON OR
							PROMOTED THROUGH THIS SITE, INCLUDING PRODUCTS OR
							SERVICES FROM THIRD-PARTIES. THIS SITE, ALL TOOLS,
							ANY FEEDBACK, AND ALL OF ITS CONTENT (INCLUDING
							USER-GENERATED CONTENT) ARE PROVIDED ON AN “AS IS,”
							“AS AVAILABLE” BASIS, WITHOUT REPRESENTATIONS OR
							WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT
							PERMITTED BY LAW, digpads, ITS AFFILIATES, AND THEIR
							SERVICE PROVIDERS AND LICENSORS DISCLAIM ANY AND ALL
							REPRESENTATIONS AND WARRANTIES, WHETHER EXPRESS,
							IMPLIED, ARISING BY STATUTE, CUSTOM, COURSE OF
							DEALING, COURSE OF PERFORMANCE OR IN ANY OTHER WAY,
							WITH RESPECT TO THIS SITE, ITS CONTENT, TOOLS, ANY
							FEEDBACK, AND ANY PRODUCTS OR SERVICES AVAILABLE OR
							PROMOTED THROUGH THIS SITE. WITHOUT LIMITING THE
							GENERALITY OF THE FOREGOING, digpads, ITS
							AFFILIATES, AND THEIR SERVICE PROVIDERS AND
							LICENSORS DISCLAIM ALL REPRESENTATIONS AND
							WARRANTIES (A) OF TITLE, NON-INFRINGEMENT,
							MERCHANTABILITY AND FITNESS FOR A PARTICULAR
							PURPOSE; (B) RELATING TO THE SECURITY OF THIS SITE;
							(C) THAT THE CONTENT OF THIS SITE, FEEDBACK, OR ANY
							TOOLS ARE ACCURATE, COMPLETE OR CURRENT; OR (D) THAT
							THIS SITE WILL OPERATE SECURELY OR WITHOUT
							INTERRUPTION OR ERROR. YOUR USE OF ALL TOOLS AND
							FEEDBACK IS AT YOUR OWN RISK.
						</TermsText>
						<TermsText>
							WE DO NOT REPRESENT OR WARRANT THAT THIS SITE, ITS
							SERVERS, OR ANY TRANSMISSIONS SENT FROM US OR
							THROUGH THIS SITE WILL BE FREE OF ANY HARMFUL
							COMPONENTS (INCLUDING VIRUSES).
						</TermsText>
						<TermsText>
							digpads DOES NOT ENDORSE AND IS NOT RESPONSIBLE FOR
							STATEMENTS, ADVICE AND OPINIONS MADE BY ANYONE OTHER
							THAN AUTHORIZED digpads SPOKESPERSONS. WE DO NOT
							ENDORSE AND ARE NOT RESPONSIBLE FOR ANY STATEMENTS,
							ADVICE OR OPINIONS CONTAINED IN USER-GENERATED
							CONTENT AND SUCH STATEMENTS, ADVICE AND OPINIONS DO
							NOT IN ANY WAY REFLECT THE STATEMENTS, ADVICE AND
							OPINIONS OF digpads. WE DO NOT MAKE ANY
							REPRESENTATIONS OR WARRANTIES AGAINST THE
							POSSIBILITY OF DELETION, MISDELIVERY OR FAILURE TO
							STORE COMMUNICATIONS, PERSONALIZED SETTINGS, OR
							OTHER DATA. YOU ACCEPT THAT OUR SHAREHOLDERS,
							OWNERS, OFFICERS, DIRECTORS, EMPLOYEES AND OTHER
							REPRESENTATIVES SHALL HAVE THE BENEFIT OF THIS
							CLAUSE. IN ADDITION, digpads MAKES NO
							REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE
							RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, OR
							AVAILABILITY OF ANY SERVICES OR GOODS OFFERED BY
							THIRD PARTIES.
						</TermsText>
						<TermsText>
							APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OF
							CERTAIN WARRANTIES, SO ALL OR PART OF THIS
							DISCLAIMER OF WARRANTIES MAY NOT APPLY TO YOU.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Limitation Of Liability</TermsSubtitle>
						<TermsText>
							TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAWS
							WE, ON BEHALF OF OUR DIRECTORS, OFFICERS, EMPLOYEES,
							AGENTS, SUPPLIERS, LICENSORS AND SERVICE PROVIDERS,
							EXCLUDE AND DISCLAIM LIABILITY FOR ANY LOSSES AND
							EXPENSES OF WHATEVER NATURE AND HOWSOEVER ARISING
							INCLUDING, WITHOUT LIMITATION, ANY DIRECT, INDIRECT,
							GENERAL, SPECIAL, PUNITIVE, INCIDENTAL OR
							CONSEQUENTIAL DAMAGES; LOSS OF USE; LOSS OF DATA;
							LOSS CAUSED BY A VIRUS; LOSS OF INCOME OR PROFIT;
							LOSS OF OR DAMAGE TO PROPERTY; CLAIMS OF THIRD
							PARTIES; EMOTIONAL DISTRESS; OR OTHER LOSSES OF ANY
							KIND OR CHARACTER, EVEN IF WE HAVE BEEN ADVISED OF
							THE POSSIBILITY OF SUCH DAMAGES OR LOSSES, ARISING
							OUT OF OR IN CONNECTION WITH THE USE OF THIS SITE.
							YOU ASSUME TOTAL RESPONSIBILITY FOR ESTABLISHING
							SUCH PROCEDURES FOR DATA BACKUP AND VIRUS CHECKING
							AS YOU CONSIDER NECESSARY. THIS LIMITATION OF
							LIABILITY APPLIES WHETHER THE ALLEGED LIABILITY IS
							BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE),
							STRICT LIABILITY OR ANY OTHER BASIS.
						</TermsText>
						<TermsText>
							IF ANY PART OF THIS LIMITATION ON LIABILITY IS FOUND
							TO BE INVALID OR UNENFORCEABLE FOR ANY REASON, THEN
							THE AGGREGATE LIABILITY OF THE RELEASED PARTIES FOR
							LIABILITIES THAT OTHERWISE WOULD HAVE BEEN LIMITED
							SHALL NOT EXCEED TEN DOLLARS ($10.00).
						</TermsText>
						<TermsText>
							This Site gives you specific legal rights and you
							may also have other rights which vary from country
							to country. Some jurisdictions do not allow certain
							kinds of limitations or exclusions of liability, so
							the limitations and exclusions set out in these
							Terms of Use may not apply to you. Other
							jurisdictions allow limitations and exclusions
							subject to certain conditions. In such a case the
							limitations and exclusions set out in these Terms of
							Use shall apply to the fullest extent permitted by
							the laws of such applicable jurisdictions. Your
							statutory rights as a consumer, if any, are not
							affected by these provisions, and we do not seek to
							exclude or limit liability for fraudulent
							misrepresentation.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Links to Third-Party Websites
						</TermsSubtitle>
						<TermsText>
							This Site may: (a) provide links to other websites
							operated by third parties, or (b) allow you to
							interact with third party businesses. These
							third-parties may also be digpads members. Because
							we have no control over third-party websites or
							businesses, we are not responsible for the
							availability of those websites and do not endorse
							and are not responsible or liable for any services,
							products, content, advertising, services, products,
							or other materials on or available from such third
							parties, including their websites. digpads does not
							endorse any third-party business or website, and in
							no event shall digpads be responsible or liable for
							any products or services of such third parties.
							digpads shall not be responsible or liable, directly
							or indirectly, for any damage or loss caused or
							alleged to be caused by or in connection with the
							use of or reliance on any content, advertising,
							services, products, or other materials on or
							available from such third parties or their websites.
							These Terms of Use do not apply to your use of
							third-party websites; your use of such websites is
							subject to the terms and policies of the owner of
							such websites.
						</TermsText>
						<TermsText>
							digpads has financial relationships with some of the
							companies, products, and services mentioned on our
							site, and may be compensated if users choose to
							follow the links pointing to those companies,
							products or services.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Automated Calls, Text Messages and Direct Mail
						</TermsSubtitle>
						<TermsText>
							<b>Program Description</b>. digpads provides a
							matching service whereby the consumer provides
							information in connection with being matched with a
							desired service or product. As part of this service,
							you may be contacted by digpads or by the brand with
							whom you have been matched pursuant to your request
							and provision of information on the digpads Website.
						</TermsText>
						<TermsText>
							<b>Consent</b>. When you provide your information on
							the digpads Website, you consent to be contacted via
							automated text message, automatic telephone dialing
							system, or by artificial/prerecorded message at the
							telephone number you provide, and/or by receiving
							email at the email address you provide and/or direct
							mail from digpads or the brand with which you have
							been matched for the desired product or service.
						</TermsText>
						<TermsText>
							You expressly consent to receive automated calls,
							text messages, and/or email regardless of whether
							you are on any Federal or state DNC (“Do Not Call”)
							registry or similar list or registry. If you provide
							your information and we contact you, or you contact
							us, we may keep a record, including but not limited
							to telephone recordings, call logs, text logs and
							emails, of your interaction with digpads.
						</TermsText>
						<TermsText>
							<b>Opting Out</b>. You may revoke your consent for
							us to contact you by autodialed call, text message,
							or direct mail at any time. If you no longer wish to
							receive such communications from digpads, you may
							opt out by info@digpads.com along with the subject
							line “Opt-Out”. To opt out of receiving text
							messages from digpads at any time, text STOP to the
							short code from which the text message was sent to
							the enrolled mobile device. A confirmation message
							of your opt out will be sent to your mobile number
							but no additional messages will be sent to you
							unless you opt in again.
						</TermsText>
						<TermsText>
							<b>Cost &amp; Carriers</b>. digpads does not charge
							for toll free calls. However, you may be charged for
							the minutes you use by your mobile carrier,
							depending on your wireless plan.
						</TermsText>
						<TermsText>
							Standard message and data rates may apply. These
							rates may be changed by your mobile service provider
							and payable by you to that provider. digpads.com
							does not impose a separate fee for sending SMS
							messages.
						</TermsText>
						<TermsText>
							The content in these messages may not be available
							and viewable on all carriers. Participating carriers
							include T-Mobile®, Verizon Wireless, AT&T, Sprint,
							Boost, U.S. Cellular®, MetroPCS, Virgin Mobile, and
							Cricket. Mobile carriers are not liable for delayed
							or undeliverable messages.
						</TermsText>
						<TermsText>
							<b>Help</b>. For help with this texting program,
							text HELP to the short code from which the message
							was sent to the enrolled mobile device. A
							confirmation message of your HELP request will be
							sent to your mobile number along with a link/url to
							a dedicated webpage on digpads with additional
							information that may help resolve your issue.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Geographic Limitations</TermsSubtitle>
						<TermsText>
							The owner of the Website is based in the state of
							Missouri in the United States. We provide this
							Website for use only by persons located in the
							United States. We make no claims that the Website or
							any of its content is accessible or appropriate
							outside of the United States. Access to the Website
							may not be legal by certain persons or in certain
							countries. If you access the Website from outside
							the United States, you do so on your own initiative
							and are responsible for compliance with local laws.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Modification, Discontinuation, and Termination
						</TermsSubtitle>
						<TermsText>
							We reserve the right at any time and from
							time-to-time to modify, edit, delete, suspend or
							discontinue, temporarily or permanently this Site
							(or any portion thereof) and/or the information,
							materials, products and/or services available
							through this Site (or any part thereof) with or
							without notice. You agree that we shall not be
							liable to you or to any third party for any such
							modification, editing, deletion, suspension or
							discontinuance of this Site.
						</TermsText>
						<TermsText>
							You also agree that digpads, in its sole discretion,
							may terminate your password, account (or any part
							thereof), or use of this Site for any reason,
							including, without limitation, for lack of use or if
							digpads believes that you have violated or acted
							inconsistently with the letter or spirit of these
							Terms of Use. You agree that any termination of your
							access to this Site under any provision of these
							Terms of Use may be effected without prior notice,
							and acknowledge and agree that digpads may
							immediately deactivate or delete your account and
							all related information in your account and/or bar
							any further access to this Site. Further, you agree
							that digpads shall not be liable to you or any
							third-party for any termination of your access to
							this Site.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Waiver</TermsSubtitle>
						<TermsText>
							Our failure at any time to require performance of
							any provision of these Terms of Use or to exercise
							any right provided for herein will not be deemed a
							waiver of such provision or such right. All waivers
							must be in writing. Unless the written waiver
							contains an express statement to the contrary, no
							waiver by digpads of any breach of any provision of
							these Terms of Use or of any right provided for
							herein will be construed as a waiver of any
							continuing or succeeding breach of such provision, a
							waiver of the provision itself, or a waiver of any
							right under these Terms of Use.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Severability</TermsSubtitle>
						<TermsText>
							If any provision of these Terms of Use is held by a
							court of competent jurisdiction to be contrary to
							law, such provision will be changed and interpreted
							so as to best accomplish the objectives of the
							original provision to the fullest extent allowed by
							law and the remaining provisions of these Terms of
							Use will remain in full force and effect.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Governing Law, Jurisdiction and Venue
						</TermsSubtitle>
						<TermsText>
							These Terms of Use will be governed under the laws
							of the State of Missouri without regard to its
							conflicts of law provisions. All actions or
							proceedings arising out of or relating to these
							Terms of Use will be venued exclusively in state or
							federal court in the County of St. Louis, Missouri.
							You hereby irrevocably consent and submit to the
							personal jurisdiction of said courts for all such
							purposes. However, we retain the right to bring
							legal proceedings in any jurisdiction where we
							believe that infringement of these Terms of Use is
							taking place or originating.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Disputes Resolved Through Binding Arbitration
						</TermsSubtitle>
						<TermsText>
							Missouri law, without regard to the conflict of law
							principles thereof, and controlling U.S. federal law
							govern any action related to the Terms of Use, the
							Websites and/or the Services.
						</TermsText>
						<TermsText>
							You and digpads agree to arbitrate all disputes
							between you and digpads, except for disputes
							relating to the enforcement of digpads intellectual
							property. Any disputes between you and digpads
							relating to the Terms of Use, the Services and/or
							the Web sites must be resolved exclusively through
							binding arbitration pursuant to JAMS Comprehensive
							Arbitration Rules and Procedures (including Interim
							Measures), or in small claims court in St. Louis
							County, Missouri. In the event of a dispute, you or
							digpads must send to the other party a notice of
							dispute, in writing, setting forth the name, address
							and contact information of the party giving notice,
							the facts of the dispute and relief requested. You
							may initiate proceedings by sending digpads notice
							to the following address:
						</TermsText>
						<TermsText>
							digpads INC<br></br>
							c/o Andrew D. Polacek<br></br> 2209 Cherokee St
							<br></br>
							St. Louis, MO 63118<br></br>
							<Email>info@digpads.com</Email>
							<br></br>
							314-329-0033
						</TermsText>
						<TermsText>
							We will send any notice of dispute to you at the
							contact information we have for you. You and digpads
							agree to try to attempt to resolve a dispute through
							informal negotiation upon notice of a dispute for a
							period of 60 days. If you and digpads do not resolve
							the dispute in such 60 day time period or in small
							claims court, then you or digpads may commence
							arbitration. You and digpads agree that a dispute
							will be heard before a neutral single arbitrator,
							whose decision will be final, except for a limited
							right of appeal under the U.S. Federal Arbitration
							Act. YOU ARE GIVING UP THE RIGHT TO LITIGATE A
							DISPUTE IN A COURT OF LAW BEFORE A JUDGE OR JURY. In
							addition, you and digpads agree that the following
							rules shall apply to the arbitration proceedings:
							(a) the arbitration shall be conducted, at the
							option of the party seeking relief, by telephone,
							online, or based solely on written submissions; and
							(b) any judgment on the award rendered by the
							arbitrator may be entered in any court of competent
							jurisdiction.
						</TermsText>
						<TermsText>
							If you initiate arbitration, your arbitration fees
							will be limited to the filing fee set forth in the
							JAMS Arbitration Rules. Unless the arbitrator finds
							the arbitration was frivolous or brought for an
							improper purpose, digpads will pay all other
							arbitration fees and expenses.
						</TermsText>
						<TermsText>
							To the fullest extent permitted by applicable law,
							NO ARBITRATION OR CLAIM RELATING TO OR UNDER THESE
							TERMS OF USE SHALL BE JOINED TO ANY OTHER
							ARBITRATION OR CLAIM, INCLUDING ANY ARBITRATION OR
							CLAIM INVOLVING ANY OTHER CURRENT OR FORMER USER OF
							THE SERVICES AND/OR THE WEB SITES, AND NO CLASS
							ACTION ARBITRATION PROCEEDINGS OR ANY PROCEEDINGS IN
							WHICH EITHER PARTY ACTS OR PROPOSES TO ACT IN A
							REPRESENTATIVE CAPACITY SHALL BE PERMITTED.
							PROCEEDINGS TO RESOLVE OR LITIGATE A DISPUTE IN ANY
							FORUM WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS.
						</TermsText>
						<TermsText>
							In no event shall any claim, action or proceeding by
							you or digpads related in any way to the Terms of
							Use, the Services and/or the Web sites be instituted
							more than one (1) year after the cause of action
							arose.
						</TermsText>
						<TermsText>
							If a court of competent jurisdiction finds these
							arbitration provisions invalid or inapplicable, you
							agree to the exclusive jurisdiction of the Federal
							and State courts located in St. Louis County,
							Missouri, and you agree to submit to the exercise of
							personal jurisdiction of such courts for the
							purposes of litigating any applicable claim or
							action.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Indemnity</TermsSubtitle>
						<TermsText>
							You agree to indemnify and hold digpads, its
							subsidiaries, and affiliates, and their respective
							officers, agents, partners and employees, harmless
							from any loss, liability, claim, or demand,
							including reasonable attorneys’ fees, made by any
							third party due to or arising out of your use of
							this Site in violation of these Terms of Use and/or
							arising from a breach of these Terms of Use and/or
							any breach of your representations and warranties
							set forth above and/or if any material that you post
							using this Site causes us to be liable to another.
							We reserve the right to defend any such claim, and
							you agree to provide us with such reasonable
							cooperation and information as we may request.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							These Terms of Use May Change
						</TermsSubtitle>
						<TermsText>
							These Terms of Use are current as of the effective
							date set forth above. digpads reserves the right to
							change these Terms of Use from time to time
							consistent with applicable laws. These changes will
							be effective as of the date we post the revised
							version on this Site. Your continued use of this
							Site after we have posted the revised Terms of Use
							constitutes your agreement to be bound by the
							revised Terms of Use. If at any time you choose not
							to accept these Terms of Use, you should not use
							this Site.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Entire Agreement</TermsSubtitle>
						<TermsText>
							These Terms of Use (together with our Privacy Policy
							and any Privacy Notices or click-through agreements
							applicable to you) contain the entire understanding
							and agreement between you and digpads with respect
							to this Site and supersede all previous
							communications, negotiations, and agreements,
							whether oral, written, or electronic, between you
							and digpads with respect to this Site and your use
							of this Site.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Definitions</TermsSubtitle>
						<TermsText>
							<em>The terms “digpads” “we,” “us,” and “our”</em>{' '}
							refer to digpads, INC.
						</TermsText>
						<TermsText>
							<em>The term “Content”</em> refers to (a) all of the
							software and code comprising or used to operate this
							Site, and (b) all of the text, content, data,
							analysis, photographs, images, illustrations,
							graphics, sound recordings, video and audio-video
							clips, and other materials available on this Site,
							including User-Generated Content and Feedback.
						</TermsText>
						<TermsText>
							<em>The term “Feedback”</em> refers to the Content
							you post on or through this Site that is
							specifically about how we can improve this Site and
							the products and services we make available through
							this Site.
						</TermsText>
						<TermsText>
							<em>The term “including”</em> means “including, but
							not limited to.<em>”The term “Site”</em> refers to
							the website located at digpads.com and owned by
							digpads, INC.
						</TermsText>
						<TermsText>
							<em>The terms “User-Generated Content” or “UGC”</em>{' '}
							refer to: (a) your publicly available profile
							information and (b) all content, materials, and
							information that you post, publish, or upload to the
							Site, including, without limitation, through any
							social networking tools available on the Site. UGC
							does not include “Feedback.”
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							SERVICE SCHEDULE for digpads’ Landlord Tools, Scribe
							or Scribe +
						</TermsSubtitle>
						<TermsText>
							This Service Schedule was last updated on March 27,
							2021. Unless otherwise defined in this Service
							Schedule, capitalized terms will have the meaning
							given to them in the Terms.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>Definitions</TermsSubtitle>
						<TermsText>
							“Landlord Tools” - Landlord Tools includes free and
							paid document storage, document management, document
							uploading, document downloading, document
							transmission, document sharing, messaging, and other
							services connected to the process of tenant
							screening, tenant due diligence, property
							management, and tenant satisfaction and ongoing
							communication services.
						</TermsText>
						<TermsText>
							“digpads Scribe” means the free, no cost on-demand
							electronic signature digpads Service, which provides
							online display, certified delivery, acknowledgement,
							electronic signature, and storage services for
							eDocuments via the Internet.
						</TermsText>
						<TermsText>
							“Scribe +” - means the premium paid on-demand
							electronic signature digpads Service, which provides
							online display, certified delivery, acknowledgement,
							electronic signature, and storage services for
							eDocuments via the Internet.
						</TermsText>
						<TermsText>
							“Envelope” means an electronic record containing one
							or more eDocuments consisting of a single page or a
							group of pages of data uploaded to the System.
						</TermsText>
						<TermsText>
							“Signer” means a person designated by an Authorized
							User to access and/or take action upon the
							eDocuments sent to such individual via digpads'
							Landlord Tools, Scribe, and/or Scribe +.
						</TermsText>
						<TermsText>
							“System” refers to the software systems and
							programs, the communication and network facilities,
							and the hardware and equipment used by digpads or
							its agents to make available the digpads' Landlord
							Tools, Scribe, and/or Scribe + service via the
							Internet.
						</TermsText>
						<TermsText>
							“Transaction Data” means the metadata associated
							with an Envelope (such as transaction history, image
							hash value, method and time of Envelope deletion,
							sender and recipient names, email addresses, and
							signature IDs) that digpads may use to generate and
							maintain the digital audit trail required by
							digpads' Landlord Tools, Scribe, and/or Scribe +.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Additional Usage Limitations and Customer
							Responsibilities
						</TermsSubtitle>
						<TermsText>
							digpads’s provision of digpads' Landlord Tools,
							Scribe, and/or Scribe + is conditioned on Customer’s
							acknowledgement of and agreement to the following:
						</TermsText>
						<TermsText>
							digpads' Landlord Tools, Scribe, and/or Scribe +
							facilitates the execution of eDocuments between the
							parties to those eDocuments. Nothing in this Service
							Schedule may be construed to make digpads a party to
							any eDocument processed through digpads' Landlord
							Tools, Scribe, and/or Scribe +, and digpads makes no
							representation or warranty regarding the
							transactions sought to be affected by any eDocument;
						</TermsText>
						<TermsText>
							Between digpads and Customer, Customer has exclusive
							control over and responsibility for the content,
							quality, and format of any eDocument. Without
							limiting the foregoing, all eDocuments, together
							with any messages included within an Envelope,
							stored by digpads on the System are maintained in an
							encrypted form, and digpads has no control of or
							access to their contents except to the extent access
							is requested in writing and made available by
							Customer to digpads;
						</TermsText>
						<TermsText>
							Certain types of agreements and documents may be
							excepted from electronic signature laws (e.g. wills
							and agreements pertaining to family law), or may be
							subject to specific regulations promulgated by
							various government agencies regarding electronic
							signatures and electronic records. digpads is not
							responsible or liable to determine whether any
							particular eDocument is (i) subject to an exception
							to applicable electronic signature laws; (ii)
							subject to any particular agency promulgations; or
							(iii) can be legally formed by electronic
							signatures;
						</TermsText>
						<TermsText>
							digpads is not responsible for determining how long
							any contracts, documents, and other records are
							required to be retained or stored under any
							applicable laws, regulations, or legal or
							administrative agency processes. Further, digpads is
							not responsible for or liable to produce any of
							Customer’s eDocuments or other documents to any
							third parties;
						</TermsText>
						<TermsText>
							Certain consumer protection or similar laws or
							regulations may impose special requirements with
							respect to electronic transactions involving one or
							more “consumers,” such as (among others)
							requirements that the consumer consent to the method
							of contracting and/or that the consumer be provided
							with a copy, or access to a copy, of a paper or
							other non-electronic, written record of the
							transaction. digpads does not and is not responsible
							to: (i) determine whether any particular transaction
							involves a “consumer;” (ii) furnish or obtain any
							such consents or determine if any such consents have
							been withdrawn; (iii) provide any information or
							disclosures in connection with any attempt to obtain
							any such consents; (iv) provide legal review of, or
							update or correct any information or disclosures
							currently or previously given; (v) provide any such
							copies or access, except as expressly provided in
							the Documentation for all transactions, consumer or
							otherwise; or (vi) comply with any such special
							requirements;
						</TermsText>
						<TermsText>
							Customer undertakes to determine whether any
							“consumer” is involved in any eDocument presented by
							its Authorized Users for processing, and, if so, to
							comply with all requirements imposed by law on such
							eDocuments or their formation;
						</TermsText>
						<TermsText>
							Customer agrees that its assigned Account
							Administrator(s) has authority to provide digpads
							with and accept from digpads any required
							authorizations, requests, or consents on behalf of
							Customer with respect to Customer’s Account; and
						</TermsText>
						<TermsText>
							Customer agrees it is solely responsible for the
							accuracy and appropriateness of instructions given
							by it and its personnel to digpads in relation to
							the Services, including without limitation
							instructions through its Account as made by the
							assigned Account Administrator.
						</TermsText>
						<TermsText>
							Customer may elect to utilize a digital certificate,
							service, or process that authenticates a signer’s
							identity or the authenticity of a document as part
							of a digpads' Landlord Tools, Scribe, and/or Scribe
							+. If that digital certificate, service, or process
							is provided by anyone other than digpads, even where
							the digital certificate, service, or process is
							chosen from a menu from within the digpads Services,
							Customer agrees that it is solely responsible for
							determining the reliability, validity, and legality
							of that third party digital certificate, service, or
							process and agrees that digpads is not responsible
							to determine whether any such digital certificate,
							service, or process is reliable, valid, or legal.
						</TermsText>
						<TermsText>
							Subscription Plans purchased on digpads.com may not
							be used in conjunction with digpads APIs and are
							available for use with a limited number of
							integrations.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							eDocument Storage And Deletion
						</TermsSubtitle>
						<TermsText>
							<b>Sending, Storage</b>. During the Term digpads
							will send and store eDocuments per these Terms of
							the Subscription Plan. However, digpads may set and
							enforce limits for reasonable use in order to
							prevent abusive or unduly burdensome use of digpads'
							Landlord Tools, Scribe, and/or Scribe +. Customer,
							through its Account Administrator(s), may retrieve
							and store copies of eDocuments for storage outside
							of the System at any time during the Subscription
							Term when Customer is in good financial standing
							under these Terms, and may delete or purge
							eDocuments from the System at its own discretion
						</TermsText>
						<TermsText>
							<b>Uncompleted eDocuments</b>. digpads may, at its
							sole discretion, delete uncompleted eDocuments from
							the System immediately and without notice upon the
							earlier of: (a) expiration of the Envelope (where
							Customer has established an expiration for such
							Envelope, not to exceed 365 days); or (b) expiration
							of the Subscription Term. digpads assumes no
							liability or responsibility for a party’s failure or
							inability to electronically sign any eDocuments
							within such a period of time.
						</TermsText>
						<TermsText>
							<b>Deletion</b>. digpads may delete an Account and
							Customer Data, including without limitation
							eDocuments (whether complete or not), upon the
							expiration of the Subscription Term or termination.
						</TermsText>
						<TermsText>
							<b>Retention of Transaction Data</b>. digpads may
							retain Transaction Data for as long as it has a
							business purpose to do so.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Information Security And Personal Data
						</TermsSubtitle>
						<TermsText>
							<b>Customer Responsibilities</b>. digpads' Landlord
							Tools, Scribe, and/or Scribe + provides Customer
							with certain features and functionalities that
							Customer may elect to use, including the ability to
							retrieve and delete eDocuments in the System.
							Customer is responsible for properly: (a)
							configuring digpads' Landlord Tools, Scribe, and/or
							Scribe +; (b) using and enforcing controls available
							in connection with digpads' Landlord Tools, Scribe,
							and/or Scribe + (including any security controls);
							and (c) taking such steps, in accordance with the
							functionality of digpads' Landlord Tools, Scribe,
							and/or Scribe +, that Customer deems adequate to
							maintain appropriate security, protection, deletion,
							and backup of Customer Data, which include
							controlling the management of Authorized Users’
							access and credentials to digpads' Landlord Tools,
							Scribe, and/or Scribe +, controlling Customer Data
							that is Processed by digpads' Landlord Tools,
							Scribe, and/or Scribe +, and controlling the
							archiving or deletion of eDocuments in the System.
							Customer acknowledges that digpads has no obligation
							to protect Customer Data, including Personal Data
							(defined below), that Customer elects to store or
							transfer outside of digpads' Landlord Tools, Scribe,
							and/or Scribe + (e.g., offline or on-premise
							storage).
						</TermsText>
						<TermsText>
							<b>Information Security</b>. digpads will employ
							commercially reasonable technical and organizational
							measures that are designed to prevent unlawful or
							unauthorized access, use, alteration, or disclosure
							of Customer Data.
						</TermsText>
						<TermsText>
							<b>Data Processing/Transfer</b>. The Data Protection
							Attachment for digpads' Landlord Tools, Scribe,
							and/or Scribe + found at:
						</TermsText>
						<TermsText>
							<Link to='/termsSchedule'>
								https://www.digpads.com/company/terms-and-conditions/schedule-digpads-...
							</Link>
							(“DPA”) applies to the processing of Personal Data
							(as defined in Section 1 of the DPA).
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Accounts &amp; Organizational Administration
						</TermsSubtitle>
						<TermsText>
							Each Account is associated with a single email
							address. If the domain of the primary email address
							associated with an Account is owned by a business or
							other organization (“Entity”) and was assigned to
							Customer as an employee, contractor or member of the
							Entity, such as yourname@youremployer.com or
							yourname@nonprofit.org (“Entity Email Address”),
							Customer grants that Entity and its Account
							Administrator(s) permission to: (a) identify
							Accounts created with an Entity Email Address; and
							(b) restrict or terminate access to an Account
							created with an Entity Email Address. Customer
							acknowledges and agrees that digpads may assist
							Entity with such administration.
						</TermsText>
					</div>
					<div>
						<TermsSubtitle>
							Subscription Plans &amp; Prices
						</TermsSubtitle>
						<TermsText>
							The prices, features, and options of digpads'
							Landlord Tools, Scribe, and/or Scribe + depend on
							the Subscription Plan selected by Customer as well
							as any changes instigated by Customer. For example:
							(a) if Customer adds Authorized Users, digpads will
							charge the applicable subscription amount for each
							additional Authorized User; or (b) if Customer sends
							more Envelopes than are included in your
							Subscription Plan, digpads may charge for additional
							envelopes or assign Customer to a new Subscription
							Plan. Customer may also purchase optional services
							on a periodic or per-use basis. digpads may change
							the prices for or alter the features and options in
							a particular Subscription Plan without notice.
						</TermsText>
						<TermsText>
							<b>Prohibited Uses</b>. In connection with the
							Services or your use of the Website, you will not:
							Breach this agreement;
						</TermsText>
						<ul>
							<li>
								Violate any applicable federal, state, local or
								international law or regulation;
							</li>
							<li>
								Violate the legal rights (including the rights
								of publicity and privacy) of others or contain
								any material that could give rise to any civil
								or criminal liability under applicable laws or
								regulations or that otherwise may be in conflict
								with these Terms of Use and our Privacy Policy;
							</li>
							<li>
								Disclose or distribute another User's
								information to a third party, or use the
								information for marketing purposes unless you
								receive the User's express consent to do so;
							</li>
							<li>
								Infringe our or any third party's copyright,
								patent, trademark, trade secret or other
								intellectual property rights, or rights of
								publicity or privacy;
							</li>
							<li>
								Act in a manner that is defamatory, trade
								libelous, threatening or harassing;
							</li>
							<li>
								Provide false, inaccurate or misleading
								information;
							</li>
							<li>
								Send or receive what we reasonably believe to be
								potentially fraudulent funds;
							</li>
							<li>
								Impersonate any person, or misrepresent your
								identity or affiliation with any person or
								organization or in any way that is likely to
								deceive any person;
							</li>
							<li>
								Provide yourself a cash advance from your credit
								card or participate in any actions constituting
								credit card fraud, check fraud, or money
								laundering (or help others to do so);
							</li>
							<li>
								Refuse to cooperate in an investigation or
								provide confirmation of your identity or any
								information you provide to us;
							</li>
							<li>Use an anonymizing proxy;</li>
							<li>
								Conduct your business or use the Services in a
								manner that results in or may result in
								complaints, disputes, claims, reversals,
								chargebacks, fees, fines, penalties and other
								liability to Avail, other Users, third parties
								or you;
							</li>
							<li>
								Send unsolicited email to a User or use the
								Services to collect payments for sending, or
								assisting in sending, unsolicited email to third
								parties;
							</li>
							<li>
								Take any action that imposes an unreasonable or
								disproportionately large load on our
								infrastructure;
							</li>
							<li>
								Facilitate any viruses, Trojan horses, worms or
								other computer programming routines that may
								damage, detrimentally interfere with,
								surreptitiously intercept or expropriate any
								system, data or information;
							</li>
							<li>
								Use any robot, spider, other automatic device,
								or manual process to monitor or copy our Website
								without our prior written permission
							</li>
							<li>
								Use any device, software or routine to bypass
								our robot exclusion headers, or interfere or
								attempt to interfere with our Website or the
								Services;
							</li>
							<li>
								Take any action that may cause us to lose any of
								our services from our internet service
								providers, payment processors, or other
								suppliers;
							</li>
						</ul>
						<TermsText>
							digpads will not be held liable for the violation of
							the above terms or any other illegal activity not
							foreseen at the time.
						</TermsText>
					</div>
				</Container>
			</Section>
		</PageWrapper>
	);
}
