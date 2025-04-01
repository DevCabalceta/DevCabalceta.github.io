function actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const badge = `<span class="badge bg-danger ms-1">${carrito.length}</span>`;
    $('.fa-shopping-cart').next('span').remove(); // elimina si ya existe
    $('.fa-shopping-cart').after(badge);
  }
  
  $(document).ready(actualizarCantidadCarrito);
  