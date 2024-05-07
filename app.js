//Cart starts

const cartPageProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartProductsContainer = document.getElementById("card-local-storage-container");

function displayCartProducts() {
  if(cartPageProducts.length === 0) {
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
      localStorage.setItem(`quantity-${product.id}` , JSON.stringify(quantity.value));
      updateSubtotals();
  });
  quantity.addEventListener(("click") , () => {    
    localStorage.setItem(`quantity-${product.id}` , JSON.stringify(quantity.value));
    updateSubtotals();
  });
 }); 
}
 
function updateSubtotals() {
  const updateButton = document.querySelector("#cart-update-button");
  cartPageProducts.map((product) => {
    const subtotal = cartProductsContainer.querySelector(`#price-${product.id}`);
    const storedQuantities = JSON.parse(localStorage.getItem(`quantity-${product.id}`)) || [];
    const intQuantities = parseInt(storedQuantities);
    let storedSubtotals;

    updateButton.addEventListener(("click") , () => {
      if(intQuantities > 0) {
        subtotal.textContent = `${(product.price*storedQuantities).toFixed(2)}$`;
        storedSubtotals = subtotal.textContent;
        localStorage.setItem(`subtotal-${product.id}` , JSON.stringify(storedSubtotals));
        window.location.reload();
      }
      else if(intQuantities === 0){
        const deletedProduct = cartPageProducts.findIndex((productToDelete) => productToDelete.id === product.id);
        cartPageProducts.splice(deletedProduct,1);
        localStorage.setItem("cartProducts", JSON.stringify([...cartPageProducts]));
        window.location.reload();
      }
    });
  });
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
   {return 10;}
  else if(totalQuantity <= 5) 
   {return 15;}
  else if(totalQuantity <= 10) 
   {return 20;}
  else {return 30;}
};

function applyCoupun(total) {
  const applyButton = document.querySelector("#cart-coupon-apply-button");
  const couponInput = document.querySelector("#cart-coupon-input");
  let couponDiscount = 1;

  applyButton.addEventListener(("click") , () => {
     const couponText = couponInput.value;
     couponDiscount = checkCoupon(couponText);
     const totalBeforeCoupon = parseFloat(total.textContent);
     total.textContent = `${(totalBeforeCoupon - (totalBeforeCoupon*couponDiscount)).toFixed(2)}$`;
     if(couponDiscount === 0) {
      alert("The coupon is unvalid");
     }
     else { alert("Coupon applied to your total")}
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
     
subtotalCalculations();
getStoredValues();
checkoutTotalCalculations();            
applyCoupun(checkoutTotal);



//Cart Ends