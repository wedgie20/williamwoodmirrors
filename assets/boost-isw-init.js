const searchTriggers = document.querySelectorAll('.icon--header-search');

const clearAndFocusSearch = () => {
  const searchInput = document.querySelector('.boost-sd__search-widget-init-input');

  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    console.warn('Boost instant search input not found at time of click.');
  }
};

if (searchTriggers.length > 0) {
  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', clearAndFocusSearch);
  });
} else {
  console.warn('Search triggers (.icon--header-search) not found on page load.');
}