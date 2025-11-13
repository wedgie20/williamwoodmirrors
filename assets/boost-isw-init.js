const searchTriggers = document.querySelectorAll('.boost-trigger');

const clearAndFocusSearch = () => {
  const searchInput = document.querySelector('.boost-sd__search-widget-init-input');

  if (searchInput) {
    searchInput.focus();
  } else {
    console.warn('Boost instant search input not found at time of click.');
  }
};

searchTriggers.forEach(trigger => {
  trigger.addEventListener('click', clearAndFocusSearch);
});