// REGISTRO DE USUARIO

// Selecciona el formulario de registro
const registerForm = document.getElementById("register-form");

if (registerForm) {
    // Detecta el evento submit 
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        //Obtiene los valores de los inputs
        const nombre = document.getElementById("reg-nombre").value;
        const email = document.getElementById("reg-email").value;
        const pass = document.getElementById("reg-pass").value;
        //Crea un objeto usuario con los datos
        const usuario = {
            nombre: nombre,
            email: email,
            password: pass
        };

        //Guarda el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert("Registro exitoso. Ahora iniciá sesión.");
        //Dirige a la pagina de iniciar sesion
        window.location.href = "iniciarSesion.html";
    });
}

// INICIO DE SESION
// Selecciona el formulario de login
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtiene valores ingresados por el usuario
        const email = document.getElementById("login-email").value;
        const pass = document.getElementById("login-pass").value;

        // Recupera el usuario guardado en localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        //Si no hay usuario ingresado muestra una alerta
        if (!usuarioGuardado) {
            alert("Todavía no existe ninguna cuenta registrada.");
            return;
        }
        // Verifica si el email y contraseña coinciden
        if (email === usuarioGuardado.email && pass === usuarioGuardado.password) {
            // Marca al usuario como logueado
            localStorage.setItem("isLogged", "true");
            alert("Sesión iniciada correctamente.");
            //Dirige automaticamente a la pagina de inicio
            window.location.href = "../index.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
}

//Mensaje de saludo

function mostrarSaludo() {
    const mensaje = document.getElementById("mensaje-usuario");
    if (!mensaje) return;

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const isLogged = localStorage.getItem("isLogged");
    //Si esta loggueado muestra saludo + el nombre del usuario
    if (isLogged === "true" && usuarioGuardado) {
        mensaje.textContent = "Hola, " + usuarioGuardado.nombre;
    } else {
        mensaje.textContent = ""; // si no hay sesion, se limpia
    }
}

mostrarSaludo();

//Detecta si el archivo donde estamos esta dentro de /pages o no
const estaEnPages = window.location.pathname.includes("/pages/");

//Cambiar el boton de registrarse a cerrar sesion cuando el usuario lo haya hecho

function actualizarBotonUsuario() {
    const btn = document.getElementById("btn-login-logout");
    if (!btn) return;

    const isLogged = localStorage.getItem("isLogged");
    //Si esta loggueado el boton se transforma para que se pueda cerrar sesion
    if (isLogged === "true") {
        btn.textContent = "Cerrar sesión";
        btn.onclick = function () {
            localStorage.removeItem("isLogged");
            alert("Sesión cerrada.");
            //Redirige al inicio si estamos /pages
            if (estaEnPages) {
                window.location.href = "../index.html";
            } else {
                window.location.href = "index.html";
            }
        };
    } else {
        //Si no inicio sesion, redirige a registrarse
        btn.textContent = "Registrarse";
        btn.onclick = function () {
            if (estaEnPages) {
                window.location.href = "./register.html"; 
            } else {
                window.location.href = "pages/register.html";
            }
        };
    }
}

actualizarBotonUsuario();
