---
layout: page
title: Search Results
permalink: /search/
description: Search through Daniel Kliewer's blog posts, guides, and projects.
---

<div id="search-container">
  <form action="{{ '/search/' | relative_url }}" method="get">
    <input type="text" id="search-input" name="q" placeholder="Search..." value="{{ page.url | split: '=' | last | url_decode }}">
    <button type="submit">Search</button>
  </form>
</div>

<div id="results-container">
  <p>Loading results...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  
  if (query) {
    document.getElementById('search-input').value = query;
    
    // Initialize Simple Jekyll Search
    SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '{{ "/search.json" | relative_url }}',
      searchResultTemplate: '<div class="search-result-item"><h2><a href="{url}">{title}</a></h2><p>{date}</p><p>{content}</p></div>',
      noResultsText: 'No results found',
      limit: 10,
      fuzzy: false,
      exclude: ['Welcome']
    });
    
    // Trigger a search with the query
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    document.getElementById('search-input').dispatchEvent(event);
  } else {
    document.getElementById('results-container').innerHTML = '<p>Please enter a search term</p>';
  }
});
</script>

<style>
  #search-container {
    margin-bottom: 2rem;
  }
  
  #search-container form {
    display: flex;
    max-width: 600px;
  }
  
  #search-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }
  
  #search-container button {
    background-color: #042b6e;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0 4px 4px 0;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    min-width: 100px;
  }
  
  #search-container button:hover {
    background-color: #2a5caa;
  }
  
  .search-result-item {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .search-result-item h2 {
    margin-bottom: 0.5rem;
  }
  
  .search-result-item h2 a {
    color: #042b6e;
    text-decoration: none;
  }
  
  .search-result-item h2 a:hover {
    text-decoration: underline;
  }
  
  .search-result-item p {
    margin-bottom: 0.5rem;
    color: #666;
  }
</style>
