#!/bin/bash

# Script to test the Netlify build command locally

echo "Testing Netlify build command locally..."

# Create static/input_images directory
mkdir -p static/input_images

# Copy image files from input_images directories
echo "Copying image files..."
cp -r input_images01/* static/input_images/ || true
cp -r input_images02/* static/input_images/ || true
cp -r input_images03/* static/input_images/ || true
cp -r input_images04/* static/input_images/ || true

# Create empty placeholder files for problematic symlinks
echo "Creating empty placeholder files for problematic symlinks..."
touch static/input_images/B01N78T9F901_SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BHLH14NQ01_SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BW23BXYN01S001LXXXXXXX.jpg
touch static/input_images/books-003.JPG
touch static/input_images/books-005.JPG
touch static/input_images/books-007.JPG
touch static/input_images/books-013.JPG
touch static/input_images/books-015.JPG

# Run Jekyll build
echo "Running Jekyll build..."
JEKYLL_ENV=production bundle exec jekyll build

echo "Build completed. Check _site directory for results."
