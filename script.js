

let cart = [];

const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total");
const addCartButtons = document.querySelectorAll(".add-cart");


addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            quantity: 1
        };

        addToCart(product);

    });

});


function addToCart(product){

    const existing = cart.find(item => item.id === product.id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push(product);

    }

    updateCart();

}

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

 cartItems.innerHTML += `
    <div class="cart-item">

        <div class="cart-info">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
        </div>

        <div class="cart-qty">
            <button class="minus" data-id="${item.id}">-</button>

            <span>${item.quantity}</span>

            <button class="plus" data-id="${item.id}">+</button>
        </div>

    </div>
`;

    });

document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {

        const item = cart.find(p => p.id === btn.dataset.id);

        if(item){
            item.quantity++;
            updateCart();
        }

    });
});

document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {

        const item = cart.find(p => p.id === btn.dataset.id);

        if(item){

            item.quantity--;

            if(item.quantity <= 0){
                cart = cart.filter(p => p.id !== item.id);
            }

            updateCart();
        }

    });
});



    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // cartTotal.textContent = "$" + total.toFixed(2);
cartTotal.innerHTML = `
    <span>Total</span>
    <h3>₹${total}</h3>
`;
}


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.getElementById("header");


menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


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



const loginBtn = document.querySelector(".login-btn");
const authOverlay = document.getElementById("authOverlay");
const closeAuth = document.getElementById("closeAuth");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


loginBtn.addEventListener("click", () => {

    authOverlay.classList.add("active");

});


closeAuth.addEventListener("click", () => {

    authOverlay.classList.remove("active");

});


authOverlay.addEventListener("click", (e) => {

    if (e.target === authOverlay) {

        authOverlay.classList.remove("active");

    }

});



document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        authOverlay.classList.remove("active");

    }

});



loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

});



registerTab.addEventListener("click", () => {

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

});



const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCart = document.querySelector(".close-cart");

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});


closeCart.addEventListener("click", closeCartSidebar);


cartOverlay.addEventListener("click", closeCartSidebar);


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartSidebar();
    }
});

// Close Function
function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
}




/* ==========================================
            SEARCH POPUP
========================================== */

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const searchOverlay = document.querySelector(".search-overlay");
const closeSearch = document.querySelector(".close-search");
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.querySelector(".search-submit");
const menuCards = document.querySelectorAll(".menu-card");
const searchText = document.querySelector(".search-result-text");

// Open Popup
searchBtn.addEventListener("click", () => {
    searchPopup.classList.add("active");
    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    searchInput.value = "";
    searchInput.focus();

    menuCards.forEach(card => {
        card.style.display = "";
    });

    searchText.innerHTML = "Start typing to search delicious food...";
});

// Close Popup
function closeSearchPopup() {
    searchPopup.classList.remove("active");
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";

    searchInput.value = "";

    menuCards.forEach(card => {
        card.style.display = "";
    });

    searchText.innerHTML = "Start typing to search delicious food...";
}

closeSearch.addEventListener("click", closeSearchPopup);
searchOverlay.addEventListener("click", closeSearchPopup);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSearchPopup();
    }
});

// Search Function
function searchFood() {

    const value = searchInput.value.trim().toLowerCase();

    let foundCard = null;
    let count = 0;

    menuCards.forEach(card => {

        const foodName = card.dataset.name.toLowerCase();

        if (foodName.includes(value)) {

            card.style.display = "";

            count++;

            if (!foundCard) {
                foundCard = card;
            }

        } else {

            card.style.display = "none";

        }

    });

    if (value === "") {

        searchText.innerHTML = "Start typing to search delicious food...";

    } else if (count > 0) {

        searchText.innerHTML = `${count} item found`;

    } else {

        searchText.innerHTML = "❌ No food found";

    }

    return foundCard;
}

// Live Search
searchInput.addEventListener("input", searchFood);

// Search Button
searchSubmit.addEventListener("click", () => {

    const card = searchFood();

    if (card) {

        closeSearchPopup();

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});

// ENTER KEY
searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        const card = searchFood();

        if (card) {

            closeSearchPopup();

            setTimeout(() => {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 200);

        }

    }

});



const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "checkout.html";

});