import React, { useState } from 'react';
import ServiceGuideTemplate from './ServiceGuideTemplate';
import { instance as axios } from '../../controllers/axios';

const data = {
	author: {
		name: 'Andrew Polacek',
		avatar: '/images/author-small.jpg',
	},
	meta: {
		published_on: new Date(2021, 9, 5),
		last_updated_on: new Date(2022, 11, 16),
	},
	callToAction: {
		href: 'https://example.com',
		buttonText: 'find my tenant screening provider',
		descriptionText: `digpads spent over 100 hours reviewing the known tenant
             screening companies to provide you, the independent landlord,
              with the best possible unbiased research to help match you to
               the best provider for your individual tenant screening needs.`,
	},
	serviceIntro: {
		id: 'service-intro',
		title: `Best Tenant Screening Companies for Landlords ${new Date().getFullYear()}`,
		subtitle: 'Tenant Screening Provider Reviews',
	},
	managementPlatforms: {
		id: 'platforms',
		title: 'Select Tenant Screening Companies',
		ratedEntries: [
			{
				rating: 8.8,
				logo: '/images/companies/smart-move-transunion.svg',
				description: `SmartMove is publicly traded TransUnion’s credit and background
                     check service that was launched in 2011 and that is specifically
                      targeted for independent landlords. SmartMove provides
                       credit reports and criminal background checks.`,
				label: 'Detail Focused Landlords',
				name: 'SmartMove (TransUnion)',
			},
			{
				rating: 8.1,
				logo: '/images/companies/MyRental.jpg',
				description: `MyRental is publicly traded CoreLogic’s tenant screening product that was launched in 2010 and provides renter eviction history, background search, and credit score reports.`,
				label: 'Country level screening',
				name: 'MyRental (CoreLogic)',
			},
			{
				rating: 8.3,
				logo: '/images/companies/aaoa-logo.webp',
				description: `American Apartment Owners Association is a landlord focused private
                 organization that is based in Calabasas, CA and founded
                  in 2004 that provides a tenant screening service to
                   landlords with or without an annual membership.`,
				label: 'DIY Landlords',
				name: 'American Apartment Owners Association',
			},
			{
				rating: 8.2,
				logo: '/images/companies/leaserunner-logo.jpeg',
				description: `LeaseRunner is a fast growing private online provider of various tenant screening services including à la carte options to independent landlords. The company is based in Boulder, CO and was founded in 2011.`,
				label: 'À la carte everything',
				name: 'LeaseRunner',
			},
			{
				rating: 7.7,
				logo: '/images/companies/e-renter-logo.png',
				description: `eRenter is a private company, based in Bellingham, WA,
                 that was founded in 2003 and provides very basic
                  to more comprehensive tenant screening services
                   to independent landlords.`,
				label: 'Unique and Rare Tenant Screening Checks',
				name: 'eRenter',
			},
			{
				rating: 7.8,
				logo: '/images/companies/tenant-background-search.jpg',
				description: `Tenant Background Search is a private company,
                 based in Dallas TX, that was founded in 2012
                  and provides three different packages to
                   landlords including background, credit and eviction checks.`,
				label: 'Quick, hassle-free screening',
				name: 'Tenant Background Search',
			},
			{
				rating: 8.7,
				logo: '/images/companies/rentprep-logo.png',
				description: `RentPrep is a privately owned company based in Lancaster, NY that was founded in 2007 and provides credit, customized background, eviction, income verification and more checks to landlords.`,
				label: 'Screening in Restricted States',
				name: 'RentPrep',
			},
		],
		disclaimer:
			'While digpads believes that its analysis of the tenant screening providers is unbiased and equitable, we are compensated by certain providers that you buy from if the sales is generated from our website. We are disclosing this to be transparent to you.',
	},
	education: {
		id: 'education',
		title: 'Tenant Screening Education for Landlords',
		subtitle: `Lorem ipsum dolor sit amet, consectetur adipiscing aewr. Ut velit dui, return vaita vioputat. Lorem ipsum dolor sit amet, consectetur adipiscing aewr. Ut velit dui, return vaita vioputat.`,
		subtitle2: 'The Tenant Screening Industry',
		description: [
			`For most Independent Landlords, the quickest and least cumbersome way to obtain a tenant screening report is through a Distributor as a one-off purchase. This does not typically require approval from the Consumer Data Source Companies, but does typically require tenant approval.`,
			`This digpads Guide for Tenant Screening is focused on Tenant Screening Distributors as they are accessible by most independent landlords.`,
		],
		educationCards: [
			{
				title: 'Consumer Data Source Companies',
				text: `Companies that are the source of or generators of information
                 from consumers through their partner information
                  providers like banks, law enforcement, court records, etc.`,
				exampleText: 'TransUnion in Credit',
			},
			{
				title: 'Controlled Access Providers',
				text: `Companies that provide information to consumers
                 from these data source companies
                  that can be accessed at will after
                   an approval process is completed.`,
				exampleText: 'First Advantage or VeriFirst',
			},
			{
				title: 'Distributors',
				text: `Companies that act as distributors of the source
                 companies information to the end consumer
                 , typically with the approval of the tenant
                  the information is being provided on.`,
				exampleText: 'SmartMove or RentPrep',
			},
			{
				title: 'End Users',
				text: `In most cases, the end users of tenant screening
                 reports are a landlord or property manager.
                  The end user of a tenant screening report utilizes the
                   information to make a decision one whether or not
                    to lease to a tenant based on what the
                     screening reports they receive say.`,
				exampleText: 'Independent Landlords or Realtors',
			},
		],
	},
	backgroundChecks: {
		id: 'background-checks',
		title: 'Types of Tenant Screening Background Checks',
		subtitle: 'The most common tenant screening reports available are:',
		content: [
			{
				heading: 'Credit Screening Report',
				text: [
					`A credit report provided by a tenant screening distributor is a report typically detailing a tenant’s past credit history including their known credit accounts, payment history, any defaults, any bankruptcies and any other positive or negative events regarding how they manage their credit. A credit report may contain a FICO score and it may not.`,
					`Most credit reports provide bankruptcy details as well, rendering the bankruptcy report unneeded in most situations. It is important to note that information from a credit report could be incomplete, out-of-date, or be missing valuable information as is often reported by consumers. Much of the way in which this information may be used is governed by the Fair Credit Reporting Act (“FCRA”) of 1970.`,
					`Independent landlords run credit reports to see a prospective tenant’s debt obligations, if a prospective tenant is responsible with their financial obligations or not, and to see if the tenant has had any bankruptcies.`,
				],
			},

			{
				heading: 'Criminal Background Checks',
				text: [
					`A criminal background check taps State and Federal records to see if the tenant has any criminal charges or convictions. Like any of these reports, it is as good as the information it is drawing from so errors and omissions are possible. It is important to note that there are five states, Massachusetts, Delaware, South Dakota, Wyoming, Colorado that require manual searches for their data on a prospective tenant.`,
					`Some providers offer specific checks for these states that they perform manually for you on the prospective tenant. County level criminal background checks are available by a select number of providers.`,
					`Independent landlords utilize criminal background checks to ensure that a prospective tenant is not a risk to their property or others based on their prior actions.`,
				],
			},

			{
				heading: 'Eviction Reports',
				text: [
					`Eviction reports detail if the prospective tenant has been evicted from a rental property over the last seven years. Any evictions farther back than the seven years will likely not show up on an eviction report. As with criminal background checks, Massachusetts, Delaware, South Dakota, Wyoming, and Colorado require a manual search that can’t be automated.`,
					`Note: Any instant report is not able to provide information on the manual search states
 	as listed above. `,
				],
			},

			{
				heading: 'Bankruptcy Report',
				text: [
					`A bankruptcy report provides information on whether or not a tenant has had a personal bankruptcy over the last ten years. It is important to note that most high quality credit reports contain bankruptcy information but some providers sell this as a stand alone offering. Independent landlords run bankruptcy reports to see if a tenant is responsible with their financial obligations or not.`,
				],
			},

			{
				heading: 'Income Verification',
				text: [
					`Income verification is done a variety of ways by a provider, most commonly by looking at a prospective tenant’s bank account statements and/or obtaining their payroll check stubs. This is an increasingly utilized method by independent landlords to ensure that their prospective tenant can afford a monthly rent payment.`,
				],
			},

			{
				heading: 'Proprietary Tenant Screening Products',
				text: [
					`Proprietary Tenant Screening Products are a tenant screening company’s own proprietary analysis of the risk a prospective tenant may be in terms of paying rent on time and abiding by the lease terms. These vary widely in their scope, reliability and trustworthiness. They typically are utilizing proprietary algorithms based on statistical correlations. `,
					`They typically provide a pass or fail result and highlight any things to be aware of about the prospective tenant. Independent landlords utilize proprietary tenant screening products when they trust the provider’s methods and are generally looking for a quick and inexpensive answer on a prospective tenant.`,
				],
			},
		],
	},
	tenantScreeningVideo: {
		id: 'tenant-screening-video',
		title: 'Video Explanation of Tenant Screening',
		description: `digpads CEO explains everything about Tenant Screening an independent landlord would want to know.`,
		video: {
			src: 'https://sp.rmbl.ws/s8/2/h/o/b/n/hobnc.caa.mp4?u=3&b=0',
		},
	},
	professionals: {
		id: 'professionals',
		title: 'Types of Professionals that Utilize Tenant Screening Reports',
		content: [
			{
				title: 'Independent Landlords',
				text: `Independent landlords are landlords who have their own rental businesses and are not large enterprises. Independent landlords primarily obtain tenant screening reports through distributors as the approval process to have a terminal to run checks that is given through controlled access providers is often expensive, cumbersome, and difficult for most independent landlords to obtain. Tenant screening reports obtained through distributors are a relatively inexpensive option to ensure that the prospective tenants of independent landlords have a high probability of being good tenants.`,
			},
			{
				title: 'SMB Property Managers',
				text: `Small to medium sized property managers are frequent users of tenant screening services through distributors. They may not qualify or need tenant screening solutions at their fingertips through controlled access providers. When SMB Property Managers get to a certain size, they tend to move towards the controlled access providers so they can run checks in house.`,
			},
			{
				title: 'Real Estate Agents',
				text: `Real estate agents often act as brokers for landlords to identify and screen tenants on behalf of landlords who pay them a commission
to do so. Real estate agents can also help tenants find rental properties. Whether a real estate agent is representing a landlord or a
tenant they often will need a tenant screening report on prospective tenants.`,
			},
		],
	},
	screeningSteps: {
		id: 'screening-steps',
		id2: 'how-to-utilize-tenant-screening-report',
		title: 'How Tenant Screening Works',
		title2: 'How to Utilize a Tenant Screening Report',
		steps: [
			{
				image: '/images/tenant-screening-steps/Group 5856@2x.png',
				number: 1,
				text: `Landlord need to lease a rental property to a good tenant that has income (or assets), a good history of behavior, and decent credit history`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5857@2x.png',
				number: 2,
				text: `Landlord identifies prospective tenant but needs to learn more about their past to make a decision about their character and ability to pay rent`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5996@2x.png',
				number: 3,
				text: `Landlord identifies tenant screening provider for tenant screen and requests information on the tenant, paying a fee`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5901@2x.png',
				number: 4,
				text: `Tenant's patterns in life have been recorded by credit bureaus, national, state and local law enforcement, and courts and are ready to be accessed by authorized people and entities`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5862@2x.png',
				number: 5,
				text: `Service provider receives landlord's request and then requests approval from prospective tenant to provide information to the landlord (or it was provided at the time of the request by the landlord)`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5863@2x.png',
				number: 6,
				text: `Service providers utilize their own database or those they have access to through partnerships with credit and background information providers to pull information. Typically this includes some combination of credit, criminal background, eviction, bankruptcy data, and income information on the tenant`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5864@2x.png',
				number: 7,
				text: `Data from service provider is aggregated and put into a consolidated report making it easier for the landlord to process and understand`,
			},
			{
				image: '/images/tenant-screening-steps/Group 6024@2x.png',
				number: 8,
				text: `Landlord received report from tenant screening provider, reviews and makes a decision about renting to the tenant`,
			},
		],
		steps2: [
			{
				image: '/images/tenant-screening-steps/Group 5886@2x.png',
				number: 1,
				text: `Landlord receives report on
tenant, typically in a PDF format`,
			},
			{
				image: '/images/tenant-screening-steps/Group 6006@2x.png',
				number: 2,
				text: 'Landlord Reviews report, noting:',
				points: [
					'Credit Report and Score (if included)',
					'Loan Defaults',
					'Criminal records, especially felonies',
					'Bankruptcies, typically noted on credit report',
					'Foreclosures',
					'Evictions',
				],
			},
			{
				image: '/images/tenant-screening-steps/Group 5890@2x.png',
				number: 3,
				text: `Compare the information provided by the tenant to the report results. Does the information on the tenant screening report match what the tenant told you or is it close? This becomes a character question for many landlords`,
			},
			{
				image: '/images/tenant-screening-steps/Group 5857@2x.png',
				number: 4,
				text: `Landlord considers what is a
                    reasonable expectation for the
                    rental unit he or she is renting:`,
				points: [
					'No perfect tenants',
					'Tenant in Beverly Hills different than tenant in a less desirable neighborhood',
				],
			},
			{
				image: '/images/tenant-screening-steps/Group 5903@2x.png',
				number: 5,
				text: `Landlord may discuss the report with
            the tenant if anything needs to be
            cleared up or an agreement can be
            made with the tenant to adjust for
            risk. Ex. Landlord need an explanation
            on one issue and/or landlord request
            a larger security deposit to account
            for an eviction ten years ago`,
			},
			{
				image: '/images/tenant-screening-steps/Group 6004@2x.png',
				number: 6,
				text: `Landlord makes final decision on whether or not
         to rent to the tenant based on tenant screening
          report and other factors`,
			},
		],
		description1: {
			show: true,
			position: 'top', // top or bottom
			text: `The infographic below summarizes the tenant screening process and how tenant screening works. The most important thing an independent landlord should realize and plan around in their tenant screening is ensuring they are gathering as much relevant information as possible on a prospective tenant to assess if that prospective tenant is a good candidate to rent to or not. Each specific situation requires different tenant screening considerations.`,
		},
		description2: {
			show: true,
			position: 'top', // top or bottom
			text: `The infographic below explains how to utilize tenant screening reports when they are received back from the provider. Ultimately, it is the independent landlord’s responsibility to gather as much information as possible on a prospective tenant and it is up to their judgement whether or not a prospective tenant should be rented to. digpads suggests independent landlords take into consideration the quality of their rental property, its location and desirability, and other such factors when determining whether a prospective tenant’s background makes them a good fit for their particular rental property. Be sure to adhere to all federal, state, and local laws when making a decision, document as much as possible, and stay consistent in your decision making process.`,
		},
	},
	servicesList: {
		id: 'services-list',
		title: 'Services List by Provider',
		imageSrc: '/images/services-list.png',
		services: [
			{
				logo: '/images/companies/transUnion.png',
				name: 'TransUnion (SmartMove)',
				data: {
					'Basic Package Cost': 25,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'Y',
					Bankruptcy: 'N',
					Eviction: 'Y',
					'Eviction All 50 States': 'N',
					'Instant Reports': 'Y',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'Y',
					'Address History': 'N',
					'County Level Screening': 'N',
					'Judgments/Liens': 'Y',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'N',
				},
			},
			{
				logo: '/images/companies/rentprep-logo.png',
				logoReverse: '/images/companies/rentprep-logo-rev.png',
				name: 'Rentprep',
				data: {
					'Basic Package Cost': 21,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'Y',
					Bankruptcy: 'Y',
					Eviction: 'Y',
					'Eviction All 50 States': 'Y',
					'Instant Reports': 'Y',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'Y',
					'Address History': 'Y',
					'County Level Screening': 'N',
					'Judgments/Liens': 'Y',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'Y',
				},
			},
			{
				logo: '/images/companies/aaoa-logo.webp',
				name: 'American Apartment Owners Association',
				data: {
					'Basic Package Cost': 35.95,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'Y',
					Bankruptcy: 'N',
					Eviction: 'Y',
					'Eviction All 50 States': 'Y',
					'Instant Reports': 'Y',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'Y',
					'Address History': 'Y',
					'County Level Screening': 'N',
					'Judgments/Liens': 'Y',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'Y',
				},
			},
			{
				logo: '/images/companies/leaserunner-logo.jpeg',
				name: 'LeaseRunner',
				data: {
					'Basic Package Cost': 35,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'N',
					Bankruptcy: 'N',
					Eviction: 'N',
					'Eviction All 50 States': 'N',
					'Instant Reports': 'Y',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'N',
					'Address History': 'N',
					'County Level Screening': 'N',
					'Judgments/Liens': 'N',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'Y',
				},
			},
			{
				logo: '/images/companies/myrental2.jpg',
				name: 'MyRental',
				data: {
					'Basic Package Cost': 34.95,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'N',
					Bankruptcy: 'N',
					Eviction: 'N',
					'Eviction All 50 States': 'N',
					'Instant Reports': 'Y',
					'Tenant Verification': 'N',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'N',
					'Address History': 'Y',
					'County Level Screening': 'Y',
					'Judgments/Liens': 'N',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'Y',
				},
			},
			{
				logo: '/images/companies/tbs.jfif',
				logoCaption: 'Tenant Background Search',
				name: 'TenantBackgroundSearch',
				data: {
					'Basic Package Cost': 19.95,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'Y',
					Bankruptcy: 'Y',
					Eviction: 'Y',
					'Eviction All 50 States': 'N',
					'Instant Reports': 'Y',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'Y',
					'Address History': 'Y',
					'County Level Screening': 'N',
					'Judgments/Liens': 'Y',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'N',
				},
			},
			{
				logo: '/images/companies/e-renter-logo.png',
				name: 'eRenter',
				data: {
					'Basic Package Cost': 20,
					'Criminal Background': 'Y',
					'Credit Report': 'Y',
					'Credit Score': 'N',
					Bankruptcy: 'N',
					Eviction: 'N',
					'Eviction All 50 States': 'N',
					'Instant Reports': 'N',
					'Tenant Verification': 'Y',
					'Landlord/Tenant Pay Options': 'Y',
					'SSN Verification': 'Y',
					'Address History': 'N',
					'County Level Screening': 'N',
					'Judgments/Liens': 'Y',
					'Sex Offender': 'Y',
					'Terrorist/Homeland Security': 'Y',
				},
			},
		],
		description: {
			show: false,
			position: 'top', // top or bottom
			text: `Voluptate nulla do deserunt veniam fugiat laboris mollit dolor
             Lorem officia veniam et quis dolore. Ipsum cupidatat enim fugiat nisi
              fugiat eiusmod elit proident amet. Incididunt deserunt labore culpa quis.`,
		},
	},
	screeningProviders: {
		id: 'screening-providers',
		title: 'Tenant Screening Company Providers',
		content: [
			{
				name: 'SmartMove (TransUnion)',
				ratings: [
					{ heading: 'Cost to Value', value: 9 },
					{ heading: 'Product Quality', value: 9 },
					{ heading: 'Convenience', value: 9 },
					{ heading: 'Speed', value: 10 },
					{ heading: 'Customization', value: 7 },
					{ heading: 'Customer Service', value: 9 },
				],
				averageRating: 9,
				logo: '/images/companies/smart-move-transunion.svg',
				summaryDescription: [
					`SmartMove was founded in 2011 and is the credit bureau TransUnion’s tenant screening service that is targeted at independent landlords. TransUnion defines independent landlords as landlords or property managers who own less than 200 rental properties. SmartMove has established itself on its own but also partners with a variety of online websites to provide its reports to them. SmartMove is the industry leader in terms of market share for tenant screening.`,
					`The company’s basic product at $25 provides a national background check and a Credit-Based ResidentScoreTM which is NOT a full credit report and does not include a credit score. SmartMove claims that ResidentScoreTM is better than a credit score for renting as it focuses on evictions, late payers and skipping out on a lease while credit reports and scores are designed and utilized for loan approvals, not for tenant screening. For some landlords this will be fine, but for those who really want to get into the weeds and see more details about a prospective tenant a credit report with a FICO score is a better fit.`,
				],
				companyHref: 'https://www.mysmartmove.com/',
				bestForText: 'Best for Detail Focused Landlords',
				foundedText: '2011',
				revenueText: '$2.6 billion',
				employeesText: '8,000+',
				summaryConclusionText: `SmartMove is a good choice for landlords who are looking for credit-level information from an established credit bureau. There are some limitations when using SmartMove with state and County level data.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'The landlord or the tenant may pay for a tenant screening report from SmartMove. SmartMove’s reports are received almost instantly after tenant approval and payment is received by either the landlord or the tenant. SmartMove by TransUnion offers a comprehensive self-help system as well as a customer service form on its website that can be utilized by anyone.',
				packages: [
					{
						name: 'SmartCheck Basic',
						price: '$25',
						includes: [
							'Credit-Based ResidentScore™',
							'National Criminal Background Report',
						],
					},
					{
						name: 'SmartCheck Plus',
						price: '$38',
						includes: [
							'Credit-Based ResidentScore™',
							'National Criminal Background Report',
							'Full Credit Report',
							'National Eviction Report',
						],
					},
					{
						name: 'SmartCheck Premium',
						price: '$40',
						includes: [
							'Credit-Based ResidentScore™',
							'National Criminal Background Report',
							'Full Credit Report',
							'National Eviction Report',
							'Income Insights',
						],
					},
				],
				companyPros: {
					title: 'Pros to Using SmartMove (TransUnion) for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'Backed by the data of TransUnion, one of the three major credit bureaus',
						'Innovative and thoughtful product offerings focused on independent landlord needs at a fair price',
						'Reasonably priced options for the value',
					],
				},
				topComplaints: {
					title:
						'Top Complaints for SmartMove (TransUnion) from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						`Some landlords don't like the fact that you must involved the tenant`,
						'Instant Criminal Reports and Instant Eviction Reports are not as reliable',
						'Colorado, Wyoming, South Dakota, Delaware, and Massachusetts not covered in criminal background check',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 8.5 },
					{ heading: 'Product Quality', value: 8 },
					{ heading: 'Convenience', value: 8 },
					{ heading: 'Speed', value: 8 },
					{ heading: 'Customization', value: 9 },
					{ heading: 'Customer Service', value: 7 },
				],
				averageRating: 8.1,
				logo: '/images/companies/MyRental.jpg',
				summaryDescription: [
					`MyRental is the tenant screening product of CoreLogic, a publicly traded company with almost $2 billion in revenue, that offers criminal background checks, eviction history, and credit reports (not credit scores) as its primary offerings. It also offers terrorist, sex offender, and address history. MyRental’s CoreLogic parent provides data, analytics and technology processing services so tenant screening falls well into this focus. It is also a credit reporting agency, as opposed to a credit bureau that TransUnion, Equifax, Experian are.`,
					`MyRental’s base product does not include a credit report and is $24.99. To tack on a credit report an independent landlord is looking at the next package up at $34.99. While MyRental does not provide a credit score, it provides its own proprietary SafeRentTM score assessing the prospective tenant’s desirability as a tenant. MyRental allows an independent landlord a large degree of à la carte choices for reports, including stand alone reports for credit, eviction, criminal background and as granular as one or multi states and the unique country level criminal background check.`,
				],
				name: 'MyRental (CoreLogic)',
				companyHref: 'https://www.myrental.com/',
				bestForText: 'Best for Country level screening',
				foundedText: '2010',
				revenueText: '$1.9 billion',
				employeesText: '5,100',
				summaryConclusionText: `MyRental has its own background search check covering all 50 states combined with TransUnion data which is a good combination for landlords looking for comprehensive checks.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'MyRental’s reports are received almost instantly after tenant approval and payment is received by either the landlord or the tenant. MyRental’s basic, non-credit report providing package, does not require prospective tenant consent but all packages and à la carte options involving a credit report and score do require prospective tenant approval. Note that the tenant may only pay at the Premium ($34.99) package. MyRental offers a phone number and an email address for customer service options.',
				packages: [
					{
						name: 'Basic',
						price: '$24.99',
						includes: [
							'Eviction History',
							'Previous Address History',
							'Terrorist Alert',
							'Multi-State Criminal',
							'Multi-State Sex Offender',
						],
					},
					{
						name: 'Premium',
						price: '$34.99',
						includes: [
							'Eviction History',
							'Previous Address History',
							'Terrorist Alert',
							'Multi-State Criminal',
							'Multi-State Sex Offender',
							'Credit Report',
							'Renter Pay Option',
							'SafeRent™ Score',
							'Compare Score by Location',
							'Landlord Acceptance Rate',
						],
					},
					{
						name: 'À la Carte Option 1',
						price: '$14.99',
						includes: ['Credit Report'],
					},
					{
						name: 'À la Carte Option 2',
						price: '$7.99',
						includes: ['Eviction History'],
					},
					{
						name: 'À la Carte Option 3',
						price: '$19.99',
						includes: ['Multi-State Criminal'],
					},
					{
						name: 'À la Carte Option 4',
						price: '$9.99',
						includes: ['Statewide Criminal'],
					},
					{
						name: 'À la Carte Option 5',
						price: '$14.99',
						includes: ['County Criminal'],
					},
				],
				companyPros: {
					title: 'Pros to Using MyRental (CoreLogic) for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'MyRental’s data is backed by CoreLogic, a billion dollar credit reporting agency',
						'Very à la carte options, able to choose exactly what you need and not what you don’t want',
						'A County-focused criminal background check is offered',
					],
				},
				topComplaints: {
					title: 'Top Complaints for MyRental (CoreLogic) from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'Complaints about a delay in receiving the reports that are suppose to be instant',
						'Reports are difficult to read, understand and are not user friendly',
						'Lots of tenant complaints online alleging incorrect identification of tenants and false information provided on tenants',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 8 },
					{ heading: 'Product Quality', value: 8 },
					{ heading: 'Convenience', value: 8 },
					{ heading: 'Speed', value: 8 },
					{ heading: 'Customization', value: 9 },
					{ heading: 'Customer Service', value: 8.5 },
				],
				averageRating: 8.3,
				logo: '/images/companies/aaoa-logo.webp',
				summaryDescription: [
					`The American Apartment Owners Association (AAOA) is a privately owned organization based in Calabasas, California that was founded in 2004 and provides a variety of free and paid resources and services to landlords including tenant screening reports. The AAOA has an estimated ten employees total however this number is not certain. It is important to note that while it presents itself as if it were a non-profit organization, digpads feels that the way it markets its products and services feels a lot like a private, for-profit business. The AAOA does not require a membership to obtain tenant screening reports, however it seems to encourage it.`,
					`AAOA’s overall positioning in the market is focused on being an education, resources, services and referral partner to independent landlords. AAOA’s tenant screening service offers the independent landlord the option of only purchasing a credit report with a score or only purchasing a state-specific background check, each for $19.95 each. It is important to note that the AAOA’s White Package provides both of these at $35.95 but only criminal background for one state is included (not a national criminal background search). It then offers four different packages that include more advanced data on a prospective tenant including sex offender, terrorist, citizenship and social security verification. Per AAOA, TranUnion is their credit provider unless a landlord goes through their certification process at which point credit reports can come from all of the agencies including Equifax and Experian.`,
				],
				name: 'American Apartment Owners Association',
				shortName: 'AAOA',
				companyHref: 'https://www.american-apartment-owners-association.org/',
				bestForText: 'Best for DIY Landlords',
				foundedText: '2004',
				revenueText: 'NA',
				employeesText: '10',
				summaryConclusionText: `AAOA offers a variety of packages and à la carte reports affording landlords maximum flexibility in their tenant screening options.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'With AAOA, the landlord or the tenant may pay, but the tenant must approve the report being provided to the independent landlord. All reports from AAOA are instant. The American Apartment Owners Association provides customer service through phone, email, and an online customer service form.',
				packages: [
					{
						name: 'Basic Credit or Basic Background',
						price: '$19.95',
						includes: [
							'Basic Credit',
							'Credit Report',
							'Credit Score',
							'',
							'Basic Background',
							'Eviction State Specific',
							'Criminal State Specific',
							'Previous Address State Specific',
						],
					},
					{
						name: 'Red Package',
						price: '$29.95',
						includes: [
							'Credit Report',
							'Credit Score',
							'Previous Address Tenant History',
							'TeleCheck Verification',
							'Eviction STATE SPECIFIC',
							'LeaseGuarantee Analyzer',
						],
					},
					{
						name: 'White Package',
						price: '$35.95',
						includes: [
							'Credit Report',
							'Credit Score',
							'Previous Address Tenant History',
							'TeleCheck Verification',
							'Eviction STATE SPECIFIC',
							'Criminal STATE SPECIFIC',
							'Sex Offender',
							'Terrorist',
							'Federal Search',
							'LeaseGuarantee Analyzer',
						],
					},
					{
						name: 'Blue Package',
						price: '$39.95',
						includes: [
							'Credit Report',
							'Credit Score',
							'Previous Address Tenant History',
							'TeleCheck Verification',
							'Eviction STATE SPECIFIC',
							'Criminal NATIONWIDE',
							'Sex Offender',
							'Terrorist',
							'Federal Search',
							'LeaseGuarantee Analyzer',
							'Tenant Pay Option',
						],
					},
					{
						name: 'Gold Package',
						price: '$49.95',
						includes: [
							'Credit Report',
							'Credit Score',
							'Previous Address Tenant History',
							'TeleCheck Verification',
							'Eviction NATIONWIDE',
							'Criminal NATIONWIDE',
							'Sex Offender',
							'Terrorist',
							'Federal Search',
							'LeaseGuarantee Analyzer',
							'Tenant Pay Option',
							'SSN Fraud',
						],
					},
					{
						name: 'Basic Credit Report (Tenant Cooperation Required)',
						price: '$19.95',
						includes: [' Basic Credit Report (Tenant Cooperation Required)'],
					},
					{
						name: 'Telecheck Check Verification',
						price: '$5.95',
						includes: ['Telecheck Check Verification'],
						firstPackage: true,
					},
					{
						name: 'Previous Address Tenant History',
						price: '$6.95',
						includes: ['Previous Address Tenant History'],
					},
					{
						name: 'Social Security Number Fraud Check',
						price: '$9.95',
						includes: ['Social Security Number Fraud Check'],
					},
					{
						name: 'Statewide Eviction Search',
						price: '$15.95',
						includes: ['Social Security Number Fraud Check'],
					},
					{
						name: 'Statewide Criminal Search',
						price: '$15.95',
						includes: ['Statewide Criminal Search'],
					},
					{
						name: 'Nationwide Eviction Search',
						price: '$21.95',
						includes: ['Nationwide Eviction Search'],
					},
					{
						name: 'Nationwide Criminal Search',
						price: '$21.95',
						includes: ['Nationwide Criminal Search'],
					},
					{
						name: 'Nationwide Bankruptcies, Tax Liens, & Civil Judgments',
						price: '$5.00',
						includes: ['Nationwide Bankruptcies, Tax Liens, & Civil Judgments'],
					},
					{
						name: 'Sex Offender Search',
						price: '$13.95',
						includes: ['Sex Offender Search'],
					},
					{
						name: 'Landlord Verification',
						price: '$16.95',
						includes: ['Landlord Verification'],
					},
					{
						name: 'Employment Verification',
						price: '$16.95',
						includes: ['Sex Offender Search'],
					},
					{
						name: 'Drug Test',
						price: '$99.95',
						includes: ['Drug Test'],
					},
				],
				companyPros: {
					title: 'Pros to Using AAOA for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'Thoughtful credit and background check options based on specific independent landlord needs',
						'Organization that has been around for some time serving landlord needs',
						'Credit report data comes from the reliable TransUnion credit bureau',
					],
				},
				topComplaints: {
					title: 'Top Complaints for AAOA from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'A poor user experience of the site and its checkout process',
						'Complaints about relentless upselling and being charged improperly during checkout process',
						'Tenants receive unsolicited emails for services',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 9 },
					{ heading: 'Product Quality', value: 7 },
					{ heading: 'Convenience', value: 8 },
					{ heading: 'Speed', value: 8 },
					{ heading: 'Customization', value: 9 },
					{ heading: 'Customer Service', value: 8 },
				],
				averageRating: 8.2,
				logo: '/images/companies/leaserunner-logo.jpeg',
				summaryDescription: [
					`LeaseRunner was founded in 2011 in Boulder, CO and acts as a tenant screening and online leasing company providing services to independent landlords, small property managers and agents. LeaseRunner has been a fast growing company and is estimated at $34mm in revenue with 37 employees.`,
					`While tenant screening reports are LeaseRunner’s primary business focus, it appears to have the strategy of becoming a one-stop-shop for independent landlords as it provides lease agreements, renter’s insurance, rent collection, online signature execution, and rental listings services to independent landlords. LeaseRunner’s tenant screening options include credit (with credit score), criminal background, financial information on your prospective tenant’s bank account, and eviction report. Experian is the source for LeaseRunner’s credit reports.`,
				],
				name: 'LeaseRunner',
				companyHref: 'https://www.leaserunner.com/',
				bestForText: 'Best for à la carte everything.',
				foundedText: '2011',
				revenueText: '$34',
				employeesText: '37',
				summaryConclusionText: `LeaseRunner is a good option for the budget-focused landlord who needs very specific high-level searches.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'LeaseRunner reports are instant reports. The landlord or the tenant may pay through the LeaseRunner service. The tenant is involved when a credit report is being sought. Customer service is provided by LeaseRunner via phone, email and self-help system online.',

				packages: [
					{
						name: 'Credit Report',
						price: '$20',
						includes: [
							'Experian Credit Report with prior addresses and VantageScoreTM 3.0',
						],
					},
					{
						name: 'Criminal Report',
						price: '$15',
						includes: ['Criminal Report'],
					},
					{
						name: 'Financial Report',
						price: '$10',
						includes: ['Financial Report'],
					},
					{
						name: 'Eviction Report',
						price: '$12',
						includes: ['Eviction Report'],
					},
				],
				companyPros: {
					title: 'Pros to Using LeaseRunner for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'À la carte report options is their tenant screening business model',
						'No membership, complicated sign up, or monthly fee required',
						'Quickly growing company, indicative of doing something right',
					],
				},
				topComplaints: {
					title: 'Top Complaints for LeaseRunner from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'Online platform is error prone',
						'Reports do not contain enough information',
						'It is expensive to do all reports “à la carte” compared to packages offered by other providers',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 7.5 },
					{ heading: 'Product Quality', value: 8 },
					{ heading: 'Convenience', value: 8 },
					{ heading: 'Speed', value: 8 },
					{ heading: 'Customization', value: 7 },
					{ heading: 'Customer Service', value: 7.5 },
				],
				averageRating: 7.7,
				logo: '/images/companies/e-renter-logo.png',
				summaryDescription: [
					`eRenter is a private company that is a Consumer Report Agency that was founded in 2003 and is based in Bellingham, Washington. The company primarily focuses on tenant screening services but it also provides resources for landlords. eRenter’s tenant screening checks include criminal background, credit checks, bankruptcies and evictions, among others. The revenue and number of employees of the company is unknown and not disclosed.`,
					`eRenter’s business model is 100% focused on tenant screening based on its website. It does provide knowledge articles to landlords as well. eRenter offers three different packages to independent landlords starting with its Basic package at $19.95 that does not include a credit check. One relatively unique offering is the County Background Check which looks at any criminal or evictions at the local county level. eRenter also provides a Rent Check Advisor service that recommends whether or not to accept rent checks from a tenant based on their history of checks bouncing. Please note that e-Renter does not provide full credit reports unless you pass their certification process and are given a Commercial Account.`,
				],
				name: 'eRenter',
				companyHref: 'https://www.e-renter.com/',
				bestForText: 'Best for Unique and Rare Tenant Screening Checks',
				foundedText: '2003',
				revenueText: 'NA',
				employeesText: 'NA',
				summaryConclusionText: `eRenter is one of the older providers of tenant screening online and offers a great service for background checks in States that block automatic pulls. `,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'eRenter’s reports are not instant reports, so this is not a good option for a landlord looking to receive their report immediately. The landlord or tenant may pay for any package but for the Premium and Ultimate package that include a credit check the Tenant must verify their approval and pay a $1.99 fee. e-Renter provides customer service via phone and email to its customers.',
				packages: [
					{
						name: 'Basic',
						price: '$19.95',
						includes: ['Identity Verification', 'Background Check'],
					},
					{
						name: 'Premium',
						price: '$29.95',
						includes: [
							'Identity Verification',
							'Background Check',
							'Credit Check',
						],
					},
					{
						name: 'Ultimate',
						price: '$34.95',
						includes: [
							'Identity Verification',
							'Background Check',
							'Credit Check',
							'Name History',
							'Address History',
							'Rent Check Advisor',
						],
					},
				],
				companyPros: {
					title: 'Pros to Using eRenter for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'Unique tenant screening options cater to landlords concerned about specific tenant issues',
						'One of the oldest distributors of tenant screening reports in the industry',
						'Criminal and eviction reports more reliable in states that do not allow automated pulls as not an instant report service',
					],
				},
				topComplaints: {
					title: 'Top Complaints for eRenter from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'Hard credit inquiry can anger tenants as it negatively affects their credit',
						'Their reports are not comprehensive and some question the thoroughness of them',
						'There are complaints that the credit information provided is not very good or helpful',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 7 },
					{ heading: 'Product Quality', value: 8 },
					{ heading: 'Convenience', value: 9 },
					{ heading: 'Speed', value: 9 },
					{ heading: 'Customization', value: 7 },
					{ heading: 'Customer Service', value: 7 },
				],
				averageRating: 7.8,
				logo: '/images/companies/tenant-background-search.jpg',
				summaryDescription: [
					`Tenant Background Search is a private company based in Dallas, TX that was founded in either 2012 or 2013. The company's sole focus is to provide tenant screening options online.  Tenant Background Search provides background, credit report, and eviction reports to landlords. There is no information available on Tenant Background Search’s revenue or employees.`,
					`In addition to credit reports, criminal background and evictions, Tenant Background Search also provides bankruptcies, foreclosures, and employment history to landlords and property managers. Tenant Background Search utilizes Transunion for its credit reports and Corelogic and BDS as its sources for other data that goes into its reports. While Tenants Background Search provides only a criminal background check at its Basic offering, the Plus package provides a criminal background search and a credit report.`,
				],
				name: 'Tenant Background Search',
				companyHref: 'https://www.tenantbackgroundsearch.com/',
				bestForText: 'Best for Quick, hassle-free screening',
				foundedText: '2012/2013',
				revenueText: 'NA',
				employeesText: 'NA',
				summaryConclusionText: `Tenant Background Search offers very easy to understand tenant screening options from known and reliable sources.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'The tenant must be involved in and approve of the screen if the package chosen includes a credit check. The landlord or the tenant may pay for the service. The customer service options provided by Tenant Background Search include email and a customer service form on their website.',
				packages: [
					{
						name: 'Basic',
						price: '$19.95',
						includes: ['Background Check'],
					},
					{
						name: 'Plus',
						price: '$24.95',
						includes: ['Background Check', 'Credit Check & FICO Score'],
					},
					{
						name: 'Comprehensive',
						price: '$32.95',
						includes: [
							'Background Check',
							'Credit Check & FICO Score',
							'Eviction Report',
						],
					},
					{
						name: 'Comprehensive + Assets & Income',
						price: '$39.95',
						includes: [
							'Background Check',
							'Credit Check & FICO Score',
							'Eviction Report',
							'Bank Account Assets & Income Check',
						],
					},
				],
				companyPros: {
					title: 'Pros to Using Tenant Background Search for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'Easy to understand pricing and offering',
						'Utilizes known and reliable data sources',
						'One-time purchase options with no memberships or site visits required to access the reports',
					],
				},
				topComplaints: {
					title:
						'Top Complaints for Tenant Background Search from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'Little customer service options and it is reported as not a priority for the company',
						'Very secretive about who they are',
						'Delays in receiving eviction reports have been reported',
					],
				},
			},
			{
				ratings: [
					{ heading: 'Cost to Value', value: 9 },
					{ heading: 'Product Quality', value: 8 },
					{ heading: 'Convenience', value: 9 },
					{ heading: 'Speed', value: 9 },
					{ heading: 'Customization', value: 8 },
					{ heading: 'Customer Service', value: 9 },
				],
				averageRating: 8.7,
				logo: '/images/companies/rentprep-logo.png',
				summaryDescription: [
					`RentPrep is a private company that was founded in 2007 that is headquartered in Lancaster, New York that provides tenant screening services and free landlord advice and resources. RentPrep has an estimated 14 employees and has grown considerably since its founding.`,
					`RentPrep’s place in the market and business model is that it informs new and established landlords by providing online articles and resources to help them in managing their business. The concept here is when they do need a tenant screening product, they will come back to RentPrep for the service. RentPrep’s tenant screening services include credit reports and checks, criminal background reports, evictions, sex offender, bankruptcies, and judgements and liens checks. RentPrep offers a TransUnion full report including a credit report, national criminal and more and their own national criminal background check that has numerous add-ons including a Credit Decision Report, a Nationwide Criminal & Sex Offender Search, and an Income Verification report. Please note that the Credit Decision Report is not a full credit report or credit score and only contains a decision and a range of a credit score on the prospective tenant.`,
				],
				name: 'RentPrep',
				companyHref: 'https://rentprep.com/',
				bestForText: 'Best for Screening in Restricted States',
				foundedText: '2007',
				revenueText: 'NA',
				employeesText: '14',
				summaryConclusionText: `RentPrep offers the professional quality of TransUnion Full Credit Report with their own proprietary criminal background screens. This can be a great combination at a reasonable price for independent landlords.`,
				hrefOrderNow: 'https://www.example.com',
				packagesDescription:
					'RentPrep’s TransUnion report is instant, however its own criminal background search may take longer if it is in a restricted search state including Massachusetts, Delaware, South Dakota, Wyoming, and Colorado. A landlord or a tenant may pay for the reports. RentPrep’s customer service channels include phone and email options.',
				packages: [
					{
						name: 'RentPrep Background Check',
						price: '$21.00',
						includes: [`RentPrep's Proprietary Background Check`],
					},
					{
						name: 'TransUnion Full Credit Report',
						price: '$40.00',
						includes: [
							'TransUnion Credit Report',
							'A ResidentScore',
							'A Rental Background Check',
						],
					},
					{
						name: 'Nationwide Criminal & Sex Offender Search',
						price: '$6.00',
						includes: ['Only for Basic Package'],
					},
					{
						name: 'Credit Decision Report',
						price: '$11.00',
						includes: ['Only for Basic Package'],
					},
					{
						name: 'Income Verification',
						price: '$10.00',
						includes: ['Only for Highest Package'],
					},
				],
				companyPros: {
					title: 'Pros to Using RentPrep for Tenant Screening',
					description: `digpads’ research determined the following positives to working with this tenant screening provider.`,
					prosList: [
						'Innovative proprietary criminal background check covering all 50 states with affordable innovative add ons',
						'TransUnion option allows for more traditional offering if desired',
						'Very informative and transparent provider who thinks of the landlord’s interests',
					],
				},
				topComplaints: {
					title: 'Top Complaints for RentPrep from Online Reviews',
					description:
						'digpads searched the internet for the most common negative reviews for each company. Focusing only on negative feedback only does not tell the full story.',
					complaintList: [
						'Distributor of TransUnion product so unable to help with information errors on credit side',
						'Customer service complaints',
						'Complaints about eviction and bankruptcy findings',
					],
				},
			},
		],
	},
	research: {
		id: 'research',
		title: 'How digpads’ did its Research',
		content: [
			'Sample Text1',
			'Sample Text2',
			'Sample Text3',
			'Sample Text4',
			'Sample Text5',
			'Sample Text6',
		],
	},
	excludedCompanies: {
		id: 'excluded-companies',
		title: 'Reviewed and Excluded Companies',
		content: [
			{
				name: 'Avail',
				text: 'Avail is a property management offering provider that includes tenant screening but does not focus on it.',
			},
			{
				name: 'RentSpree',
				text: 'RentSpree is more of a property management offering that makes it more difficult for a user to obtain a tenant screening report than providers listed above.',
			},
			{
				name: 'Cozy',
				text: 'Cozy is more of a property management offering that makes it more difficult for a user to obtain a tenant screening report compared to alternatives.',
			},
			{
				name: 'ScreeningWorks (Yardi)',
				text: 'ScreeningWorks by Yardi is more of a property management offering that makes it more difficult for a user to obtain a tenant screening report compared to other providers.',
			},
			{
				name: 'RealPage',
				text: 'RealPage focuses on nearly everything including property management and is not a quick or easy provider for an independent landlord.',
			},
			{
				name: 'Rentec',
				text: 'Rentec is a property management offering along with a lot more that makes it more difficult for a user to obtain a tenant screening report than other providers.',
			},
			{
				name: 'National Tenant Network',
				text: 'National Tenant Network requires a landlord to go through an approval process before being able to screen tenants.',
			},
			{
				name: 'Tenant Alert',
				text: 'Tenant Alert requires a landlord to go through an approval process before being able to screen tenants.',
			},
			{
				name: 'TVS',
				text: 'TVS has portions of its offering that require site visits and required a landlord to provide a lot of information and apply to receive reports.',
			},
			{
				name: 'Buildium',
				text: 'Buildium is a property management software company so it requires a bit of work to get to the tenant screening service.',
			},
			{
				name: 'First Advantage',
				text: 'First Advantage requires a landlord to go through an approval process before being able to screen tenants.',
			},

			{
				name: 'VeriFirste',
				text: 'VeriFirst requires a landlord to go through an approval process before being able to screen tenants.',
			},
			{
				name: 'BetterNOI',
				text: 'BetterNOI requires a landlord to go through an approval process before being able to screen tenants.',
			},
			{
				name: 'Verify Tenant',
				text: 'Verify Tenant requires a landlord to go through an approval process before being able to screen tenants.',
			},
			{
				name: 'Experian Connect',
				text: 'Experian Connect was excluded as even though it is one of the three big credit bureaus it does not provide a criminal background check alongside its offering - something an independent landlord should likely obtain before leasing to a tenant.',
			},
			{
				name: 'Tentify',
				text: 'Tentify has gone out of business.',
			},
		],
	},
	tenantScreeingFAQS: {
		id: 'screening-faqs',
		questionsAndAnswers: [
			{
				question:
					'Why should an independent landlord obtain tenant screening reports?',
				answers: [
					`An independent landlord should obtain tenant screening to assist them in evaluating if a prospective tenant is a good candidate to lease to. Leasing to a tenant is a risk and an investment for an independent landlord. If the prospective tenant ends up being a problem tenant that does not pay rent, damages the property, refuses to leave, or violates the lease terms, then the problem tenant could cost the landlord thousands of dollars or more in lost rent, property damage, and court costs.`,
				],
			},
			{
				question: 'Is tenant screening worth the cost to a landlord?',
				answers: [
					`Yes. For a price tag that ranges from $20-$50 depending on the provider and the number of things you want to screen for, a tenant screening acts as an insurance policy to find any low-hanging fruit problems about a prospective tenant. Since a problem tenant can cost a landlord thousands if not tens of thousands of dollars in losts rent, repairs and legal expenses (not to mention the cost of your time), this is a relatively small investment to make to significantly reduce the odds of having a problem tenant.`,
				],
			},
			{
				question: 'What is the best tenant screening?',
				answers: [
					`The best tenant screening varies based on what an independent landlord’s specific needs are and what is most important to them. Some providers are the cheapest, some have the best information, others have innovative reports, while still others provide unique information not available by most tenant screening providers. digpads hopes you utilize this Tenant Screening Guide to help you ascertain who the best tenant screening provider is for your individual needs as an independent landlord. If you would like us to make a recommendation based on what is the most important to you, please check out digpads’ `,
				],
				withLink: true,
				linkText: `"Find my tenant screening provider".`,
				href: '/match-me/tenant-screening',
			},
			{
				question: 'Am I able to obtain tenant screening information on my own?',
				answers: [
					`You are not generally able to obtain tenant screening information on your own. For some landlords that qualify and where it would make sense as running a lot of tenant screens in a month or year, a landlord can have a portal on their home computer to run checks as needed. This required a vetting process and the independent landlord to meet certain criteria in order to be approved. Most independent landlords who screen prospective tenants infrequently utilize the single purchase tenant screening options.`,
				],
			},
		],
	},
};

export default function TenantScreening() {
	const [loaded, setLoaded] = useState(false);

	async function getScreeningProviders() {
		const response = await axios.get(
			process.env.REACT_APP_STRAPI_API_URL + '/screening-providers'
		);

		if (response.status === 200) {
			const screeningProviders = response.data;

			screeningProviders.forEach((provider, i) => {
				data.screeningProviders.content[i].hrefOrderNow =
					provider.affiliateLink;
			});
		} else {
			console.log(`couldn't load screening providers`);
		}

		setLoaded(true);
	}

	getScreeningProviders();

	return !loaded ? (
		<ServiceGuideTemplate {...data} />
	) : (
		<ServiceGuideTemplate {...data} />
	);
}
