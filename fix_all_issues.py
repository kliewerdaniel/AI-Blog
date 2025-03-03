#!/usr/bin/env python3
import os
import subprocess
import sys

def run_script(script_name):
    """Run a Python script and return its exit code."""
    print(f"\n{'=' * 50}")
    print(f"Running {script_name}...")
    print(f"{'=' * 50}\n")
    
    result = subprocess.run([sys.executable, script_name])
    return result.returncode

def main():
    """Main function to fix all issues."""
    print("Starting to fix all issues...")
    
    # Step 1: Fix broken links
    if run_script('fix_broken_links.py') != 0:
        print("Error: Failed to fix broken links.")
        return 1
    
    # Step 2: Fix story images
    if run_script('fix_story_images.py') != 0:
        print("Error: Failed to fix story images.")
        return 1
    
    # Step 2.1: Fix stories01 images
    if run_script('fix_stories01_images.py') != 0:
        print("Error: Failed to fix stories01 images.")
        return 1
    
    # Step 3: Update sitemap
    if run_script('update_sitemap.py') != 0:
        print("Error: Failed to update sitemap.")
        return 1
    
    print("\n" + "=" * 50)
    print("All issues have been fixed successfully!")
    print("=" * 50)
    print("\nTo apply these changes to your site, you need to rebuild it with Jekyll:")
    print("bundle exec jekyll build")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
