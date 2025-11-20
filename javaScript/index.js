
// CARROUSEL

// Indice inicial del slide
let slideIndex = 0;

// Selecciona todos los slides dentro del contenedor .carrousel
const slides = document.querySelectorAll(".carrousel .slide");

//Llama a los botones de navegacion
const prevBtn = document.querySelector(".carrousel .prev");
const nextBtn = document.querySelector(".carrousel .next");

// Mostrar slide según índice
function showSlide(n) {
    // Quita la clase 'active' de todos los slides 
    slides.forEach(slide => slide.classList.remove("active"));
    //Hace que se muestre
    slides[n].classList.add("active");
}

// Botón siguiente
function nextSlide() {
    slideIndex++; // Incrementa índice
    if (slideIndex >= slides.length) slideIndex = 0;  // Si supera el ultimo, vuelve al primero
    showSlide(slideIndex); // Muestra el correspondiente
}

// Botón anterior
function prevSlide() {
    slideIndex--; // Decrementa indice
    if (slideIndex < 0) slideIndex = slides.length - 1; // Si es menor que 0, va al ultimo
    showSlide(slideIndex);
}

// Eventos botones
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
