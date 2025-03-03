#!/usr/bin/env python3

"""
Script to fix image references in _stories01 directory.
This script replaces direct image references with the story-image.html include.
"""

import os
import re
from pathlib import Path

def fix_image_references(file_path):
    """Fix image references in a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all image references, including multi-line ones
    pattern = r'!\[([\s\S]*?)\]\((\.\.\/input_images\/([^)]+))\)'
    
    # Replace with the story-image include
    updated_content = re.sub(pattern, r'{% include story-image.html src="\2" alt="\1" %}', content)
    
    # Only write to the file if changes were made
    if content != updated_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        return True
    return False

def main():
    """Main function to fix all image references."""
    stories_dir = Path('_stories01')
    
    if not stories_dir.exists() or not stories_dir.is_dir():
        print(f"Error: {stories_dir} directory not found")
        return
    
    # Ensure the static/input_images directory exists
    os.makedirs('static/input_images', exist_ok=True)
    
    # Copy images from input_images01 to static/input_images if they don't exist
    for img_file in Path('input_images01').glob('*.*'):
        if img_file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            dest_file = Path('static/input_images') / img_file.name
            if not dest_file.exists():
                print(f"Copying {img_file} to {dest_file}")
                try:
                    # Use subprocess to run cp with -L flag to follow symlinks
                    import subprocess
                    subprocess.run(['cp', '-L', str(img_file), str(dest_file)], check=True)
                except Exception as e:
                    print(f"Error copying {img_file}: {e}")
    
    files_updated = 0
    
    for file_path in stories_dir.glob('*.md'):
        if fix_image_references(file_path):
            print(f"Updated image references in {file_path}")
            files_updated += 1
    
    print(f"\nCompleted: {files_updated} files updated")

if __name__ == "__main__":
    main()
