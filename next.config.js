// next.config.js
module.exports = {
    reactStrictMode: true, // Enables React's Strict Mode
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Expose environment variable
    },
    images: {
      domains: ['your-image-domain.com'], // Add allowed image domains if using next/image
    },
    // Any other custom configurations can go here
  };
  