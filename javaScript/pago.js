//Muestra el resumen de compra y maneja el pago

document.addEventListener("DOMContentLoaded", () => {
    cargarResumen(); //Muestra los productos que estan en el carrito
    manejarPago(); //Configura la logica del formulario
});

function cargarResumen() {
    const resumen = document.getElementById("resumen-items");
    const totalTexto = document.getElementById("total-pago");

    //Obtiene el carrito de localStorage si esta vacio, no devulve nada
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    resumen.innerHTML = "";
    let total = 0;

    carrito.forEach((p) => {
        const item = document.createElement("div");
        item.classList.add("resumen-item");

        //Agrega el contenido HTML del producto
        item.innerHTML = `
            <p><strong>${p.nombre}</strong> (${p.color ? "Color: " + p.color : "Sin color"})</p>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Precio: ${p.precio} ARS</p>
            <hr>
        `;

        resumen.appendChild(item);

        total += p.precio * p.cantidad;
    });

    totalTexto.textContent = `${total} ARS`;
}
function manejarPago() {
    //Selecciona el formulario de pagar
    const form = document.getElementById("formPago");
    //Deteca cuando el usuario presiona sumbit 
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validación de la tarjeta
        const numTarjeta = form.numTarjeta.value.trim();
        const cvv = form.cvv.value.trim();
        //Comprueba que el numero de tarjeta tenga 16 digitos y sea numeros
        if (numTarjeta.length !== 16 || isNaN(numTarjeta)) {
            alert("El número de tarjeta debe tener 16 dígitos.");
            return;
        }
        //Comprueba que el CVV tenga 3 digitos y sean numeros
        if (cvv.length !== 3 || isNaN(cvv)) {
            alert("El CVV debe tener 3 dígitos.");
            return;
        }

        alert("Pago realizado con éxito");

        // Vaciar carrito
        localStorage.removeItem("carrito");

        // Redirigir la pagina de productos
        window.location.href = "./productos.html";
    });
}
