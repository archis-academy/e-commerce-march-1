//Homepage Today's-Products Start
const countdownElement = document.getElementById("countdown");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function startCountdown() {
  var countDownDate = new Date().getTime() + 4 * 24 * 60 * 60 * 1000;
  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("todays-countdown-days").innerHTML = days + ":";
    document.getElementById("todays-countdown-hours").innerHTML = hours + ":";
    document.getElementById("todays-countdown-minutes").innerHTML =
      minutes + ":";
    document.getElementById("todays-countdown-seconds").innerHTML = seconds;

    if (distance < 0) {
      clearInterval(x);
      startCountdown();
    }
  }, 1000);
}

startCountdown();


//Best Selling Starts
const sellingProductsContainer = document.querySelector(
  "#best-selling-api-products"
);

const todaysProductsContainer = document.querySelector(
  "#todaysProductsContainer"
);

let tempBestSelling = [];
let tempTodays = [];
let tempExploreProducts = [];
let wishListProducts = [];
let cartProducts = [];
let bestSellingProducts = [];
let products = [];
let scrollAmount = 0;
let firstFourProducts = [];
const productBox = document.getElementById("explore-products-box");


async function getApıProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products", {
    mode: "cors",
  });
  const apiProducts = await apiResponse.json();
  return apiProducts;
}


async function displayProducts() {
  const allProducts = await getApıProducts();
  firstFourProducts = allProducts.
  tempTodays = firstFourProducts //temptodays const olarak tekrar tanımlanmamalı, yukarda let olarak zaten tanımlanmış, böyle kalmalı
    .map((product) => {
      return `<div class="todaysProductsContainer" id="todaysProducts">
          <div class="hm-todays-products">
            <div class="hm-todays-products-img">
             <div class="todays-wrapper">
              <img class="todays-products-img" src="${product.image}" />
              <span class="todays-discount-amount">-50%</span>
             </div>
              <div id="todaysButtonContainer_${product.id}" onclick="addToCart(${product.id},firstFourProducts); displayTodaysDeleteCartIcon(${product.id})" class="todays-products-container">
                <button  class="todays-product-cart-add-btn">Add to Cart</button>
              </div>  
              <div class="todays-icons-container">
                <div
                  onclick="addToWishlist(${
                    product.id
                  }, firstFourProducts)"
                  class="todays-wishlist-icon"
                >
                  <svg
                    width="32"
                    id="wishlist_${product.id}"
                    class="products-wishlist-svg"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>   
                <div class="delete-cart-icon" onclick="removeFromCart(${product.id}); displayAddToCartAtTodaysProducts(${product.id})" id="delete-cart-icon_${product.id}">
                 <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>           
              </div>
            </div>       
            <div class="todays-products-features">
              <p class="todays-titles">${product.title}</p>
              <div class="todays-discount">
                <p class="discount-price">
                  ${product.price - (product.price * 50) / 100}$
                </p>
                <s>${product.price}$</s>
              </div>
              <div class="products-rating-box">
                <img src="images/stars.png" class="products-stars-img" />

                <div
                  class="rating-crystal-div"
                  id="transparent-div"
                  style="width:${hideStars(product)}%"
                ></div>
                <p class="todays-rating">(${product.rating.count})</p>
              </div>
            </div>
          </div>
        </div>`;
    }).join("");
    //removeFromCart onclick çağrısı, delete-cart-icon divine eklendi, tıklayınca silme işlemi gerçekleşiyor
  todaysProductsContainer.innerHTML = tempTodays;

  changeCartSvg(todaysProductsContainer);
  changeWishlistSvg(todaysProductsContainer);
 
  for (let i = 5; i < 9; i++) {
    bestSellingProducts[i - 5] = allProducts[i];
  }

  tempBestSelling = bestSellingProducts
    .map((product) => {
      return `<div class="best-selling-api-products">
             <div class="best-selling-product-container">
              <div class="best-selling-img-container">
                <img class="best-selling-products-img" src="${product.image}"/>
                 <div class="best-selling-products-icons-container">
                  <div onclick="addToWishlist(${
                    product.id
                  }, bestSellingProducts)" class="selling-wishlist-icon">                
                   <svg width="32" id="wishlist_${
                     product.id
                   }" class="products-wishlist-svg" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>  
                 </div> 
                 <div  onclick="addToCart(${
                   product.id
                 },bestSellingProducts)"  id="cart_${
                            product.id
                      }"  class="selling-card-icon-container">
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
                   <p class="discount-price">${discount(product).toFixed(
                     2
                   )}$</p> 
                   <s>${product.price}$</s>
                 </div>  
                 <div class="products-rating-container">
                   <img src="images/stars.png" class="products-stars-img"/>
                   <div class="rating-transparent-div" id="transparent-div" style="width:${hideStars(
                     product
                   )}%"></div>   
                   <p class="products-rating">(${
                     product.rating.count
                   })</p>       
                 </div>             
               </div>
              </div> 
            </div>`;
    })
    .join("");
  sellingProductsContainer.innerHTML = tempBestSelling;

  changeCartSvg(sellingProductsContainer);
  changeWishlistSvg(sellingProductsContainer);

  products = allProducts;
  tempExploreProducts = products
    .map((product) => {
      return `
   <div>
    <div id="${product.id}" class="explore-product">
      <div class="explore-img-and-icon-box"> 
          <div class="explore-product-img-box">
              <img class="explore-product-img" src="${product.image}" alt="" />
          </div>
          <div class="explore-wishlist-and-cart-icon">
              <div onclick="addToWishlist(${
                product.id
              } , products)" class="wishlist-icon-box">
                  <svg id="wishlist_${
                    product.id
                  }" class="products-wishlist-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path id="wishlist-stroke-${
                     product.id
                   }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>
              <div  onclick="addToCart(${product.id} , products)"  id="cart_${
        product.id
      }"  class="selling-card-icon-container">
               <svg width="24px" height="24px" class="selling-card-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>        
             </div>   
          </div> 
      </div>
          <p class="explore-product-title">${product.title}</p>
         <div class="explore-products-rating-price-container"> 
          <p class="explore-product-price">$${product.price}</p>
          <div class="products-rating-container explore-products-rating-container">       
            <img src="images/stars.png" class="products-stars-img"/>
            <div class="rating-transparent-div" id="transparent-div" style="width:${hideStars(
              product
            )}%"></div>   
             <p class="explore-product-count">(${product.rating.count})</p>    
          </div>      
         </div>        
     </div>
   </div> `;
    })
    .join("");
  productBox.innerHTML = tempExploreProducts;

  checkStoredCartSvgs();
  checkStoredWishlistSvgs();
  changeCartSvg(productBox);
  changeWishlistSvg(productBox);
}

