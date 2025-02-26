/**
 * Main JavaScript for the redesigned website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Add animation class
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('animate-fade-in');
      }
    });
  }
  
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
