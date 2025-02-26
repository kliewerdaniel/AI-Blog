/**
 * Enhanced Animations for the website
 * This file handles modern, edgy animations and transitions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize parallax effects
  initParallax();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScroll();
  
  // Initialize hover effects
  initHoverEffects();
  
  // Initialize text animations
  initTextAnimations();
});

/**
 * Initialize scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute('data-animation');
        
        // Add the animation class based on the data attribute
        switch (animation) {
          case 'fade-in':
            element.classList.add('animate-fade-in');
            break;
          case 'slide-up':
            element.classList.add('animate-slide-up');
            break;
          case 'slide-in-right':
            element.classList.add('animate-slide-in-right');
            break;
          default:
            element.classList.add(`animate-${animation}`);
        }
        
        // Stop observing after animation is applied
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Start observing elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize parallax scrolling effects
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  // Update parallax positions on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
      const offsetY = scrollY * speed;
      
      element.style.transform = `translateY(${offsetY}px)`;
    });
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the target's position
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        
        // Smooth scroll to target
        smoothScrollTo(targetPosition, 800);
      }
    });
  });
}

/**
 * Smooth scroll to a specific position
 * @param {number} targetPosition - The target scroll position
 * @param {number} duration - The duration of the scroll animation
 */
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  
  function step(currentTime) {
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime < duration) {
      // Easing function: easeInOutCubic
      let progress;
      const t = elapsedTime / duration;
      
      if (t < 0.5) {
        progress = 4 * t * t * t;
      } else {
        progress = 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      
      window.scrollTo(0, startPosition + distance * progress);
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }
  
  requestAnimationFrame(step);
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
  // Add magnetic hover effect to buttons
  const magneticElements = document.querySelectorAll('.btn, .nav-item, .card');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate distance from center (0-1)
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;
      
      // Apply subtle transform
      this.style.transform = `perspective(800px) rotateX(${distanceY * -2}deg) rotateY(${distanceX * 2}deg) scale(1.02)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
  
  // Add glitch effect on hover for edgy elements
  const glitchElements = document.querySelectorAll('.site-logo, .mobile-menu-toggle');
  
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('glitch-effect');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('glitch-effect');
    });
  });
}

/**
 * Initialize text animations for headings and important text
 */
function initTextAnimations() {
  // Split text into spans for letter-by-letter animation
  const textElements = document.querySelectorAll('[data-text-animation]');
  
  textElements.forEach(element => {
    const text = element.textContent;
    const animationType = element.getAttribute('data-text-animation');
    
    // Skip if already processed
    if (element.classList.contains('text-animated')) return;
    
    // Clear the element
    element.textContent = '';
    element.classList.add('text-animated');
    
    // Create wrapper for better positioning
    const wrapper = document.createElement('span');
    wrapper.classList.add('text-animation-wrapper');
    element.appendChild(wrapper);
    
    // Add each letter as a span
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.setProperty('--index', index);
      
      if (char === ' ') {
        span.classList.add('space');
      } else {
        span.classList.add('letter');
        span.classList.add(animationType);
      }
      
      wrapper.appendChild(span);
    });
  });
}

/**
 * Add animation to elements when they come into view
 * This is called when new content is loaded dynamically
 * @param {HTMLElement} container - The container element with new content
 */
function refreshAnimations(container) {
  const newAnimatedElements = container.querySelectorAll('[data-animation]');
  
  if (!newAnimatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute('data-animation');
        const delay = element.style.getPropertyValue('--delay') || '0s';
        
        // Add animation delay if specified
        element.style.animationDelay = delay;
        
        // Add the animation class based on the data attribute
        switch (animation) {
          case 'fade-in':
            element.classList.add('animate-fade-in');
            break;
          case 'slide-up':
            element.classList.add('animate-slide-up');
            break;
          case 'slide-in-right':
            element.classList.add('animate-slide-in-right');
            break;
          case 'scale-in':
            element.classList.add('animate-scale-in');
            break;
          case 'clip-path-circle':
            element.classList.add('animate-clip-path-circle');
            break;
          default:
            element.classList.add(`animate-${animation}`);
        }
        
        // Stop observing after animation is applied
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Start observing elements
  newAnimatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Also initialize text animations for any new content
  const newTextElements = container.querySelectorAll('[data-text-animation]');
  if (newTextElements.length) {
    initTextAnimations();
  }
}

// Export functions for use in other scripts
window.animations = {
  refreshAnimations,
  smoothScrollTo,
  initHoverEffects,
  initTextAnimations
};
