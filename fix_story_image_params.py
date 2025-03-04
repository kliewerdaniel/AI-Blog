#!/usr/bin/env python3
import os
import re

def fix_story_image_params(directory):
    """
    Fix story-image.html include parameters in story files.
    """
    # Regular expression to match story-image.html includes with filename parameter
    include_pattern = re.compile(r'{% include story-image.html alt="([^"]+)" filename="([^"]+)" %}')
    
    # Get all markdown files in the directory
    for filename in os.listdir(directory):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(directory, filename)
        
        with open(filepath, 'r') as file:
            content = file.read()
        
        # Replace filename parameter with src parameter
        updated_content = include_pattern.sub(r'{% include story-image.html alt="\1" src="\2" %}', content)
        
        if content != updated_content:
            with open(filepath, 'w') as file:
                file.write(updated_content)
            print(f"Updated include parameters in {filepath}")

if __name__ == "__main__":
    stories_dir = "_stories"
    
    # Fix include parameters in story files
    fix_story_image_params(stories_dir)
    
    print("Story image parameters fixed successfully!")
