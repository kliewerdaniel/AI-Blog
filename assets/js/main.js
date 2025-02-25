document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Dropdown menu for mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        // Only prevent default if it's a direct click on the dropdown link
        if (e.target === this.querySelector('a')) {
          e.preventDefault();
        }
        this.classList.toggle('active');
      }
    });
  });
  
  // Add post list styling
  const postList = document.querySelector('.post-list');
  if (postList) {
    postList.classList.add('styled-post-list');
    
    const postItems = postList.querySelectorAll('li');
    postItems.forEach(item => {
      item.classList.add('post-item');
    });
  }
});
