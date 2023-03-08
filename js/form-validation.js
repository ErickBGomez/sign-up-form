// Select inputs
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password1");
const confirmPasswordInput = document.querySelector("#password2");

// Select form
const form = document.querySelector("#main-form");

form.addEventListener("submit", e => {
    e.preventDefault();
})