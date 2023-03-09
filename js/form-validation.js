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
    // Empty inputs (All elements)
    if (inputElement.value.length == 0) {
        setInvalidInput(inputElement, "Field cannot be empty");
    }
    // Regex pattern (Names, Email, Phone, Password1)
    else if (!checkRegexPattern(inputElement.value, regexPattern)) {
        setInvalidInput(inputElement, patternErrorMessage);
    }
    // No errors found:
    else {
        setValidInput(inputElement);
    }
}

function checkRegexPattern(inputValue, regexPattern) {
    const regex = regexPattern;
    return regex.test(inputValue);
}

function confirmPassword() {
    if (!(confirmPasswordInput.value === passwordInput.value)) {
        setInvalidInput(confirmPasswordInput);
        setInvalidInput(passwordInput, "Passwords don't match");
    } else {
        setValidInput(confirmPasswordInput);
    }
}


//Events
form.addEventListener("submit", e => {
    e.preventDefault();
});



firstNameInput.addEventListener("change", e => validateInputValue(e.target, nameRegex, "Not a valid name"));
lastNameInput.addEventListener("change", e => validateInputValue(e.target, nameRegex, "Not a valid last name"));

emailInput.addEventListener("change", e => validateInputValue(e.target, emailRegex, "Not a valid email"));
phoneNumberInput.addEventListener("change", e => validateInputValue(e.target, phoneRegex, "Not a valid phone number"));

passwordInput.addEventListener("change", e => validateInputValue(e.target, passwordRegex, "Not a strong password"));
confirmPasswordInput.addEventListener("change", confirmPassword);