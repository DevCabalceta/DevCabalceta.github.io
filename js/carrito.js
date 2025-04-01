// Mostrar productos del carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Si el carrito está vacío
  if (carrito.length === 0) {
    $('#carritoContainer').html(`
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
        <h4 class="text-muted">Tu carrito está vacío</h4>
        <p>Agrega productos para verlos aquí</p>
        <a href="productos.html" class="btn btn-outline-success mt-3">
          <i class="fas fa-store me-2"></i> Ver productos
        </a>
      </div>
    `);
    return;
  }

  let total = 0;
  let html = `<div class="row gy-4">`;

  carrito.forEach((producto, index) => {
    total += producto.price;
    html += `
      <div class="col-md-6">
        <div class="card shadow-sm h-100 carrito-card">
          <div class="row g-0 align-items-center">
            <div class="col-4 text-center">
              <img src="${producto.image}" alt="${producto.title}" class="img-fluid p-2" style="max-height: 120px; object-fit: contain;">
            </div>
            <div class="col-8">
              <div class="card-body">
                <h6 class="card-title mb-2">${producto.title}</h6>
                <p class="card-text fw-bold text-primary mb-2">$${producto.price.toFixed(2)}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">
                  <i class="fas fa-trash-alt me-1"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  html += `
    <div class="text-end mt-5">
      <h5 class="fw-bold text-primary">Total: $${total.toFixed(2)}</h5>
      <a href="checkout.html" class="btn btn-success btn-lg mt-3">
        <i class="fas fa-credit-card me-2"></i> Proceder al Pago
      </a>
    </div>
  `;

  $('#carritoContainer').html(html);
}


// Eliminar producto por índice
function eliminarProducto(indice) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(); // actualizar la tabla
}

// Inicializar
$(document).ready(function () {
  mostrarCarrito();
});
