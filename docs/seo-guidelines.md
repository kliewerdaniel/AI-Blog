# SEO Guidelines for danielkliewer.com

This document outlines the SEO best practices implemented on danielkliewer.com and provides guidance for maintaining and improving search engine visibility.

## Meta Tags Implementation

### Title Tags
- **Format**: `[Page Title] | Daniel Kliewer`
- **Length**: Keep between 50-60 characters
- **Best Practices**:
  - Include primary keywords near the beginning
  - Make each title unique and descriptive
  - Include brand name at the end for recognition

### Meta Descriptions
- **Length**: 150-160 characters
- **Best Practices**:
  - Include primary and secondary keywords naturally
  - Write compelling copy that encourages clicks
  - Include a call-to-action when appropriate
  - Make each description unique

## URL Structure
- **Format**: `https://danielkliewer.com/[category]/[post-title]`
- **Best Practices**:
  - Use hyphens to separate words
  - Keep URLs short and descriptive
  - Include relevant keywords
  - Avoid special characters, numbers, or unnecessary parameters

## Content Optimization

### Headings
- Use a single H1 tag per page (typically the post title)
- Structure content with H2 and H3 tags in a logical hierarchy
- Include relevant keywords in headings naturally

### Keyword Usage
- Include primary keyword in:
  - Title tag
  - H1 heading
  - First paragraph
  - At least one H2 heading
  - Meta description
  - URL
- Use related keywords and synonyms throughout content
- Maintain a natural keyword density (avoid stuffing)

### Content Length
- Blog posts: Aim for 1,000+ words for comprehensive coverage
- Pages: At least 300 words of unique content

### Internal Linking
- Link to relevant content within the site
- Use descriptive anchor text that includes keywords
- Aim for 3-5 internal links per post

### Images
- Include descriptive file names (e.g., `ai-project-diagram.jpg` instead of `image1.jpg`)
- Add alt text to all images that describes the image and includes keywords when relevant
- Optimize image sizes for fast loading
- Use the `loading="lazy"` attribute for images below the fold

## Structured Data

The site implements Schema.org structured data for:
- WebSite
- Person (About page)
- BlogPosting (all blog posts)

This helps search engines understand the content and can enable rich snippets in search results.

## Technical SEO

### Site Speed
- Critical CSS is inlined
- Non-critical CSS is loaded asynchronously
- Images are optimized and lazy-loaded
- JavaScript is deferred

### Mobile Optimization
- The site uses responsive design
- Touch targets are appropriately sized
- Font sizes are readable on mobile devices

### HTTPS
- The site forces HTTPS for all pages
- HTTP requests are redirected to HTTPS

### Canonical URLs
- Each page includes a canonical URL to prevent duplicate content issues

## Monitoring and Maintenance

### Regular Checks
- Verify that all pages have proper meta tags
- Check for broken links
- Monitor site speed and performance
- Review structured data implementation

### Content Updates
- Regularly update existing content to keep it fresh
- Add new content focusing on relevant keywords
- Review and improve underperforming content

## Tools for SEO Analysis

- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)
- [Ahrefs](https://ahrefs.com/) or [SEMrush](https://www.semrush.com/) for keyword research

## Post Template

A template for creating SEO-optimized posts is available at `_posts/_template.md`. This template includes:
- Properly formatted front matter with SEO metadata
- Guidelines for content structure
- Reminders for key SEO elements

## Sitemap and Robots.txt

- The sitemap is available at `https://danielkliewer.com/sitemap.xml`
- The robots.txt file is configured to allow all crawlers and points to the sitemap

---

These guidelines should be reviewed and updated periodically to align with current SEO best practices and search engine algorithm changes.
