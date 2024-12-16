// Seleccionar el contenedor de productos
const productsContainer = document.querySelector(".row");

// Obtener y mostrar los productos
fetch("productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }
    return response.json();
  })
  .then((products) => {
    // Selecciona solo los tres primeros productos
    const selectedProducts = products.slice(0, 3);
    displayProducts(selectedProducts);
  })
  .catch((error) => console.error("Error:", error));

// Función para mostrar productos en el contenedor
function displayProducts(products) {
  products.forEach((product) => {
    const productHTML = `
      <div class="col-md-4">
        <div class="card bg-dark text-white mb-3">
          <img
            src="${product.image}"
            class="card-img-top"
            alt="${product.name}"
          />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
          </div>
        </div>
      </div>
    `;
    productsContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}