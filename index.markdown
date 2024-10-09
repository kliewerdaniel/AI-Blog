<head><!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GT-WF3JPD4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GT-WF3JPD4');
</script>
</head>
---

layout: default

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

<!-- Donate Button -->
<div style="text-align: center; margin: 50px 0;">
  <a href="https://donate.stripe.com/3csaHr2xh1xLaek000">
    <button type="submit" style="
      background-color: #28a745;
      color: white;
      padding: 15px 32px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    " onmouseover="this.style.backgroundColor='#218838'; this.style.transform='translateY(-2px)';" onmouseout="this.style.backgroundColor='#28a745'; this.style.transform='translateY(0)';">Donate</button>
  </a>
</div>

---