// JavaScript to fix image paths in stories

document.addEventListener('DOMContentLoaded', function() {
  // Fix relative image paths in stories
  const storyImages = document.querySelectorAll('img[src^="../input_images/"]');
  
  storyImages.forEach(function(img) {
    // Get the image filename from the src attribute
    const src = img.getAttribute('src');
    let filename = src.split('/').pop();
    
    // Add .jpg extension if missing
    if (!filename.includes('.')) {
      filename = filename + '.jpg';
    }
    
    // Try different paths to find the correct one
    const possiblePaths = [
      '/input_images/' + filename,
      '/AI-Blog/input_images/' + filename,
      '../input_images/' + filename,
      '../../input_images/' + filename,
      '/stories/input_images/' + filename,
      '/stories/../input_images/' + filename,
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
      '/stories/input_images03/' + filename,
      '/stories/../input_images01/' + filename,
      '/stories/../input_images02/' + filename,
      '/stories/../input_images03/' + filename
    ];
    
    // Create a new image element with fallback paths
    const newImg = document.createElement('img');
    newImg.alt = img.alt || 'Story image';
    newImg.className = 'story-image';
    
    // Add styling to ensure the image is visible
    newImg.style.maxWidth = '100%';
    newImg.style.height = 'auto';
    newImg.style.display = 'block';
    newImg.style.margin = '1.5rem auto';
    newImg.style.borderRadius = '4px';
    newImg.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    
    // Try to load the image with the first path
    newImg.src = possiblePaths[0];
    
    // If the image fails to load, try the next path
    let pathIndex = 0;
    newImg.onerror = function() {
      pathIndex++;
      if (pathIndex < possiblePaths.length) {
        newImg.src = possiblePaths[pathIndex];
      } else {
        // If all paths fail, revert to the original path
        newImg.src = src;
      }
    };
    
    // Replace the original image with the new one
    img.parentNode.replaceChild(newImg, img);
    
    // Also add a direct img tag with the original path as a fallback
    const fallbackImg = document.createElement('img');
    fallbackImg.src = src;
    fallbackImg.alt = img.alt || 'Story image';
    fallbackImg.className = 'story-image-fallback';
    fallbackImg.style.display = 'none';
    img.parentNode.appendChild(fallbackImg);
  });
  
  // Also try to fix any images that might be in iframes or embedded content
  const allImages = document.querySelectorAll('img');
  allImages.forEach(function(img) {
    if (!img.classList.contains('story-image') && !img.classList.contains('story-image-fallback')) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.margin = '1.5rem auto';
    }
  });
});
