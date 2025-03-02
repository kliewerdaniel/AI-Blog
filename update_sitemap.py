#!/usr/bin/env python3
import os

def update_sitemap():
    """Update the sitemap.xml file to include the stories collection."""
    sitemap_path = 'sitemap.xml'
    
    # Read the current sitemap
    with open(sitemap_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if the stories collection is already included
    if '{% for story in site.stories %}' in content:
        print("Stories collection is already included in the sitemap.")
        return False
    
    # Add the stories collection to the sitemap
    new_content = content.replace(
        '{% endfor %}',
        '{% endfor %}\n    \n    {% for story in site.stories %}\n    {% if story.path != "_stories/index.md" %}\n    <url>\n        <loc>{{ site.url }}{{ story.url }}</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.7</priority>\n    </url>\n    {% endif %}\n    {% endfor %}',
        1  # Replace only the first occurrence
    )
    
    # Write the updated sitemap
    with open(sitemap_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    return True

def main():
    """Main function to update the sitemap."""
    print("Updating sitemap.xml...")
    
    if update_sitemap():
        print("Successfully updated sitemap.xml to include the stories collection.")
    else:
        print("No changes were made to sitemap.xml.")

if __name__ == "__main__":
    main()
