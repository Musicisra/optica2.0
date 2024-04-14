const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    // Insertar en la tabla del carrito
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 >
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">Eliminar</a>
        </td>
    `;
    lista.appendChild(row);
    
    // Almacenar el elemento en el almacenamiento local
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(elemento);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Calcular y mostrar el total de la compra
    calcularTotalCompra();
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento, elementoID;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoID = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    localStorage.removeItem('carrito'); // Limpiar el almacenamiento local al vaciar el carrito

    // Reiniciar el total de la compra
    document.getElementById('total').value = '';
    
    return false;
}

function calcularTotalCompra() {
    let totalCompra = 0;
    const precios = document.querySelectorAll('#lista-carrito .precio');
    precios.forEach(function(precio) {
        totalCompra += parseFloat(precio.textContent.replace('$', ''));
    });

    // Mostrar el total de la compra en el formulario
    document.getElementById('total').value = `$${totalCompra.toFixed(2)}`;
}

// Función para actualizar el campo oculto de nombres de productos
function actualizarNombresProductos() {
    let nombres = [];
    const filas = document.querySelectorAll('#lista-carrito tbody tr');
    filas.forEach(function(fila) {
        const nombreProducto = fila.querySelector('td:nth-child(2)').textContent.trim();
        nombres.push(nombreProducto);
    });
    document.getElementById('nombres-productos-caballeros').value = nombres.join(', ');
}
// Configurar los nombres de los productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay elementos en el carrito almacenados en el localStorage
    if (localStorage.getItem('carrito')) {
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        const nombresProductosInput = document.getElementById('nombres-productos-caballeros');
        
        // Obtener los nombres de los productos del carrito
        const nombresProductos = carrito.map(elemento => elemento.titulo).join(', ');
        
        // Configurar el valor del campo de entrada como los nombres de los productos
        nombresProductosInput.value = nombresProductos;
        
        // Hacer que el campo de entrada sea de solo lectura
        nombresProductosInput.setAttribute('readonly', 'readonly');
        // Desactivar la posibilidad de enfocar el campo de entrada
        nombresProductosInput.tabIndex = -1;
    }
});
document.getElementById('comprar-btn').addEventListener('click', function() {
    window.location.href = 'ComprasNiños.html';
});
