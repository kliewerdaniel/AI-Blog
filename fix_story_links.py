#!/usr/bin/env python3
import os
import re

def fix_story_links(directory):
    """
    Fix links in story files to use consistent format.
    """
    # Regular expression to match story links
    link_pattern = re.compile(r'\[([^\]]+)\]\((/stories/image_\d+)(?:\.JPG|\.jpg)?\)')
    
    # Get all markdown files in the directory
    for filename in os.listdir(directory):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(directory, filename)
        
        # Skip index.md for now, we'll handle it separately
        if filename == 'index.md':
            continue
        
        with open(filepath, 'r') as file:
            content = file.read()
        
        # Replace links with the correct format
        updated_content = link_pattern.sub(r'[\1](\2/)', content)
        
        if content != updated_content:
            with open(filepath, 'w') as file:
                file.write(updated_content)
            print(f"Updated links in {filepath}")

def fix_index_links(index_file):
    """
    Fix links in the index file to use consistent format.
    """
    link_pattern = re.compile(r'\[([^\]]+)\]\((/stories/image_\d+)(?:\.JPG|\.jpg)?\)')
    
    with open(index_file, 'r') as file:
        content = file.read()
    
    # Replace links with the correct format
    updated_content = link_pattern.sub(r'[\1](\2/)', content)
    
    if content != updated_content:
        with open(index_file, 'w') as file:
            file.write(updated_content)
        print(f"Updated links in {index_file}")

if __name__ == "__main__":
    stories_dir = "_stories"
    index_file = os.path.join(stories_dir, "index.md")
    
    # Fix links in story files
    fix_story_links(stories_dir)
    
    # Fix links in index file
    fix_index_links(index_file)
    
    print("Story links fixed successfully!")
