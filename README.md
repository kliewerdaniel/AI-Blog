# Website Performance Optimizations

This repository contains performance optimizations for the danielkliewer.com website to improve page load times and overall user experience.

## Implemented Optimizations

### 1. Image Optimization
- Compressed and resized images to reduce file sizes
- Added support for WebP format
- Implemented responsive images with srcset
- Added lazy loading for images

### 2. CSS and JavaScript Minification
- Minified CSS files to reduce file size
- Minified JavaScript files to reduce file size
- Implemented critical CSS inlining for above-the-fold content
- Deferred loading of non-critical CSS and JavaScript

### 3. Browser Caching
- Configured browser caching with .htaccess
- Set appropriate cache expiration times for different file types
- Added Cache-Control headers

### 4. Gzip Compression
- Enabled Gzip compression for text-based resources
- Configured compression for HTML, CSS, JavaScript, XML, and fonts

### 5. Reduced HTTP Requests
- Combined CSS files
- Inlined critical CSS
- Deferred loading of non-critical resources

### 6. Font Loading Optimization
- Preconnect to Google Fonts
- Preload critical fonts
- Added font-display swap for better rendering

## How to Use

### Running the Site
```bash
# Install dependencies
npm install

# Start the Jekyll server
npm run serve
```

### Optimizing Images
```bash
# Install the required dependencies
npm install

# Run the image optimization script
npm run optimize-images
```

This will create optimized versions of all images in the `static/images-optimized` directory. The script:
- Compresses images to reduce file size
- Creates WebP versions for modern browsers
- Generates responsive image sizes (320px, 640px, 960px, 1280px)

### Minifying CSS and JavaScript
```bash
# Minify CSS
npm run minify-css

# Minify JavaScript
npm run minify-js
```

## Implementation Details

### Image Optimization
Images are optimized using the Sharp library, which provides efficient image processing. The optimization script:
- Compresses JPEG, PNG, and WebP images
- Creates responsive versions for different screen sizes
- Generates WebP format for browsers that support it

To use responsive images in your HTML:

```html
<img 
  src="/static/images-optimized/image.jpg" 
  srcset="
    /static/images-optimized/image-320.jpg 320w,
    /static/images-optimized/image-640.jpg 640w,
    /static/images-optimized/image-960.jpg 960w,
    /static/images-optimized/image-1280.jpg 1280w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="Description"
>
```

### Critical CSS
Critical CSS is inlined in the HTML to ensure fast rendering of above-the-fold content. Non-critical CSS is loaded asynchronously to prevent render-blocking.

### Browser Caching
Browser caching is configured in the `.htaccess` file with appropriate expiration times:
- CSS and JavaScript: 1 year
- Images: 1 year
- HTML: 1 day

### Gzip Compression
Gzip compression is enabled for text-based resources to reduce file sizes during transfer.

## Netlify Build Configuration

The site is configured to build and deploy on Netlify. Several fixes have been implemented to ensure smooth builds:

### Image Path Fixes

The `fix_stories01_images.py` script addresses issues with image paths in story files:
- Replaces direct image references with the `story-image.html` include
- Copies images from `input_images01/` to `static/input_images/` to ensure they're available during build

To run this script:
```bash
python fix_stories01_images.py
```

### Netlify Build Configuration

The site uses a custom build command in the `netlify.toml` file to ensure all image directories are copied to the build directory before running Jekyll:

```toml
command = """
  mkdir -p static/input_images
  cp -r input_images01/* static/input_images/ || true
  cp -r input_images02/* static/input_images/ || true
  cp -r input_images03/* static/input_images/ || true
  cp -r input_images04/* static/input_images/ || true
  jekyll build
"""
```

For more details on the Netlify build configuration and fixes, see [NETLIFY_BUILD_FIX.md](NETLIFY_BUILD_FIX.md).

## Future Improvements

1. **Content Delivery Network (CDN)**
   - Consider implementing a CDN for global content distribution
   - Options include Cloudflare, AWS CloudFront, or Fastly

2. **Further Image Optimization**
   - Implement automatic WebP conversion for all images
   - Consider using next-gen formats like AVIF for even better compression

3. **JavaScript Optimization**
   - Implement code splitting for larger JavaScript files
   - Consider using module/nomodule pattern for modern/legacy browsers

4. **Preloading Key Resources**
   - Preload critical resources that are discovered late in the page load
   - Use resource hints (preconnect, prefetch, preload) strategically
