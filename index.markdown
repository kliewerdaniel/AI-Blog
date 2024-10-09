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

<!-- Stripe Donation Button -->
<h2>Support Us</h2>
<a href="https://donate.stripe.com/3csaHr2xh1xLaek000">
  <button type="submit">Donate with Stripe</button>
