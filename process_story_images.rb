#!/usr/bin/env ruby

# This script processes story files and replaces image tags with the story-image include

require 'fileutils'

# Directory containing story files
stories_dir = '_stories'

# Ensure the static/input_images directory exists
FileUtils.mkdir_p('static/input_images')

# Process each story file
Dir.glob("#{stories_dir}/*.md").each do |file|
  puts "Processing #{file}..."
  
  # Read the file content
  content = File.read(file)
  
  # Replace image tags with the story-image include
  modified_content = content.gsub(/!\[(.*?)\]\((\.\.\/input_images\/([^)]+))\)/) do
    alt_text = $1
    src = $2
    filename = $3
    
    # Create the include tag
    "{% include story-image.html src='#{src}' alt='#{alt_text}' %}"
  end
  
  # Write the modified content back to the file
  if content != modified_content
    File.write(file, modified_content)
    puts "  Updated image tags in #{file}"
  else
    puts "  No image tags found in #{file}"
  end
end

puts "Done processing story files."
