/**
 * Main JavaScript for the redesigned website
 * Enhanced with modern, edgy navigation functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the modern navigation
  initModernNavigation();
  
  // Initialize scroll effects
  initScrollEffects();
  
  // Initialize search functionality
  initSearchOverlay();
  
  // Handle carousel functionality
  initCarousel();
  
  // Initialize animations
  initAnimations();
  
  // Add alt text to images that don't have it
  addMissingAltText();
  
  // Make interactive elements keyboard accessible
  enhanceKeyboardAccessibility();
});

/**
 * Initialize modern navigation with dropdown mobile menu (like desktop)
 */
function initModernNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      this.classList.toggle('active');
      
      // Accessibility: Update ARIA attributes
      const expanded = mobileMenu.classList.contains('active');
      this.setAttribute('aria-expanded', expanded);
      mobileMenu.setAttribute('aria-hidden', !expanded);
      
      // No need to prevent scrolling for dropdown menu
      // We want it to behave like the desktop menu
    });
    
    // Initialize ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/**
 * Initialize scroll effects for the header
 */
function initScrollEffects() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  if (!header) return;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when page is scrolled
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * Initialize search overlay functionality
 */
function initSearchOverlay() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = searchOverlay ? searchOverlay.querySelector('input[type="text"]') : null;
  const body = document.body;
  
  if (searchToggle && searchOverlay && searchClose) {
    // Open search overlay
    searchToggle.addEventListener('click', function() {
      searchOverlay.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Focus the search input after a short delay to allow for animation
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });
    
    // Close search overlay
    searchClose.addEventListener('click', function() {
      searchOverlay.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Close search overlay on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
}

/**
 * Initialize carousel functionality
 */
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');
    
    if (!track || !slides.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // percentage
    
    // Set initial position
    updateCarouselPosition();
    
    // Add event listeners
    prevButton.addEventListener('click', () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarouselPosition();
    });
    
    nextButton.addEventListener('click', () => {
      currentIndex = Math.min(currentIndex + 1, slides.length - 1);
      updateCarouselPosition();
    });
    
    // Add keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarouselPosition();
      } else if (e.key === 'ArrowRight') {
        currentIndex = Math.min(currentIndex + 1, slides.length - 1);
        updateCarouselPosition();
      }
    });
    
    function updateCarouselPosition() {
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      
      // Update button states
      prevButton.setAttribute('aria-disabled', currentIndex === 0);
      nextButton.setAttribute('aria-disabled', currentIndex === slides.length - 1);
      
      // Update ARIA attributes for accessibility
      slides.forEach((slide, index) => {
        slide.setAttribute('aria-hidden', index !== currentIndex);
      });
    }
  });
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute('data-animation');
        const delay = element.style.getPropertyValue('--delay') || '0s';
        
        // Add animation class with delay
        element.style.animationDelay = delay;
        element.classList.add(`animate-${animation}`);
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Add missing alt text to images for accessibility
 */
function addMissingAltText() {
  const images = document.querySelectorAll('img:not([alt])');
  
  images.forEach(img => {
    // Extract filename from src
    const src = img.getAttribute('src') || '';
    const filename = src.split('/').pop().split('.')[0];
    
    // Convert filename to readable text
    const altText = filename
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim();
    
    img.setAttribute('alt', altText || 'Image');
  });
}

/**
 * Enhance keyboard accessibility for interactive elements
 */
function enhanceKeyboardAccessibility() {
  // Make card links keyboard accessible
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const link = card.querySelector('a');
    if (link) {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          link.click();
        }
      });
    }
  });
  
  // Ensure all interactive elements have appropriate focus styles
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex="0"]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('focus-visible');
    });
    
    element.addEventListener('blur', () => {
      element.classList.remove('focus-visible');
    });
  });
}

/**
 * Add breadcrumb navigation to the page
 */
function updateBreadcrumbs() {
  const breadcrumbsContainer = document.querySelector('.breadcrumbs');
  if (!breadcrumbsContainer) return;
  
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment);
  
  // Clear existing breadcrumbs
  breadcrumbsContainer.innerHTML = '';
  
  // Add home link
  const homeItem = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeItem.appendChild(homeLink);
  breadcrumbsContainer.appendChild(homeItem);
  
  // Add path segments
  let currentUrl = '';
  pathSegments.forEach((segment, index) => {
    currentUrl += `/${segment}`;
    
    const item = document.createElement('li');
    
    // If it's the last segment, don't make it a link
    if (index === pathSegments.length - 1) {
      const span = document.createElement('span');
      span.textContent = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      item.appendChild(span);
    } else {
      const link = document.createElement('a');
      link.href = currentUrl;
      link.textContent = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      item.appendChild(link);
    }
    
    breadcrumbsContainer.appendChild(item);
  });
}
