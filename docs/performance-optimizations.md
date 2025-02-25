# Performance Optimization Guide

This guide explains the performance optimizations implemented for danielkliewer.com and how to maintain them.

## Overview

The website includes several performance optimizations to improve page load times:

1. **CSS and JavaScript Minification**
2. **Critical CSS Inlining**
3. **Deferred JavaScript Loading**
4. **Browser Caching Configuration**
5. **Gzip Compression**
6. **Image Optimization**
7. **Font Loading Optimization**

## CSS and JavaScript Minification

### What It Does

Minification removes unnecessary characters (whitespace, comments, etc.) from CSS and JavaScript files to reduce file size.

### How It's Implemented

- Minified versions of CSS and JavaScript files are created with the `.min.css` and `.min.js` extensions
- NPM scripts are provided to automate the minification process

### How to Use

```bash
# Minify CSS
npm run minify-css

# Minify JavaScript
npm run minify-js
```

### When to Update

Run these commands whenever you make changes to the original CSS or JavaScript files.

## Critical CSS Inlining

### What It Does

Critical CSS is the minimum CSS needed to render the above-the-fold content. Inlining this CSS in the HTML eliminates render-blocking CSS requests.

### How It's Implemented

- Critical CSS is extracted to `assets/css/critical.css`
- This CSS is inlined directly in the HTML `<head>` of the layout files
- The rest of the CSS is loaded asynchronously

### How to Update

If you make significant changes to the site layout or styling, you should update the critical CSS:

1. Identify the CSS needed for above-the-fold content
2. Update `assets/css/critical.css` with this CSS
3. Minify the updated critical CSS

## Deferred JavaScript Loading

### What It Does

Defers the loading of JavaScript until after the HTML is parsed, preventing JavaScript from blocking rendering.

### How It's Implemented

- The `defer` attribute is added to script tags in the layout files
- Scripts are placed at the end of the HTML body

### Best Practices

- Keep JavaScript files small and focused
- Use the `defer` attribute for scripts that don't need to execute immediately
- Place scripts at the end of the HTML body

## Browser Caching

### What It Does

Configures browsers to store static resources locally, reducing the need to download them on subsequent visits.

### How It's Implemented

- Cache settings are configured in the `.htaccess` file
- Different cache durations are set for different file types

### Cache Durations

- CSS and JavaScript: 1 year
- Images: 1 year
- Fonts: 1 year
- HTML: 1 day

### How to Update

If you need to change cache settings, edit the `.htaccess` file in the root directory.

## Gzip Compression

### What It Does

Compresses text-based resources before sending them to the client, reducing transfer size.

### How It's Implemented

- Gzip compression is configured in the `.htaccess` file
- Compression is enabled for HTML, CSS, JavaScript, XML, and fonts

### How to Verify

You can verify Gzip compression is working by:

1. Using browser developer tools (Network tab)
2. Looking for the `Content-Encoding: gzip` response header

## Font Loading Optimization

### What It Does

Optimizes the loading of web fonts to prevent render blocking and improve perceived performance.

### How It's Implemented

- Preconnect to Google Fonts domains
- Preload critical fonts with `rel="preload"`
- Use `font-display: swap` for better text rendering during font loading

### Best Practices

- Limit the number of font weights and styles
- Consider using system fonts for better performance
- Use variable fonts where possible

## Monitoring Performance

### Tools to Use

- Google PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- Lighthouse (in Chrome DevTools)
- Chrome DevTools Performance tab

### Key Metrics to Monitor

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

## Maintenance Checklist

Regular maintenance tasks to keep the site performing well:

1. **Monthly**:
   - Run minification scripts for any updated CSS/JS
   - Check PageSpeed Insights score
   - Optimize any new images

2. **Quarterly**:
   - Review and update critical CSS if needed
   - Check for unused CSS/JS that can be removed
   - Run a full Lighthouse audit

3. **Annually**:
   - Review caching strategy
   - Consider upgrading to newer image formats
   - Evaluate if a CDN would be beneficial
