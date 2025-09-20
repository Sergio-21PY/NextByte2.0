document.addEventListener('DOMContentLoaded', function() {
    const contadorCarrito = document.getElementById('contador-carrito');
    const btnCarritoVistaPrevia = document.getElementById('btnCarritoVistaPrevia');
    const vistaPreviaCarrito = document.getElementById('vista-previa-carrito');
    const listaProductosPrevia = document.getElementById('lista-productos-previa');
    const totalPrevia = document.getElementById('total-previa');
    const carritoVacioTexto = document.getElementById('carrito-vacio-texto');
    const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function actualizarContador() {
        const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
        }
    }

    function mostrarVistaPrevia() {
        listaProductosPrevia.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            carritoVacioTexto.style.display = 'block';
        } else {
            carritoVacioTexto.style.display = 'none';
            carrito.forEach(producto => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '10px';
                li.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <p><strong>${producto.nombre}</strong></p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Subtotal: $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</p>
                    </div>
                `;
                listaProductosPrevia.appendChild(li);
                total += producto.precio * producto.cantidad;
            });
        }

        totalPrevia.textContent = `$${total.toLocaleString('es-CL')}`;
        vistaPreviaCarrito.style.display = 'block';
    }

    function ocultarVistaPrevia() {
        vistaPreviaCarrito.style.display = 'none';
    }

    if (btnCarritoVistaPrevia) {
        btnCarritoVistaPrevia.addEventListener('click', e => {
            e.stopPropagation();
            if (vistaPreviaCarrito.style.display === 'block') {
                ocultarVistaPrevia();
            } else {
                mostrarVistaPrevia();
            }
        });
    }

    document.addEventListener('click', e => {
        if (vistaPreviaCarrito && !vistaPreviaCarrito.contains(e.target) && e.target !== btnCarritoVistaPrevia) {
            ocultarVistaPrevia();
        }
    });

    const botones = document.querySelectorAll('.btn-comprar, .btn-agregar');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const detalles = boton.closest('.detalles-producto');
            if (!detalles) return;

            const nombre = detalles.querySelector('.nombre-producto h2')?.textContent;
            const precioTexto = detalles.querySelector('.valor p')?.textContent;
            // Tomamos la imagen principal del producto desde .galeria .principal img
            const imagen = document.querySelector('.galeria .principal img')?.src || 'https://via.placeholder.com/50';

            if (!nombre || !precioTexto) return;

            const precio = parseInt(precioTexto.replace('$', '').replace(/\./g, ''));
            let productoExistente = carrito.find(p => p.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 });
            }

            guardarCarrito();
            actualizarContador();

            if (boton.classList.contains('btn-comprar')) {
                window.location.href = 'carrito.html';
            } else {
                alert('Producto agregado al carrito!');
            }
        });
    });

    if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', () => {
        if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
            carrito = [];
            guardarCarrito();
            actualizarContador();
            mostrarVistaPrevia(); // Actualiza la vista previa
        }
    });
}

    actualizarContador();
});
