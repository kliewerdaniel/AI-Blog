#!/usr/bin/env python3
import os
import re
import glob
import shutil

def sanitize_filename(filename):
    """Convert a filename to a URL-friendly format."""
    # Remove file extension
    base_name, ext = os.path.splitext(filename)
    # Replace spaces with hyphens
    sanitized = base_name.replace(' ', '-')
    # Remove any other problematic characters
    sanitized = re.sub(r'[^\w\-]', '', sanitized)
    return sanitized + ext

def fix_image_paths_in_file(file_path):
    """Fix image paths in a story file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Find all image references
    image_refs = re.findall(r'!\[([^\]]*)\]\(([^\)]+)\)', content)
    
    # Replace each image reference with a sanitized version
    for alt_text, image_path in image_refs:
        # Skip if the image path is already an absolute URL
        if image_path.startswith('http'):
            continue
        
        # Get the filename from the path
        filename = os.path.basename(image_path)
        
        # Handle the case where the image path is just a number
        if filename.isdigit():
            # Use the story filename as the base for the image
            story_filename = os.path.basename(file_path)
            story_name = os.path.splitext(story_filename)[0]
            new_image_path = f'/input_images/{story_name}'
        else:
            # Sanitize the filename
            sanitized_filename = sanitize_filename(filename)
            new_image_path = '/input_images/' + sanitized_filename
        
        # Replace the image reference in the content
        old_ref = f'![{alt_text}]({image_path})'
        new_ref = f'![{alt_text}]({new_image_path}){{: .story-image}}'
        content = content.replace(old_ref, new_ref)
    
    # Only write to the file if changes were made
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    return True

def rename_image_files():
    """Rename image files to match the sanitized filenames."""
    input_images_dir = 'input_images'
    renamed_files = []
    
    # Ensure the directory exists
    if not os.path.isdir(input_images_dir):
        print(f"Error: {input_images_dir} directory not found.")
        return renamed_files
    
    # Get all image files
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.JPG', '*.JPEG', '*.PNG', '*.GIF']:
        image_files.extend(glob.glob(os.path.join(input_images_dir, ext)))
    
    for file_path in image_files:
        # Get the filename
        filename = os.path.basename(file_path)
        
        # Sanitize the filename
        sanitized_filename = sanitize_filename(filename)
        
        # Skip if the filename is already sanitized
        if filename == sanitized_filename:
            continue
        
        # Create the new file path
        new_file_path = os.path.join(input_images_dir, sanitized_filename)
        
        # Rename the file
        shutil.copy2(file_path, new_file_path)
        renamed_files.append((filename, sanitized_filename))
    
    return renamed_files

def main():
    """Main function to fix all image paths."""
    print("Starting to fix image paths...")
    
    # Step 1: Rename image files to match sanitized filenames
    print("\nRenaming image files...")
    renamed_files = rename_image_files()
    for old_name, new_name in renamed_files:
        print(f"  Renamed: {old_name} -> {new_name}")
    
    # Step 2: Fix image paths in all story files
    print("\nFixing image paths in story files...")
    stories_dir = '_stories'
    fixed_files = []
    
    # Get all story files
    story_files = glob.glob(os.path.join(stories_dir, '*.md'))
    
    for file_path in story_files:
        if fix_image_paths_in_file(file_path):
            fixed_files.append(file_path)
            print(f"  Fixed image paths in: {file_path}")
    
    print(f"\nCompleted. Fixed {len(fixed_files)} files.")

if __name__ == "__main__":
    main()
