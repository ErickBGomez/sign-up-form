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
function setInvalidInput(inputElement, errorMessage = "", displayHelp = false) {
    setValueState(inputElement, "invalid");
    changeInputIcon(inputElement, "cancel");

    // Change info-validation error message
    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = errorMessage;

    const helpValidationIcon = inputElement.parentElement.querySelector(".help-validation");

    helpValidationIcon.style.visibility = (displayHelp) ? "visible" : "hidden";
}

function setValidInput(inputElement) {
    setValueState(inputElement, "valid");
    changeInputIcon(inputElement, "check_circle");
    
    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    validationSpan.innerText = "* No errors found";
}

function setValueState(inputElement, newValue) {
    inputElement.dataset.valuestate = newValue;
}

function changeInputIcon(inputElement, newIconString) {
    const inputIcon = inputElement.parentElement.querySelector(".icon-validation");
    inputIcon.innerText = newIconString;
}

// Validations

function validateInputValue(inputElement, regexPattern = "skip", patternErrorMessage = "Not a valid value", delay = 0) {
    const delayedValidations = () => {
        // Empty inputs
        if (inputElement.value.length == 0) {
            setInvalidInput(inputElement, "Field cannot be empty", false);
        }
        else if (regexPattern !== "skip") {
            // Regex pattern
            if (!checkRegexPattern(inputElement.value, regexPattern)) {
                setInvalidInput(inputElement, patternErrorMessage, true);
            }
            // No errors found:
            else {
                setValidInput(inputElement);
            }
        }
        // Inputs will keep "none" valueState if they skip regexPattern
    };
    
    clearTimeout(delayedValidations);
    setTimeout(delayedValidations, delay);
}

function checkRegexPattern(inputValue, regexPattern) {
    // Skip regexPatternValidation
    if (regexPattern === "skip") return true;
    
    const regex = regexPattern;
    return regex.test(inputValue);
}

function confirmPassword(delay = 0) {
    const delayedConfirm = () => {
        if (!((passwordInput.dataset.valuestate !== "none") && 
            (confirmPasswordInput.dataset.valuestate !== "none" || confirmPasswordInput.value)))
        return;

        if (passwordInput.value === confirmPasswordInput.value) {
            if (passwordInput.dataset.valuestate === "invalid") {
                setInvalidInput(confirmPasswordInput);
            } else {
                setValidInput(confirmPasswordInput);
            }
        } else {
            setInvalidInput(confirmPasswordInput, "Passwords don't match", false);
        }
    };

    clearTimeout(delayedConfirm);
    setTimeout(delayedConfirm, delay);
}


//Events
form.addEventListener("submit", e => {
    inputs.forEach(input => {
        validateInputValue(input);
    })
    
    e.preventDefault();
});



firstNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid name", validationDelay));
lastNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid last name", validationDelay));

emailInput.addEventListener("input", e => validateInputValue(e.target, emailRegex, "Not a valid email", validationDelay));
phoneNumberInput.addEventListener("input", e => validateInputValue(e.target, phoneRegex, "Not a valid phone number", validationDelay));

passwordInput.addEventListener("input", e => validateInputValue(e.target, passwordRegex, "Not a strong password", validationDelay));
// confirmPasswordInput is the only one to skip regexPattern just to validate if value is empty
confirmPasswordInput.addEventListener("input", e => validateInputValue(e.target, null, null, validationDelay));

passwordInput.addEventListener("input", e => confirmPassword(validationDelay));
confirmPasswordInput.addEventListener("input", e => confirmPassword(validationDelay));

inputs.forEach(input => input.addEventListener("input", e => setValueState(e.target, "none")));