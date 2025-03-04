#!/usr/bin/env python3
import os
import re

def fix_story_images(directory):
    """
    Fix image paths in story files to use relative paths.
    """
    # Regular expression to match image paths
    image_pattern = re.compile(r'!\[([^\]]+)\]\((//[^)]+/input_images/([^)]+))\)')
    
    # Get all markdown files in the directory
    for filename in os.listdir(directory):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(directory, filename)
        
        with open(filepath, 'r') as file:
            content = file.read()
        
        # Replace absolute image paths with relative paths using the story-image.html include
        updated_content = image_pattern.sub(r'{% include story-image.html alt="\1" src="\3" %}', content)
        
        if content != updated_content:
            with open(filepath, 'w') as file:
                file.write(updated_content)
            print(f"Updated image paths in {filepath}")

if __name__ == "__main__":
    stories_dir = "_stories"
    
    # Fix image paths in story files
    fix_story_images(stories_dir)
    
    print("Story image paths fixed successfully!")
