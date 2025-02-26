/**
 * Image Optimization Script
 * 
 * This script optimizes images in the specified directories using sharp.
 * It creates optimized versions of images and generates WebP versions for modern browsers.
 * 
 * Usage:
 * 1. Install dependencies: npm install sharp glob
 * 2. Run the script: node optimize-images.js
 */

const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  // Directories to process
  directories: [
    'images',
    'static/images'
  ],
  // Image extensions to process
  extensions: ['jpg', 'jpeg', 'png'],
  // Output quality (1-100)
  jpegQuality: 80,
  pngQuality: 80,
  webpQuality: 75,
  // Maximum dimensions
  maxWidth: 1200,
  maxHeight: 1200,
  // Generate WebP versions
  generateWebP: true,
  // Skip already optimized images
  skipExisting: true
};

// Create optimized directories if they don't exist
config.directories.forEach(dir => {
  const optimizedDir = path.join(dir, 'optimized');
  const webpDir = path.join(dir, 'webp');
  
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
    console.log(`Created directory: ${optimizedDir}`);
  }
  
  if (config.generateWebP && !fs.existsSync(webpDir)) {
    fs.mkdirSync(webpDir, { recursive: true });
    console.log(`Created directory: ${webpDir}`);
  }
});

// Process each directory
config.directories.forEach(dir => {
  // Get all images with specified extensions
  const imagePatterns = config.extensions.map(ext => `${dir}/*.${ext}`);
  const images = [];
  
  imagePatterns.forEach(pattern => {
    const matches = glob.sync(pattern);
    images.push(...matches);
  });
  
  console.log(`Found ${images.length} images in ${dir}`);
  
  // Process each image
  images.forEach(async (imagePath) => {
    const filename = path.basename(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    const name = path.basename(imagePath, ext);
    const optimizedPath = path.join(dir, 'optimized', filename);
    const webpPath = path.join(dir, 'webp', `${name}.webp`);
    
    // Skip if optimized version already exists and skipExisting is true
    if (config.skipExisting && fs.existsSync(optimizedPath)) {
      console.log(`Skipping ${filename} (already optimized)`);
      return;
    }
    
    try {
      // Get image metadata
      const metadata = await sharp(imagePath).metadata();
      
      // Determine if resizing is needed
      const needsResize = metadata.width > config.maxWidth || metadata.height > config.maxHeight;
      
      // Create optimized version
      let sharpInstance = sharp(imagePath);
      
      if (needsResize) {
        sharpInstance = sharpInstance.resize({
          width: Math.min(metadata.width, config.maxWidth),
          height: Math.min(metadata.height, config.maxHeight),
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Set quality based on format
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance
          .jpeg({ quality: config.jpegQuality })
          .toFile(optimizedPath);
      } else if (ext === '.png') {
        await sharpInstance
          .png({ quality: config.pngQuality })
          .toFile(optimizedPath);
      }
      
      console.log(`Optimized: ${filename}`);
      
      // Create WebP version if enabled
      if (config.generateWebP) {
        await sharp(imagePath)
          .resize({
            width: Math.min(metadata.width, config.maxWidth),
            height: Math.min(metadata.height, config.maxHeight),
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: config.webpQuality })
          .toFile(webpPath);
        
        console.log(`Created WebP: ${name}.webp`);
      }
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  });
});

// Add WebP image include to Jekyll
const webpIncludePath = '_includes/webp-image.html';
const webpIncludeContent = `{% comment %}
WebP image include with fallback
Usage: {% include webp-image.html src="/path/to/image.jpg" alt="Alt text" %}
{% endcomment %}

<picture>
  <source srcset="{{ include.src | replace: '.jpg', '.webp' | replace: '.jpeg', '.webp' | replace: '.png', '.webp' | relative_url }}" type="image/webp">
  <source srcset="{{ include.src | relative_url }}" type="image/jpeg">
  <img src="{{ include.src | relative_url }}" alt="{{ include.alt }}" {% if include.class %}class="{{ include.class }}"{% endif %} loading="lazy">
</picture>`;

// Create WebP include if it doesn't exist
if (!fs.existsSync(webpIncludePath)) {
  fs.writeFileSync(webpIncludePath, webpIncludeContent);
  console.log(`Created WebP include: ${webpIncludePath}`);
}

console.log('Image optimization complete!');
