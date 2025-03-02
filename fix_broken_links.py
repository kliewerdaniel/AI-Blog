#!/usr/bin/env python3
import os
import re
import glob

def sanitize_filename(filename):
    """Convert a filename to a URL-friendly format."""
    # Remove file extension
    base_name = os.path.splitext(filename)[0]
    # Replace spaces with hyphens
    sanitized = base_name.replace(' ', '-')
    # Remove any other problematic characters
    sanitized = re.sub(r'[^\w\-]', '', sanitized)
    return sanitized

def fix_story_links(file_path):
    """Fix links in a story file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Find all story links
    story_links = re.findall(r'\[([^\]]+)\]\(\/stories\/([^\)]+)\)', content)
    
    # Replace each link with a sanitized version
    for link_text, link_path in story_links:
        # Skip if the link is already sanitized (no spaces or file extensions)
        if ' ' not in link_path and '.' not in link_path:
            continue
        
        # Sanitize the link path
        sanitized_path = sanitize_filename(link_path)
        
        # Replace the link in the content
        old_link = f'[{link_text}](/stories/{link_path})'
        new_link = f'[{link_text}](/stories/{sanitized_path})'
        content = content.replace(old_link, new_link)
    
    # Fix image paths
    content = re.sub(r'!\[([^\]]*)\]\(\/input_images\/([^\)]+)\)', 
                    r'![\1](/input_images/\2){: .story-image}', 
                    content)
    
    # Only write to the file if changes were made
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    return True

def rename_story_files():
    """Rename story files to match the sanitized URLs."""
    stories_dir = '_stories'
    renamed_files = []
    
    # Get all story files
    story_files = glob.glob(os.path.join(stories_dir, '*.md'))
    
    for file_path in story_files:
        # Skip the index file
        if file_path.endswith('index.md'):
            continue
        
        # Get the filename
        filename = os.path.basename(file_path)
        
        # Sanitize the filename
        sanitized_filename = sanitize_filename(filename) + '.md'
        
        # Skip if the filename is already sanitized
        if filename == sanitized_filename:
            continue
        
        # Create the new file path
        new_file_path = os.path.join(stories_dir, sanitized_filename)
        
        # Rename the file
        os.rename(file_path, new_file_path)
        renamed_files.append((filename, sanitized_filename))
    
    return renamed_files

def update_story_permalinks():
    """Update the permalinks in story files to match their new filenames."""
    stories_dir = '_stories'
    updated_files = []
    
    # Get all story files
    story_files = glob.glob(os.path.join(stories_dir, '*.md'))
    
    for file_path in story_files:
        # Skip the index file
        if file_path.endswith('index.md'):
            continue
        
        # Get the filename without extension
        filename = os.path.basename(file_path)
        base_name = os.path.splitext(filename)[0]
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Check if the file has front matter
        if content.startswith('---'):
            # Find the end of the front matter
            front_matter_end = content.find('---', 3)
            
            if front_matter_end != -1:
                front_matter = content[0:front_matter_end+3]
                
                # Check if the front matter has a permalink
                if 'permalink:' in front_matter:
                    # Update the permalink
                    front_matter = re.sub(
                        r'permalink:\s*\/stories\/[^\n]+', 
                        f'permalink: /stories/{base_name}/', 
                        front_matter
                    )
                else:
                    # Add a permalink
                    front_matter = front_matter.replace(
                        '---\n', 
                        f'---\npermalink: /stories/{base_name}/\n'
                    )
                
                # Update the content with the new front matter
                updated_content = front_matter + content[front_matter_end+3:]
                
                # Only write to the file if changes were made
                if updated_content != content:
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(updated_content)
                    updated_files.append(file_path)
    
    return updated_files

def main():
    """Main function to fix all broken links."""
    print("Starting to fix broken links...")
    
    # Step 1: Rename story files to match sanitized URLs
    print("\nRenaming story files...")
    renamed_files = rename_story_files()
    for old_name, new_name in renamed_files:
        print(f"  Renamed: {old_name} -> {new_name}")
    
    # Step 2: Update permalinks in story files
    print("\nUpdating permalinks in story files...")
    updated_files = update_story_permalinks()
    for file_path in updated_files:
        print(f"  Updated permalink in: {file_path}")
    
    # Step 3: Fix links in all story files
    print("\nFixing links in story files...")
    stories_dir = '_stories'
    fixed_files = []
    
    # Get all story files
    story_files = glob.glob(os.path.join(stories_dir, '*.md'))
    
    for file_path in story_files:
        if fix_story_links(file_path):
            fixed_files.append(file_path)
            print(f"  Fixed links in: {file_path}")
    
    print(f"\nCompleted. Fixed {len(fixed_files)} files.")

if __name__ == "__main__":
    main()
