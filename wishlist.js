//hompage wishlist page js start//
function loginActivities() {
  let login = JSON.parse(localStorage.getItem("isLogin")) || false;
  if (!login) {
    window.location.assign("login.html");
  }
  const logOutButton =  document.querySelector(".logout-p")
  logOutButton.addEventListener(("click") , () => {
    login = false;
    localStorage.setItem("isLogin" , JSON.stringify(login));
  });
};

loginActivities();



let filteredProducts = [];
const searchDropdown = document.querySelector("#search-dropdown"); 
let searchApiProducts = searchDropdown.querySelector(".search-api-products");
const searchSvg = document.querySelector(".search-svg");
const deleteSvg = document.querySelector(".search-delete-svg");
let searchValue = "";


async function getApıProducts() {
  const apiResponse = await fetch("https://fakestoreapi.com/products", {
    mode: "cors",
  });
  const apiProducts = await apiResponse.json();
  return apiProducts;
}


function displaySearchedProducts(allProducts) {
  const searchBar = document.querySelector(".header-search");
  searchApiProducts.innerHTML = ``;
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
   searchValue = searchBar.value
   hideSearchSvg(searchValue);
   filteredProducts = [];
   filteredProducts = allProducts.filter((anyProduct) => anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
   displayFilteredProducts(filteredProducts,searchApiProducts);
   applyPopularSearch(allProducts)
  });

  deleteSvg.addEventListener(("click") , () => {
    searchBar.value = "";
    searchSvg.style.display = "block";
    deleteSvg.style.display = "none";
    displaySearchedProducts(allProducts);
  });
};

function hideSearchSvg(value) {
  if (value !== "") {
     searchSvg.style.display = "none";
     deleteSvg.style.display = "block";
   } else {
    searchSvg.style.display = "block";
    deleteSvg.style.display = "none";
   }
}

function displayFilteredProducts(products,searchApiProducts) {
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
 
   popularSearches.forEach((search) => {
    search.addEventListener(("click"),() => {
     searchBar.value = search.textContent;
     searchValue = searchBar.value;
     hideSearchSvg(searchValue);
     
     filteredProducts = [];
     filteredProducts = allProducts.filter((anyProduct) =>  anyProduct.title.toLowerCase().includes(searchBar.value.toLowerCase().trim()));
     searchApiProducts = searchDropdown.querySelector(".search-api-products"); 
     displayFilteredProducts(filteredProducts,searchApiProducts);
     applyPopularSearch(allProducts);
    });
   }); 
};


async function displayProducts() {
  const allProducts = await getApıProducts();
   displaySearchedProducts(allProducts);
   applyPopularSearch(allProducts);
   dropdownOnclickActions()
}


function getWishlistCartLength() {
  const wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishlistLength = wishlist.length;

  const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartLength = cart.length;


  const wishlistNumberDiv = document.querySelectorAll("#wishlist-length");
  const cartNumberDiv = document.querySelectorAll("#cart-length");
  if (parseInt(wishlistLength) !== 0) {
    wishlistNumberDiv.forEach((div) => {
      div.innerHTML = `<p class=""> ${wishlistLength} </p>`
    });
  }
  else {
   wishlistNumberDiv.forEach((div) => {
     div.style.display = "none";
   });
  }
  if (parseInt(cartLength) !== 0) {   
   cartNumberDiv.forEach((div) => {
     div.innerHTML = `<p class=""> ${cartLength} </p>`
   });
  }
  else {
    cartNumberDiv.forEach((div) => {
      div.style.display = "none";
    })
  }
}

getWishlistCartLength();


function dropdownOnclickActions() {
  const accountDropdown = document.querySelector("#account-dropdown")
  
  window.onclick = function(event) {
    if (!event.target.matches('#account-dropdown') && !event.target.matches("#header-account-icon")) {
       accountDropdown.classList.remove("show-account");
    }
    else if(event.target.matches("#header-account-icon")){
      accountDropdown.classList.toggle("show-account");
    }
        
    if (!event.target.matches('#search-dropdown') && !event.target.matches(`#search-products`) ) {
      searchDropdown.style.display = "none";
    }
    else{
    searchDropdown.style.display = "flex";
    }  
  };
};

displayProducts();


let wishlistProducts = [];
const wishlistContainer = document.querySelector("#wishlistContainer");
const wishlistCount = document.querySelector("#wishlistCount");
function renderWishlistProducts() {
  wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlistCount.innerHTML = `Wishlist (${wishlistProducts.length})`;
  wishlistContainer.innerHTML = wishlistProducts
    .map((item) => {
      const { id, image, title, price } = item;
      return `
            <div class="wishlistProductsPage" id="${id}">
                <div class="wishlist-bag">
                    <i class="far fa-trash-alt" onclick="deleteFromWishlist(${id})"><img src="images/Fill Eye.png" alt="fill-eye"></i>
                    <img class="wishlist-images" src="${image}">
                <div id="wishlistButtonContainer_${id}" onclick="addToCart(${id},wishlistProducts); displaywishlistDeleteCartIcon(${id})" class="wishlist-products-container">
                <button  class="wishlist-product-cart-add-btn">Add to Cart</button>
              </div>  
                </div>
                <div class="bag-text">
                    <h4>${title}</h4>
                    <p>₺${price}</p>
                </div>
            </div>
        `;
    })
    .join("");
}

function deleteFromWishlist(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const updatedWishlistProducts = wishlistProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem(
    "wishlistProducts",
    JSON.stringify(updatedWishlistProducts)
  );
  renderWishlistProducts();
}
function addToCart(productId, products) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const clickedForCart = products.find(
    (product) => parseInt(product.id) === parseInt(productId)
  );
  const checkCartProduct = cartProducts.some(
    (product) => parseInt(product.id) === parseInt(productId)
  );

  if (!checkCartProduct) {
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, clickedForCart])
    );
  } else if (products != wishlistProducts) {
    removeFromCart(productId);
  }
}
function displaywishlistDeleteCartIcon(productId) {
  const wishlistButton = wishlistContainer.querySelector(
    `#wishlistButtonContainer_${productId}`
  );
  wishlistButton.disabled = true;

  wishlistButton.innerHTML = `<a class="goToCartBox" href="cart.html"> Go To Cart </a>`;
}

function checkStoredCartSvgs() {
  const colorizedCartProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];
  colorizedCartProducts.map((product) => {
    const isCartProduct = wishlistProducts.some(
      (arrayProduct) => arrayProduct.id === product.id
    );
    if (isCartProduct) {
      displaywishlistDeleteCartIcon(product.id);
    }
  });
}

function allAddtoCart() {
  let isCartProducts = [];
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  wishlistProducts.map((item) => {
    if (!cartProducts.some((arrayProduct) => arrayProduct.id === item.id)) {
      isCartProducts.push(item);
      displaywishlistDeleteCartIcon(item.id);
    }
  });
  localStorage.setItem(
    "cartProducts",
    JSON.stringify([...cartProducts, ...isCartProducts])
  );
}

renderWishlistProducts();
checkStoredCartSvgs();
//hompage wishlist page js end//
