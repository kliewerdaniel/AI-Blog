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
   
   The custom build command in netlify.toml creates empty placeholder files for all dangling symlinks found in the build logs. This prevents Jekyll from trying to process these files during the build.

3. **Updated _config.yml to exclude problematic files**: Added an exclude section to the Jekyll configuration to exclude all problematic symlink files from Jekyll processing.

## March 2025 Update: Additional Dangling Symlinks Fix

After encountering additional build failures with dangling symlinks, the following improvements were made:

1. **Expanded the list of placeholder files**: Added empty placeholder files for all dangling symlinks found in the build logs to the netlify.toml build command.

2. **Updated _config.yml exclusions**: Added all dangling symlink files to the exclude section in _config.yml to prevent Jekyll from processing them.

3. **Updated test_netlify_build.sh**: Ensured the local testing script creates the same placeholder files as the Netlify build process.

These changes address the "No such file or directory @ rb_sysopen" errors that were occurring during the Jekyll build process due to dangling symlinks.

## March 2025 Update: Fixed Story Links and Images

After fixing the build issues, we discovered that links in the stories section were leading to 404 errors. The following improvements were made:

1. **Fixed story links**: Created and ran a script (`fix_story_links.py`) that:
   - Updates all links in story files to use consistent format with trailing slashes
   - Ensures links point to the correct URLs based on the Jekyll collection configuration

2. **Fixed story images**: Created and ran scripts (`fix_story_images.py` and `fix_story_image_params.py`) that:
   - Replace absolute image paths with the `story-image.html` include
   - Ensure the include parameters are correct (`src` instead of `filename`)

These changes ensure that all story links and images work correctly on the deployed site.

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
