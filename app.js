//Best Selling Starts
const sellingProductsContainer = document.querySelector("#best-selling-api-products");

let wishListProducts = [];
let cartProducts = [];
let bestSellingProducts;

async function DisplayBestSellingProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products?limit=4");
  const apiProducts = await apiResponse.json();
  bestSellingProducts = [];

  sellingProductsContainer.innerHTML = bestSellingProducts.map((product) => {
    return `<div class="best-selling-api-products">
             <div class="best-selling-product-container">
              <div class="best-selling-img-container">
                <img class="best-selling-products-img" src="${product.image}"/>
                 <div class="best-selling-products-icons-container">
                  <div onclick="addToWishlist(${product.id})"  class="selling-wishlist-icon">                
                   <svg width="32" id="wishlist_${product.id}" class="selling-products-wishlist-svg" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>  
                 </div> 
                 <div  onclick="addToCart(${product.id})"  id="cart_${product.id}"  class="selling-card-icon-container">
                    <svg width="24px" height="24px" class="selling-card-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>        
                  </div>   
                </div>  
              </div>
               <div class="best-selling-products-features">
                 <p class="best-selling-titles">${product.title}</p>
                 <div class="best-selling-discount">
                   <p class="discount-price">${discount(product).toFixed(2)}$</p> 
                   <s>${product.price}$</s>
                 </div>  
                 <div class="bestselling-rating-container">
                   <img src="images/stars.png" class="bestselling-stars-img"/>
                   <div class="bestselling-transparent-div" id="transparent-div" style="width:${hideStars(product)}%"></div>   
                   <p class="best-selling-rating">(${product.rating.count})</p>       
                 </div>             
               </div>
              </div> 
            </div>`
  }).join("");

  const colorizedWishlistProducts =  JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  colorizedWishlistProducts.map((product) => {
    const wishlistSvgs = sellingProductsContainer.querySelector(`#wishlist_${product.id}`);
    wishlistSvgs.style.fill = "crimson";
  });

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

 const colorizedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
 colorizedCartProducts.map((product) => {
   const cartDivs = sellingProductsContainer.querySelector(`#cart_${product.id}`);
   const checkArray = bestSellingProducts.some((arrayProduct) => arrayProduct.id === product.id); 
   
   if(checkArray){
    cartDivs.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`
   }
  });
  

  const cartContainer = sellingProductsContainer.querySelectorAll(".selling-card-icon-container");

  cartContainer.forEach((container) => {
    let buttonClicked = true;

    container.addEventListener(("click") , () => {
      if(buttonClicked && container.innerHTML !== `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`) {
        container.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`
        buttonClicked = false;
      }
      else {   
        container.innerHTML =  `<svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                               </svg>`
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
    return starRatio
};

DisplayBestSellingProducts();

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

function addToCart(productId) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const clickedForCart = bestSellingProducts.find((product) => product.id === productId);
  const checkCartProduct = cartProducts.some((product) => product.id === productId);

  if(!checkCartProduct) {
    localStorage.setItem(
      "cartProducts" , JSON.stringify([...cartProducts,clickedForCart])
    );
  }
  else {
    removeFromCart(productId);
  }
};

function removeFromCart(productId) {
   const checkCartIndex = cartProducts.findIndex((product) => product.id === productId);
   
   cartProducts.splice(checkCartIndex,1);
   localStorage.setItem(
     "cartProducts", JSON.stringify([...cartProducts])
   );
};

//Best Selling Ends

function changeColor(browse) {
  let hompageBrowseBox = browse;
  let hompageBrowseBoxActive = document.querySelector(".browse.active");

  if (hompageBrowseBoxActive && hompageBrowseBoxActive !== hompageBrowseBox) {
    hompageBrowseBoxActive.classList.remove("active");
    hompageBrowseBoxActive.style.backgroundColor = "#FFFFFF";
    hompageBrowseBoxActive.style.color = "#000000";
  }

  if (!hompageBrowseBox.classList.contains("active")) {
    hompageBrowseBox.classList.add("active");
    hompageBrowseBox.style.backgroundColor = "#db4444";
    hompageBrowseBox.style.color = "#FFFFFF";
  } else {
    hompageBrowseBox.classList.remove("active");
    hompageBrowseBox.style.backgroundColor = "#FFFFFF";
    hompageBrowseBox.style.color = "#000000";
  }
}

const productsTest = [
  { name: "Product 1", price: 29.99 },
  { name: "Product 2", price: 39.99 },
  { name: "Product 3", price: 49.99 },
];

function selectRandomProduct() {
  const randomIndex = Math.floor(Math.random() * productsTest.length);
  return productsTest[randomIndex];
}

const randomProduct = selectRandomProduct();

const smallTitle = document.querySelector(".hompage-featured-small-title");
const bigTitle = document.querySelector(".hompage-featured-big-title");
const timeBoxes = document.querySelectorAll(".hompage-time-box1");
const buyNowButton = document.querySelector(".hompage-featured-button");

smallTitle.textContent = `Featured Product`;
bigTitle.innerHTML = `Enhance Your <br/>${randomProduct.name} Experience`;

const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  timeBoxes[0].textContent = formatTime(days);
  timeBoxes[1].textContent = formatTime(hours);
  timeBoxes[2].textContent = formatTime(minutes);
  timeBoxes[3].textContent = formatTime(seconds);

  if (distance < 0) {
    clearInterval(countdown);
  }
}, 1000);

