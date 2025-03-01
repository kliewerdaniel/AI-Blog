#!/usr/bin/env ruby

# Script to add front matter to all story files in the _stories directory

puts "Starting to process story files..."
count = 0

Dir.glob("_stories/*.md").each do |file_path|
  puts "Processing: #{file_path}"
  next if file_path == "_stories/index.md" # Skip index file if it exists
  
  content = File.read(file_path)
  
  # Skip if front matter already exists
  if content.start_with?("---\n")
    puts "  - Already has front matter, skipping"
    next
  end
  
  # Extract title from the first line (assuming it starts with # or # **)
  title = content.lines.first.strip
  puts "  - Original title: #{title}"
  title = title.gsub(/^# /, "").gsub(/^# \*\*/, "").gsub(/\*\*$/, "").gsub(/"/, "").strip
  puts "  - Cleaned title: #{title}"
  
  # Create front matter
  front_matter = "---\nlayout: story\ntitle: \"#{title}\"\n---\n\n"
  
  # Add front matter to the content
  new_content = front_matter + content
  
  # Write the updated content back to the file
  File.write(file_path, new_content)
  
  puts "  - Updated: #{file_path}"
  count += 1
end

puts "Completed! Updated #{count} story files."
