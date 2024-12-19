document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    // Function to toggle dropdown visibility with animation
    function toggleDropdown() {
      if (dropdownContent.style.maxHeight) {
        dropdownContent.style.maxHeight = null; // Collapse the dropdown
        dropdownContent.style.opacity = '0'; // Fade out
      } else {
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px'; // Expand the dropdown
        dropdownContent.style.opacity = '1'; // Fade in
      }
    }
  
    // Add click event to dropdown
    dropdown.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown();
    });
  
    // Optional: Close the dropdown if clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.style.maxHeight = null;
        dropdownContent.style.opacity = '0';
      }
    });
  });
  