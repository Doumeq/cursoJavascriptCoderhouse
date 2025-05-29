let almacenCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
let carrito = almacenCarrito.map(function(prod) {
  return {
    ...prod,
    cantidad: prod.cantidad || 1
  };
});
localStorage.setItem('carrito', JSON.stringify(carrito));

const contenedorCarrito    = document.getElementById('contenedorCarrito');
const elementoTotalCarrito = document.getElementById('totalCarrito');
const botonVaciarCarrito   = document.getElementById('botonVaciarCarrito');

contenedorCarrito.addEventListener('click', function(evento) {
  if (evento.target.matches('.botonCantidadMenos, .botonCantidadMas')) {
    const idProducto = evento.target.dataset.id;
    const item = carrito.find(function(car) {
      return car.id === idProducto;
    });

    if (evento.target.matches('.botonCantidadMas')) {
      item.cantidad += 1;
    } else {
      item.cantidad -= 1;
      if (item.cantidad <= 0) {
        carrito = carrito.filter(function(car) {
          return car.id !== idProducto;
        });
        window.devolverAlCatalogo(idProducto);
      }
    }
    guardarYCargar();
    return;
  }

  if (evento.target.classList.contains('botonEliminar')) {
    const idProducto = evento.target.dataset.id;
    carrito = carrito.filter(function(car) {
      return car.id !== idProducto;
    });
    window.devolverAlCatalogo(idProducto);
    guardarYCargar();
  }
});

function renderizarCarrito() {
  contenedorCarrito.innerHTML = '';
  let sumaTotal = 0;

  for (const item of carrito) {
    const subtotal = item.precio * item.cantidad;
    sumaTotal += subtotal;

    const div = document.createElement('div');
    div.className = 'seccion';
    div.innerHTML = `
      <img src="imagenes/${item.imagen}" alt="${item.nombre}" class="imagenCarrito">
      <h3>${item.nombre}</h3>
      <p>Precio: $${item.precio}</p>
      <div class="controlCantidad">
        <button class="botonCantidad botonCantidadMenos" data-id="${item.id}">−</button>
        <span class="textoCantidad">${item.cantidad}</span>
        <button class="botonCantidad botonCantidadMas" data-id="${item.id}">+</button>
      </div>
      <p>Subtotal: $${subtotal}</p>
      <button class="botonEliminar" data-id="${item.id}">Eliminar</button>
    `;
    contenedorCarrito.appendChild(div);
  }
  elementoTotalCarrito.textContent = `Total: $${sumaTotal}`;
}

function guardarYCargar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
}

botonVaciarCarrito.addEventListener('click', function() {
  carrito = [];
  localStorage.removeItem('carrito');
  renderizarCarrito();
  mostrarNotificacion('Carrito vacío');
});

document.getElementById('botonFinalizarPedido').addEventListener('click', function() {
  Swal.fire({
    title: 'Finalizar pedido',
    html:
      '<input id="inputNombre" class="swal2-input" placeholder="Nombre y apellido">' +
      '<input id="inputTelefono" class="swal2-input" placeholder="Teléfono">' +
      '<input id="inputDomicilio" class="swal2-input" placeholder="Domicilio">',
    focusConfirm: false,
    showCancelButton: 'Cancelar',
    confirmButtonText: 'Finalizar pedido',
    preConfirm: () => {
      const nombre = document.getElementById('inputNombre').value;
      const telefono = document.getElementById('inputTelefono').value;
      const domicilio = document.getElementById('inputDomicilio').value;
      if (!nombre || !telefono || !domicilio) {
        Swal.showValidationMessage('Por favor, completa todos los campos');
      }
      return { nombre, telefono, domicilio };
    }
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      Swal.fire(
        'Gracias por tu compra, ' + resultado.value.nombre ,
        'Te vamos a contactr al ' + resultado.value.telefono,
        'success'
      );
      carrito = [];
      localStorage.removeItem('carrito');
      guardarYCargar();
    }
  });
});
