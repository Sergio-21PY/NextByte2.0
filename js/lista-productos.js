// Datos de ejemplo para los productos
const productos = [
    {
        id: 1,
        nombre: "Monitor Xiaomi G34WQi",
        precio: 195990,
        categoria: "monitores",
        imagen: "imagenes/monitor/frontal-monitor.jpg",
        enlace: "monitor.html"
    },
    {
        id: 2,
        nombre: "ATTACK SHARK Ajazz AK820 Pro",
        precio: 99990,
        categoria: "teclados",
        imagen: "imagenes/teclado/teclado-ajazz.jpg",
        enlace: "teclado.html"
    },
    {
        id: 3,
        nombre: "Logitech G502 Hero",
        precio: 70000,
        categoria: "mouses",
        imagen: "imagenes/mouse/mouse-img2.webp",
        enlace: "mouse.html"
    },
    {
        id: 4,
        nombre: "Silla Gamer Ergonómica",
        precio: 249990,
        categoria: "sillas",
        imagen: "imagenes/silla/silla-gamer.jpg",
        enlace: "silla.html"
    },
    {
        id: 5,
        nombre: "Auriculares HyperX Cloud II",
        precio: 89990,
        categoria: "audio",
        imagen: "imagenes/audio/auriculares-hyperx.jpg",
        enlace: "auriculares.html"
    },
    {
        id: 6,
        nombre: "Monitor Samsung Odyssey",
        precio: 299990,
        categoria: "monitores",
        imagen: "imagenes/monitor/samsung-odyssey.jpg",
        enlace: "monitor-samsung.html"
    },
    {
        id: 7,
        nombre: "Teclado Mecánico Redragon",
        precio: 59990,
        categoria: "teclados",
        imagen: "imagenes/teclado/redragon.jpg",
        enlace: "teclado-redragon.html"
    },
    {
        id: 8,
        nombre: "Mouse Inalámbrico Razer",
        precio: 89990,
        categoria: "mouses",
        imagen: "imagenes/mouse/razer.jpg",
        enlace: "mouse-razer.html"
    }
];

// Función para formatear precios
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);
}

// Función para mostrar productos
function mostrarProductos(productosMostrar) {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';
    
    productosMostrar.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto-card';
        productoElement.innerHTML = `
            <a href="${producto.enlace}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            </a>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                <button class="producto-btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        
        productosGrid.appendChild(productoElement);
    });
}

// Función para filtrar productos
function filtrarProductos() {
    const categoriaSeleccionada = document.querySelector('.categoria-btn.active').dataset.categoria;
    const precioMaximo = parseInt(document.getElementById('rango-precio').value);
    
    let productosFiltrados = productos;
    
    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaSeleccionada);
    }
    
    // Filtrar por precio
    productosFiltrados = productosFiltrados.filter(producto => producto.precio <= precioMaximo);
    
    mostrarProductos(productosFiltrados);
}

// Función para agregar al carrito (simulada)
function agregarAlCarrito(idProducto) {
    alert(`Producto ${idProducto} agregado al carrito`);
    // Aquí iría la lógica real para agregar al carrito
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar todos los productos inicialmente
    mostrarProductos(productos);
    
    // Configurar eventos para los filtros
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarProductos();
        });
    });
    
    // Configurar evento para el rango de precio
    const rangoPrecio = document.getElementById('rango-precio');
    const valorPrecio = document.getElementById('valor-precio');
    
    rangoPrecio.addEventListener('input', function() {
        valorPrecio.textContent = `Hasta: ${formatearPrecio(parseInt(this.value))}`;
        filtrarProductos();
    });
});