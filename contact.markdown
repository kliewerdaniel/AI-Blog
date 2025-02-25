---
layout: default
title: Contact
permalink: /contact/
---

# Contact

I'd love to hear from you! Whether you have a question, feedback, or want to discuss a potential collaboration, feel free to reach out.

## Get in Touch

You can contact me via email at [{{ site.email }}](mailto:{{ site.email }}).

## Connect on Social Media

<div class="social-links">
  <a href="https://twitter.com/{{ site.twitter_username }}" class="social-link twitter" target="_blank" rel="noopener noreferrer">
    <span class="icon">🐦</span> Twitter: @{{ site.twitter_username }}
  </a>
  <a href="https://github.com/{{ site.github_username }}" class="social-link github" target="_blank" rel="noopener noreferrer">
    <span class="icon">💻</span> GitHub: {{ site.github_username }}
  </a>
</div>

<style>
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .social-link {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid #ddd;
  }
  
  .social-link:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .social-link .icon {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
  
  .twitter:hover {
    color: #1DA1F2;
    border-color: #1DA1F2;
  }
  
  .github:hover {
    color: #333;
    border-color: #333;
  }
</style>
