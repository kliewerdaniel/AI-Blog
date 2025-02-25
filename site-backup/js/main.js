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
  
  // Featured Posts Carousel
  const carousel = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  if (carousel && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Add event listeners to buttons
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      });
    }
    
    // Auto-advance carousel every 5 seconds
    let autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
    }, 5000);
    
    // Pause autoplay on hover
    if (carousel.parentElement) {
      carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
      });
      
      carousel.parentElement.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slideCount;
          updateCarousel();
        }, 5000);
      });
    }
    
    // Update carousel position
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      }
    });
    
    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      }
    }
  }
});
