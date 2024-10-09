---

layout: default

---

<!-- Hero Section -->
<div style="text-align: center; padding: 50px 0;">
  <h1 style="font-size: 3em; margin-bottom: 0.5em;">Welcome to DanielKliewer.com</h1>
  <p style="font-size: 1.2em; color: #666;">A Journey of Resilience, Creativity, and Technological Passion</p>
</div>

<!-- Introduction -->
<p style="font-size: 1.1em; line-height: 1.6em;">
  I'm **Daniel Kliewer**, and this is my personal space on the web where I share my story, projects, and insights into technology, art, and more. From overcoming significant life challenges to diving deep into the development of large language models, I invite you to join me on this journey of growth and discovery.
</p>

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
      <p style="color: #555;">{{ post.excerpt }}</p>
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