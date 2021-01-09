module.exports = {
  async redirects() {
    return [
      {
        source: '/*',
        destination: '/',
      },
    ];
  },
};
