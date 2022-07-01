module.exports = {
	basePath: '',
	// default image is not compatible with `next export`
	// more info: https://nextjs.org/docs/messages/export-image-api
	images: {
		domains: ['cdn.shopify.com', 's3.amazonaws.com', 'thrilling.imgix.net']
	},
	swcMinify: true,
};
