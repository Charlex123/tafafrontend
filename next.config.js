const dotenv = require('dotenv')
dotenv.config()

// next.config.js
const nextConfig = {
  images: {
    domains: ['i.ibb.co',
    'ibb.co',
    'imgbox.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
return config;
  },
};
module.exports = nextConfig;