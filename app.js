//Header Starts
let firstAdvertise;
let existingInterval;
let intervalTime = 6000;
let manCategory = {
  category: "men's clothing",
  products : []
};
let womanCategory = {
  category: "womens's clothing",
  products : []
};
let jeweleryCategory = {
  category: "jewelery",
  products : []
};
let electronicsCategory = {
  category: "electronics",
  products : []
};
let homeLifestyleCategory = {
  category: "",
  products : []
};
let medicineCategory = {
  category: "",
  products : []
};
let sportsCategory = {
  category: "",
  products : []
};
let toysCategory = {
  category: "",
  products : []
};
let petCategory = {
  category: "",
  products : []
};
let healthCategory = {
  category: "",
  products : []
};
let allCategories = [womanCategory,manCategory,electronicsCategory,jeweleryCategory,medicineCategory,sportsCategory,toysCategory,petCategory,healthCategory];



function checkAdvertiseImages() {
  const advertiseContainer = document.querySelector("#slides-imgs-container");
  let windowWidth = window.innerWidth;

  if (parseInt(windowWidth) > 549) {
    advertiseContainer.innerHTML = 
  ` <div class="header-advertise-img-container header-first-advertise" id="header-first-advertise">
     <img class="header-advertise-img" src="images/advertise1.png" alt="">
   </div>
   <div class="header-advertise-img-container">
     <img class="header-advertise-img" src="images/advertise2.png" alt="">
   </div>
   <div class="header-advertise-img-container">
      <img class="header-advertise-img" src="images/advertise3.png" alt="">
   </div>
   <div class="header-advertise-img-container">
      <img class="header-advertise-img" src="images/advertise4.png" alt="">
   </div>
   <div class="header-advertise-img-container">
      <img class="header-advertise-img" src="images/advertise5.png" alt="">
    </div>`
  } else {
    advertiseContainer.innerHTML = 
    ` <div class="header-advertise-img-container header-first-advertise" id="header-first-advertise">
       <img class="header-advertise-img" src="images/responsiveAdvertise1.png" alt="">
     </div>
     <div class="header-advertise-img-container">
       <img class="header-advertise-img" src="images/responsiveAdvertise2.png" alt="">
     </div>
     <div class="header-advertise-img-container">
        <img class="header-advertise-img" src="images/responsiveAdvertise3.png" alt="">
     </div>
     <div class="header-advertise-img-container">
        <img class="header-advertise-img" src="images/responsiveAdvertise4.png" alt="">
     </div>
     <div class="header-advertise-img-container">
        <img class="header-advertise-img" src="images/responsiveAdvertise5.png" alt="">
      </div>`
  }
  

  firstAdvertise =  advertiseContainer.querySelector("#header-first-advertise");
}

checkAdvertiseImages();
window.addEventListener(("resize") , () => {
  checkAdvertiseImages();
})

function setTimeToSlides(advertiseCounter,transparentCounter,clickRadios,time) {
  if (existingInterval) {
    clearInterval(existingInterval);
  }

  existingInterval = setInterval(() => {
   if (advertiseCounter === 6) {
     let lastRadioCounter = (advertiseCounter - 1 );
     advertiseCounter = 1;
     firstAdvertise.style.marginLeft = "0";
     const lastRadio = document.querySelector(`.click-radio${(lastRadioCounter)}`);
     lastRadio.style.backgroundColor = "transparent";
     transparentCounter = 1;
   }

   const showRadio = document.querySelector(`.click-radio${advertiseCounter}`);
   clickRadios.forEach(radio => radio.style.backgroundColor = 'transparent');
   let windowWidth = window.innerWidth;
   if (parseInt(windowWidth) > 549) {
    showRadio.style.backgroundColor = "#DB4444";
   } else {
    showRadio.style.backgroundColor = "black";
   }
 
  
   if (advertiseCounter > 1) {
     const currentMarginLeft = parseFloat(firstAdvertise.style.marginLeft) || 0;
     firstAdvertise.style.marginLeft = `${currentMarginLeft - 20}%`;
     const transparentRadio = document.querySelector(`.click-radio${transparentCounter}`)
     transparentRadio.style.backgroundColor = "transparent";
     transparentCounter++;
   }
   advertiseCounter++;
  
   setTimeToSlides(advertiseCounter,transparentCounter,clickRadios,intervalTime);
 }, time);
};

