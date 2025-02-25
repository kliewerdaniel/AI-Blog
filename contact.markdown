---
layout: default
title: Contact
permalink: /contact/
description: Get in touch with Daniel Kliewer for questions, feedback, collaboration opportunities, or just to say hello.
---

# Get in Touch

<div class="contact-intro">
  <div class="contact-image">
    <img src="/static/images/a.png" alt="Contact" loading="lazy">
  </div>
  <div class="contact-text">
    <p>I'd love to hear from you! Whether you have a question, feedback, or want to discuss a potential collaboration, feel free to reach out through any of the channels below.</p>
  </div>
</div>

## Contact Form

<div class="contact-form-container">
  <form id="contact-form" class="contact-form" action="https://formspree.io/f/{{ site.formspree_id }}" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <button type="submit" class="btn">Send Message</button>
  </form>
</div>

## Direct Email

You can also reach me directly via email at <a href="mailto:{{ site.email }}" class="email-link">{{ site.email }}</a>.

## Connect on Social Media

<div class="social-container">
  <div class="social-links">
    <a href="https://twitter.com/{{ site.twitter_username }}" class="social-link twitter" target="_blank" rel="noopener noreferrer">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/></svg>
      </span>
      <span class="social-text">Twitter: @{{ site.twitter_username }}</span>
    </a>
    
    <a href="https://github.com/{{ site.github_username }}" class="social-link github" target="_blank" rel="noopener noreferrer">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>
      </span>
      <span class="social-text">GitHub: {{ site.github_username }}</span>
    </a>
  </div>
</div>

## Response Time

I typically respond to all inquiries within 24-48 hours. For urgent matters, please indicate this in your message subject.

<div class="contact-cta">
  <h3>Looking for my work?</h3>
  <p>Check out my <a href="/projects/">projects</a> or read my latest <a href="/blog/">blog posts</a>.</p>
</div>

<style>
  .contact-intro {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .contact-image {
    flex: 0 0 200px;
  }
  
  .contact-image img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 12px var(--shadow);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }
  
  .contact-image img:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px var(--shadow-hover);
  }
  
  .contact-text {
    flex: 1;
  }
  
  .contact-form-container {
    background-color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 12px var(--shadow);
    margin: 2rem 0;
    transition: box-shadow var(--transition-normal);
  }
  
  .contact-form-container:hover {
    box-shadow: 0 8px 24px var(--shadow-hover);
  }
  
  .contact-form {
    display: grid;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-weight: 600;
    color: var(--primary-color);
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    border: 2px solid var(--secondary-color);
    border-radius: var(--border-radius-md);
    font-family: var(--body-font);
    font-size: 1rem;
    transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.2);
  }
  
  .email-link {
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: underline;
    transition: color var(--transition-normal);
  }
  
  .email-link:hover {
    color: var(--accent-color);
  }
  
  .social-container {
    margin: 2rem 0;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .social-link {
    display: inline-flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: var(--white);
    border-radius: var(--border-radius-md);
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: all var(--transition-normal);
    border: 1px solid var(--secondary-color);
    box-shadow: 0 2px 6px var(--shadow);
  }
  
  .social-link:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px var(--shadow-hover);
  }
  
  .social-link .icon {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-link .icon svg {
    width: 24px;
    height: 24px;
  }
  
  .twitter:hover {
    color: #1DA1F2;
    border-color: #1DA1F2;
  }
  
  .twitter:hover .icon svg {
    fill: #1DA1F2;
  }
  
  .github:hover {
    color: #333;
    border-color: #333;
  }
  
  .github:hover .icon svg {
    fill: #333;
  }
  
  .contact-cta {
    background-color: var(--secondary-color);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    margin: 3rem 0;
    text-align: center;
    border-left: 4px solid var(--primary-color);
  }
  
  .contact-cta h3 {
    margin-top: 0;
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    .contact-intro {
      flex-direction: column;
      text-align: center;
    }
    
    .contact-image {
      flex: 0 0 auto;
      max-width: 150px;
      margin: 0 auto;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // If validation passes, submit the form
        this.submit();
      });
    }
  });
</script>
