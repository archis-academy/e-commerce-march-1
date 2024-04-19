//Best Selling Starts
const sellingProductsContainer = document.querySelector("#best-selling-api-products");

let bestSellingProducts = [];

function DisplayProducts(any_Products) {
  sellingProductsContainer.innerHTML = any_Products.map((product) => {
    return `<div class="best-selling-api-products">
              <div class="best-selling-img-container">
               <img class="best-selling-products-img" src="${product.image}"/>
                <div class="best-selling-products-icons-container">
                 <div class="selling-wishlist-icon">             
                  <button id="selling-products-wishlist-button" class="selling-products-button"><img id="selling-wishlist-icon-img" class="best-selling-products-icons" src="images/wishlist-icon.svg"/></button>
                 </div>
                 <div class="best-selling-eye-icon">
                  <button id="selling-products-eye-button" class="selling-products-button"><img class="best-selling-products-icons" src="images/icon-eye.svg"/></button>
                 </div> 
                </div>  
              </div>
              <div class="best-selling-products-features">
                <p>${product.title}</p>
                <div class="best-selling-discount">
                  <p class="discount-price">${discount(product).toFixed(2)}</p> 
                  <s>${product.price}</s>
                </div>  
                <p> Rating : ${product.rating.rate}</p>
              </div>
            </div>`
  }).join("");

   wishlistButtons = sellingProductsContainer.querySelectorAll("#selling-products-wishlist-button");

   wishlistButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.style.background = "#DB4444";
    });
  });
};

async function GetProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products?limit=4");
  const apiProducts =  await apiResponse.json();
  bestSellingProducts = apiProducts;
  DisplayProducts(apiProducts);
};

function discount(any_products) {
    return any_products.price - (any_products.price*30/100);  
};

GetProducts();





//Best Selling Ends