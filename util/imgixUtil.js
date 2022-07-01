const imgixDomains = [
	'thrill-goog-prod.imgix.net',
	'thrill-goog-dev.imgix.net',
	'thrilling.imgix.net',
	'thrilling-1.imgix.net',
	'thrilling-2.imgix.net',
	'thrilling-3.imgix.net',
];

const domainMap = (isProduction) => ({
	'storage.googleapis.com' : {
		imgixDomain : isProduction ? imgixDomains[0] : imgixDomains[1],
		stripPath   : true,
	},
	'firebasestorage.googleapis.com' : {
		containsRules : {
			'thrilling-portal.appspot.com' : {
				imgixDomain : imgixDomains[0],
				stripPath   : true,
			},
			'thrilling-dev-portal.appspot.com' : {
				imgixDomain : imgixDomains[1],
				stripPath   : true,
			},
		},
	},
	'cdn.shopify.com' : {
		imgixDomain : imgixDomains[2],
		stripPath   : false,
	},
});

// Functions below shouldn't mutate variables above.

function queryBuilder(opts, ratio) {
	const defaultOpts = {
		fm   : 'pjpg',
		auto : 'compress',
		fit  : 'crop',
		crop : 'faces,edges',
		w    : '768',
		bg   : 'fff',
		dpr  : '2',
	};
	const blendedOpts = Object.assign({}, defaultOpts, opts);

	// add height, based on width
	if (ratio) {
		if (ratio === 'landscape') {
			blendedOpts.h = (parseFloat(blendedOpts.w) * 2 / 3).toString();
		} else if (ratio === 'portrait') {
			blendedOpts.h = (parseFloat(blendedOpts.w)  * 1.5).toString();
		} else if (ratio !== 'auto') {
			blendedOpts.h = blendedOpts.w;
		}
	} else {
		if (!blendedOpts.h) {
			blendedOpts.h = blendedOpts.w;
		}
	}

	// add all opts to query
	const query = (Object.keys(blendedOpts))
		.map(optKey => (
			`&${ optKey }=${ blendedOpts[optKey] }`
		)).join('');
	
	return query.replace(/^&/, '?');
}

function isValidImgixUrl(url, isProduction) {
	// if not valid URL, shut it down
	if (!/^(https?):\/\/[^\s$.?#].[^\s]*$/.test(url)) {
		return false;
	}

	const domain = url.split(/\/\//)[1].split(/\//)[0].split(/\?/)[0];

	return imgixDomains.includes(domain) || Object.keys(domainMap(isProduction)).includes(domain);
}

function getUrl(url, isProduction) {
	// if URL is not a valid URL, things will break
	// prevent invalid URLs from proceeding
	if (!isValidImgixUrl(url, isProduction))
		return url;

	url = url.split(/\/\//)[1].split(/\?/)[0];

	const domain = url.split(/\//)[0];

	url = 'https://' + url;

	let swappedDomain = domainMap(isProduction)[domain];

	if (!swappedDomain)
		return url;

	if (!swappedDomain.imgixDomain && swappedDomain.containsRules) {
		for (const rule in swappedDomain.containsRules) {
			if (url.includes(rule)) {
				swappedDomain = swappedDomain.containsRules[rule];

				break;
			}
		}

		if (!swappedDomain.imgixDomain)
			return url;
	}

	if (swappedDomain.stripPath) {
		let substrings = url.split(/\//),
			imagePath = '';

		if ('storage.googleapis.com' === domain) {
			substrings = substrings.slice(4);
			imagePath = substrings.join('/');
		} else
			imagePath = substrings.pop() ?? '';

		url = `https://${ domain }/${ imagePath }`;
	}

	return url.replace(domain, swappedDomain.imgixDomain || domain);
}

function getImgSrc({
	url,
	isProduction,
	format = 'pjpg',
	width,
	ratio,
	opts = {},
}) {
	// prevent invalid URLs from proceeding
	if (!isValidImgixUrl(url, isProduction)) {
		return url;
	}

	opts.fm = format;

	if (width && !opts.w) {
		opts.w = width.toString();
	}

	return getUrl(url, isProduction) + queryBuilder(opts, ratio);
}

function getBgImgSrc({
	url,
	isProduction,
	format = 'pjpg',
	width,
	ratio,
	opts = {},
}) {
	return `url(${ getImgSrc({url, isProduction, format, width, ratio, opts}) })`;
}

export default { getImgSrc, getBgImgSrc, getUrl };
