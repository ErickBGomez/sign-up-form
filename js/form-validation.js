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

function validateInputValue(inputElement, regexPattern) {
    if (inputElement.value.length == 0) {
        setInvalidInput(inputElement, "Field cannot be empty");
    } else if (!checkRegexPattern(inputElement.value, regexPattern)) {
        setInvalidInput(inputElement, "Not a valid value");
    } else {
        setValidInput(inputElement);
    }
}

function checkRegexPattern(inputValue, regexPattern) {
    const regex = regexPattern;
    return regex.test(inputValue);
}


//Events
form.addEventListener("submit", e => {
    e.preventDefault();
});



firstNameInput.addEventListener("change", e => validateInputValue(e.target, nameRegex));
lastNameInput.addEventListener("change", e => validateInputValue(e.target, nameRegex));

emailInput.addEventListener("change", e => validateInputValue(e.target, emailRegex));
phoneNumberInput.addEventListener("change", e => validateInputValue(e.target, phoneRegex));