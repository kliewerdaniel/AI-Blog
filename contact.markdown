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

## Send a Message

<form action="https://formspree.io/f/xleqgkwz" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="_replyto" required>
  </div>
  
  <div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="subject" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit" class="submit-button">Send Message</button>
</form>

<style>
  .contact-form {
    max-width: 600px;
    margin: 2rem 0;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }
  
  .submit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
</style>

<script>
  // Set the Formspree form ID
  document.querySelector('.contact-form').setAttribute('action', 'https://formspree.io/f/xleqgkwz');
</script>