let advertiseCounter = 1;
let transparentCounter = 1;
let clickedIntervalTime = 10000;
const showRadio = document.querySelector(`.click-radio${advertiseCounter}`);
const hiddenRadios = document.querySelectorAll(".advertise-radio");
const clickRadios = document.querySelectorAll(`.click-radio`);
showRadio.style.backgroundColor = "#DB4444";
setTimeToSlides(advertiseCounter,transparentCounter,clickRadios,intervalTime);

function setClickToSlides() {
   clickRadios.forEach((radio) => {
     radio.addEventListener(("click") , () => {
        firstAdvertise.style.marginLeft = `${(parseInt(radio.id) - 1) * -20}%`;
        clickRadios.forEach(radio => radio.style.backgroundColor = 'transparent');
        radio.style.backgroundColor = "#DB4444";
      
        let tempRadioId = parseInt(radio.id);
        let radioId;
        let tempTransparentCounter = parseInt(radio.id);
        let transparentCounter;
           
        if (tempTransparentCounter === 1) {
          transparentCounter = 1;
        }
        else {
          transparentCounter = (tempTransparentCounter - 1);
        }

        if (tempRadioId === 1) {
          radioId = 1;
        } else {
          radioId = (tempRadioId + 1)
        }
        if (radio.id != 1) {
          setTimeToSlides( radioId ,transparentCounter,clickRadios,clickedIntervalTime);
        }
        else{
          setTimeToSlides(radioId ,transparentCounter,clickRadios,intervalTime);
        }
     });
   });
};

setClickToSlides();

function displayCategoryProducts() {
  let i = 1;
  allCategories.map((category) => {
    const categoryDivs = document.querySelectorAll(`#category-products-container${i}`);
    if (category.products.length !== 0) {
      category.products.map((product) => {
        categoryDivs.forEach((div) => {
          div.innerHTML +=
         `<div class="category-dropdown">
           <div class="category-products-features-container">
              <img src="${product.image}" class="category-products-img"/>
              <p class="category-titles"> ${product.title}</p>
            </div>  
         </div>`
        })
      })
    }
    else {
      categoryDivs.forEach((div) => {
        div.innerHTML = 
        `<p class="empty-category-p header-poppins-p"> We do not have any products <br> in this category yet <br> But don't worry! <br> They are coming soon </p>`;
        div.style.height = "auto";
        div.style.right = "-200px"
      }) 
    }
    i++;
  });
};

function determineProductCategories(allProducts) {
  let m = 0;
  let j = 0;
  let w = 0;
  let e = 0;
  allProducts.map((product) => {
    switch (product.category) {
      case "men's clothing":
        manCategory.products[m] = product;
        m++;
        break;
      case "jewelery":
        jeweleryCategory.products[j] = product;
        j++;
        break;
      case "women's clothing":
        womanCategory.products[w] = product;
        w++;
        break;
      case "electronics":
        electronicsCategory.products[e] = product;
        e++;
        break;
    };
  });
};

let filteredProducts = [];
const searchDropdown = document.querySelector("#search-dropdown"); 
let searchApiProducts = searchDropdown.querySelector(".search-api-products");

function displaySearchedProducts(allProducts) {
  const searchBar = document.querySelector(".header-search");
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
   filteredProducts = [];
   filteredProducts = allProducts.filter((anyProduct) => anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
   displayFilteredProducts(filteredProducts,searchApiProducts);
   applyPopularSearch(allProducts)
  });
};

