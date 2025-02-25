---
layout: page
title: Blog
permalink: /blog/
description: Browse through Daniel Kliewer's latest articles and insights on machine learning, large language models, and software development.
---

Browse through my latest articles and insights on various topics.

<ul class="post-list">
  {% for post in site.posts %}
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

<style>
  .post-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }
  
  .post-item {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
  
  .post-item:last-child {
    border-bottom: none;
  }
  
  .post-item h2 {
    margin-bottom: 0.5rem;
  }
  
  .post-item h2 a {
    color: #042b6e;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .post-item h2 a:hover {
    color: #2a5caa;
  }
  
  .post-date {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .post-excerpt {
    margin-top: 0.5rem;
    color: #333;
  }
</style>
