// Select inputs
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password1");
const confirmPasswordInput = document.querySelector("#password2");

const inputs = document.querySelectorAll("input");

// Array to save valid inputs. This will help to make sure all inputs are valid before sending data
const validInputs = [];

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

// Delay for every input validation
const validationDelay = 750;

const flashMessage = document.querySelector(".flash-message");
const flashClose = flashMessage.querySelector(".flash-close");

// Functions
function setInputState(inputElement, newState, errorMessage = "", displayHelp = false) {
    const inputIcon = inputElement.parentElement.querySelector(".icon-validation");
    const validationSpan = inputElement.parentElement.querySelector(".info-validation");
    const helpValidationIcon = inputElement.parentElement.querySelector(".help-validation");

    inputElement.dataset.valuestate = newState;
    validationSpan.innerText = errorMessage;
    helpValidationIcon.style.visibility = (displayHelp) ? "visible" : "hidden";

    // This could be approached with ternary operator, but "none" state has to be ignored
    if (newState === "valid") inputIcon.innerText = "check_circle";
    else if (newState === "invalid") inputIcon.innerText = "cancel";

    // Count all valid inputs
    if (newState !== "valid" && validInputs.includes(inputElement)) {
        // splice() helps to remove an specific element in the array
        const elementIndex = validInputs.indexOf(inputElement);
        validInputs.splice(elementIndex, 1);
    } else {
        // Add just the valid inputs that were not in the array before
        validInputs.push(inputElement);
    }
}

// Validations
function validateInputValue(inputElement, regexPattern = "skip", patternErrorMessage = "Not a valid value", delay = 0) {
    const delayedValidations = () => {
        // Empty inputs
        if (inputElement.value.length == 0) {
            setInputState(inputElement, "invalid", "Field cannot be empty", false);
        }
        else if (regexPattern !== "skip") {
            // Regex pattern
            if (!checkRegexPattern(inputElement.value, regexPattern)) {
                setInputState(inputElement, "invalid", patternErrorMessage, true);
            }
            // No errors found:
            else {
                setInputState(inputElement, "valid");
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
                setInputState(confirmPasswordInput, "invalid");
            } else {
                setInputState(confirmPasswordInput, "valid");
            }
        } else {
            setInputState(confirmPasswordInput, "invalid", "Passwords don't match", false);
        }
    };

    clearTimeout(delayedConfirm);
    setTimeout(delayedConfirm, delay);
}

//Events:
// Form event (sending data)
form.addEventListener("submit", e => {
    e.preventDefault();

    inputs.forEach(input => {
        validateInputValue(input);
    });

    if (validInputs.length === inputs.length) {
        alert("Form sent successfully!");
        displayFlashMessageBox("success", "Success!", "Your account has been created");
    } else {
        alert("Some inputs are invalid");
        displayFlashMessageBox("error", "Error!", "Please, fill the form correctly");
    }
});

function displayFlashMessageBox(messageType, messageTitle, messageDescription) {
    const flashIcon = flashMessage.querySelector(".flash-icon");
    const flashTitle = flashMessage.querySelector(".flash-title");
    const flashDescription = flashMessage.querySelector(".flash-description");
    
    flashMessage.dataset.messagetype = messageType;
    if (messageType === "success") flashIcon.innerText = "check_circle";
    else flashIcon.innerText = "cancel";

    flashTitle.innerText = messageTitle;
    flashDescription.innerText = messageDescription;



    flashMessage.dataset.visibilitystate = "show";
}

flashClose.addEventListener("click", e => {
    flashMessage.dataset.visibilitystate = "hide";
})

// Input events (generic validation, regex, confirm password and resetting input state)
firstNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid name", validationDelay));
lastNameInput.addEventListener("input", e => validateInputValue(e.target, nameRegex, "Not a valid last name", validationDelay));

emailInput.addEventListener("input", e => validateInputValue(e.target, emailRegex, "Not a valid email", validationDelay));
phoneNumberInput.addEventListener("input", e => validateInputValue(e.target, phoneRegex, "Not a valid phone number", validationDelay));

passwordInput.addEventListener("input", e => validateInputValue(e.target, passwordRegex, "Not a strong password", validationDelay));
// confirmPasswordInput is the only one to skip regexPattern just to validate if value is empty
confirmPasswordInput.addEventListener("input", e => validateInputValue(e.target, undefined, undefined, validationDelay));

passwordInput.addEventListener("input", e => confirmPassword(validationDelay));
confirmPasswordInput.addEventListener("input", e => confirmPassword(validationDelay));

inputs.forEach(input => input.addEventListener("input", e => setInputState(e.target, "none")));

// Experimental
const fillInputs = document.querySelector(".experimental > button");
fillInputs.addEventListener("click", e => {
    firstNameInput.value = "Erick";
    lastNameInput.value = "Gómez";
    emailInput.value = "erick@email.com";
    phoneNumberInput.value = "22222222";
    passwordInput.value = confirmPasswordInput.value = "T3st!ngW0rds";

    validateInputValue(firstNameInput, nameRegex, "Not a valid name");
    validateInputValue(lastNameInput, nameRegex, "Not a valid last name");
    validateInputValue(emailInput, emailRegex, "Not a valid email");
    validateInputValue(phoneNumberInput, phoneRegex, "Not a valid phone");
    validateInputValue(passwordInput, passwordRegex, "Not a strong password")
    validateInputValue(confirmPasswordInput, undefined, undefined);
    confirmPassword(validationDelay);
});