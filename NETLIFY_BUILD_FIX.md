# Netlify Build Fix

This document explains the fix for the Netlify build error related to missing image files.

## The Issue

The Netlify build was failing with the following error:

```
No such file or directory @ rb_sysopen - /opt/build/repo/static/input_images/books (Errno::ENOENT)
```

Previously, a similar error occurred with:

```
No such file or directory @ rb_sysopen - /opt/build/repo/static/input_images/130188528_3781238605303881_7510459135709865265_n.jpg (Errno::ENOENT)
```

This occurred because:

1. Markdown files in `_stories01` were using direct image references like `![alt](../input_images/filename.jpg)`
2. The actual images were in various directories (`input_images01/`, `static/input_images/`, etc.)
3. During the Jekyll build process, it couldn't find the images at the specified paths
4. Some files were symbolic links pointing to non-existent files, causing "dangling symlink" errors

## The Solution

Three key changes were made to fix this issue:

1. **Updated image references in markdown files**: Created and ran a script (`fix_stories01_images.py`) that:
   - Replaces direct image references with the `story-image.html` include
   - Copies images from `input_images01/` to `static/input_images/` to ensure they're available during build

2. **Added a netlify.toml configuration file**: This ensures:
   - Proper build settings for Jekyll
   - All image directories are copied to the build directory using a custom build command
   - Empty placeholder files are created for problematic symlinks
   
   The custom build command in netlify.toml:
   ```toml
   command = """
     mkdir -p static/input_images
     # Copy image files from input_images directories
     cp -r input_images01/* static/input_images/ || true
     cp -r input_images02/* static/input_images/ || true
     cp -r input_images03/* static/input_images/ || true
     cp -r input_images04/* static/input_images/ || true
     
     # Create empty placeholder files for problematic symlinks
     touch static/input_images/B01N78T9F901_SCLZZZZZZZ_SX500_.jpg
     touch static/input_images/B0BHLH14NQ01_SCLZZZZZZZ_SX500_.jpg
     touch static/input_images/B0BW23BXYN01S001LXXXXXXX.jpg
     touch static/input_images/books-003.JPG
     touch static/input_images/books-005.JPG
     touch static/input_images/books-007.JPG
     touch static/input_images/books-013.JPG
     touch static/input_images/books-015.JPG
     touch static/input_images/books
     
     # Run Jekyll build
     jekyll build
   """
   ```

3. **Updated _config.yml to exclude problematic files**: Added an exclude section to the Jekyll configuration:
   ```yaml
   exclude:
     # Standard excludes
     - .sass-cache/
     - .jekyll-cache/
     - gemfiles/
     - Gemfile
     - Gemfile.lock
     - node_modules/
     - vendor/bundle/
     - vendor/cache/
     - vendor/gems/
     - vendor/ruby/
     # Exclude problematic symlink files
     - static/input_images/B01N78T9F901_SCLZZZZZZZ_SX500_.jpg
     - static/input_images/B0BHLH14NQ01_SCLZZZZZZZ_SX500_.jpg
     - static/input_images/B0BW23BXYN01S001LXXXXXXX.jpg
     - static/input_images/books-003.JPG
     - static/input_images/books-005.JPG
     - static/input_images/books-007.JPG
     - static/input_images/books-013.JPG
     - static/input_images/books-015.JPG
     - static/input_images/books
   ```

## How to Fix Similar Issues in the Future

If you encounter similar build errors:

1. Check the error message to identify which file is missing
2. Locate where the file actually exists in your project
3. Update the markdown files to use the `story-image.html` include instead of direct image references
4. Run the `fix_stories01_images.py` script to automate this process
5. Ensure your `netlify.toml` file is configured to copy all necessary directories
6. For problematic symlinks, create empty placeholder files using the `touch` command
7. Update _config.yml to exclude problematic files from Jekyll processing

## The `story-image.html` Include

The `story-image.html` include is designed to handle images in story files by trying multiple paths if the initial path fails. It tries:

1. The original path
2. `/input_images01/` + filename
3. `/input_images02/` + filename
4. `/input_images03/` + filename
5. `../input_images/` + filename
6. `../input_images01/` + filename
7. `../input_images02/` + filename
8. `../input_images03/` + filename

This works in the browser because JavaScript can try alternative paths if an image fails to load. However, during the Jekyll build process, it needs to access the file directly at the path specified.

## Running the Fix Script

To run the fix script:

```bash
python fix_stories01_images.py
```

This will:
1. Copy images from `input_images01/` to `static/input_images/`
2. Update all markdown files in `_stories01/` to use the `story-image.html` include
