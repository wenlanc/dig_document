import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PageWrapper from '../PageWrapper';
import { PageTitle, Banner } from '../styled/Page';

const PREFIX = 'ForumCommentsPoliciesAndRules';

const classes = {
	listRoot: `${PREFIX}-listRoot`,
};

const StyledPageWrapper = muiStyled(PageWrapper)({
	[`& .${classes.listRoot}`]: {
		'& > li': {
			fontWeight: 'bold',
		},
	},
});

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

export default function ForumCommentsPoliciesAndRules() {
	return (
		<StyledPageWrapper>
			<Banner>
				<PageTitle>
					Forum & Comments <br /> Policies and Rules
				</PageTitle>
			</Banner>

			<Section>
				<Container>
					<div>
						<Title>
							digpads Forum & Comments Policies and Rules
						</Title>
						<Typography variant='body2'>
							Effective Date: March 27, 2021
						</Typography>
						<Typography variant='body2'>
							The real estate investing discussion forums,
							articles with comments section, and social network
							at digpads.com are where landlords, real estate
							investors and other real estate professionals
							congregate. By participating in digpads forums,
							articles with comments section, and social network
							you agree to follow the community rules and
							regulations outlined below. When we use the term
							“forum,” we mean any area of the digpads.com that
							allows interaction with other individuals visiting
							or using digpads.com, such as forums and the
							comments section on articles. You also agree to our
							Privacy Policy and our Terms of Use.
						</Typography>
						<Typography variant='body2'>
							Please take a moment to familiarize yourself with
							these rules and regulations. digpads is a community,
							and we rely on you to keep this community friendly
							and enjoyable by following these rules.
						</Typography>
						<Typography variant='body2'>
							If you feel that another member's post or activity
							has violated these rules and would like to bring it
							to our attention, you may contact us at
							digpads.com/contact. Although digpads tries to
							evaluate all reports regarding misuse of its
							services, it does not promise to do so, and it
							reserves the right to take any action or no action
							at all in response to such reports.
						</Typography>
						<Typography variant='body2'>
							Unlike other social media platforms, digpads has no
							interest or desire to takes sides in the culture or
							values wars ongoing. We will apply rules equally to
							all and we will NOT be pressured or bullied into
							taking sides.
						</Typography>
					</div>
					<div>
						<ol type='A' className={classses.listRoot}>
							<li> Forum And Blog Posting Regulations</li>
							<ol type='1'>
								<li>
									<b>
										No pornographic, sexual, or lude photos
										or commentary.{' '}
									</b>
								</li>
								<li>
									<b>No Profanity. </b>The use of profanity is
									strictly prohibited, whether in titles,
									forums, blog posts, or anywhere else on
									digpads. This is simply a respect and
									dignity thing.
								</li>
								<li>
									<b>
										No Contact Information is Allowed in the
										Forums.{' '}
									</b>
									Contact Information is not allowed to be
									posted in the Forums. Users may not post
									email addresses, phone numbers, social media
									handles or links to their website or company
									website.
									<p>
										If you want to include your email
										address, website, or phone number for
										people to contact you, please put this
										information in your Signature. digpads
										reserves the right to remove any email
										address, website or phone number that
										has been placed in our message posts as
										a means of contact.
									</p>
									<p>
										In addition, do not disclose any
										personal information that you do not
										wish others to know.
									</p>
								</li>

								<li>
									<b>
										No FAO (for the attention of) or Goodbye
										Posts.
									</b>{' '}
									Personal discussions or "for the attention
									of" posts are prohibited. Please use the
									private message feature, chat, or email for
									this purpose. In addition, please refrain
									from "Goodbye Forum" posts in forum threads.
								</li>
								<li>
									<b>No Impersonations.</b> Do not impersonate
									or attempt to impersonate other forum
									members, moderators, or administrators. In
									addition, do not post email addresses,
									standard addresses, ICQ and other messaging
									client numbers, or phone numbers which are
									not your own.
								</li>
								<li>
									<b>
										You Must Disclose Your Relationship with
										any Company, Website, Public Figure, or
										Other Entity that You Comment About.
									</b>{' '}
									If you participate in a discussion about a
									company, website, guru, coaching program,
									etc., and have any kind of relationship with
									that entity (e.g. affiliate, partnership,
									employee, owner), you must disclose this
									relationship in your post. digpads reserves
									the right to publicly or privately ask about
									your relationship with any company that you
									comment on, to remove any post which does
									not disclose such a relationship, and to
									close your account if you fail to disclose
									such a relationship.
								</li>
								<li>
									<b>One account per user.</b> digpads users
									are limited to one account per person; users
									may not register or use alternate
									accounts.The creation or use of fake user
									accounts is strictly prohibited.
								</li>
								<li>
									<b>No Abusive Behavior.</b> You agree,
									through your use of this service, that you
									will not post or otherwise transmit
									(including through the digpads private
									messaging system) any material which is
									knowingly false and/or defamatory, abusive,
									hateful, harassing, obscene, threatening,
									invasive of a person's privacy, or otherwise
									in violation of any law.
									<p>
										Facts and statistics as well as
										socioeconomic and demographic data is
										NOT considered stereotypical or bigoted
										on its face. Comments made in
										association with it may be considered as
										such.
									</p>
								</li>
								<li>
									<b>Do Not Flame or Troll.</b> Flaming,
									flame-baiting, and trolling are not allowed
									anywhere on this site, including in posts,
									signatures, and private messages. Flaming is
									directly insulting another member,
									flame-baiting is making a comment with the
									intention of getting a flame as a response,
									and trolling involves starting arguments or
									upsetting people by posting inflammatory,
									extraneous, or off-topic messages with the
									intent of provoking readers into an
									emotional response or of otherwise
									disrupting normal on-topic discussion.
								</li>
								<li>
									<b>Respect the digpads Employees.</b> If a
									staff member tells you to stop doing
									something, stop. Never attack the staff
									directly. If you disagree with any action
									taken by a staff member, please contact the
									administrator privately.
								</li>
								<li>
									<b>No Email Harvesting.</b>Harvesting email
									addresses from our site is strictly
									prohibited. Do not harvest email addresses
									from digpads users.
								</li>
								<li>
									<b>No Private Message SPAM.</b> Users with
									basic digpads memberships may only send
									private messages to their colleagues.
								</li>
								<li>
									<b> No Poaching or Polling.</b> Diverting
									our members to competitor forums or websites
									is strictly forbidden. Polling our members
									to gather information to be used on a
									competing real estate site, course, podcast,
									book, blog post or video is strictly
									forbidden.
								</li>
								<li>
									<b> No Affiliate Marketing. </b> No form of
									affiliate marketing is allowed on digpads.
									That means no posting affiliate links in
									messages, in your signature, in blog posts,
									or on your profile. Hiding affiliate links
									through services that provide short urls is
									also forbidden.
								</li>
								<li>
									<b>Posting Images in Threads. </b>{' '}
									Screenshots, photographs, and other images
									that you want to embed in your post must be
									no larger than 640 x 480 pixels. Larger
									images may be deleted, resized, or changed
									to a link.
								</li>
								<li>
									<b>
										Only Discuss Landlording and Real Estate
										Investing & Stay On-Topic.{' '}
									</b>{' '}
									This is a landlording and real estate
									investing forum so stick to those topics.
									Posts in a particular forum need to stay
									on-topic. If you want to talk about
									something that is drastically removed from
									the topic of a forum, please create a new
									topic. Posts that are unrelated to real
									estate must be placed in the off-topic
									forum.
								</li>
								<li>
									<b>No Thread Killing.</b> Thread killing
									disrupts the flow of conversation on
									digpads. If you are not happy with a post
									you made, you may remove it only before
									others have responded. Do not remove a post
									once others have responded to it.
								</li>
								<li>
									<b>NO SPAMMING.</b> Spam is strictly
									prohibited on digpads. Spamming is
									characterized by the initiation of threads
									or posts that contribute nothing to a forum,
									whether on or off-topic.
								</li>
								<li>
									<b>Off-Limits Ad & Solicitation Types.</b>{' '}
									Posts or messages including chain letters,
									pyramid schemes, or any kind of Ponzi scheme
									are not allowed on our site. Promoting or
									marketing properties that you have no
									contractual or ownership interest in is also
									strictly prohibited.
								</li>
								<li>
									<b>No Advertising or Promotions. </b>
									Unless specifically allowed in a specific
									section on the site and paid for to digpads,
									advertisements and promotions are not
									allowed on digpads.
								</li>
								<li>
									<b>Sponsored Posts are Prohibited. </b>
									Your account is for your use only. You may
									not use your account to post on behalf of
									any other person or company. Posts may not
									be 'sponsored by' or 'brought to you on
									behalf of' or any other variation on this
									theme in an effort to circumvent our 'No
									Self-Promotion' rules.
								</li>
							</ol>
							<li>
								{' '}
								Member User Names, Signatures, Avatars, and
								Profile Information.
							</li>
							<ol type='1'>
								<li>
									<b>Profile Name. </b>
									The name you enter for your first and last
									name MUST be your actual name -- pseudonyms
									or fake names are not allowed. Members may
									not use website URLs or email addresses as
									their profile link name, and profile names
									may not contain references to drugs, sex, or
									any other inappropriate material.
								</li>
								<li>
									<b>Avatars (Profile Images). </b>
									Member avatars exist so our users can share
									their personalities or photos. Avatars may
									not be used for promotional purposes. This
									means no ads and no company logos. In
									addition, users are strictly prohibited from
									using the following as an avatar: - Images
									depicting any person other than yourself -
									Images you are not authorized to use under
									copyright law - Sexually explicit images -
									Unprofessional images - Images that make a
									political or religious statement.
								</li>
							</ol>
							<li>LINK MODIFICATION BY ADMINISTRATORS</li>
							<p>
								digpads administrators may, at their discretion,
								modify any link contained within our forums.
								These modified links may contain codes allowing
								digpads to profit for referred traffic.
							</p>
							<li> USE OF FORUM EMAIL & PRIVATE MESSAGING</li>
							<p>
								Forum administrators reserve the right to
								periodically scan and review the forum email and
								private messages database in search of abuse.
							</p>
							<p>
								Abuse of the forum email or private messaging
								systems may result in immediate removal from
								digpads, and digpads has the right (but not the
								obligation) to pursue all available remedies to
								address such abuse.
							</p>
							<li> OFFICIAL FORUM EMAIL & PRIVATE MESSAGES</li>
							<p>
								Please note that by registering for this forum,
								you agree to receive emails and private messages
								about your account from forum administrators and
								moderators. You may also receive promotional
								messages from digpads. See our Privacy Policy
								for how to opt out of promotional email.
							</p>
							<li>
								REMOVAL OF CONTENT, BANNING, SUSPENSION,
								TERMINATION
							</li>
							<p>
								digpads may in its sole discretion remove any
								content for any reason or no reason at all. In
								addition, digpads may restrict, suspend, or
								terminate your access to parts of or to the
								entire digpads Website if you violate any of the
								community rules and regulations or terms of use,
								or for any other reason, in its sole discretion.
								digpads may take these actions at any time, with
								or without notice and without liability to any
								users.
							</p>
							<p>
								digpads' failure at any time to require
								performance of any provision of these rules and
								regulations or our Terms of Use or to exercise
								any right provided for herein will not be deemed
								a waiver of such right provision or such right.
								All waivers must be in writing. Unless the
								written waiver contains an express statement to
								the contrary, no waiver by digpads of any breach
								of any provision of these rules and regulations
								or our Terms of Use or of any right provided for
								therein will be construed as a waiver of any
								continuing or succeeding breach of such
								provision, a waiver of the provision itself, or
								a waiver of any right under these rules and
								regulations or our Terms of Use.
							</p>
							<p>
								Our forums and blog discussions are
								semi-moderated, and moderators or administrators
								may close or delete a thread at any time and for
								any reason. Once a topic is closed, members are
								not allowed to start a new thread with the same
								topic. All questions or remarks regarding closed
								or deleted threads must be e-mailed privately to
								the Forum.
							</p>
							<p>
								It is your responsibility to maintain a current,
								valid email address in your registration
								information so that our moderators can contact
								you in the event of a policy violation, though
								no such contact by digpads is required.
							</p>
							<p>
								If any of your digpads privileges have been
								revoked and you have questions about why, or
								what, if anything, you can do to restore them,
								please email the forum administrator.
							</p>
							<p>
								digpads is a dynamic online community and
								digpads reserves the right to change or alter
								these rules at any time.
							</p>
						</ol>
					</div>
				</Container>
			</Section>
		</StyledPageWrapper>
	);
}
