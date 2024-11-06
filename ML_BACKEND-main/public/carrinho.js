// script.js

const products = [
    { id: 1, name: "Product 1", price: 10.0 },
    { id: 2, name: "Product 2", price: 20.0 },
    { id: 3, name: "Product 3", price: 30.0 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render products
function renderProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product ${product.name} added to cart!`);
}

// Function to render the cart
function renderCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear previous cart items
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <h3>${item.product.name}</h3>
            <p>Price: $${item.product.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
        cartList.appendChild(cartItemDiv);
        total += item.product.price * item.quantity;
    });

    cartList.innerHTML += `<div class="total">Total: $${total.toFixed(2)}</div>`;
}

// Function to remove products from the cart
function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.product.id === productId);
    if (cartItemIndex > -1) {
        cart[cartItemIndex].quantity--;
        if (cart[cartItemIndex].quantity === 0) {
            cart.splice(cartItemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Check which page is loaded and render appropriate content
if (document.getElementById("product-list")) {
    renderProducts(); // Render products on products page
} else if (document.getElementById("cart-list")) {
    renderCart(); // Render cart on cart page
}
