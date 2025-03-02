#!/usr/bin/env python3
import os
import re

def fix_links_in_file(file_path):
    """Replace all instances of (/_stories/ with (/stories/ in a file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the links
    updated_content = re.sub(r'\(\/_stories\/', r'(/stories/', content)
    
    # Only write to the file if changes were made
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        return True
    return False

def main():
    """Find all .md files in the _stories directory and fix the links."""
    stories_dir = '_stories'
    count = 0
    
    # Ensure the directory exists
    if not os.path.isdir(stories_dir):
        print(f"Error: {stories_dir} directory not found.")
        return
    
    # Process all .md files in the directory
    for filename in os.listdir(stories_dir):
        if filename.endswith('.md'):
            file_path = os.path.join(stories_dir, filename)
            if fix_links_in_file(file_path):
                count += 1
                print(f"Fixed links in {file_path}")
    
    print(f"Completed. Fixed links in {count} files.")

if __name__ == "__main__":
    main()