function discount(any_products) {
  return any_products.price - (any_products.price * 30) / 100;
}

function ratingMaker(any_rate) {
  return Math.ceil((1 - any_rate * (20 / 100)) * 100);
}

function hideStars(product) {
  const starRatio = ratingMaker(product.rating.rate);
  return starRatio;
}

displayProducts();

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

function addToWishlist(productId, products) {
  wishListProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const clickedProduct = products.find((product) => product.id === productId);
  const checkProduct = wishListProducts.some(
    (product) => product.id === productId
  );

  if (!checkProduct) {
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishListProducts, clickedProduct])
    );
  } else {
    removeFromWishlist(productId);
  }
}

function checkStoredWishlistSvgs() {
  const colorizedWishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  colorizedWishlistProducts.map((product) => {
    const checkBestSellingArray = bestSellingProducts.some(
      (arrayProduct) => arrayProduct.id === product.id
    );
    const checkExploreProductsArray = products.some(
      (arrayProduct) => arrayProduct.id === product.id
    );
    const todaysProductsArray = firstFourProducts.some((arrayProduct) => arrayProduct.id === product.id);

    const bestSellingWishlistSvgs = sellingProductsContainer.querySelector(
      `#wishlist_${product.id}`
    );
    const exploreProductsWishlistSvgs = productBox.querySelector(
      `#wishlist_${product.id}`
    );
    const todaysProductsWishlistSvgs = todaysProductsContainer.querySelector(`#wishlist_${product.id}`);

    if (checkBestSellingArray) {
      bestSellingWishlistSvgs.style.fill = "crimson";
    }
    if (checkExploreProductsArray) {
      exploreProductsWishlistSvgs.style.fill = "crimson";
    }
    if (todaysProductsArray) {
      todaysProductsWishlistSvgs.style.fill = "crimson";
    }
  });
}

function changeWishlistSvg(any_Container) {
  const wishlistButtons = any_Container.querySelectorAll(
    ".products-wishlist-svg"
  );
  wishlistButtons.forEach((button) => {
    let buttonClicked = true;

    button.addEventListener("click", () => {
      if (buttonClicked && button.style.fill !== "crimson") {
        button.style.fill = "crimson";
        buttonClicked = false;
      } else {
        button.style.fill = "none";
        buttonClicked = true;
      }
    });
  });
}

