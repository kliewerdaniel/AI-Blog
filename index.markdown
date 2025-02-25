---
layout: home
---




<h1>Recent Posts</h1>

<ul class="post-list">
  {% for post in site.posts limit:5 %}
    <li class="post-item">
      <h2>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
      {% if post.description %}
        <p class="post-excerpt">{{ post.description }}</p>
      {% else %}
        <p class="post-excerpt">{{ post.content | strip_html | truncate: 150 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>

<div class="view-all-posts">
  <a href="{{ '/blog/' | relative_url }}" class="view-all-button">View All Posts</a>
</div>

<style>
  .view-all-posts {
    margin-top: 2rem;
    text-align: center;
  }
  
  .view-all-button {
    display: inline-block;
    background-color: #333333;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .view-all-button:hover {
    background-color: #666666;
  }
</style>
