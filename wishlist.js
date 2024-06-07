//hompage wishlist page js start//
let wishlistProducts = [];
const wishlistContainer = document.querySelector("#wishlistContainer");
const wishlistCount = document.querySelector("#wishlistCount");
function renderWishlistProducts() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlistCount.innerHTML = `Wishlist (${wishlistProducts.length})`;
  wishlistContainer.innerHTML = wishlistProducts
    .map((item) => {
      const { id, image, title, price } = item;
      return `
            <div class="wishlistProductsPage" id="${id}">
                <div class="wishlist-bag">
                    <i class="far fa-trash-alt" onclick="deleteFromWishlist(${id})"></i>
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
  console.log(cartProducts);
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
function checkStoredWishlistSvgs() {
  const colorizedWishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
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
}
function allAddtoCart(wishlistProducts) {
  let isCartProducts = [];
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  wishlistProducts.map((item) => {
    if (!cartProducts.some((arrayProduct) => arrayProduct.id === item.id)) {
      isCartProducts.push(item);
    }
  });
  localStorage.setItem(
    "cartProducts",
    JSON.stringify([...cartProducts, ...isCartProducts])
  );
}

renderWishlistProducts();
checkStoredWishlistSvgs();
//hompage wishlist page js end//
