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
    if(e.target.classList.contains('agregar-carrito')) {
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
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
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
            <a herf="#" classs="borrar" data-id="${elemento.id}"></a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoID;
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoID = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}

// Agregar función para calcular el total
function calcularTotal() {
    let total = 0;
    const precios = document.querySelectorAll('#lista-carrito tbody tr td:nth-child(3)');
    precios.forEach(precio => {
        const cantidad = parseFloat(precio.textContent.slice(2)); // Eliminar 'S/' y convertir a número
        total += cantidad;
    });
    return total;
}

// Agregar evento al botón "Comprar"
document.getElementById('comprar-btn').addEventListener('click', () => {
    const total = calcularTotal();
    // Mostrar modal con el resumen de la compra y formulario
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    // Mostrar el total en el modal
    document.getElementById('total-compra').textContent = 'Total: S/' + total.toFixed(2);
});

// Agregar evento para enviar el formulario
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    console.log("Evento de envío del formulario activado"); // Verifica si se activa correctamente

    // Recolectar los datos del formulario
    var nombre = document.querySelector('[name="nombre"]').value;
    var correo = document.querySelector('[name="correo"]').value;
    var direccion = document.querySelector('[name="direccion"]').value;
    var numero = document.querySelector('[name="numero"]').value;

    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Dirección:", direccion);
    console.log("Número de teléfono:", numero);

    // Construir el mensaje de WhatsApp
    var mensaje = "Hola, soy " + nombre + ". Mi correo es " + correo + ", mi dirección es " + direccion + " y mi número de teléfono es " + numero + ". ¿Cómo puedo hacer un pedido?";

    console.log("Mensaje de WhatsApp:", mensaje);

    // Codificar el mensaje para incluirlo en el enlace
    var mensajeCodificado = encodeURIComponent(mensaje);

    // Generar el enlace de WhatsApp Web con el mensaje predefinido
    var enlaceWhatsApp = "https://wa.me/51936251840?text=" + mensajeCodificado;

    console.log("Enlace de WhatsApp:", enlaceWhatsApp);

    // Abrir WhatsApp Web en una nueva pestaña del navegador
    window.open(enlaceWhatsApp);
});




