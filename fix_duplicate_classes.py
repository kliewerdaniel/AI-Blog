#!/usr/bin/env python3
import os
import re
import glob

def fix_duplicate_classes(file_path):
    """Fix duplicate .story-image classes in a story file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Use a direct approach to find and replace image tags with multiple .story-image classes
    # This regex matches an image tag followed by one or more .story-image classes
    pattern = r'(!\[[^\]]*\]\([^\)]+\))(\{: \.story-image\})+'
    
    # Replace with a single .story-image class
    new_content = re.sub(pattern, r'\1{: .story-image}', content)
    
    # If no changes were made, return False
    if new_content == content:
        return False
    
    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    return True

def main():
    """Main function to fix duplicate .story-image classes."""
    print("Starting to fix duplicate .story-image classes...")
    
    stories_dir = '_stories'
    fixed_files = []
    
    # Get all story files
    story_files = glob.glob(os.path.join(stories_dir, '*.md'))
    
    for file_path in story_files:
        if fix_duplicate_classes(file_path):
            fixed_files.append(file_path)
            print(f"  Fixed duplicate classes in: {file_path}")
    
    print(f"\nCompleted. Fixed {len(fixed_files)} files.")

if __name__ == "__main__":
    main()
