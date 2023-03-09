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

// Define regex patterns
// Name Regex credits: https://regexr.com/3f8cm
const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
// Email Regex credits: https://regexr.com/2rhq7
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// Phone Regex credits: https://regexr.com/37juu
const phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
// Password Regex credits: https://regexr.com/3bfsi
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationDelay = 750;

// Add a Stack or Queue to count how many inputs are invalid

// Functions
function setInvalidInput(inputElement, errorMessage = "") {
    setValueState(inputElement, "invalid");

    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = errorMessage;
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

function validateInputValue(inputElement, regexPattern, patternErrorMessage = "Not a valid value") {
    const delayedValidations = () => {
        // Empty inputs
        if (inputElement.value.length == 0) {
            setInvalidInput(inputElement, "Field cannot be empty");
        }
        // Regex pattern
        else if (!checkRegexPattern(inputElement.value, regexPattern)) {
            setInvalidInput(inputElement, patternErrorMessage);
        }
        // No errors found:
        else {
            setValidInput(inputElement);
        }
    };
    
    clearTimeout(delayedValidations);
    setTimeout(delayedValidations, validationDelay);
}

function checkRegexPattern(inputValue, regexPattern) {
    const regex = regexPattern;
    return regex.test(inputValue);
}

function confirmPassword() {
    const delayedConfirm = () => {
        if (confirmPasswordInput.value == 0) {
            setInvalidInput(confirmPasswordInput, "Field cannot be empty");
        } else if (!(confirmPasswordInput.value === passwordInput.value)) {
            setInvalidInput(confirmPasswordInput);
            setInvalidInput(passwordInput, "Passwords don't match");
        } else {
            setValidInput(confirmPasswordInput);
        }
    };

    clearTimeout(delayedConfirm);
    setTimeout(delayedConfirm, validationDelay);
}


//Events
form.addEventListener("submit", e => {
    alert("Some inputs are invalid");
    e.preventDefault();
});



firstNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid name"));
lastNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid last name"));

emailInput.addEventListener("input", e => validateInputValue(e.target, emailRegex, "Not a valid email"));
phoneNumberInput.addEventListener("input", e => validateInputValue(e.target, phoneRegex, "Not a valid phone number"));

passwordInput.addEventListener("input", e => validateInputValue(e.target, passwordRegex, "Not a strong password"));
confirmPasswordInput.addEventListener("input", confirmPassword);

inputs.forEach(input => input.addEventListener("input", e => setValueState(e.target, "none")));