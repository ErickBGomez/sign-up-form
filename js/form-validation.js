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
function setInvalidInput(inputElement, errorMessage) {
    setValueState(inputElement, "invalid");

    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = "* " + errorMessage;
};

function setValidInput(inputElement) {
    setValueState(inputElement, "valid");
    
    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = "* No errors found";
}

function setValueState(inputElement, newValue) {
    inputElement.dataset.valuestate = newValue;
}

// Validations
// 1. Generic Input
function validateGenericInput(inputElement) {
    if (inputElement.value.length == 0) {
        setInvalidInput(inputElement, "Field cannot be empty");
    }
}

// 2. Name Input
function validateNameInput(inputElement) {
    if (!checkNamePattern(inputElement.value)) {
        setInvalidInput(inputElement, "Not a valid name");
    } else {
        setValidInput(inputElement);
    }
}

function checkNamePattern(value) {
    const regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return regex.test(value);
}


//Events
form.addEventListener("submit", e => {
    e.preventDefault();
});



firstNameInput.addEventListener("change", e => {
    validateNameInput(e.target);
});

lastNameInput.addEventListener("change", e=> {
    validateNameInput(e.target);
});

inputs.forEach(input => {
    input.addEventListener("change", e => {
        validateGenericInput(e.target);
    });
});