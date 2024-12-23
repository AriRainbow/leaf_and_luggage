document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    // Toggle dropdown visibility
    function toggleDropdown() {
      console.log('Toggling dropdown visibility');
      dropdownContent.classList.toggle('visible');
    }
  
    // Handle clicking the dropdown button
    dropdown.querySelector('.dropbtn').addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Dropdown clicked');
      toggleDropdown();
    });
  
  
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        console.log('Click outside dropdown');
        dropdownContent.classList.remove('visible');
      }
    });