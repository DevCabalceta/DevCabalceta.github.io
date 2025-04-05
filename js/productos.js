// Obtener parámetro desde la URL
function obtenerCategoriaSeleccionada() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('categoria');
  return cat ? decodeURIComponent(cat) : null;
}

// Mostrar nombre formateado
const mostrarBonito = (categoria) => {
  return categoria
    
    .replace("women's clothing", "Ropa de mujer")
    .replace("men's clothing", "Ropa de hombre")
    .replace("electronics", "Electrónica")
    .replace("jewelery", "Joyería");
};

// Renderizar productos
function renderizarProductos(productos) {
  $('#listaProductos').empty();
  productos.forEach(producto => {
    $('#listaProductos').append(`
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="img-container">
            <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${producto.title}</h6>
            <p class="text-muted mb-1">${producto.category}</p>
            <p class="fw-bold mb-2">$${producto.price}</p>
            <a href="producto.html?id=${producto.id}" class="btn text-white mt-auto">Ver más</a>
          </div>
        </div>
      </div>
    `);
  });
}

// Cargar productos según categoría o todos
function cargarProductos() {
  const categoria = obtenerCategoriaSeleccionada();
  let url = 'https://fakestoreapi.com/products';

  if (categoria) {
    url = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoria)}`;
  }

  $.get(url)
    .done(function (data) {
      renderizarProductos(data);
    })
    .fail(function () {
      $('#listaProductos').html('<p class="text-center text-danger">No se pudieron cargar los productos.</p>');
    });
}

// Cargar los botones de filtro de categoría
function cargarCategorias() {
  const categoriaActiva = obtenerCategoriaSeleccionada();

  $.get('https://fakestoreapi.com/products/categories', function (categorias) {
    $('#filtroCategorias').empty();

    // Botón TODOS
    $('#filtroCategorias').append(`
      <button class="btn btn-outline-primary mx-1 categoria-btn ${!categoriaActiva ? 'active' : ''}" data-categoria="">
        Todos
      </button>
    `);

    // Resto de categorías
    categorias.forEach(c => {
      const isActive = c === categoriaActiva ? 'active' : '';
      $('#filtroCategorias').append(`
        <button class="btn btn-outline-primary mx-1 categoria-btn ${isActive}" data-categoria="${c}">
          ${mostrarBonito(c)}
        </button>
      `);
    });
  });
}

// Evento dinámico para cambiar de categoría sin recargar
$(document).on('click', '.categoria-btn', function () {
  const nuevaCategoria = $(this).data('categoria');
  history.pushState(null, '', nuevaCategoria ? `?categoria=${encodeURIComponent(nuevaCategoria)}` : 'productos.html');
  $('.categoria-btn').removeClass('active');
  $(this).addClass('active');
  cargarProductos(); // recarga los productos dinámicamente
});

// Inicializar
$(document).ready(function () {
  cargarCategorias();
  cargarProductos();
});