function displayFilteredProducts(products,searchApiProducts) {
  console.log("jkkjha")
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
     filteredProducts = [];
     searchDropdown.innerHTML = 
     `   <div class="popular-searches-title-container" id="search-products">
             <p id="search-products" class="popular-searches-title">Popular Searches</p>
             <?xml version="1.0" id="search-products" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
             <svg width="25px" height="25px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"><radialGradient id="IconifyId17ecdb2904d178eab8626" cx="68.884" cy="124.296" r="70.587" gradientTransform="matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)" gradientUnits="userSpaceOnUse"><stop offset=".314" stop-color="#ff9800"></stop><stop offset=".662" stop-color="#ff6d00"></stop><stop offset=".972" stop-color="#f44336"></stop></radialGradient><path d="M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5z" fill="url(#IconifyId17ecdb2904d178eab8626)"></path><radialGradient id="IconifyId17ecdb2904d178eab8627" cx="64.921" cy="54.062" r="73.86" gradientTransform="matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)" gradientUnits="userSpaceOnUse"><stop offset=".214" stop-color="#fff176"></stop><stop offset=".328" stop-color="#fff27d"></stop><stop offset=".487" stop-color="#fff48f"></stop><stop offset=".672" stop-color="#fff7ad"></stop><stop offset=".793" stop-color="#fff9c4"></stop><stop offset=".822" stop-color="#fff8bd" stop-opacity=".804"></stop><stop offset=".863" stop-color="#fff6ab" stop-opacity=".529"></stop><stop offset=".91" stop-color="#fff38d" stop-opacity=".209"></stop><stop offset=".941" stop-color="#fff176" stop-opacity="0"></stop></radialGradient><path d="M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88z" fill="url(#IconifyId17ecdb2904d178eab8627)"></path></svg>
        </div> 
         <div id="search-products" class="popular-searches-container">     
          <p class="header-poppins-p popular-searches-p" id="search-products">Jacket</p>
          <p class="header-poppins-p popular-searches-p" id="search-products">Cotton</p>
          <p class="header-poppins-p popular-searches-p" id="search-products">SSD</p>
          <p class="header-poppins-p popular-searches-p" id="search-products">Monitor</p>
          <p class="header-poppins-p popular-searches-p" id="search-products">Gold</p>
          <p class="header-poppins-p popular-searches-p" id="search-products">Coat</p>
         </div>
         <div class="search-api-products"></div>`;
     filteredProducts = allProducts.filter((anyProduct) =>  anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
     searchApiProducts = searchDropdown.querySelector(".search-api-products"); 
     console.log(filteredProducts)
     displayFilteredProducts(filteredProducts,searchApiProducts);
     applyPopularSearch(allProducts);
    });
   }); 
};

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

function sidebarActivities() {
  const sidebarOpener = document.querySelector("#sidebar-opener");
  const sidebarCloser = document.querySelector("#sidebar-closer");
  const sidebar = document.querySelector("#header-sidebar");
  const blurer = document.querySelector(".header-blurer");

  sidebarOpener.addEventListener(("click") , () => {
    sidebar.classList.add("open-sidebar");
    blurer.classList.add("sidebar-header");
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });
  
  sidebarCloser.addEventListener(("click") , () => {
     sidebar.classList.remove("open-sidebar");
     blurer.classList.remove("sidebar-header");
     document.documentElement.style.overflow = 'auto';
     document.body.style.overflow = 'auto';
  });

}

sidebarActivities();
function getWishlistCartLength() {
  const wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishlistLength = wishlist.length;
  console.log(wishlistLength);

  const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartLength = cart.length;


  const wishlistNumberDiv = document.querySelectorAll("#wishlist-length");
  const cartNumberDiv = document.querySelectorAll("#cart-length");
  wishlistNumberDiv.forEach((div) => {
    div.innerHTML = `<p class=""> ${wishlistLength} </p>`
  });
  cartNumberDiv.forEach((div) => {
    div.innerHTML = `<p class=""> ${cartLength} </p>`
  });
  
}

