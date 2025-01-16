// Add to cart functionality
const cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.parentElement;
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = productCard.querySelector('p').innerText;

    const product = {
      name: productName,
      price: productPrice,
    };

    cart.push(product);
    alert(`${productName} added to cart!`);
    console.log(cart);
  });
});
