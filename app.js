//Best Selling Starts
const sellingProductsContainer = document.querySelector("#best-selling-api-products");

let wishListProducts = [];
let bestSellingProducts;

async function DisplayProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products?limit=4");
  const apiProducts = await apiResponse.json();
  bestSellingProducts = apiProducts;

  sellingProductsContainer.innerHTML = bestSellingProducts.map((product) => {
    return `<div class="best-selling-api-products">
              <div class="best-selling-img-container">
               <img class="best-selling-products-img" src="${product.image}"/>
                <div class="best-selling-products-icons-container">
                 <div onclick="addToWishlist(${product.id})"  class="selling-wishlist-icon">                
                  <svg width="32" id="wishlist_${product.id}" class="selling-products-wishlist-svg" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>  
                </div> 
                 <div class="selling-card-icon-container">
                   <svg width="32" height="32"  class="selling-card-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                  </div>
                </div>  
              </div>
              <div class="best-selling-products-features">
                <p>${product.title}</p>
                <div class="best-selling-discount">
                  <p class="discount-price">${discount(product).toFixed(2)}</p> 
                  <s>${product.price}</s>
                </div>  
                <div class="bestselling-rating-container">
                  <img src="images/stars.png" class="bestselling-stars-img"/>
                  <div class="bestselling-transparent-div" id="transparent-div" style="width:${hideStars(product)}%"></div>   
                  <p class="best-selling-rating">${product.rating.rate}</p>       
                </div>             
              </div>
            </div>`
  }).join("");

  const wishlistButtons = sellingProductsContainer.querySelectorAll(".selling-products-wishlist-svg");
  wishlistButtons.forEach((button) => {
    let buttonClicked = true;

    button.addEventListener(("click"), () => {
      if(buttonClicked  && button.style.fill !== "crimson") {
        button.style.fill = "crimson";
        buttonClicked = false;
      }
      else {
         button.style.fill = "none";
         buttonClicked = true;
      }
    });
 });   

  const colorizedProducts =  JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  colorizedProducts.map((product) => {
    const redHearts = sellingProductsContainer.querySelector(`#wishlist_${product.id}`);
    console.log(redHearts);
    redHearts.style.fill = "crimson";
   });
};

function discount(any_products) {
  return any_products.price - (any_products.price * 30 / 100);
};

function ratingMaker(any_rate) {
   return  Math.ceil(((1 - (any_rate*(20/100)))*100.));
};

function hideStars(product) {
    const starRatio = ratingMaker(product.rating.rate);
    return starRatio
};

DisplayProducts();

function addToWishlist(productId) {
  wishListProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const clickedProduct = bestSellingProducts.find((product) => product.id === productId);
  const checkProduct =  wishListProducts.some((product) => product.id === productId);
  
  if (!checkProduct) {
    localStorage.setItem(
      "wishlistProducts", JSON.stringify([...wishListProducts, clickedProduct])
    );
  } else {
      removeFromWishlist(productId);
  };
};

function removeFromWishlist(productId) {
   const indexToRemove = wishListProducts.findIndex((product) => product.id === productId)
   
   wishListProducts.splice(indexToRemove,1);

   localStorage.setItem (
    "wishlistProducts" , JSON.stringify([...wishListProducts])
   );
};

//Best Selling Ends

//Wishlist starts
