//Cart starts

const cartPageProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartProductsContainer = document.getElementById("card-local-storage-container");

function displayCartProducts() {
  if(cartPageProducts.length === 0) {
    cartProductsContainer.innerHTML = `<div class="cart-products-features-container" style="padding: 30px">
                                         <div class="cart-empty-text-svg-container">
                                          <p class="cart-empty-text"> You do not have any products in your cart </p>
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
    cartProductsContainer.innerHTML = cartPageProducts.map((product) => {
      return `<div class="cart-products-features-container">  
               <div class="cart-products-image-container">
                <img src="${product.image}" class="cart-products-images"/>
                <p class="cart-products-names"> ${product.title} </p>
               </div>      
               <p class="cart-products-price"> ${product.price}$ </p>
               <input type="number" min="0" value="1" id="product-quantity-${product.id}" class="cart-products-quantity"/> 
               <p id="price-${product.id}"> ${product.price.toFixed(1)}$ </p>
              </div>`
    }).join("");  
  } 
};

displayCartProducts();

function subtotalCalculations() {
  cartPageProducts.map((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    quantity.addEventListener(("keyup") , () => {    
      updateSubtotals(product,parseInt(quantity.value));
   });
   quantity.addEventListener(("click") , () => {    
     updateSubtotals(product,parseInt(quantity.value));
   });
 }); 
};

function updateSubtotals(product,any_quantity) {
  const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`);
  subtotal.textContent = `${(product.price*any_quantity).toFixed(2)}$`;
};

function updateCart() {
  const updateButton = document.querySelector("#cart-update-button");
  cartPageProducts.map((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`);
    let storedSubtotals;
   
    updateButton.addEventListener(("click") , () => {
     if(parseInt(quantity.value) > 1){
      localStorage.setItem(`quantity-${product.id}` , JSON.stringify(quantity.value));
      storedSubtotals = subtotal.textContent;
      localStorage.setItem(`subtotal-${product.id}` , JSON.stringify(storedSubtotals));
     }
     else if(parseInt(quantity.value) === 0){
       const deletedProduct = cartPageProducts.findIndex((productToDelete) => productToDelete.id === product.id);
       cartPageProducts.splice(deletedProduct,1);
       localStorage.setItem("cartProducts", JSON.stringify([...cartPageProducts]));
       localStorage.removeItem(`subtotal-${product.id}`);
       localStorage.removeItem(`quantity-${product.id}`);
     }
     window.location.reload();
   });
 })
};

function getStoredValues() {
  cartPageProducts.map((product) => {
    const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`); 
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const getSubtotal = JSON.parse(localStorage.getItem(`subtotal-${product.id}`));
    const getQuantity = JSON.parse(localStorage.getItem(`quantity-${product.id}`));
    const intSubtotal = parseInt(getSubtotal);
    const intQuantity = parseInt(getQuantity);

    if(intSubtotal > 0 && intSubtotal !== undefined) {
      subtotal.textContent = getSubtotal;
    }
    if(intQuantity > 0 && intQuantity !== undefined) { 
      quantity.value = getQuantity;
    }  
  });
};

const checkoutTotal = document.querySelector("#cart-calculate-total");

function checkoutTotalCalculations() {
  const checkoutSubtotal = document.querySelector("#cart-calculate-subtotal");
  const cardShippingContainer = document.querySelector("#cart-shipping-subtotal");
  const cardShippingValue = calculateShipping();
  cardShippingContainer.textContent = `${cardShippingValue}$`;

  let cardSum = 0;
  cartPageProducts.forEach((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const intQuantity = parseInt(quantity.value);
    cardSum  += (intQuantity * product.price);  
  });

  checkoutSubtotal.textContent = `${cardSum.toFixed(2)}$`;
  checkoutTotal.textContent = `${(cardSum + cardShippingValue).toFixed(2)}$`
};

