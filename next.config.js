const withTM = require('next-transpile-modules')([
  '@ionic/react',
  '@ionic/core',
  '@stencil/core',
  'ionicons',
]);

module.exports = withTM({
  basePath: '',
  images: {
    domains: ['images.unsplash.com'],
  },
  swcMinify: true,
});
