const productosUrl = './json/productos.json';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Hare uso de Fetch para capturar el json en el DOM (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API ; https://www.w3schools.com/jsref/api_fetch.asp)
fetch(productosUrl)
    .then(resp => resp.json())
    .then(productos => renderProductos(productos))
    .catch(err => console.error('Error cargando productos:', err));

function renderProductos(productos) {
    const contenedor = document.getElementById('contenedorProductos');
    productos.map(productos => {
        const div = document.createElement('div');
        div.classList.add('seccion');
        div.innerHTML = 
      `<h3>${productos.nombre}</h3>
      <p>Precio: $${productos.precio}</p>
      <button data-id="${productos.id}">Agregar</button>`;
        contenedor.appendChild(div);
    });
    contenedor.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            agregarAlCarrito(+e.target.dataset.id);
        }
    });
}

function agregarAlCarrito(productId) {
    fetch(productosUrl)
        .then(resp => resp.json())
        .then(productos => {
            const seleccionado = productos.find(p => p.id === productId);
            if (!seleccionado) return;
            carrito.push(seleccionado);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            mostrarAviso(`${seleccionado.nombre} agregado al carrito`);
        });
}

function mostrarAviso(msg) {
    const aviso = document.createElement('div');
    aviso.textContent = msg;
    aviso.style = 'position:fixed; bottom:1rem; right:1rem; padding:.5rem; background:green; color:white; border-radius:4px;';
    document.body.appendChild(aviso);
    setTimeout(() => document.body.removeChild(aviso), 1500);
}
