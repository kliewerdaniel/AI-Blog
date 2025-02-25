---
layout: default
title: AI Projects
permalink: /blog/ai-projects/
---

# AI Projects

Articles and insights about artificial intelligence projects, implementations, and research.

<ul class="post-list">
  {% for post in site.posts %}
    {% if post.categories contains "ai-projects" %}
      <li class="post-item">
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
        {% if post.description %}
          <p class="post-excerpt">{{ post.description }}</p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