function calculateShipping() {
  let totalQuantity = 0;
  cartPageProducts.forEach((product) => {
    const quantity = cartProductsContainer.querySelector(`#product-quantity-${product.id}`); 
    const intQuantity = parseInt(quantity.value);
    totalQuantity += (intQuantity);
  });

  if(totalQuantity === 0) 
   {return 0;}
  else if(totalQuantity <= 5) 
   {return 15;}
  else if(totalQuantity <= 10) 
   {return 20;}
  else {return 30;}
};

const discountDiv = document.querySelector("#cart-discount-container");
const removeCouponDiv = document.querySelector("#cart-coupon-remove-container");

function applyCoupun() {
  const floatTotal = parseFloat(checkoutTotal.textContent);
  const applyButton = document.querySelector("#cart-coupon-apply-button");
  const couponInput = document.querySelector("#cart-coupon-input");
  let couponDiscount = 1;
  checkStoredCoupon(checkoutTotal, floatTotal);
 
  applyButton.addEventListener(("click") , () => {
    let couponApplied = checkStoredCoupon(checkoutTotal, floatTotal);
  
    if(couponApplied){
      const couponText = couponInput.value;
      couponDiscount = checkCoupon(couponText);

      if(couponDiscount === 0) {
       alert("The coupon is unvalid");
      }
      else {
         alert("Coupon applied to your total")
         couponApplied = false;
         checkoutTotal.textContent = `${(floatTotal - (floatTotal * couponDiscount)).toFixed(2)}$`;
         discountDiv.innerHTML = `<p>Coupon Discount </p>
                                  <p> - ${(floatTotal*couponDiscount).toFixed(2)}</p>`;
         discountDiv.style.display = "flex";
   
         removeCouponDiv.innerHTML = `<p class="cart-cancel-coupon-p"> Cancel Coupon </p>
                                      <div onclick="removeCoupon(${floatTotal})" class="cart-remove-icon-container"> 
                                       <?xml version="1.0" encoding="utf-8"?>
                                       <svg fill="#000000" width="45px" height="33px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M67.6430764,52.000622 C76.698498,52.000622 84,59.607436 84,68.5654176 C83.9734483,75.2459518 79.9211344,81.2512146 73.736007,83.7759803 C67.5508796,86.3007459 60.4536828,84.8467074 55.7597153,80.0930865 C51.0657477,75.3394657 49.7014467,68.2244736 52.3041153,62.0717215 C54.9067839,55.9189693 60.9627395,51.9428115 67.6430764,52.000622 Z M76.099909,58.3456813 C75.7092262,57.9553155 75.0760612,57.9555726 74.6859827,58.3465424 L74.6859827,58.3465424 L67.3962284,65.6422184 L60.5030161,58.7313311 C60.5027147,58.731029 60.5024131,58.730727 60.5021113,58.7304252 L60.407904,58.6472366 C60.0156127,58.3422117 59.4483817,58.3699412 59.0878977,58.7304252 L59.0878977,58.7304252 L57.4295053,60.3888176 C57.0393345,60.7789884 57.0389296,61.4114552 57.4286005,61.8021252 L57.4286005,61.8021252 L64.3236213,68.7148256 L57.4696899,75.5628687 L57.4696899,75.5628687 L57.3858938,75.6570758 C57.0808706,76.0493653 57.1086217,76.6165748 57.4693861,76.9767783 L57.4693861,76.9767783 L59.1342757,78.6416679 C59.5248,79.0321922 60.157965,79.0321922 60.5484892,78.6416679 L60.5484892,78.6416679 L67.4027244,71.7874328 L74.6537925,79.0503393 C74.6534076,79.0511078 74.6535998,79.0513001 74.6537921,79.0514924 L74.7479991,79.1346807 C75.1402872,79.4397024 75.7074773,79.411932 76.0674291,79.0509158 L76.0674291,79.0509158 L77.7258227,77.3925222 C78.1155448,77.0016462 78.1158028,76.368926 77.7263997,75.9777321 L77.7263997,75.9777321 L70.4753316,68.7148256 L77.7647987,61.4253585 C78.155323,61.0348342 78.155323,60.4016692 77.7647987,60.0111449 L77.7647987,60.0111449 L76.0999091,58.3462553 C76.1001004,58.3458726 76.1000047,58.3457769 76.099909,58.3456813 Z M40.8,67 C44.0032515,67 46.6,69.5967485 46.6,72.8 C46.6,76.0032515 44.0032515,78.6 40.8,78.6 C37.5967485,78.6 35,76.0032515 35,72.8 C35,69.5967485 37.5967485,67 40.8,67 Z M23.0454531,15 C24.5144128,15 25.8703756,16.0125 26.3223632,17.475 L26.3223632,17.475 L27.2263384,20.625 L78.7529249,20.625 C80.2218846,20.625 81.3518536,21.975 80.8987361,23.4375 L80.8987361,23.4375 L74.7969035,44.8125 C74.6860501,45.3091463 74.4120712,45.7245885 74.0417796,46.0189947 C71.971672,45.413624 69.7855442,45.09 67.5275,45.09 C64.7266848,45.09 62.0365147,45.587903 59.5411313,46.4995675 L39.3170067,46.5 C37.1700656,46.5 35.4751121,48.6375 36.2660904,50.775 L36.2660904,50.775 L36.2660904,50.8875 C36.6050811,52.2375 37.9610439,53.25 39.4300036,53.25 L39.4300036,53.25 L49.7895067,53.2502748 C48.0723203,55.2397594 46.682163,57.5183882 45.7047626,60.0004333 L34.45814,60 C32.8761834,60 31.6332175,58.9875 31.1812299,57.525 L31.1812299,57.525 L20.5595213,21.75 L17.3956081,21.75 C15.4746608,21.75 13.8927042,20.0625 14.0057011,18.15 C14.118698,16.35 15.8136515,15 17.6216019,15 L17.6216019,15 Z" />
                                        </svg>
                                      </div> `
         removeCouponDiv.style.display = "flex";       
         localStorage.setItem(("discount"), JSON.stringify(couponDiscount));
   
         localStorage.setItem(("couponApplied"), JSON.stringify(couponApplied));  
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

function checkStoredCoupon(checkOutTotal,floatTotal) {
  const storedCouponApplied = JSON.parse(localStorage.getItem("couponApplied"));
  if(!storedCouponApplied  && storedCouponApplied !== null) {
    const storedCoupon = JSON.parse(localStorage.getItem("discount"));
    const floatStoredCoupon = parseFloat(storedCoupon);
    checkOutTotal.textContent = `${(floatTotal - (floatTotal * floatStoredCoupon)).toFixed(2)}$`;

    discountDiv.innerHTML = `<p>Coupon Discount </p>
                             <p> - ${(floatTotal*floatStoredCoupon).toFixed(2)}</p>`;
    discountDiv.style.display = "flex";

    removeCouponDiv.innerHTML = `<p class="cart-cancel-coupon-p"> Cancel Coupon </p>
                                     <div onclick="removeCoupon(${floatTotal})" class="cart-remove-icon-container"> 
                                      <?xml version="1.0" encoding="utf-8"?>
                                      <svg fill="#000000" width="45px" height="33px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M67.6430764,52.000622 C76.698498,52.000622 84,59.607436 84,68.5654176 C83.9734483,75.2459518 79.9211344,81.2512146 73.736007,83.7759803 C67.5508796,86.3007459 60.4536828,84.8467074 55.7597153,80.0930865 C51.0657477,75.3394657 49.7014467,68.2244736 52.3041153,62.0717215 C54.9067839,55.9189693 60.9627395,51.9428115 67.6430764,52.000622 Z M76.099909,58.3456813 C75.7092262,57.9553155 75.0760612,57.9555726 74.6859827,58.3465424 L74.6859827,58.3465424 L67.3962284,65.6422184 L60.5030161,58.7313311 C60.5027147,58.731029 60.5024131,58.730727 60.5021113,58.7304252 L60.407904,58.6472366 C60.0156127,58.3422117 59.4483817,58.3699412 59.0878977,58.7304252 L59.0878977,58.7304252 L57.4295053,60.3888176 C57.0393345,60.7789884 57.0389296,61.4114552 57.4286005,61.8021252 L57.4286005,61.8021252 L64.3236213,68.7148256 L57.4696899,75.5628687 L57.4696899,75.5628687 L57.3858938,75.6570758 C57.0808706,76.0493653 57.1086217,76.6165748 57.4693861,76.9767783 L57.4693861,76.9767783 L59.1342757,78.6416679 C59.5248,79.0321922 60.157965,79.0321922 60.5484892,78.6416679 L60.5484892,78.6416679 L67.4027244,71.7874328 L74.6537925,79.0503393 C74.6534076,79.0511078 74.6535998,79.0513001 74.6537921,79.0514924 L74.7479991,79.1346807 C75.1402872,79.4397024 75.7074773,79.411932 76.0674291,79.0509158 L76.0674291,79.0509158 L77.7258227,77.3925222 C78.1155448,77.0016462 78.1158028,76.368926 77.7263997,75.9777321 L77.7263997,75.9777321 L70.4753316,68.7148256 L77.7647987,61.4253585 C78.155323,61.0348342 78.155323,60.4016692 77.7647987,60.0111449 L77.7647987,60.0111449 L76.0999091,58.3462553 C76.1001004,58.3458726 76.1000047,58.3457769 76.099909,58.3456813 Z M40.8,67 C44.0032515,67 46.6,69.5967485 46.6,72.8 C46.6,76.0032515 44.0032515,78.6 40.8,78.6 C37.5967485,78.6 35,76.0032515 35,72.8 C35,69.5967485 37.5967485,67 40.8,67 Z M23.0454531,15 C24.5144128,15 25.8703756,16.0125 26.3223632,17.475 L26.3223632,17.475 L27.2263384,20.625 L78.7529249,20.625 C80.2218846,20.625 81.3518536,21.975 80.8987361,23.4375 L80.8987361,23.4375 L74.7969035,44.8125 C74.6860501,45.3091463 74.4120712,45.7245885 74.0417796,46.0189947 C71.971672,45.413624 69.7855442,45.09 67.5275,45.09 C64.7266848,45.09 62.0365147,45.587903 59.5411313,46.4995675 L39.3170067,46.5 C37.1700656,46.5 35.4751121,48.6375 36.2660904,50.775 L36.2660904,50.775 L36.2660904,50.8875 C36.6050811,52.2375 37.9610439,53.25 39.4300036,53.25 L39.4300036,53.25 L49.7895067,53.2502748 C48.0723203,55.2397594 46.682163,57.5183882 45.7047626,60.0004333 L34.45814,60 C32.8761834,60 31.6332175,58.9875 31.1812299,57.525 L31.1812299,57.525 L20.5595213,21.75 L17.3956081,21.75 C15.4746608,21.75 13.8927042,20.0625 14.0057011,18.15 C14.118698,16.35 15.8136515,15 17.6216019,15 L17.6216019,15 Z" />
                                      </svg>
                                     </div> `;
    removeCouponDiv.style.display = "flex"; 
    return false;
  }
  else {
    return true;
  }
};

function removeCoupon(floatTotal) {
  localStorage.removeItem("couponApplied");
  localStorage.removeItem("discount");
  discountDiv.style.display = "none";
  removeCouponDiv.style.display = "none"; 
  checkoutTotal.textContent = `${floatTotal}$`;
};

subtotalCalculations();
updateCart();
getStoredValues();
checkoutTotalCalculations();     
applyCoupun();




//Cart Ends