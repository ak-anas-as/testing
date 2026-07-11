const orderItems = document.querySelector(".order-items");
const totalPrice = document.querySelector(".total h3:last-child");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

orderItems.innerHTML = "";

cart.forEach(item=>{

    total += item.price * item.quantity;

    orderItems.innerHTML += `

        <div class="order-item">

            <span>${item.name} × ${item.quantity}</span>

            <span>₹${item.price * item.quantity}</span>

        </div>

    `;

});

totalPrice.innerHTML = "₹" + total;



/* ==========================================
            CHECKOUT JS
========================================== */

const checkoutForm = document.getElementById("checkoutForm");
const placeOrderBtn = document.querySelector(".place-order");

placeOrderBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const fullName = checkoutForm.querySelector('input[type="text"]').value.trim();
    const phone = checkoutForm.querySelector('input[type="tel"]').value.trim();
    const email = checkoutForm.querySelector('input[type="email"]').value.trim();
    const address = checkoutForm.querySelector("textarea").value.trim();

    const city = checkoutForm.querySelectorAll('input[type="text"]')[1].value.trim();
    const pincode = checkoutForm.querySelectorAll('input[type="text"]')[2].value.trim();

    if (
        fullName === "" ||
        phone === "" ||
        email === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert("⚠ Please fill all required fields.");

        return;

    }

    if (phone.length < 10) {

        alert("⚠ Enter a valid phone number.");

        return;

    }

    if (pincode.length < 6) {

        alert("⚠ Enter a valid pincode.");

        return;

    }

    placeOrderBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...';

    placeOrderBtn.disabled = true;

    setTimeout(() => {

        window.location.href = "order-success.html";

    }, 2000);

});

