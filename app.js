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
                  <svg width="32" id="${product.id}" class="selling-products-wishlist-svg" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
                </div>  
              </div>
            </div>`
  }).join("");

  const wishlistButtons = sellingProductsContainer.querySelectorAll(".selling-products-wishlist-svg");

  wishlistButtons.forEach(button => {
    let buttonClicked = true;

    button.addEventListener("click", () => {
      if (buttonClicked) {
        button.style.fill = "crimson";
        buttonClicked = false;
      } else {
        button.style.fill = "none";
        buttonClicked = true;
      }
    });
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
    console.log(starRatio);
    return starRatio
};

console.log(ratingMaker(4));
DisplayProducts();

function addToWishlist(productId) {
  console.log(productId);
  console.log(bestSellingProducts);

  wishListProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const addedProduct = bestSellingProducts.find((product) => product.id === productId);

  const checkProduct =  wishListProducts.some((product) => product.id === productId);

  if (!checkProduct) {
    localStorage.setItem(
      "wishlistProducts", JSON.stringify([...wishListProducts, addedProduct])
    );
  } else {
    alert("This product is already in your wishlist");
  }
};

console.log(addToWishlist());

//Best Selling Ends