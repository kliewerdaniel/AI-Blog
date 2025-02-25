---
layout: default-redesign
title: Blog
permalink: /blog/
---

# Blog

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
