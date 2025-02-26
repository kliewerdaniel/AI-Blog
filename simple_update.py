#!/usr/bin/env python3
import os
import re

def update_post_layouts(posts_dir='_posts'):
    """
    Update all posts in the specified directory to use the 'post' layout.
    """
    # Get all markdown files in the posts directory
    post_files = [f for f in os.listdir(posts_dir) if f.endswith('.md')]
    print(f"Found {len(post_files)} markdown files in {posts_dir}")
    
    # Counter for modified files
    modified_count = 0
    
    # Process each file
    for filename in post_files:
        filepath = os.path.join(posts_dir, filename)
        print(f"Processing: {filename}")
        
        try:
            # Read the file content
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Check if the layout needs to be updated
            if 'layout: post-redesign' in content:
                # Update the layout
                updated_content = content.replace('layout: post-redesign', 'layout: post')
                
                # Write the updated content back to the file
                with open(filepath, 'w') as f:
                    f.write(updated_content)
                
                modified_count += 1
                print(f"  Updated layout in: {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {str(e)}")
    
    print(f"\nCompleted! Modified {modified_count} out of {len(post_files)} files.")

if __name__ == "__main__":
    update_post_layouts()
