const listaCheckout = document.getElementById('lista-productos-checkout');
const totalCheckout = document.getElementById('total-checkout');
const formCompra = document.getElementById('form-compra');
const mensajeExito = document.getElementById('mensaje-exito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCheckout() {
    listaCheckout.innerHTML = '';
    let total = 0;

    if(carrito.length === 0) {
        listaCheckout.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.classList.add('producto');
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <p><strong>${producto.nombre}</strong></p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Subtotal: $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</p>
                </div>
                <button data-index="${index}">Eliminar</button>
            `;
            listaCheckout.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
    }

    totalCheckout.textContent = `$${total.toLocaleString('es-CL')}`;

    // Eliminar producto
    const btnsEliminar = listaCheckout.querySelectorAll('button');
    btnsEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.getAttribute('data-index');
            carrito.splice(idx, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCheckout();
        });
    });
}

mostrarCheckout();

formCompra.addEventListener('submit', e => {
    e.preventDefault();
    if(carrito.length === 0) return alert('Tu carrito está vacío.');

    // Aquí se puede enviar la info al servidor
    localStorage.removeItem('carrito');
    carrito = [];
    mostrarCheckout();
    mensajeExito.style.display = 'block';
    formCompra.reset();
});