buyNowButton.addEventListener("click", () => {
  console.log(`"${randomProduct.name}" added to cart`);
});

//Homepage-Explore-Products-START

let products = [];
let product = [];
let scrollAmount = 0;
let wishlistProducts = [];

async function GetProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
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
                <div onclick="AddToWishlist(${product.id})" class="wishlist-icon-box">
                    <svg id="wishlist-icon-${product.id}" class="explore-wishlist-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="wishlist-stroke-${product.id}" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div onclick="AddToCart(${product.id})" id="explore-cart-icon-box-${product.id}" class="explore-cart-icon-box">
                    <svg id="cart-icon-${product.id}" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <svg id="check-icon-${product.id}" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div> 
        </div>
            <p class="explore-product-title">${product.title}</p>
            <div class="explore-price-and-rating-box">
                <p class="explore-product-price">$${product.price}</p>
                <div class="star-container">
                </div>
                <p class="explore-product-count">(${product.rating.count})</p>
            </div>
        </div>
    `;

    const productBox = document.getElementById("explore-products-box");
    productBox.appendChild(exploreHtml);

    const rating = product.rating.rate;
    const starContainer = exploreHtml.querySelector(".star-container");
    const filledStarCount = Math.round(rating);
    const emptyStarCount = 5 - filledStarCount;

    for (let i = 0; i < filledStarCount; i++) {
      const starSVG = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"> 
       <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" fill="#FFAD33"/> 
       </svg>`;
      starContainer.innerHTML += starSVG;
    }

    for (let i = 0; i < emptyStarCount; i++) {
      const starSVG = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"> 
       <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" fill="gray"/> 
       </svg>`;
      starContainer.innerHTML += starSVG;
    }

    const storedWishlistProducts =
      JSON.parse(localStorage.getItem("wishlistProducts")) || [];

    products.forEach((product) => {
      const isFavorite = storedWishlistProducts.some(
        (wishlistProduct) => wishlistProduct.id === product.id
      );

      if (isFavorite) {
        const WishlistIcon = document.getElementById(
          `wishlist-icon-${product.id}`
        );
        if (WishlistIcon) {
          WishlistIcon.setAttribute("fill", "#db4444");
        }
        const WishlistIconStroke = document.getElementById(
          `wishlist-stroke-${product.id}`
        );
        if (WishlistIconStroke) {
          WishlistIconStroke.setAttribute("stroke", "#db4444");
        }
      }
    });

    const storedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];

    products.forEach((product) => {
      const isFavorite = storedCartProducts.some(
        (cartProduct) => cartProduct.id === product.id
      );

      if (isFavorite) {
        cartIcon = document.getElementById(`cart-icon-${product.id}`);
        if (cartIcon) {
          cartIcon.style.display = "none";
        }
      } else {
        checkIcon = document.getElementById(`check-icon-${product.id}`);
        if (checkIcon) {
          checkIcon.style.display = "none";
        }
      }
    });
  });
}
GetProducts();

function AddToWishlist(productId) {
  wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const newWishlistProduct = products.find(
    (product) => product.id === productId
  );
  const isMatch = wishlistProducts.find(
    (product) => product.id === newWishlistProduct.id
  );
  if (!isMatch) {
    const productAdd = [...wishlistProducts, newWishlistProduct];
    localStorage.setItem("wishlistProducts", JSON.stringify(productAdd));
    wishlistProducts = productAdd;
    const WishlistIcon = document.getElementById(`wishlist-icon-${productId}`);
    WishlistIcon.setAttribute("fill", "#db4444");
    const WishlistIconStroke = document.getElementById(
      `wishlist-stroke-${productId}`
    );
    WishlistIconStroke.setAttribute("stroke", "#db4444");
  } else {
    DeleteFromWishlist(productId);
  }
}

function DeleteFromWishlist(productId) {
  const newWishlistProducts = wishlistProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("wishlistProducts", JSON.stringify(newWishlistProducts));
  wishlistProducts = newWishlistProducts;
  const WishlistIcon = document.getElementById(`wishlist-icon-${productId}`);
  WishlistIcon.setAttribute("fill", "none");
  const WishlistIconStroke = document.getElementById(
    `wishlist-stroke-${productId}`
  );
  WishlistIconStroke.setAttribute("stroke", "black");
}

function AddToCart(productId) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const newCartProduct = products.find((product) => product.id === productId);
  const isMatch = cartProducts.find(
    (product) => product.id === newCartProduct.id
  );
  if (!isMatch) {
    const productAdd = [...cartProducts, newCartProduct];
    localStorage.setItem("cartProducts", JSON.stringify(productAdd));
    cartProducts = productAdd;
    cartIcon = document.getElementById(`cart-icon-${productId}`);
    cartIcon.style.display = "none";
    checkIcon = document.getElementById(`check-icon-${productId}`);
    checkIcon.style.display = "";
  } else {
    DeleteFromCart(productId);
  }
}

function DeleteFromCart(productId) {
  const newCartProducts = cartProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
  cartProducts = newCartProducts;
  checkIcon = document.getElementById(`check-icon-${productId}`);
  checkIcon.style.display = "none";
  cartIcon = document.getElementById(`cart-icon-${productId}`);
  cartIcon.style.display = "";
}

const productlist = document.querySelector(".explore-products-box");
const rightArrow = document.querySelector(".explore-right-arrow");

rightArrow.addEventListener("click", () => {
  if (scrollAmount < productlist.scrollWidth - productlist.clientWidth) {
    scrollAmount += 340;
    productlist.style.transform = `translateX(0px)`;
    productlist.style.transform = `translateX(${-scrollAmount}px)`;
  }
});

const leftArrow = document.querySelector(".explore-left-arrow");
leftArrow.addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= 340;
    productlist.style.transform = `translateX(0px)`;
    productlist.style.transform = `translateX(${-scrollAmount}px)`;
  }
});

const viewLessBtn = document.querySelector("#explore-view-less-btn");
viewLessBtn.style.display = "none";

function ViewAllProducts() {
  const productsBox = document.querySelector(".explore-products-box");
  productsBox.style.display = "flex";
  productsBox.style.flexWrap = "wrap";
  const viewAllBtn = document.querySelector("#explore-view-all-btn");
  viewAllBtn.style.display = "none";
  const viewLessBtn = document.querySelector("#explore-view-less-btn");
  viewLessBtn.removeAttribute("style", "display: none");
  leftArrow.setAttribute("style", "display: none");
  rightArrow.setAttribute("style", "display: none");
}

function ViewLessProduct() {
  document
    .querySelector(".explore-products-box")
    .setAttribute("style", "display: grid;");
  const viewLessBtn = document.querySelector("#explore-view-less-btn");
  viewLessBtn.style.display = "none";
  const viewAllBtn = document.querySelector("#explore-view-all-btn");
  viewAllBtn.removeAttribute("style", "display: none");
  leftArrow.removeAttribute("style", "display: none");
  rightArrow.removeAttribute("style", "display: none");
}

//Homepage-Explore-Products-END

