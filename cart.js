//Cart starts
let filteredProducts = [];
const searchDropdown = document.querySelector("#search-dropdown"); 
let searchApiProducts = searchDropdown.querySelector(".search-api-products");
const searchSvg = document.querySelector(".search-svg");
const deleteSvg = document.querySelector(".search-delete-svg");
let searchValue = "";


async function getApıProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products", {
    mode: "cors",
  });
  const apiProducts = await apiResponse.json();
  return apiProducts;
}


function displaySearchedProducts(allProducts) {
  const searchBar = document.querySelector(".header-search");
  searchApiProducts.innerHTML = ``;
  allProducts.map((product) => {
    searchApiProducts.innerHTML += `<div class="search-products" id="search-products">
           <div class="category-products-features-container" id="search-products">          
              <img src="${product.image}" id="search-products" class="category-products-img"/>
              <p class="category-titles" id="search-products"> ${product.title} </p>
            </div>  
         </div>`
  });
 
  searchBar.addEventListener(("keyup") , () => {
   searchDropdown.style.display = "flex";
   searchValue = searchBar.value
   hideSearchSvg(searchValue);
   filteredProducts = [];
   filteredProducts = allProducts.filter((anyProduct) => anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
   displayFilteredProducts(filteredProducts,searchApiProducts);
   applyPopularSearch(allProducts)
  });

  deleteSvg.addEventListener(("click") , () => {
    searchBar.value = "";
    searchSvg.style.display = "block";
    deleteSvg.style.display = "none";
    displaySearchedProducts(allProducts);
  });
};

function hideSearchSvg(value) {
  if (value !== "") {
     searchSvg.style.display = "none";
     deleteSvg.style.display = "block";
   } else {
    searchSvg.style.display = "block";
    deleteSvg.style.display = "none";
   }
}

function displayFilteredProducts(products,searchApiProducts) {
  searchApiProducts.innerHTML = ``;
  products.map((product) => {
    searchApiProducts.innerHTML += 
         `<div class="search-products" id="search-products">
           <div class="category-products-features-container" id="search-products">          
              <img src="${product.image}" id="search-products" class="category-products-img"/>
              <p class="category-titles" id="search-products"> ${product.title} </p>
            </div>  
         </div>`
   });
};

function applyPopularSearch(allProducts) {
  let popularSearches = [];
  popularSearches = searchDropdown.querySelectorAll(".popular-searches-p");
  const searchBar = document.querySelector(".header-search");
  console.log(popularSearches)
 
   popularSearches.forEach((search) => {
    search.addEventListener(("click"),() => {
     searchBar.value = search.textContent;
     searchValue = searchBar.value;
     hideSearchSvg(searchValue);
     
     filteredProducts = [];
     filteredProducts = allProducts.filter((anyProduct) =>  anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
     searchApiProducts = searchDropdown.querySelector(".search-api-products"); 
     console.log(filteredProducts)
     displayFilteredProducts(filteredProducts,searchApiProducts);
     applyPopularSearch(allProducts);
    });
   }); 
};


async function displayProducts() {
  const allProducts = await getApıProducts();
   displaySearchedProducts(allProducts);
   applyPopularSearch(allProducts);
   dropdownOnclickActions()
}


function getWishlistCartLength() {
  const wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishlistLength = wishlist.length;

  const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartLength = cart.length;


  const wishlistNumberDiv = document.querySelectorAll("#wishlist-length");
  const cartNumberDiv = document.querySelectorAll("#cart-length");
  if (parseInt(wishlistLength) !== 0) {
    wishlistNumberDiv.forEach((div) => {
      div.innerHTML = `<p class=""> ${wishlistLength} </p>`
    });
  }
  else {
   wishlistNumberDiv.forEach((div) => {
     div.style.display = "none";
   });
  }
  if (parseInt(cartLength) !== 0) {   
   cartNumberDiv.forEach((div) => {
     div.innerHTML = `<p class=""> ${cartLength} </p>`
   });
  }
  else {
    cartNumberDiv.forEach((div) => {
      div.style.display = "none";
    })
  }
}

getWishlistCartLength();


function dropdownOnclickActions() {
  const accountDropdown = document.querySelector("#account-dropdown")
  
  window.onclick = function(event) {
    if (!event.target.matches('#account-dropdown') && !event.target.matches("#header-account-icon")) {
       accountDropdown.classList.remove("show-account");
       console.log("lsaş")
    }
    else if(event.target.matches("#header-account-icon")){
      accountDropdown.classList.toggle("show-account");
      console.log("şladsfşkFDŞK")
    }
        
    if (!event.target.matches('#search-dropdown') && !event.target.matches(`#search-products`) ) {
      searchDropdown.style.display = "none";
    }
    else{
    searchDropdown.style.display = "flex";
    }  
  };
};

displayProducts();


const cartPageProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartProductsContainer = document.getElementById("card-local-storage-container");
const emptyTextDiv = document.getElementById("cart-empty-text-container");

function displayCartProducts() {
  if(cartPageProducts.length === 0) {
    emptyTextDiv.innerHTML = ` <div class="cart-empty-text-svg-container">
                                 <p class="cart-empty-text"> You do not have any products in your cart </p>
                                 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                 </svg>
                                </div> `                                
    emptyTextDiv.style.display = "block";
  }
  else {
    cartProductsContainer.innerHTML = cartPageProducts.map((product) => {
      return `<div class="cart-products-features-container">  
               <div class="cart-products-image-container">
                <img src="${product.image}" class="cart-products-images"/>
                <p class="cart-products-names cart-p"> ${product.title} </p>
               </div>  
               <div class="cart-products-responsive-p-container">
                  <p class="cart-p cart-products-responsive-p">Price : </p>
                  <p class="cart-p"> ${product.price}$ </p>
               </div>
               <div class ="cart-quantity-subtotal-container">
                <div class="cart-products-responsive-p-container">
                 <p class="cart-p cart-products-responsive-p"> Quantity : </p>
                 <div class="cart-select-appearance-container">   
                  <select id="product-quantity-${product.id}" class="cart-products-quantity">
                   <option>0</option>
                   <option selected>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                   <option>6</option>
                   <option>7</option>
                   <option>8</option>
                   <option>9</option>
                   <option>10</option>
                  </select> 
                  <div class="cart-select-buttons-container">
                   <?xml version="1.0" encoding="utf-8"?>
                   <svg width="11px" height="11px" id="select-increment-button-${product.id}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#000000"/>
                   </svg>
                   <?xml version="1.0" encoding="utf-8"?>
                   <svg width="11px" height="11px" id="select-decrement-button-${product.id}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#000000"/>
                   </svg>
                  </div>
                 </div> 
                </div>
                <div class="cart-products-responsive-p-container">
                  <p class="cart-p cart-products-responsive-p"> Subtotal : </p>
                  <p id="price-${product.id}" class="cart-p"> ${product.price.toFixed(2)}$ </p>
                </div>  
               </div> 
              </div>`
    }).join("");  
  } 
};

displayCartProducts();

function subtotalCalculations() {
  cartPageProducts.map((product) => {
    const incrementButton = cartProductsContainer.querySelector(`#select-increment-button-${product.id}`);
    const decrementButton = cartProductsContainer.querySelector(`#select-decrement-button-${product.id}`);
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`);
   quantity.addEventListener(("click") , () => {  
     updateSubtotals(product,parseInt(quantity.value));
     if(parseInt(quantity.value) === 0) {
      deleteFromCart();
     }
   });
   incrementButton.addEventListener(("click") , () => {
    let intQuantity = parseInt(quantity.value);
    if (intQuantity < 10) {
      intQuantity += 1;
      quantity.value = intQuantity;
      updateSubtotals(product,intQuantity);   
    }
    else{
      alert("You can buy maximum 10 pieces of one product in one order");
    }
   });

   decrementButton.addEventListener(("click") , () => {
    let intQuantity = parseInt(quantity.value);
    if (intQuantity > 1) {
     intQuantity -= 1;
     quantity.value = intQuantity;
     updateSubtotals(product,intQuantity);   
    }
    else if(intQuantity === 1) {
      intQuantity -= 1;
      quantity.value = intQuantity;
      deleteFromCart();
    }
   });
 }); 
};

function updateSubtotals(product,any_quantity) {
  const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`);
  subtotal.textContent = `${(product.price*any_quantity).toFixed(2)}$`;
};

function deleteFromCart() {
  cartPageProducts.map((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    if(parseInt(quantity.value) === 0){
       const deletedProduct = cartPageProducts.findIndex((productToDelete) => productToDelete.id === product.id);
       cartPageProducts.splice(deletedProduct,1);
       localStorage.setItem("cartProducts", JSON.stringify([...cartPageProducts]));
       localStorage.removeItem(`productFeatures-${product.id}`);
       window.location.reload();
     } 
  });
};

let productFeatures = {
  quantity : 0,
  subtotal : ""
};

function updateCart() {
  const updateButton = document.querySelector("#cart-update-button");
  cartPageProducts.map((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`);
    
    updateButton.addEventListener(("click") , () => {
      productFeatures.quantity = parseInt(quantity.value);
      productFeatures.subtotal = subtotal.textContent;
      localStorage.setItem(`productFeatures-${product.id}` , JSON.stringify(productFeatures));
      window.location.reload();
   });
 });
};

function getStoredValues() {
  cartPageProducts.map((product) => {
    const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`); 
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`);
    
    let features = JSON.parse(localStorage.getItem(`productFeatures-${product.id}`)) || {};
    const floatSubtotal = parseFloat(features.subtotal);
    const intQuantity = parseInt(features.quantity);

    if(floatSubtotal > 0 && floatSubtotal !== undefined) {
      subtotal.textContent = `${floatSubtotal}$`;
    }
    if(intQuantity > 0 && intQuantity !== undefined) { 
      quantity.value = `${intQuantity}`;
    }  
  });
};

const checkoutTotal = document.querySelector("#cart-calculate-total");
const freeShippingDiv = document.querySelector("#cart-free-shipping-container");
const checkoutSubtotal = document.querySelector("#cart-calculate-subtotal");
const cartShippingContainer = document.querySelector("#cart-shipping-subtotal");

function checkoutTotalCalculations() {
  let cartSum = 0;
  cartPageProducts.forEach((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const intQuantity = parseInt(quantity.value);
    cartSum  += (intQuantity * product.price);  
  });
    
  const cartShippingValue = calculateShipping(cartSum);
  
  if (cartShippingValue === 0) {
    cartShippingContainer.textContent = `Free`;
  } else {
    freeShippingCalculations(cartSum);
   cartShippingContainer.textContent = `${cartShippingValue}$`;
  }
 
  checkoutSubtotal.textContent = `${cartSum.toFixed(2)}$`;
  checkoutTotal.textContent = `${(cartSum + cartShippingValue).toFixed(2)}$`
};

function calculateShipping(cartSubtotal) {
  let totalQuantity = 0;
  cartPageProducts.forEach((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const intQuantity = parseInt(quantity.value);
    totalQuantity += (intQuantity);
  });
  
  if (cartSubtotal >= 500) {
    freeShippingDiv.style.display = "none";
    return 0
  }   
  if(totalQuantity === 0) 
   {return 0;}
  else if(totalQuantity <= 5) 
   {return 15;}
  else if(totalQuantity <= 10) 
   {return 20;}
  else {return 30;}
};

function freeShippingCalculations(cartSubtotal) {
   const shippingSubtraction = (500 - cartSubtotal).toFixed(2);
   freeShippingDiv.innerHTML = `<p class="cart-p"> Add ${shippingSubtraction}$ worth product for Free Shipping</p>`
   freeShippingDiv.style.display = "block";
}

const discountDiv = document.querySelector("#cart-discount-container");
const removeCouponDiv = document.querySelector("#cart-coupon-remove-container");
const totalBeforeDiscount = document.querySelector("#cart-total-before-discount-container");
const couponInput = document.querySelector("#cart-coupon-input");

let couponFeatures = {
  discount: 0,
  couponApplied: true
};

function applyCoupun() {
  const floatTotal = parseFloat(checkoutTotal.textContent);
  const applyButton = document.querySelector("#cart-coupon-apply-button");
  checkStoredCoupon(floatTotal);
  
  applyButton.addEventListener(("click") , () => {
    couponFeatures.couponApplied = checkStoredCoupon(floatTotal);
  
    if(couponFeatures.couponApplied){
      const couponText = couponInput.value;
      couponFeatures.discount = checkCoupon(couponText);
      
      if(couponFeatures.discount === 0) {
       alert("The coupon is unvalid");
      }
      else {
         alert("Coupon applied to your total")     
         displayCouponElements(floatTotal,couponFeatures.discount);
         couponFeatures.couponApplied = false;
         localStorage.setItem("couponFeatures-storage", JSON.stringify(couponFeatures));   
      }
    }
    else {
      alert("You can apply only one coupon to your cart");
    }
  });
};

function checkCoupon(couponText) {
 switch (couponText) {
  case "discount20":
    return 20/100;
    break;
  case "discount50":
    return 50/100;
    break;
  case "discount75":
    return 75/100;      
    break;
  case "gift100":
    return 1;
  default:
    return 0;
    break;
 }
};

function displayCouponElements(floatTotal,any_coupon) {
  totalBeforeDiscount.innerHTML = `<p class="cart-p">Total Before Discount </p>
                                     <p class="cart-p"> ${floatTotal}$ </p> `
  totalBeforeDiscount.style.display = "flex";

  removeCouponDiv.innerHTML = `<p class="cart-cancel-coupon-p cart-p"> Cancel Coupon </p>
                                     <div onclick="removeCoupon(${floatTotal})" class="cart-remove-icon-container"> 
                                      <?xml version="1.0" encoding="utf-8"?>
                                      <svg fill="#000000" width="30px" height="33px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M67.6430764,52.000622 C76.698498,52.000622 84,59.607436 84,68.5654176 C83.9734483,75.2459518 79.9211344,81.2512146 73.736007,83.7759803 C67.5508796,86.3007459 60.4536828,84.8467074 55.7597153,80.0930865 C51.0657477,75.3394657 49.7014467,68.2244736 52.3041153,62.0717215 C54.9067839,55.9189693 60.9627395,51.9428115 67.6430764,52.000622 Z M76.099909,58.3456813 C75.7092262,57.9553155 75.0760612,57.9555726 74.6859827,58.3465424 L74.6859827,58.3465424 L67.3962284,65.6422184 L60.5030161,58.7313311 C60.5027147,58.731029 60.5024131,58.730727 60.5021113,58.7304252 L60.407904,58.6472366 C60.0156127,58.3422117 59.4483817,58.3699412 59.0878977,58.7304252 L59.0878977,58.7304252 L57.4295053,60.3888176 C57.0393345,60.7789884 57.0389296,61.4114552 57.4286005,61.8021252 L57.4286005,61.8021252 L64.3236213,68.7148256 L57.4696899,75.5628687 L57.4696899,75.5628687 L57.3858938,75.6570758 C57.0808706,76.0493653 57.1086217,76.6165748 57.4693861,76.9767783 L57.4693861,76.9767783 L59.1342757,78.6416679 C59.5248,79.0321922 60.157965,79.0321922 60.5484892,78.6416679 L60.5484892,78.6416679 L67.4027244,71.7874328 L74.6537925,79.0503393 C74.6534076,79.0511078 74.6535998,79.0513001 74.6537921,79.0514924 L74.7479991,79.1346807 C75.1402872,79.4397024 75.7074773,79.411932 76.0674291,79.0509158 L76.0674291,79.0509158 L77.7258227,77.3925222 C78.1155448,77.0016462 78.1158028,76.368926 77.7263997,75.9777321 L77.7263997,75.9777321 L70.4753316,68.7148256 L77.7647987,61.4253585 C78.155323,61.0348342 78.155323,60.4016692 77.7647987,60.0111449 L77.7647987,60.0111449 L76.0999091,58.3462553 C76.1001004,58.3458726 76.1000047,58.3457769 76.099909,58.3456813 Z M40.8,67 C44.0032515,67 46.6,69.5967485 46.6,72.8 C46.6,76.0032515 44.0032515,78.6 40.8,78.6 C37.5967485,78.6 35,76.0032515 35,72.8 C35,69.5967485 37.5967485,67 40.8,67 Z M23.0454531,15 C24.5144128,15 25.8703756,16.0125 26.3223632,17.475 L26.3223632,17.475 L27.2263384,20.625 L78.7529249,20.625 C80.2218846,20.625 81.3518536,21.975 80.8987361,23.4375 L80.8987361,23.4375 L74.7969035,44.8125 C74.6860501,45.3091463 74.4120712,45.7245885 74.0417796,46.0189947 C71.971672,45.413624 69.7855442,45.09 67.5275,45.09 C64.7266848,45.09 62.0365147,45.587903 59.5411313,46.4995675 L39.3170067,46.5 C37.1700656,46.5 35.4751121,48.6375 36.2660904,50.775 L36.2660904,50.775 L36.2660904,50.8875 C36.6050811,52.2375 37.9610439,53.25 39.4300036,53.25 L39.4300036,53.25 L49.7895067,53.2502748 C48.0723203,55.2397594 46.682163,57.5183882 45.7047626,60.0004333 L34.45814,60 C32.8761834,60 31.6332175,58.9875 31.1812299,57.525 L31.1812299,57.525 L20.5595213,21.75 L17.3956081,21.75 C15.4746608,21.75 13.8927042,20.0625 14.0057011,18.15 C14.118698,16.35 15.8136515,15 17.6216019,15 L17.6216019,15 Z" />
                                      </svg>
                                     </div> `;
  removeCouponDiv.style.display = "flex"; 

  checkoutTotal.textContent = `${(floatTotal - (floatTotal * any_coupon)).toFixed(2)}$`;
  discountDiv.innerHTML = `<p class="cart-p">Coupon Discount </p>
                           <p class="cart-p"> - ${(floatTotal*any_coupon).toFixed(2)}$</p>`;
  discountDiv.style.display = "flex";

  couponInput.value = "";
};

function checkStoredCoupon(floatTotal) {
  const storedCouponFeatures = JSON.parse(localStorage.getItem("couponFeatures-storage")) || {};
  const storedCouponApplied = storedCouponFeatures.couponApplied;
  
  if(!storedCouponApplied  && storedCouponApplied !== undefined) {
    const floatStoredCoupon = parseFloat(storedCouponFeatures.discount);
    displayCouponElements(floatTotal,floatStoredCoupon);
    return false;
  }
  else {
    return true;
  }
};

function removeCoupon(floatTotal) {
  localStorage.removeItem("couponFeatures-storage");
  discountDiv.style.display = "none";
  removeCouponDiv.style.display = "none"; 
  totalBeforeDiscount.style.display = "none";
  checkoutTotal.textContent = `${floatTotal}$`;
};

subtotalCalculations();
updateCart();
getStoredValues();
checkoutTotalCalculations();     
applyCoupun();

//Cart Ends