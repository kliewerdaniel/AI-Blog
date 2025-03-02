/**
 * Image Loader
 * 
 * This script provides a comprehensive solution for loading images in the Jekyll blog.
 * It tries multiple paths for each image and provides fallbacks if the image fails to load.
 */

(function() {
  // Function to try loading an image from multiple paths
  function tryLoadImage(img) {
    // Get the filename from the src attribute
    const src = img.getAttribute('src');
    let filename = src.split('/').pop();
    
    // Remove any file extension
    filename = filename.split('.')[0];
    
    // Create an array of possible paths to try
    const paths = [
      // Original input_images directory
      '/input_images/' + filename + '.jpg',
      '/AI-Blog/input_images/' + filename + '.jpg',
      '../input_images/' + filename + '.jpg',
      '../../input_images/' + filename + '.jpg',
      '/stories/input_images/' + filename + '.jpg',
      '/stories/../input_images/' + filename + '.jpg',
      
      // Additional input_images directories
      '/input_images01/' + filename + '.jpg',
      '/input_images02/' + filename + '.jpg',
      '/input_images03/' + filename + '.jpg',
      '/AI-Blog/input_images01/' + filename + '.jpg',
      '/AI-Blog/input_images02/' + filename + '.jpg',
      '/AI-Blog/input_images03/' + filename + '.jpg',
      '../input_images01/' + filename + '.jpg',
      '../input_images02/' + filename + '.jpg',
      '../input_images03/' + filename + '.jpg',
      '../../input_images01/' + filename + '.jpg',
      '../../input_images02/' + filename + '.jpg',
      '../../input_images03/' + filename + '.jpg',
      '/stories/input_images01/' + filename + '.jpg',
      '/stories/input_images02/' + filename + '.jpg',
      '/stories/input_images03/' + filename + '.jpg',
      '/stories/../input_images01/' + filename + '.jpg',
      '/stories/../input_images02/' + filename + '.jpg',
      '/stories/../input_images03/' + filename + '.jpg',
      
      // Static images directory
      '/static/images/' + filename + '.jpg',
      
      // Try with different extensions
      '/input_images/' + filename + '.jpeg',
      '/input_images/' + filename + '.png',
      '/input_images01/' + filename + '.jpeg',
      '/input_images01/' + filename + '.png',
      
      // Original path as fallback
      src
    ];
    
    // Create a new image element
    const newImg = document.createElement('img');
    newImg.alt = img.alt || 'Image';
    newImg.className = img.className || 'story-image';
    
    // Copy any inline styles
    if (img.style) {
      for (let i = 0; i < img.style.length; i++) {
        const prop = img.style[i];
        newImg.style[prop] = img.style[prop];
      }
    }
    
    // Add default styling
    newImg.style.maxWidth = '100%';
    newImg.style.height = 'auto';
    newImg.style.display = 'block';
    newImg.style.margin = '1.5rem auto';
    newImg.style.borderRadius = '4px';
    newImg.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    
    // Try to load the image with the first path
    let pathIndex = 0;
    newImg.src = paths[pathIndex];
    
    // Function to try the next path
    function tryNextPath() {
      pathIndex++;
      if (pathIndex < paths.length) {
        console.log('Trying path: ' + paths[pathIndex] + ' for ' + filename);
        newImg.src = paths[pathIndex];
      } else {
        console.log('All paths failed for: ' + filename);
        // Add a data attribute to indicate the image failed to load
        newImg.setAttribute('data-load-failed', 'true');
        
        // Add a placeholder background
        newImg.style.backgroundColor = '#f8f9fa';
        newImg.style.border = '1px solid #ddd';
        newImg.style.padding = '20px';
        newImg.style.minHeight = '200px';
        
        // Add a message that the image failed to load
        const parent = newImg.parentNode;
        const message = document.createElement('p');
        message.textContent = 'Image failed to load: ' + filename;
        message.style.textAlign = 'center';
        message.style.color = '#666';
        message.style.fontStyle = 'italic';
        parent.insertBefore(message, newImg.nextSibling);
      }
    }
    
    // Add error handling to try different paths
    newImg.onerror = tryNextPath;
    
    // Replace the original image with the new one
    img.parentNode.replaceChild(newImg, img);
    
    // Return the new image element
    return newImg;
  }
  
  // Function to fix all images on the page
  function fixAllImages() {
    console.log('Fixing all images on the page...');
    
    // Get all images on the page
    const images = document.querySelectorAll('img');
    
    // Loop through each image
    images.forEach(function(img) {
      // Skip images that have already been processed
      if (img.hasAttribute('data-processed')) {
        return;
      }
      
      // Mark the image as processed
      img.setAttribute('data-processed', 'true');
      
      // Try to load the image from multiple paths
      tryLoadImage(img);
    });
  }
  
  // Run the function when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAllImages);
  } else {
    fixAllImages();
  }
  
  // Also run the function when the window is fully loaded
  window.addEventListener('load', fixAllImages);
  
  // Make the function available globally
  window.tryLoadImage = tryLoadImage;
  window.fixAllImages = fixAllImages;
})();
