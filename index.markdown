---
title: Daniel Kliewer
layout: home
description: Daniel Kliewer is a writer, researcher, and software developer. Explore insights on machine learning, large language models, and software development.
show_call_box: true
---

# Writer, Researcher, Developer

Welcome to my blog where I share insights on machine learning, large language models, and software development.

<h2>Recent Posts</h2>

<ul class="post-list">
  {% for post in site.posts limit:5 %}
    <li class="post-item">
      <h3>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
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
  <a href="{{ '/blog/' | relative_url }}" class="button">View All Posts</a>
</div>
