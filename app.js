let products = [];
// let exploreHtml = "";
let product = [];
let scrollAmount = 0;
let wishlistProducts = [];

function GetProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      products.map((product) => {
        const exploreHtml = document.createElement("div");
        exploreHtml.innerHTML = `
      <div id="${product.id}" class="explore-product">
        <div class="explore-img-and-icon-box"> 
            <div class="explore-product-img-box">
                <img class="explore-product-img" src="${product.image}" alt="" />
            </div>
            <div class="explore-wishlist-and-cart-icon">
                <div class="wishlist-icon-box">
                  
                    <svg id="${product.id}" class="explore-wishlist-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
                <div class="explore-cart-icon-box">
                    <img class=explore-cart-icon" src="images/cart-icon.svg" alt="">
                </div>
            </div> 
        </div>
            <p class="explore-product-title">${product.title}</p>
            <div class="explore-price-and-rating-box">
                <p class="explore-product-price">$${product.price}</p>
                <div>
                    <svg class="star-svg" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" fill="#FFAD33"/> 
                    </svg>
                </div>
                <p class="explore-product-rate">${product.rating.rate}</p>
                <p class="explore-product-count">(${product.rating.count})</p>
            </div>
        </div>
    `;

        const wishlistProduct = exploreHtml.querySelector(".wishlist-icon-box");
        const WishlistIcon = wishlistProduct.querySelector("svg");
        const WishlistIconStroke = wishlistProduct.querySelector("path");
        let wishlistIconColor = WishlistIcon.getAttribute("fill");

        function AddLocalStorage() {
          wishlistProduct.addEventListener("click", () => {
            localStorage.setItem("wishlist-products", JSON.stringify(product));
            WishlistIcon.setAttribute("fill", "#db4444");
            WishlistIconStroke.setAttribute("stroke", "#db4444");
            wishlistIconColor = "#db4444";
            RemoveLocalStorage();
          });
        }

        function RemoveLocalStorage() {
          wishlistProduct.addEventListener("click", () => {
            localStorage.removeItem(
              "wishlist-products",
              JSON.stringify(product)
            );
            WishlistIcon.setAttribute("fill", "none");
            WishlistIconStroke.setAttribute("stroke", "black");
            AddLocalStorage();
          });
        }

        if (wishlistIconColor == "none") {
          AddLocalStorage();
        }
        if (wishlistIconColor == "#db4444") {
          RemoveLocalStorage();
        }
        const productBox = document.getElementById("explore-products-box");
        productBox.appendChild(exploreHtml);
      });
    });
}
GetProducts();

const productlist = document.querySelector(".explore-products-box");
const right_Arrow = document.querySelector(".explore-right-arrow");

right_Arrow.addEventListener("click", () => {
  if (scrollAmount < productlist.scrollWidth - productlist.clientWidth) {
    scrollAmount += 400;
    productlist.style.transform = `translateX(0px)`;
    productlist.style.transform = `translateX(${-scrollAmount}px)`;
  }
});

const left_Arrow = document.querySelector(".explore-left-arrow");
left_Arrow.addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= 400;
    productlist.style.transform = `translateX(0px)`;
    productlist.style.transform = `translateX(${-scrollAmount}px)`;
  }
});

function ViewAllProducts() {
  document
    .querySelector(".explore-products-box")
    .setAttribute("style", "display: flex; flex-wrap: wrap; ");
}
