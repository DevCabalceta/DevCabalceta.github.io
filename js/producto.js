// Obtener ID de producto desde la URL
function obtenerID() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Mostrar detalles del producto
function mostrarProducto(producto) {
  $('#detalleProducto').html(`
    <div class="col-md-6 text-center mb-4">
      <img src="${producto.image}" class="img-fluid rounded shadow-sm" alt="${producto.title}" style="max-height: 400px; object-fit: contain;">
    </div>
    <div class="col-md-6">
      <h2>${producto.title}</h2>
      <p class="text-muted text-capitalize">Categoría: ${producto.category}</p>
      <p class="lead">${producto.description}</p>
      <p class="h4 fw-bold text-primary">$${producto.price}</p>
      <p>Rating: ⭐ ${producto.rating.rate} / 5 (${producto.rating.count} reseñas)</p>
      <button class="btn btn-success mt-3" id="btnAgregar"><i class="fas fa-cart-plus"></i> Agregar al carrito</button>
    </div>
  `);

  // Escuchar clic en botón agregar al carrito
  $('#btnAgregar').on('click', function () {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existe = carrito.find(p => p.id === producto.id);
    if (!existe) {
      carrito.push({
        id: producto.id,
        title: producto.title,
        price: producto.price,
        image: producto.image
      });
      localStorage.setItem('carrito', JSON.stringify(carrito));

      Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: 'Producto agregado al carrito correctamente.',
        timer: 1500,
        showConfirmButton: false
      });

      actualizarCantidadCarrito();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Ya agregado',
        text: 'Este producto ya se encuentra en el carrito.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

// Cargar productos relacionados
function cargarProductosRelacionados(categoriaActual, idActual) {
  $.get(`https://fakestoreapi.com/products/category/${categoriaActual}`, function (productos) {
    const relacionados = productos.filter(p => p.id !== idActual).slice(0, 6);

    relacionados.forEach(p => {
      $('#listaRelacionados').append(`
        <li class="glide__slide">
          <div class="card h-100 shadow-sm border-0">
            <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 200px; object-fit: contain;">
            <div class="relacionados card-body d-flex flex-column">
              <h6 class="card-title">${p.title}</h6>
              <p class="fw-bold text-primary">$${p.price}</p>
              <a href="producto.html?id=${p.id}" class="btn btn-outline-primary mt-auto">Ver más</a>
            </div>
          </div>
        </li>
      `);
    });

    new Glide('#glideRelacionados', {
      type: 'carousel',
      autoplay: 2000,
      hoverpause: true,
      gap: 16,
      perView: 6,
      breakpoints: {
        1200: { perView: 4 },
        768: { perView: 2 },
        480: { perView: 1 }
      }
    }).mount();
    
  });
}

// Inicializar
$(document).ready(function () {
  const id = obtenerID();
  if (id) {
    $.get(`https://fakestoreapi.com/products/${id}`, function (data) {
      mostrarProducto(data);
      cargarProductosRelacionados(data.category, data.id);
    });
  } else {
    $('#detalleProducto').html('<div class="col-12 text-center"><p class="text-danger">Producto no encontrado.</p></div>');
  }
});
