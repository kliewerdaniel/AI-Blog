// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved user preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Set initial mode based on saved preference
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle dark mode when button is clicked
  darkModeToggle.addEventListener('click', function() {
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Save user preference
    const currentMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', currentMode);
  });
});
