const withImages = require('next-images')
const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = removeImports(withImages(nextConfig));