getWishlistCartLength();


//Best Selling and Explore Products Start
const sellingProductsContainer = document.querySelector("#best-selling-api-products");

let tempBestSelling = [];
let tempExploreProducts = [];
let wishListProducts = [];
let cartProducts = [];
let bestSellingProducts = [];
let products = [];
let scrollAmount = 0;
const productBox = document.getElementById("explore-products-box");

async function getApıProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products",{mode: 'cors'});
  const apiProducts = await apiResponse.json();
  return apiProducts;
};

async function displayProducts() {
  const allProducts = await getApıProducts();

  for (let i = 5; i < 9; i++) {
    bestSellingProducts[(i-5)] = allProducts[i];
  };
    
  tempBestSelling = bestSellingProducts.map((product) => {
    return `<div class="best-selling-api-products">
             <div class="best-selling-product-container">
              <div class="best-selling-img-container">
                <img class="best-selling-products-img" src="${product.image}"/>
                 <div class="best-selling-products-icons-container">
                  <div onclick="addToWishlist(${product.id}, bestSellingProducts)" class="selling-wishlist-icon">                
                   <svg width="32" id="wishlist_${product.id}" class="products-wishlist-svg" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>  
                 </div> 
                 <div  onclick="addToCart(${product.id},bestSellingProducts)"  id="cart_${product.id}"  class="selling-card-icon-container">
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
                 <div class="products-rating-container">
                   <img src="images/stars.png" class="products-stars-img"/>
                   <div class="rating-transparent-div" id="transparent-div" style="width:${hideStars(product)}%"></div>   
                   <p class="products-rating">(${product.rating.count})</p>       
                 </div>             
               </div>
              </div> 
            </div>`
  }).join("");
  sellingProductsContainer.innerHTML = tempBestSelling;

 changeCartSvg(sellingProductsContainer);
 changeWishlistSvg(sellingProductsContainer);

  products = allProducts;
  tempExploreProducts =  products.map((product) => {
   return `
   <div>
    <div id="${product.id}" class="explore-product">
      <div class="explore-img-and-icon-box"> 
          <div class="explore-product-img-box">
              <img class="explore-product-img" src="${product.image}" alt="" />
          </div>
          <div class="explore-wishlist-and-cart-icon">
              <div onclick="addToWishlist(${product.id} , products)" class="wishlist-icon-box">
                  <svg id="wishlist_${product.id}" class="products-wishlist-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path id="wishlist-stroke-${product.id}" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>
              <div  onclick="addToCart(${product.id} , products)"  id="cart_${product.id}"  class="selling-card-icon-container">
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
            <div class="rating-transparent-div" id="transparent-div" style="width:${hideStars(product)}%"></div>   
             <p class="explore-product-count">(${product.rating.count})</p>    
          </div>      
         </div>        
     </div>
   </div> ` }).join("");
   productBox.innerHTML = tempExploreProducts;
 
 checkStoredCartSvgs(products,productBox);
 checkStoredWishlistSvgs(products,productBox);
 changeCartSvg(productBox);
 changeWishlistSvg(productBox);
 determineProductCategories(allProducts);
 displayCategoryProducts();
 displaySearchedProducts(allProducts);
 applyPopularSearch(allProducts);
 dropdownOnclickActions();
};

function discount(any_products) {
  return any_products.price - (any_products.price * 30 / 100);
};

function ratingMaker(any_rate) {
   return  Math.ceil(((1 - (any_rate*(20/100)))*100.));
};

function hideStars(product) {
    const starRatio = ratingMaker(product.rating.rate);
    return starRatio;
};

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

function addToWishlist(productId,products) {
  wishListProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  
  const clickedProduct = products.find((product) => product.id === productId);
  const checkProduct =  wishListProducts.some((product) => product.id === productId);
  
  if (!checkProduct) {
    localStorage.setItem(
      "wishlistProducts", JSON.stringify([...wishListProducts, clickedProduct])
    );
  } else {
      removeFromWishlist(productId);
  };

  getWishlistCartLength();
};

