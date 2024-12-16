const productContainer = document.querySelector(".row");
const cartContainer = document.getElementById("cart");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];


fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  })
  .catch((error) => console.error("Error fetching products:", error));

// Mostrar productos
function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productHTML = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price.toFixed(2)}</p>
            <button class="btn btn-danger" onclick="addToCart(${product.id})">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}

// Agregar producto al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cartItems.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1; // Incrementar cantidad si ya está en el carrito
  } else {
    cartItems.push({ ...product, quantity: 1 }); // Agregar nuevo producto
  }

  updateCart();
  saveCartToLocalStorage();
}

// Actualizar carrito
function updateCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const cartItemHTML = `
      <div class="cart-item">
        <h5>${item.name}</h5>
        <p>Precio: $${item.price.toFixed(2)}</p>
        <p>Cantidad: ${item.quantity}</p>
        <button class="btn btn-warning btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
        <button class="btn btn-info btn-sm" onclick="editQuantity(${index}, 1)">+</button>
        <button class="btn btn-info btn-sm" onclick="editQuantity(${index}, -1)">-</button>
      </div>
      <hr />
    `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
  cartContainer.insertAdjacentHTML("beforeend", totalHTML);
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Eliminar producto del carrito
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  saveCartToLocalStorage();
}

// Editar cantidad
function editQuantity(index, delta) {
  const item = cartItems[index];
  item.quantity += delta;

  if (item.quantity <= 0) {
    cartItems.splice(index, 1);
  }

  updateCart();
  saveCartToLocalStorage();
}

updateCart();
