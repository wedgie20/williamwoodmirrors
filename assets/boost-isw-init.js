const searchTriggers = document.querySelectorAll('.boost-trigger');

if (searchTriggers.length > 0) {
  
  const openAndFocusSearch = (event) => {
    event.preventDefault(); 

    const searchInput = document.querySelector('.boost-sd__search-widget-init-input');

    if (searchInput) {
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      setTimeout(() => {
        searchInput.focus();
        
        searchInput.select();
      }, 0); 
      
    } else {
      console.warn('Boost instant search input not found at time of click.');
    }
  };

  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', openAndFocusSearch);
  });
  
} else {
  console.warn('Boost triggers (.boost-trigger) not found on page load.');
}