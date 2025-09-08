document.addEventListener('click', function(e){
  	let el = e.target;
    
    if(el.classList.contains('checkout-drawer-button') || el.closest('.checkout-drawer-button')) {
      if(!el.classList.contains('checkout-drawer-button')) {
      	el = el.closest('.checkout-drawer-button');
      }
      e.preventDefault();

      let mini_cartEl = el.closest('#mini-cart');
      if(mini_cartEl) {
        let mini_cartFormEl = mini_cartEl.querySelector('#mini-cart-form');
        if(mini_cartFormEl) {
          console.log(mini_cartFormEl);
           mini_cartFormEl.submit();

        }
      }
      

      
    }
  });