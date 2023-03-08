// Select inputs
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password1");
const confirmPasswordInput = document.querySelector("#password2");

const inputs = document.querySelectorAll("input");

// Select form
const form = document.querySelector("#main-form");

// Functions
function displayError(inputElement, errorMessage) {
    setValueState(inputElement, "invalid");

    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = "* " + errorMessage;
};

function setValueState(inputElement, newValue) {
    inputElement.dataset.valuestate = newValue;
}

// Validations
function validateGenericInput(inputElement) {
    if (inputElement.value.length == 0) {
        displayError(inputElement, "Field cannot be empty");
    } else {
        setValueState(inputElement, "valid");
    }
}

//Events
form.addEventListener("submit", e => {
    e.preventDefault();
});

inputs.forEach(input => {
    input.addEventListener("change", e => {
        validateGenericInput(e.target);
    });
});