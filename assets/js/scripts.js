// assets/js/scripts.js

// --- Theme toggle (light / dark) ---
function currentTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeIcon() {
    const icon = document.querySelector("#theme-toggle i");
    if (icon) icon.className = currentTheme() === "dark" ? "fas fa-sun" : "fas fa-moon";
}

function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { }
    updateThemeIcon();
}


// --- Slideshow Functionality ---
let slideIndex = 1;
let slideshowInterval;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Exit if no slideshow elements are found
    if (slides.length === 0) return;

    // Handle slide index overflow
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Deactivate all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide
    slides[slideIndex - 1].style.display = "block";
    // Activate the current dot, if dots exist
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
    }
}

function plusSlides(n) {
    clearInterval(slideshowInterval); // Stop auto-play on manual navigation
    showSlides(slideIndex += n);
    startSlideshow(); // Restart auto-play after a delay
}

function currentSlide(n) {
    clearInterval(slideshowInterval); // Stop auto-play on manual navigation
    showSlides(slideIndex = n);
    startSlideshow(); // Restart auto-play after a delay
}

function startSlideshow() {
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        // Clear any existing interval to prevent multiple intervals running
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000); // Change image every 5 seconds
    }
}

// --- Scroll Progress Bar ---
function scrollProgressBar() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Calculate the scrolled percentage, handle division by zero for short pages
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
}

// --- Initialize all functionalities on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    updateThemeIcon();

    // Initialize Slideshow if elements exist
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
        startSlideshow();
    }

    // Attach Scroll Progress Bar event listener
    window.addEventListener('scroll', scrollProgressBar);
});