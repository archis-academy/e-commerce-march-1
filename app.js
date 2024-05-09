function changeColor(browse) {
    let hompageBrowseBox = browse;
    let hompageBrowseBoxActive = document.querySelector('.browse.active');

    if (hompageBrowseBoxActive && hompageBrowseBoxActive !== hompageBrowseBox) {
        hompageBrowseBoxActive.classList.remove('active');
        hompageBrowseBoxActive.style.backgroundColor = '#FFFFFF';
        hompageBrowseBoxActive.style.color = '#000000';
    }

    if (!hompageBrowseBox.classList.contains('active')) {
        hompageBrowseBox.classList.add('active');
        hompageBrowseBox.style.backgroundColor = '#db4444';
        hompageBrowseBox.style.color = '#FFFFFF';
    } else {
        hompageBrowseBox.classList.remove('active');
        hompageBrowseBox.style.backgroundColor = '#FFFFFF';
        hompageBrowseBox.style.color = '#000000';
    }
}




const products = [
  { name: "Product 1", price: 29.99 },
  { name: "Product 2", price: 39.99 },
  { name: "Product 3", price: 49.99 },
];

function selectRandomProduct() {
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
}

const randomProduct = selectRandomProduct();

const smallTitle = document.querySelector(".hompage-featured-small-title h4");
const bigTitle = document.querySelector(".hompage-featured-big-title h1");
const timeBoxes = document.querySelectorAll(".hompage-time-box1 h1");
const buyNowButton = document.querySelector(".hompage-featured-button button");

smallTitle.textContent = "Featured Product";
bigTitle.innerHTML = `Enhance Your <br />${randomProduct.name} Experience`;


const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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







