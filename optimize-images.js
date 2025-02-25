const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing images
const imagesDir = path.join(__dirname, 'static', 'images');

// Output directory for optimized images
const outputDir = path.join(__dirname, 'static', 'images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image sizes for responsive images
const sizes = [320, 640, 960, 1280];

// Process all images in the directory
async function processImages() {
  try {
    // Get all files in the images directory
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(imagesDir, file);
      const fileBaseName = path.basename(file, path.extname(file));
      const fileExt = path.extname(file).toLowerCase();
      
      // Skip hidden files
      if (fileBaseName.startsWith('.')) continue;
      
      console.log(`Processing ${file}...`);
      
      // Create WebP version (better compression)
      const webpOutputPath = path.join(outputDir, `${fileBaseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(webpOutputPath);
      
      // Create optimized original format version
      const outputPath = path.join(outputDir, file);
      if (fileExt === '.jpg' || fileExt === '.jpeg') {
        await sharp(inputPath)
          .jpeg({ quality: 80, progressive: true })
          .toFile(outputPath);
      } else if (fileExt === '.png') {
        await sharp(inputPath)
          .png({ compressionLevel: 9, progressive: true })
          .toFile(outputPath);
      } else if (fileExt === '.gif') {
        // Just copy GIFs as sharp doesn't process them well
        fs.copyFileSync(inputPath, outputPath);
      } else if (fileExt === '.webp') {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
      }
      
      // Create responsive versions for srcset
      for (const size of sizes) {
        const resizedOutputPath = path.join(outputDir, `${fileBaseName}-${size}${fileExt}`);
        const resizedWebpPath = path.join(outputDir, `${fileBaseName}-${size}.webp`);
        
        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        
        // Only resize if the original is larger than the target size
        if (metadata.width > size) {
          // Create resized version in original format
          await sharp(inputPath)
            .resize(size)
            .toFile(resizedOutputPath);
          
          // Create resized WebP version
          await sharp(inputPath)
            .resize(size)
            .webp({ quality: 80 })
            .toFile(resizedWebpPath);
        }
      }
    }
    
    console.log('Image optimization complete!');
    console.log(`Optimized images saved to ${outputDir}`);
    console.log('To use these images, replace the original images or update your HTML to use the optimized versions.');
    console.log('For responsive images, use the srcset attribute:');
    console.log(`
Example:
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
    `);
    
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the image optimization
processImages();
