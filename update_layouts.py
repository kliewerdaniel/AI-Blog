#!/usr/bin/env python3
import os
import re
import glob

def update_post_layout(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if the file already has the post-redesign layout
    if re.search(r'^layout:\s*post-redesign', content, re.MULTILINE):
        print(f"File already using post-redesign layout: {file_path}")
        return False
    
    # Replace layout: post with layout: post-redesign
    updated_content = re.sub(r'^layout:\s*post', 'layout: post-redesign', content, flags=re.MULTILINE)
    updated_content = re.sub(r'^layout:\s*home', 'layout: post-redesign', updated_content, flags=re.MULTILINE)
    
    # If no layout is specified, add it
    if 'layout:' not in content and '---' in content:
        # Find the first frontmatter section
        parts = updated_content.split('---', 2)
        if len(parts) >= 3:
            # Add layout to the frontmatter
            updated_content = f"---\nlayout: post-redesign\n{parts[1]}---{parts[2]}"
    
    # Write the updated content back to the file
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"Updated layout in: {file_path}")
        return True
    
    return False

def main():
    # Get all markdown files in the _posts directory
    post_files = glob.glob('_posts/*.md')
    
    updated_count = 0
    for file_path in post_files:
        if update_post_layout(file_path):
            updated_count += 1
    
    print(f"Updated {updated_count} files to use post-redesign layout")

if __name__ == "__main__":
    main()
