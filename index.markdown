---
layout: home
title: Home
---


<!-- Blog Posts -->
<h2>Latest Blog Posts</h2>
<ul style="list-style-type: none; padding: 0;">
  {% for post in site.posts %}
    <li style="margin-bottom: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 1em;">
      <a href="{{ post.url | relative_url }}" style="font-size: 1.5em; color: #007bff; text-decoration: none; font-weight: bold;">
        {{ post.title }}
      </a>
      <br />
      <span style="color: #888;">{{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>

