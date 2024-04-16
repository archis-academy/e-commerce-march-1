let products = [];
let explorehtml = "";
let product = [];

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    products.forEach((product) => {
      explorehtml += `
      <div id="${product.id}" class="explore-product">
        <div class="explore-img-box"> 
            <img src="${product.image}" alt="" class="explore-product-img"/>
            <div class="explore-wishlist-and-cart-icon">
                <img onclick="AddWishlist(product[${product.id}])" class="explore-wishlist-icon" src="images/wishlist-icon.svg" alt="">
                <img class=explore-cart-icon" src="images/cart-icon.svg" alt="">
            </div> 
        </div>
            <p class="explore-product-title">${product.title}</p>
            <p class="explore-product-price">${product.price}</p>
            <div class="explore-product-rating">
                <p class="explore-product-rate">${product.rating.rate}</p>
                <p class="explore-product-count">(${product.rating.count})</p>
            </div>
        </div>
    `;

      document.querySelector(".explore-products-box").innerHTML = explorehtml;
    });
  });
