/** @type {import('next').NextConfig} */
const { withServiceWorker } = require('next-sw');

const nextConfig = withServiceWorker({
  reactStrictMode: true,
  serviceWorker: {
    name: 'firebase-messaging-sw.js',
    entry: 'src/config/firebase-messaging-sw.js',
    livereload: true
  }
})

module.exports = nextConfig
