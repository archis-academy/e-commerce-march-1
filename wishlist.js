const product = [
  {
    id: 0,
    image: "images/wishlist-bag.png",
    title: "Gucci duffle bag",
    price: 960,
  },
  {
    id: 1,
    image: "images/Frame-610.png",
    title: "RGB liquid CPU Cooler",
    price: 1960,
  },
  {
    id: 2,
    image: "images/Frame-608.png",
    title: "GP11 Shooter USB Gamepad",
    price: 550,
  },
  {
    id: 3,
    image: "images/jacket.png",
    title: "Quilted Satin Jacket",
    price: 750,
  },
];
localStorage.setItem("products",JSON.stringify(product));


let savedProducts = JSON.parse(localStorage.getItem("products"));


function removeFromWishlist(element) {
  
  let index = parseInt(element.parentNode.parentNode.getAttribute("data-id"));

  
  savedProducts = savedProducts.filter((item) => item.id !== index);

  
  localStorage.setItem("products", JSON.stringify(savedProducts));

  
  let wishlistCount = document.getElementById("wishlist(4)");

  wishlistCount.textContent = `Wishlist(${savedProducts.length})`;

  
  renderWishlist(savedProducts);
}


function renderWishlist(products) {
  let wishlistContainer = document.getElementById("wishlist-container");
  wishlistContainer.innerHTML = products
    .map((item) => {
      const { id, image, title, price } = item;
      return `
            <div class="wishlist-products-page" data-id="${id}">
                <div class="wishlist-bag">
                    <span onclick="removeFromWishlist(this)"><i class="far fa-trash-alt"></i></span>
                    <img class="wishlist-images" src="${image}">
                    <button class="ad-to-cart"><i class="far fa-shopping-cart"></i>Add To Cart</button>
                </div>
                <div class="bag-text">
                    <h4>${title}</h4>
                    <p>${price}</p>
                </div>
            </div>
        `;
    })
    .join("");
}


document.addEventListener("DOMContentLoaded", function () {
    renderWishlist(savedProducts);
});
