const urlProductos = './json/productos.json';
let listaProductos = [];
let instanciaCarrusel;
const contenedorProductos = document.getElementById('contenedorProductos');

fetch(urlProductos)
  .then(function(respuesta) {
    if (!respuesta.ok) {
      throw new Error('Error ' + respuesta.status);
    }
    return respuesta.json();
  })
  .then(function(datos) {
    localStorage.setItem('productosOriginales', JSON.stringify(datos));
    listaProductos = datos.slice();
    mostrarProductos();
  })

function mostrarProductos() {
  contenedorProductos.innerHTML = '';
  for (const producto of listaProductos) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'seccion swiper-slide';
    tarjeta.innerHTML = `
      <img 
        src="imagenes/${producto.imagen}" 
        alt="${producto.nombre}" 
        class="imagenProducto"
      >
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="botonAgregar" data-id="${producto.id}">
        Agregar
      </button>`;
    contenedorProductos.appendChild(tarjeta);
  }
  inicializarCarrusel();
}

function inicializarCarrusel() {
  if (instanciaCarrusel) {
    instanciaCarrusel.destroy(true, true);
  }
  instanciaCarrusel = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
}

contenedorProductos.addEventListener('click', function(evento) {
  const boton = evento.target.closest('.botonAgregar');
  const idProducto = boton.dataset.id;
  const productoSeleccionado = listaProductos.find(function(p) {
    return p.id === idProducto;
  });

  let itemEnCarrito = carrito.find(function(car) {
    return car.id === idProducto;
  });

  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...productoSeleccionado, cantidad: 1 });
    listaProductos = listaProductos.filter(function(prod) {
      return prod.id !== idProducto;
    });
    mostrarProductos();
  }
  window.guardarYCargar();
});

function mostrarNotificacion(mensaje) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: mensaje,
    timer: 1500,
    showConfirmButton: false
  });
}

window.devolverAlCatalogo = function(idProducto) {
  const originales = JSON.parse(localStorage.getItem('productosOriginales')) || [];
  const producto = originales.find(function(prod) {
    return prod.id === idProducto;
  });

  if (producto) {
    listaProductos.push(producto);
    mostrarProductos();
  }
};
