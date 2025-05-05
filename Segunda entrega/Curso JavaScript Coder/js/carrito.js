let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('contenedorCarrito');
const total = document.getElementById('totalCarrito');

contenedor.addEventListener('click', e => {
    if (e.target.classList.contains('eliminarBoton')) {
        const id = +e.target.dataset.id;
        eliminarDelCarrito(id);
    }
});

function renderizarCarrito() {
    contenedor.innerHTML = '';
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('seccion');
        div.innerHTML = 
        `<h3>${item.nombre}</h3>
        <p>Precio: $${item.precio}</p>
        <button class="eliminarBoton" data-id="${item.id}">Eliminar</button>`;
        contenedor.appendChild(div);
    });
    actualizarTotal();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function actualizarTotal() {
    const suma = carrito.reduce((acc, item) => acc + item.precio, 0);
    total.textContent = `Total: $${suma}`;
}

renderizarCarrito();
