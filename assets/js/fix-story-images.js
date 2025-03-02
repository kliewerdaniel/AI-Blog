/**
 * Fix Story Images
 * 
 * This script fixes the image paths in story files by:
 * 1. Finding all images with relative paths to input_images
 * 2. Creating new image elements with the correct paths
 * 3. Replacing the original images with the new ones
 */

(function() {
  // Function to fix image paths
  function fixStoryImages() {
    // Get all images in the document
    const images = document.querySelectorAll('img');
    
    // Loop through each image
    images.forEach(function(img) {
      // Get the source attribute
      const src = img.getAttribute('src');
      
      // Check if the source is a relative path to input_images
      if (src && src.includes('input_images')) {
        // Get the filename from the path
        let filename = src.split('/').pop();
        
        // Add .jpg extension if missing
        if (!filename.includes('.')) {
          filename = filename + '.jpg';
        }
        
        // Create a new image element
        const newImg = document.createElement('img');
        
        // Set the attributes for the new image
        newImg.alt = img.alt || 'Story image';
        newImg.className = 'story-image';
        newImg.style.maxWidth = '100%';
        newImg.style.height = 'auto';
        newImg.style.display = 'block';
        newImg.style.margin = '1.5rem auto';
        newImg.style.borderRadius = '4px';
        newImg.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        
        // Try to load the image with different paths
        const paths = [
          '/input_images/' + filename,
          '/AI-Blog/input_images/' + filename,
          '../input_images/' + filename,
          '../../input_images/' + filename,
          '/stories/input_images/' + filename,
          '/static/images/' + filename,
          // Add additional input_images directories
          '/input_images01/' + filename,
          '/input_images02/' + filename,
          '/input_images03/' + filename,
          '/AI-Blog/input_images01/' + filename,
          '/AI-Blog/input_images02/' + filename,
          '/AI-Blog/input_images03/' + filename,
          '../input_images01/' + filename,
          '../input_images02/' + filename,
          '../input_images03/' + filename,
          '../../input_images01/' + filename,
          '../../input_images02/' + filename,
          '../../input_images03/' + filename,
          '/stories/input_images01/' + filename,
          '/stories/input_images02/' + filename,
          '/stories/input_images03/' + filename
        ];
        
        // Set the initial source
        newImg.src = paths[0];
        
        // Add error handling to try different paths
        let pathIndex = 0;
        newImg.onerror = function() {
          pathIndex++;
          if (pathIndex < paths.length) {
            this.src = paths[pathIndex];
          } else {
            // If all paths fail, revert to the original path
            this.src = src;
            
            // Add a data attribute to indicate the image failed to load
            this.setAttribute('data-load-failed', 'true');
            
            // Add a placeholder background
            this.style.backgroundColor = '#f8f9fa';
            this.style.border = '1px solid #ddd';
            this.style.padding = '20px';
            this.style.minHeight = '200px';
            
            // Add a message that the image failed to load
            const parent = this.parentNode;
            const message = document.createElement('p');
            message.textContent = 'Image failed to load: ' + filename;
            message.style.textAlign = 'center';
            message.style.color = '#666';
            message.style.fontStyle = 'italic';
            parent.insertBefore(message, this.nextSibling);
          }
        };
        
        // Replace the original image with the new one
        img.parentNode.replaceChild(newImg, img);
      }
    });
  }
  
  // Run the function when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixStoryImages);
  } else {
    fixStoryImages();
  }
  
  // Also run the function when the window is fully loaded
  window.addEventListener('load', fixStoryImages);
})();