function removeFromWishlist(productId) {
  const indexToRemove = wishListProducts.findIndex(
    (product) => product.id === productId
  );

  wishListProducts.splice(indexToRemove, 1);
  localStorage.setItem(
    "wishlistProducts",
    JSON.stringify([...wishListProducts])
  );
}

//diğer kısımları bozmaması için, delete-cart-iconu göstericek kodlar ayrı bir fonksiyona alındı,fonksiyon onclick olarak eklendi
function displayTodaysDeleteCartIcon(productId) {
  const iconContainer = todaysProductsContainer.querySelector(`#delete-cart-icon_${productId}`);
   
  const todaysButton = todaysProductsContainer.querySelector(`#todaysButtonContainer_${productId}`);
  todaysButton.disabled =  true;
  iconContainer.style.display = "block";

  todaysButton.innerHTML = 
  `<p><a href="cart.html"> Go To Cart </a></p>`;
};

function addToCart(productId, products) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  console.log(cartProducts)
  const clickedForCart = products.find((product) => parseInt(product.id) === parseInt(productId));
  const checkCartProduct = cartProducts.some(
    (product) => parseInt(product.id) === parseInt(productId)
  );   

  if (!checkCartProduct) {
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, clickedForCart])
    );
  } else if(products != firstFourProducts){
    removeFromCart(productId);
  }  
};

function checkStoredCartSvgs() {
  const colorizedCartProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];
  colorizedCartProducts.map((product) => {
    const bestSelllingCartDivs = sellingProductsContainer.querySelector(
      `#cart_${product.id}`
    );
    const exploreProductsCartsDivs = productBox.querySelector(
      `#cart_${product.id}`
    );

    const checkBestSellingArray = bestSellingProducts.some(
      (arrayProduct) => arrayProduct.id === product.id
    );
    const checkExploreProductsArray = products.some(
      (arrayProduct) => arrayProduct.id === product.id
    );

    if (checkBestSellingArray) {
      bestSelllingCartDivs.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`;
    }
    if (checkExploreProductsArray) {
      exploreProductsCartsDivs.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`;
    }
  });
}

function changeCartSvg(any_Container) {
  const cartContainer = any_Container.querySelectorAll(
    ".selling-card-icon-container"
  );

  cartContainer.forEach((container) => {
    let buttonClicked = true;

    container.addEventListener("click", () => {
      if (
        buttonClicked &&
        container.innerHTML !==
          `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`
      ) {
        container.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`;
        buttonClicked = false;
      } else {
        container.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                   <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                   <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                   <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`;
        buttonClicked = true;
      }
    });
  });
}

//carttan çıkarınca tekrar todays kısmını eski haline getireccek kodlar fonksiyon olarak eklendi, onclick ile çalışıyor
function displayAddToCartAtTodaysProducts(productId) {
  const todaysButton = todaysProductsContainer.querySelector(`#todaysButtonContainer_${productId}`);
  const iconContainer = todaysProductsContainer.querySelector(`#delete-cart-icon_${productId}`)
  iconContainer.style.display = "none";
  
  todaysButton.innerHTML = `<button  class="todays-product-cart-add-btn">Add to Cart</button>`;
  todaysButton.disabled = false;
}

function removeFromCart(productId) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  
  //cart products tekrar localStoragedan çekilerek, tek basımda 2 kere silme hatası düzeltildi


  const checkCartIndex = cartProducts.findIndex(
    (product) => parseInt(product.id) === parseInt(productId)
  );

  cartProducts.splice(checkCartIndex, 1);
  console.log(cartProducts)
  localStorage.setItem("cartProducts", JSON.stringify([...cartProducts]));
}

//Best Selling and Explore Products Ends

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

  const timeArray = [days, hours, minutes, seconds];
  const stringTime = ["days", "hours", "minutes", "seconds"];

  for (let i = 0; i < timeArray.length; i++) {
    timeBoxes[i].innerHTML = `<p> ${formatTime(timeArray[i])} </p>
                               <p> ${stringTime[i]} </p>`;
  }

  if (distance < 0) {
    clearInterval(countdown);
  }
}, 1000);

buyNowButton.addEventListener("click", () => {
  console.log(`"${randomProduct.name}" added to cart`);
});
