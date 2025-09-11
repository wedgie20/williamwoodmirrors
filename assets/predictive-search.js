class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.closeButton = this.querySelector("[data-close-button]");
    this.button = document.querySelector('.cloud-search-mobile-open');
    this.predictiveSearchResults = document.querySelector(
      "#quick-search-content"
    );

    //
    this.input.addEventListener(
      "input",
      this.debounce((event) => {
        this.onChange(event);
      }, 300).bind(this)
    );
    this.input.addEventListener(
      "search_term_added",
      this.debounce((event) => {
        this.onChange(event);
      }, 300).bind(this)
    );

    this.button.addEventListener("click", this.onClick.bind(this));
    this.button.addEventListener("click", this.onShow.bind(this));
    this.closeButton.addEventListener("click", this.close.bind(this));
  }

  onShow() {
      document.querySelector(".mobile-search").classList.add("mobile-search__show");
      document.querySelector("predictive-search").classList.add("show");
  
      const searchInput = document.querySelector(".search-input");
      const header = document.querySelector('store-header');
const quickSearchContent = document.querySelector('#quick-search-content.show');
if (header && quickSearchContent) {
  const headerHeight = header.offsetHeight;
  quickSearchContent.style.transform = `translateY(${headerHeight}px)`;
  quickSearchContent.style.visibility = 'visible';
}
      if (searchInput) {
          searchInput.setAttribute("autofocus", "true");
          searchInput.focus();
      }
  }

  

  onClick() {
    if (this.predictiveSearchResults.classList.contains("show")) return;
    // open the search results container
    
    this.open();
    this.renderSection(
      "custom-search-results-overlay",
      "#quick-search-content"
    );
  }

  onChange() {
    const searchTerm = this.input.value.trim();
    // if searchTerm is blank-> show default page layout
    if (!searchTerm.length) {
      this.renderSection(
        "custom-search-results-overlay",
        "#quick-search-content"
      );
      return;
    }

    // else
    // -> hide search icon

    this.getSearchResults(searchTerm);
  }

  setQueryButtonListeners() {
    // add listeners for suggestion buttons
    const queryButtons = document.querySelectorAll("[data-suggested-query]");

    queryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const thisButton = e.currentTarget;
        const query = thisButton.dataset.suggestedQuery;
        this.input.value = query;

        // Remove 'activethis' from all sibling li elements
        const parentLi = thisButton.closest('li');
        if (parentLi) {
          const allLis = parentLi.parentElement.querySelectorAll('li');
          allLis.forEach(li => li.classList.remove('activethis'));
          parentLi.classList.add('activethis');
        }

        const newSearchTerm = new CustomEvent("search_term_added");
        this.input.dispatchEvent(newSearchTerm);
      });
    });
  }

  getSearchResults(searchTerm) {
    // Define promises for each section
    // predictive search call
    const promise1 = this.fetchSection(
      `${window.Shopify.routes.root}search/suggest?q=${searchTerm}&sections=custom-search-results-overlay`
    );
    // full search reseults (not limited to 10 products)
    const promise2 = this.fetchSection(
      `${window.Shopify.routes.root}search?q=${searchTerm}&sections=search-products`
    );

    // Handle completion of both promises
    Promise.all([promise1, promise2])
      .then((sections) => {
        //
        const searchLayoutSection =
          sections[0]["custom-search-results-overlay"];
        const searchPageResults = sections[1]["search-products"];

        const products = new DOMParser()
          .parseFromString(searchPageResults, "text/html")
          .querySelector("#search-products-results").innerHTML;
        //
        this.predictiveSearchResults.innerHTML = searchLayoutSection;
        this.predictiveSearchResults.querySelector(
          "#search-results-container"
        ).innerHTML = products;
        // update the product results count for mobile
        document.querySelector("#mobile-results-count").innerHTML =
          document.querySelector("#search-result-count").innerHTML;

        this.setQueryButtonListeners();
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }

  fetchSection(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data);
  }

  open() {
    // disable scrolling on the main doc body
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector('.mobile-searchbar').style.display = 'none';
    document.querySelector('#lightboxjs-lightboxlib').style.display = 'none';
    // open search container
    this.predictiveSearchResults.classList.add("show");
    // show close button
    this.classList.add("active");
  }

  close() {
    // enable scrolling on the main doc body
    document.querySelector("body").classList.remove("no-scroll");
    //
    document.querySelector("predictive-search").classList.remove("show");
    document.querySelector("#quick-search-content").classList.remove("show");
    document.querySelector(".mobile-search").classList.remove("mobile-search__show");

    const quickSearchContent = document.querySelector('#quick-search-content');
if (quickSearchContent) {
  quickSearchContent.style.transform = `translateY(-100%)`;
  quickSearchContent.style.visibility = 'hidden';
}
    //
    if (document.body.classList.contains('template-index')) {
    document.querySelector('.mobile-searchbar').style.display = 'block';
}
    setTimeout(() => {
    document.querySelector("store-header").classList.add("header--transparent");
    }, 500);
    this.classList.remove("active");
    this.input.value = "";
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  renderSection(section, targetEl) {
    fetch(window.Shopify.routes.root + `?sections=${section}`)
      .then((res) => res.json())
      .then((result) => {
        //
        // populate the target with the result
        document.querySelector(targetEl).innerHTML = result[section];
        this.setQueryButtonListeners();
      });
  }
}

customElements.define("predictive-search", PredictiveSearch);
