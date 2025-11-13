
document.querySelectorAll('.boost-trigger').forEach(el => {
el.addEventListener('click', () => {
    const searchInput = document.querySelector('.boost-sd__search-widget-init-input');
    
    if (searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('focus', { bubbles: true }));
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    } else {
    console.warn('Boost instant search input not found');
    }
});
});