function checkStoredWishlistSvgs(exploreProducts,exploreProductsContainer) {
  const colorizedWishlistProducts =  JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  colorizedWishlistProducts.map((product) => {
    const checkBestSellingArray = bestSellingProducts.some((arrayProduct) => arrayProduct.id === product.id);
    const checkExploreProductsArray = exploreProducts.some((arrayProduct) => arrayProduct.id === product.id);

    const bestSellingWishlistSvgs = sellingProductsContainer.querySelector(`#wishlist_${product.id}`);
    const exploreProductsWishlistSvgs = exploreProductsContainer.querySelector(`#wishlist_${product.id}`);
    
    if(checkBestSellingArray) {
      bestSellingWishlistSvgs.style.fill = "crimson";
    }
    if(checkExploreProductsArray) {
      exploreProductsWishlistSvgs.style.fill = "crimson";
    }
  });
};

function changeWishlistSvg(any_Container) {
  const wishlistButtons = any_Container.querySelectorAll(".products-wishlist-svg");
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
};

function removeFromWishlist(productId) {
   const indexToRemove = wishListProducts.findIndex((product) => product.id === productId)
   
   wishListProducts.splice(indexToRemove,1);
   localStorage.setItem (
    "wishlistProducts" , JSON.stringify([...wishListProducts])
   );
};

function addToCart(productId,products) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const clickedForCart = products.find((product) => product.id === productId);
  const checkCartProduct = cartProducts.some((product) => product.id === productId);

  if(!checkCartProduct) {
    localStorage.setItem(
      "cartProducts" , JSON.stringify([...cartProducts,clickedForCart])
    );
  }
  else {
    removeFromCart(productId);
  }

  getWishlistCartLength();
};

function checkStoredCartSvgs(exploreProducts,exploreProductsContainer) {
  const colorizedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  colorizedCartProducts.map((product) => {
    const bestSelllingCartDivs = sellingProductsContainer.querySelector(`#cart_${product.id}`);
    const exploreProductsCartsDivs = exploreProductsContainer.querySelector(`#cart_${product.id}`);

    const checkBestSellingArray = bestSellingProducts.some((arrayProduct) => arrayProduct.id === product.id);
    const checkExploreProductsArray = exploreProducts.some((arrayProduct) => arrayProduct.id === product.id);

    if(checkBestSellingArray) {
      bestSelllingCartDivs.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`
    }  
    if(checkExploreProductsArray) {
      exploreProductsCartsDivs.innerHTML = `<i class="selling-card-tick-icon fa-sharp fa-solid fa-check"></i>`;
    }
  });
};

function changeCartSvg(any_Container) {
   const cartContainer = any_Container.querySelectorAll(".selling-card-icon-container");
 
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

function removeFromCart(productId) {
   const checkCartIndex = cartProducts.findIndex((product) => product.id === productId);
   
   cartProducts.splice(checkCartIndex,1);
   localStorage.setItem(
     "cartProducts", JSON.stringify([...cartProducts])
   );
};

//Best Selling and Explore Products End

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
   
  const timeArray = [
    {
     time: days ,
     stringTime: "days"
    },

    {
      time:hours,
      stringTime : "hours"
    },

    {
      time: minutes,
      stringTime: "minutes"
     },
 
     {
       time: seconds,
       stringTime : "seconds"
     }
  ];
 

  for (let i = 0; i < timeArray.length; i++) {
     timeBoxes[i].innerHTML = `<p> ${formatTime(timeArray[i].time)} </p>
                               <p> ${timeArray[i].stringTime} </p>`;
  }

  if (distance < 0) {
    clearInterval(countdown);
  }
}, 1000);

buyNowButton.addEventListener("click", () => {
  console.log(`"${randomProduct.name}" added to cart`);
});

