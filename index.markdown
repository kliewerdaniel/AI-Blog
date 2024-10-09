---
layout: default
---

<!-- List of Posts -->
<h1>Blog Posts</h1>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>


<a href="https://donate.stripe.com/3csaHr2xh1xLaek000">
  <button type="submit" style="
    background-color: #28a745;
    color: white;
    padding: 15px 32px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  " onmouseover="this.style.backgroundColor='#218838'" onmouseout="this.style.backgroundColor='#28a745'">Donate</button>
</a>