function Embed(iframeUrl, iframeLocation, width, height) {
	const locationMap = {
		'top center': { top: '30px', left: '30px' },
		'center center': {
			top: `calc(50% - ${height / 2}px)`,
			left: `calc(50% - ${width / 2}px)`,
		},
		'bottom center': { bottom: '1em', left: `calc(50% - ${width / 2}px)` },
		'top left': { top: '30px', left: '30px' },
		'center left': { top: `calc(50% - ${height / 2}px)`, left: '30px' },
		'bottom left': { bottom: '30px', left: '30px' },
		'top right': { top: '30px', right: '30px' },
		'center right': { top: `calc(50% - ${height / 2}px)`, right: '30px' },
		'bottom right': { bottom: '30px', right: '30px' },
	};

	const iframe = document.createElement('iframe');
	iframe.setAttribute('src', iframeUrl);
	iframe.setAttribute('id', 'iframe');
	iframe.style.position = 'fixed';
	iframe.style.top = locationMap[iframeLocation].top || 'auto';
	iframe.style.left = locationMap[iframeLocation].left || 'auto';
	iframe.style.bottom = locationMap[iframeLocation].bottom || 'auto';
	iframe.style.right = locationMap[iframeLocation].right || 'auto';
	iframe.style.width = width + 'px';
	iframe.style.height = height + 'px';
	iframe.style.border = 'none';
	document.body.appendChild(iframe);

	return iframe;
}
