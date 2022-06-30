module.exports = {
  basePath: '',
  // default image is not compatible with `next export`
  // more info: https://nextjs.org/docs/messages/export-image-api
  images: {
    loader: "imgix",
    path: "https://thrilling.imgix.net/",
  },
  swcMinify: true,
};
