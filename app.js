const sellingProductsContainer = document.querySelector("#best-selling-api-products");

let bestSellingProducts = [];

function DisplayProducts(any_Products) {
  sellingProductsContainer.innerHTML = any_Products.map((item) => {
    return `<div class="best-selling-api-products">
              <img class="best-selling-products-img" src="${item.image}"/>
              <div class="best-selling-products-features">
                <p>${item.title}</p>
                <div class="best-selling-discount">
                  <p class="discount-price">${discount(item).toFixed(2)}</p> 
                  <s>${item.price}</s>
                </div>  
                <p> Rating : ${item.rating.rate}</p>
              </div>
            </div>`
  }).join("");

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