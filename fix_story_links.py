#!/usr/bin/env python3
"""
Script to fix story links in all story files.
This script adds trailing slashes to all story links to match the permalink format.
"""

import os
import re
from pathlib import Path

def fix_story_links(file_path):
    """Fix story links in a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all links to stories without trailing slashes
    pattern = r'(\[.*?\]\(/stories/[^/)]+)(?=\))'
    
    # Replace with links that have trailing slashes
    updated_content = re.sub(pattern, r'\1/', content)
    
    # Only write to the file if changes were made
    if content != updated_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        return True
    return False

def main():
    """Main function to fix all story links."""
    stories_dir = Path('_stories')
    
    if not stories_dir.exists() or not stories_dir.is_dir():
        print(f"Error: {stories_dir} directory not found")
        return
    
    files_updated = 0
    
    for file_path in stories_dir.glob('*.md'):
        if fix_story_links(file_path):
            print(f"Updated links in {file_path}")
            files_updated += 1
    
    print(f"\nCompleted: {files_updated} files updated")

if __name__ == "__main__":
    main()
