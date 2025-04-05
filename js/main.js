// Inicializar animaciones al hacer scroll
AOS.init();

// Inicializar el carrusel de testimonios con múltiples a la vez
new Glide('#glideTestimonios', {
  type: 'carousel',
  perView: 2,
  gap: 30,
  breakpoints: {
    768: {
      perView: 1
    }
  },
  autoplay: 2000
}).mount();

// Mostrar nombres 
const mostrarBonito = (categoria) => {
  return categoria
  .replace("women's clothing", "Ropa de mujer")
  .replace("men's clothing", "Ropa de hombre")
  .replace("electronics", "Electrónica")
  .replace("jewelery", "Joyería");
};

// Obtener imagen personalizada según categoría
const obtenerImagenCategoria = (categoria) => {
  switch (categoria) {
    case "men's clothing":
      return "img/categorias/men.jpg";
    case "women's clothing":
      return "img/categorias/women.jpg";
    case "electronics":
      return "img/categorias/electronic.jpg";
    case "jewelery":
      return "img/categorias/jewelery.jpg";
    default:
      return "https://picsum.photos/400/300"; // por si acaso
  }
};



// Cargar dinámicamente las categorías desde la API
$(document).ready(function () {
  $.get('https://fakestoreapi.com/products/categories', function (data) {
    data.forEach(function (cat) {
      const imagenURL = obtenerImagenCategoria(cat);
      $('#categorias').append(`
        <div class="col-md-3 mb-4">
          <div class="categoria-card">
            <img src="${imagenURL}" alt="Imagen categoría">
            <div class="card-body text-start">
              <h5 class="card-title">${mostrarBonito(cat)}</h5>
              <a href="productos.html?categoria=${encodeURIComponent(cat)}" class="btn btn-outline-primary btn-sm mt-2">Ver productos</a>
            </div>
          </div>
        </div>
      `);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const btnMenu = document.getElementById('btnMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconoMenu = document.getElementById('iconoMenu');

  btnMenu.addEventListener('click', function () {
    const isVisible = mobileMenu.classList.contains('menu-visible');

    if (isVisible) {
      mobileMenu.classList.remove('menu-visible');
      iconoMenu.classList.remove('fa-times');
      iconoMenu.classList.add('fa-bars');
    } else {
      mobileMenu.classList.add('menu-visible');
      iconoMenu.classList.remove('fa-bars');
      iconoMenu.classList.add('fa-times');
    }
  });

  document.querySelectorAll('#mobileMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('menu-visible');
      iconoMenu.classList.remove('fa-times');
      iconoMenu.classList.add('fa-bars');
    });
  });
});








