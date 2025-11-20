//BUSCADOR DE PRODUCTOS

const inputBuscar = document.getElementById("Buscar"); //Almacena lo que el usuario ponga en el input de busqueda
const productos = document.querySelectorAll(".productos");

inputBuscar.addEventListener("input", () => {
    
    const texto = inputBuscar.value.toLowerCase(); //Convierte lo escrito en minusculas
    
    productos.forEach(prod => {
        //Obtiene nombre y descripcion del producto
        const nombre = prod.querySelector("h4, .nombreBotella, .nombreProd").textContent.toLowerCase();
        const descripcion = prod.querySelector(".descripcion").textContent.toLowerCase();

        // Si coincide con el nombre lo muestra
        if (nombre.includes(texto)) {
            prod.style.display = "block";
        } 
        else {
            prod.style.display = "none";
        }
    });
});

//FILTRADO POR CATEGORIA
const selectCat = document.getElementById("categoria");

selectCat.addEventListener("change", () => {

    const categoria = selectCat.value; 
    productos.forEach(prod => {
        const catProd = prod.dataset.cat; //Obtiene la categoria del producto

        if (categoria === "Tlc") {
            prod.style.display = "block"; // Mostrar todos
        }
        else if (categoria === catProd) {
            prod.style.display = "block"; //Coincide con la categora
        }
        else {
            prod.style.display = "none"; 
        }
    });
});

//CAMBIAR IMAGEN SEGUN COLOR

const selectsColor = document.querySelectorAll(".color");
//Recorre todos los select de color que hay en productos
selectsColor.forEach(select => {

    select.addEventListener("change", function () {
        //This se refiere al select que se esta usando
        const imagen = this.closest(".productos").querySelector("img");
        //Busca la imagen del producto dentro del mismo contenedor
        const opcion = this.selectedOptions[0]; // opcion elegida
        const nuevaImg = opcion.dataset.img;// Toma la ruta de la imagen

        if (nuevaImg && nuevaImg.trim() !== "") {
            //Si existe la ruta y no esta vacia actualiza la imagen del producto con la nueva segun el color elegido
            imagen.src = nuevaImg;
        }
    });

});

//AGREGAR PRODUCTO
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    //Recorre cada boton y le asigna un evento de click
    botonesAgregar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const producto = btn.closest("article");
            //Datos del producto 
            const nombre = producto.querySelector("h4, .nombreBotella, .nombreProd").textContent.trim();
            const precioTexto = producto.querySelector(".precio").textContent.replace("ARS", "").trim();
            const precio = parseInt(precioTexto.replace(".", "").replace(",", ""));
            //Guarda la imagen del producto 
            let imagen = producto.querySelector("img").src;
            let color = null;

            // Si el producto tiene selector de color
            const selectorColor = producto.querySelector(".color");
            if (selectorColor) {
                color = selectorColor.value; //Color elegido
                const imgColor = selectorColor.selectedOptions[0].dataset.img;
                if (imgColor) imagen = imgColor; //actualiza imagen segun color
            }

            // Agrega el producto al carrito
            agregarAlCarrito({
                nombre,
                precio,
                imagen,
                color,
                cantidad: 1
            });

            alert("Producto agregado al carrito.");
            window.location.href = "./carrito.html";
        });
    });
});

//FUNCION PARA AGREGAR PRODUCTO AL CARRITO
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Si ya existe, solo aumenta cantidad
    const existente = carrito.find(p => p.nombre === producto.nombre && p.color === producto.color);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push(producto); //Agrega nuevo producto
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); //Guarda el carrito actualizado
}
