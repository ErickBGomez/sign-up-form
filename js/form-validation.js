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

// 1. Name Input
function validateNameInput(inputElement) {
    if (!checkRegexPattern(inputElement.value, /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)) {
        setInvalidInput(inputElement, "Not a valid name");
    } else {
        setValidInput(inputElement);
    }
}

// 2. Email Input
function validateEmailInput(inputElement) {
    if (!checkRegexPattern(inputElement.value, /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        setInvalidInput(inputElement, "Not a valid email address");
    } else {
        setValidInput(inputElement);
    }
}

// 3. Phone Input
function validatePhoneInput(inputElement) {
    if (!checkRegexPattern(inputElement.value, /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)) {
        setInvalidInput(inputElement, "Not a valid phone number");
    } else {
        setValidInput(inputElement);
    }
}

function checkRegexPattern(inputValue, regexPattern) {
    const regex = regexPattern;
    return regex.test(inputValue);
}

// 3. Generic Input
function validateGenericInput(inputElement) {
    if (inputElement.value.length == 0) {
        setInvalidInput(inputElement, "Field cannot be empty");
    }
}


//Events
form.addEventListener("submit", e => {
    e.preventDefault();
});



firstNameInput.addEventListener("change", e => validateNameInput(e.target));
lastNameInput.addEventListener("change", e => validateNameInput(e.target));

emailInput.addEventListener("change", e => validateEmailInput(e.target));
phoneNumberInput.addEventListener("change", e => validatePhoneInput(e.target));

inputs.forEach(input => {
    input.addEventListener("change", e => {
        validateGenericInput(e.target);
    });
});