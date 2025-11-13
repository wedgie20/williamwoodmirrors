const searchInput = document.querySelector('.boost-sd__search-widget-init-input');

const clearAndFocusSearch = () => {
  searchInput.value = '';
  searchInput.focus();
  searchInput.dispatchEvent(new Event('input', { bubbles: true }));
};

if (searchInput) {
  const searchTriggers = document.querySelectorAll('.icon--header-search');
  
  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', clearAndFocusSearch);
  });
} else {
  console.warn('Boost instant search input (.boost-sd__search-widget-init-input) not found on page load. Click triggers not attached.');
}