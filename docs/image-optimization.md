# Image Optimization Guide

This guide explains how to use the image optimization features implemented for danielkliewer.com.

## Overview

The website includes several image optimization techniques to improve page load times:

1. **Image Compression**: Reduces file sizes without significant quality loss
2. **Responsive Images**: Serves appropriately sized images based on device screen size
3. **WebP Format**: Uses modern image format with better compression for supported browsers
4. **Lazy Loading**: Defers loading of off-screen images until they're needed

## Using the Image Optimization Script

The `optimize-images.js` script processes all images in the `static/images` directory and creates optimized versions in `static/images-optimized`.

### Running the Script

```bash
# Install dependencies first (if not already installed)
npm install

# Run the optimization script
npm run optimize-images
```

The script will:
- Create compressed versions of all images
- Generate WebP versions for better compression
- Create responsive sizes (320px, 640px, 960px, 1280px) for each image
- Output all optimized images to the `static/images-optimized` directory

## Using Optimized Images in Your Content

### Basic Responsive Images

To use responsive images in your content, use the `responsive-image.html` include:

```liquid
{% include responsive-image.html 
  src="/static/images-optimized/example.jpg" 
  alt="Example image" 
  sizes="(max-width: 768px) 100vw, 50vw" 
  class="my-image-class" 
%}
```

Parameters:
- `src`: Path to the original optimized image
- `alt`: Alt text for accessibility (required)
- `sizes`: Media query for responsive sizing (optional, default: `(max-width: 768px) 100vw, 50vw`)
- `class`: CSS class to apply to the image (optional)

### WebP-Aware Images

For the best performance, use the `webp-image.html` include which serves WebP images to browsers that support them:

```liquid
{% include webp-image.html 
  src="/static/images-optimized/example.jpg" 
  alt="Example image" 
  sizes="(max-width: 768px) 100vw, 50vw" 
  class="my-image-class" 
%}
```

This include uses the HTML `<picture>` element to serve WebP images to supporting browsers while falling back to the original format for browsers that don't support WebP.

## Manual HTML Implementation

If you need more control, you can manually implement responsive and WebP-aware images:

### Basic Responsive Image

```html
<img 
  src="/static/images-optimized/example.jpg" 
  srcset="
    /static/images-optimized/example-320.jpg 320w,
    /static/images-optimized/example-640.jpg 640w,
    /static/images-optimized/example-960.jpg 960w,
    /static/images-optimized/example-1280.jpg 1280w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="Example image"
>
```

### WebP-Aware Responsive Image

```html
<picture>
  <!-- WebP format for browsers that support it -->
  <source
    type="image/webp"
    srcset="
      /static/images-optimized/example-320.webp 320w,
      /static/images-optimized/example-640.webp 640w,
      /static/images-optimized/example-960.webp 960w,
      /static/images-optimized/example-1280.webp 1280w,
      /static/images-optimized/example.webp
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  >
  
  <!-- Original format for browsers that don't support WebP -->
  <source
    srcset="
      /static/images-optimized/example-320.jpg 320w,
      /static/images-optimized/example-640.jpg 640w,
      /static/images-optimized/example-960.jpg 960w,
      /static/images-optimized/example-1280.jpg 1280w,
      /static/images-optimized/example.jpg
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  >
  
  <!-- Fallback image for browsers that don't support picture element -->
  <img 
    src="/static/images-optimized/example.jpg" 
    alt="Example image"
    loading="lazy"
  >
</picture>
```

## Understanding the `sizes` Attribute

The `sizes` attribute tells the browser how wide the image will be displayed at different viewport sizes. This helps the browser select the appropriate image from the `srcset`.

Common patterns:
- Full width on mobile, half width on desktop: `(max-width: 768px) 100vw, 50vw`
- Full width on all devices: `100vw`
- 300px wide on all devices: `300px`
- Different widths at different breakpoints: `(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw`

## Best Practices

1. **Always provide alt text** for accessibility
2. **Use WebP-aware images** when possible for better performance
3. **Choose appropriate sizes** based on how the image is displayed in your layout
4. **Keep original images** in case you need to regenerate optimized versions
5. **Run the optimization script** whenever you add new images to the site
