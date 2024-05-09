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
            <div class="wishlist-products-page" id="${id}">
                <div class="wishlist-bag">
                    <i class="far fa-trash-alt" onclick="deleteFromWishlist(${id})"></i>
                    <img class="wishlist-images" src="${image}">
                    <button class="ad-to-cart"><i class="far fa-shopping-cart"></i>Add To Cart</button>
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

renderWishlistProducts();
