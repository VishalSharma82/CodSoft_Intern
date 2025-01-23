const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price}</p>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = total.toFixed(2);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", updateCart);
