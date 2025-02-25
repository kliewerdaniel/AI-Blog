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

- Twitter: [@{{ site.twitter_username }}](https://twitter.com/{{ site.twitter_username }})
- GitHub: [{{ site.github_username }}](https://github.com/{{ site.github_username }})

## Send a Message

<form action="https://formspree.io/f/your-form-id" method="POST" class="contact-form">
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
  // Replace 'your-form-id' with your actual Formspree form ID
  document.querySelector('.contact-form').setAttribute('action', 'https://formspree.io/f/your-form-id');
</script>
