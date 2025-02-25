---
layout: default
title: Personal Development
permalink: /blog/personal-development/
---

# Personal Development

Articles and insights about personal growth, productivity, and self-improvement.

<ul class="post-list">
  {% for post in site.posts %}
    {% if post.categories contains "personal-development" %}
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
