function Benefit(img, title, text) {
	this.img = img;
	this.title = title;
	this.text = text;
}

export const benefits = [
	new Benefit(
		'images/icons/WhiteOutlineScreenLoopLens.png',
		'Founded by independent landlords',
		`We understand your problems as we
        experience them ourselves`
	),
	new Benefit(
		'images/icons/WhiteOutlineClock.png',
		'Digitally organize your rental business (Coming Soon)',
		`digpads allows landlords to organize
        their documents, digitize their
        leasing process, and manage their
        rental property all from one place`
	),
	new Benefit(
		'images/icons/WhiteOutlineHouse.png',
		'Free and premium tools',
		`Allows you to grow your rental
        business inexpensively and expand as
        you need to`
	),
	new Benefit(
		'images/icons/WhiteOutlineGiftDiscount.png',
		'Focus on innovation and efficiency',
		`digpads’ is responsive to user
        feedback and its mission is to
        improve the ease, efficiency, and
        cost of operating a rental business`
	),
];
