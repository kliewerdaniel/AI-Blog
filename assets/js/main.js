document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
      
      // Accessibility: Update ARIA attributes
      const expanded = mainNav.classList.contains('active');
      this.setAttribute('aria-expanded', expanded);
      mainNav.setAttribute('aria-hidden', !expanded);
    });
    
    // Initialize ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mainNav.setAttribute('aria-hidden', 'true');
  }
  
  // Dropdown menu code removed as categories have been removed from mobile and main site
  
  // Add post list styling
  const postList = document.querySelector('.post-list');
  if (postList) {
    postList.classList.add('styled-post-list');
    
    const postItems = postList.querySelectorAll('li');
    postItems.forEach(item => {
      item.classList.add('post-item');
    });
  }
  
  // Add active class to current navigation item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav li a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath.includes('/blog/') && linkPath === '/blog/') ||
        (currentPath.includes('/projects/') && linkPath === '/projects/') ||
        (currentPath.includes('/guides/') && linkPath === '/guides/')) {
      link.parentElement.classList.add('active');
    }
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without page reload
          history.pushState(null, null, targetId);
        }
      }
    });
  });
  
  // Image lazy loading with fade-in effect
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';
          
          // When the image is loaded, fade it in
          img.onload = () => {
            img.style.opacity = '1';
          };
          
          // Stop observing the image
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      // Add initial styles
      img.style.opacity = '0';
      imageObserver.observe(img);
    });
  }
});
