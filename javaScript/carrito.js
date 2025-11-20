/*Para manejar el carrito de compras y sesión
Se encarga de mostrar los productos en el carrito,actualizar cantidades, eliminar productos, calcular total,
y verificar si el usuario está logueado antes de permitir la compra.*/

/*Espera que todo este cargado antes de ejecuta */
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito(); /*Muestra los elementos almacenados en localStorage*/
    verificarSesion(); /*Verifica que el usuario este logueado*/
});

function mostrarCarrito() {
    const contenedor = document.querySelector(".carrito-items"); /*Establece una constante en el contenedor donde se mostraran los productos*/
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; /*Obtiene el carrito de localStorage o incia vacio*/

    /*Limpia el contenedor antes de volver a cargar*/
    contenedor.innerHTML = "";

    /*Recorre cada producto del carrito y lo muestra*/
    carrito.forEach((p, index) => {
        const item = document.createElement("div"); //Crea un div para cada elemento
        item.classList.add("carrito-item"); //Añade una clasepara los estilos css
        //Ayuda a insertar contenido del producto que compramos
        item.innerHTML = `
            <div class="carrito-img">
                <img src="${p.imagen}">
            </div>

            <div class="carrito-info">
                <h4>${p.nombre}</h4>
                <span class="carrito-precio">${p.precio} ARS</span>

                ${p.color ? `<p>Color: <strong>${p.color}</strong></p>` : ""}

                <label>Cantidad:</label>
                <input type="number" class="input-cantidad" value="${p.cantidad}" min="1" data-index="${index}">
            </div>

            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        //Agrega el producto al contenedor
        contenedor.appendChild(item);
    });

    actualizarTotal(); //Calcula y muestra el total actualizado
    activarEventos(); //Se activa cuando ocurre un cambio de cantidad o si se elimina
}

function activarEventos() {
    document.querySelectorAll(".input-cantidad").forEach(input => {
        input.addEventListener("change", (e) => {
            let carrito = JSON.parse(localStorage.getItem("carrito")); //Obtiene el carrito
            const index = e.target.dataset.index; //Identifica el producto

            carrito[index].cantidad = parseInt(e.target.value); //Actualiza cantidad
            localStorage.setItem("carrito", JSON.stringify(carrito)); //Guarda en localStorage
            actualizarTotal();
        });
    });

    //Eliminar producto
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let carrito = JSON.parse(localStorage.getItem("carrito"));
            const index = e.target.dataset.index;

            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    });

    //Boton comprar
    document.querySelector(".btn-comprar").addEventListener("click", () => {
        //Verifica que el usuario este loggueado
        if (localStorage.getItem("isLogged") !== "true") {
            alert("Debes iniciar sesión para pagar.");
            window.location.href = "./iniciarSesion.html";
            return;
        }
        alert("Redirigiendo al pago...");
        window.location.href = "./pago.html";
    });
    //Si el carrito esta vacio envia una alerta
    document.querySelector(".btn-comprar").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    //Redirigir a la pagina de pago
    window.location.href = "./pago.html";
});

}

function actualizarTotal() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //Calcula la multiplicacion de precio y cantidad de todos los productos
    let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    document.getElementById("total-carrito").textContent = total + " ARS";
}
//Bloquea el boton de comprar si el usuario no esta loggueado
function verificarSesion() {
    const btn = document.querySelector(".btn-comprar");
    //Lo desactivo y lo vuelve gris
    if (localStorage.getItem("isLogged") !== "true") {
        btn.style.background = "gray";
        btn.disabled = true;
    }
}

