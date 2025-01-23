// Mock product data
const products = [
  { id: 1, name: "Running Shoes", price: 120, image: "https://via.placeholder.com/200x200" },
  { id: 2, name: "Formal Shoes", price: 150, image: "https://via.placeholder.com/200x200" },
  { id: 3, name: "Casual Shirt", price: 80, image: "https://via.placeholder.com/200x200" },
  { id: 4, name: "Jeans", price: 100, image: "https://via.placeholder.com/200x200" },
];

const productGrid = document.querySelector(".products");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartIcon = document.getElementById("cart-icon");
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

// Cart (stored in localStorage for persistence)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render products on the page
function renderProducts() {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "row";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-text">
          <h5>New</h5>
      </div>
      <div class="heart-icon">
          <i class='bx bx-heart'></i>
      </div>
      <div class="ratting">
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bx-star'></i>
          <i class='bx bxs-star-half'></i>
      </div>
      <div class="price">
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

// Add to cart function
function addToCart(id) {
  const product = products.find((item) => item.id === id);

  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex((item) => item.id === id);
  if (existingProductIndex !== -1) {
    // If product exists, increase the quantity
    alert("This item is already in your cart.");
  } else {
    cart.push(product); // Add new product to cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    updateCart(); // Update cart display
  }
}

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = total.toFixed(2);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
  updateCart(); // Update cart display
}

// Handle search icon
document.getElementById("search-icon").addEventListener("click", () => {
  alert("Search functionality coming soon!");
});

// Handle menu icon for mobile
menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Cart Icon functionality - show the cart page
cartIcon.addEventListener("click", () => {
  window.location.href = "cart.html";  // Redirect to Cart page
});

// Login icon functionality - open the login form
document.getElementById("user-icon").addEventListener("click", () => {
  // Show login form here
  alert("Login form is under construction.");
});

// Submit login form functionality
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Logged in successfully!");
  window.location.href = "index.html";  // Redirect to home page after successful login
});

// Initialize products and cart on page load
renderProducts();
document.addEventListener("DOMContentLoaded", updateCart);
