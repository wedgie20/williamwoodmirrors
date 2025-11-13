const searchTriggers = document.querySelectorAll('.boost-trigger');

const clearAndFocusSearch = () => {
  const searchInput = document.querySelector('.boost-sd__search-widget-init-input');

  if (searchInput) {
    searchInput.focus();
    const textLength = searchInput.value.length;
    searchInput.setSelectionRange(textLength, textLength);
  } else {
    console.warn('Boost instant search input not found at time of click.');
  }
};

searchTriggers.forEach(trigger => {
  trigger.addEventListener('click', clearAndFocusSearch);
});