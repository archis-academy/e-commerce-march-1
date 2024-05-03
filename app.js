function changeColor(browse) {
    let hompageBrowseBox = browse;
    let hompageBrowseBoxActive = document.querySelector('.browse.active');

    if (hompageBrowseBoxActive && hompageBrowseBoxActive !== hompageBrowseBox) {
        hompageBrowseBoxActive.classList.remove('active');
        hompageBrowseBoxActive.style.backgroundColor = '#FFFFFF';
        hompageBrowseBoxActive.style.color = '#000000';
    }

    if (!hompageBrowseBox.classList.contains('active')) {
        hompageBrowseBox.classList.add('active');
        hompageBrowseBox.style.backgroundColor = '#db4444';
        hompageBrowseBox.style.color = '#FFFFFF';
    } else {
        hompageBrowseBox.classList.remove('active');
        hompageBrowseBox.style.backgroundColor = '#FFFFFF';
        hompageBrowseBox.style.color = '#000000';
    }
}



//Cart starts

const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartProductsContainer = document.getElementById("card-local-storage-container");

function displayCartProducts() {
  if(cartProducts.length === 0) {
    cartProductsContainer.innerHTML = `<div class="cart-products-features-container" style="padding: 30px">
                                         <div class="cart-empty-text-svg-container">
                                          <p class="cart-empty-text"> You do not have any products in your Cart </p>
                                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                           </svg>
                                          </div> 
                                       </div>`
  }
  else {
    cartProductsContainer.innerHTML = cartProducts.map((product) => {
      return `<div class="cart-products-features-container">  
               <div class="cart-products-image-container">
                <img src="${product.image}" class="cart-products-images"/>
                <p class="cart-products-names"> ${product.title} </p>
               </div>      
               <p class="cart-products-price"> ${product.price} </p>
               <input type="number" min="0" value="01" id="product-quantity-${product.id}" class="cart-products-quantity"/> 
               <p id="price-${product.id}"> ${product.price} </p>
              </div>`
    }).join("");  
  } 
  
};

displayCartProducts();

function totalCalculations() {
  cartProducts.map((product) => {
    const quentities = cartProductsContainer.querySelector(`#product-quantity-${product.id}`);  

    quentities.addEventListener(("keyup") , () => {    
      localStorage.setItem(`quentity-${product.id}` , JSON.stringify(quentities.value));
      updateSubtotals();
  });
 }); 
}
 
function updateSubtotals() {
  const updateButton = document.querySelector("#cart-update-button");
  cartProducts.map((product) => {
    const subtotals = cartProductsContainer.querySelector(`#price-${product.id}`);
    const  storedQuentities = JSON.parse(localStorage.getItem(`quentity-${product.id}`)) || [];
    updateButton.addEventListener(("click") , () => {
      if(storedQuentities > 0) {
        subtotals.textContent = product.price*storedQuentities;
      }
    });
    const updatedSubtotals = subtotals.textContent;
    console.log(updatedSubtotals);
  });
};


totalCalculations();


//Cart Ends