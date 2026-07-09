const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.getElementById("header");

// Mobile Menu
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Scroll Navbar
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
    easing: "ease-in-out"
});


/* ==========================================
        LOGIN / REGISTER POPUP
========================================== */

const loginBtn = document.querySelector(".login-btn");
const authOverlay = document.getElementById("authOverlay");
const closeAuth = document.getElementById("closeAuth");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/* OPEN POPUP */

loginBtn.addEventListener("click", () => {

    authOverlay.classList.add("active");

});

/* CLOSE BUTTON */

closeAuth.addEventListener("click", () => {

    authOverlay.classList.remove("active");

});

/* OUTSIDE CLICK */

authOverlay.addEventListener("click", (e) => {

    if (e.target === authOverlay) {

        authOverlay.classList.remove("active");

    }

});

/* ESC KEY */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        authOverlay.classList.remove("active");

    }

});

/* LOGIN TAB */

loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

});

/* REGISTER TAB */

registerTab.addEventListener("click", () => {

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

});


