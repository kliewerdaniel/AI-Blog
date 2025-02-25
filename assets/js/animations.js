// Simple animation utilities to enhance the UI
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements when they enter the viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        // Get the animation type from data attribute
        const animationType = element.dataset.animation || 'fade-in';
        element.classList.add(`animate-${animationType}`);
      }
    });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  if (carouselTrack && carouselSlides.length > 0) {
    let currentIndex = 0;
    const slideCount = carouselSlides.length;
    
    // Set initial position
    carouselTrack.style.transform = `translateX(0)`;
    
    // Function to move to a specific slide
    const moveToSlide = (index) => {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      
      currentIndex = index;
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    // Event listeners for buttons
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
      });
    }
    
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
      moveToSlide(currentIndex + 1);
    }, 5000);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
  });
});
