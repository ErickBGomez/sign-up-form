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

const flashMessagesContainer = document.querySelector(".flash-messages-container");
const flashDisappearDelay = 5000;

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

    countValidInputs(inputElement, newState);
}

function countValidInputs(inputElement, inputState) {
    if (inputState === "valid") {
        // Nested conditional to ignore valid inputs that are included in the array
        if (!validInputs.includes(inputElement)) {
            validInputs.push(inputElement);
        }
    } else if (validInputs.includes(inputElement)) {
        const index = validInputs.indexOf(inputElement);
        validInputs.splice(index, 1);
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
        createFlashMessage("success", "Success!", "You account has been created");
    } else {
        createFlashMessage("error", "Error!", "Some fields need to be corrected");
    }
});

function createFlashMessage(messageType, titleString, descriptionString) {
    const flashMessage = document.createElement("div");
    flashMessage.className = "flash-message";
    flashMessage.dataset.messagetype = messageType;
    flashMessage.dataset.visibilitystate = "show";

    const icon = document.createElement("i");
    icon.className = "flash-icon material-symbols-outlined";
    icon.innerText = (messageType === "success") ? "check_circle" : "cancel";

    const textContainer = document.createElement("div");
    textContainer.className = "flash-text";

    const title = document.createElement("div");
    title.className = "flash-title";
    title.innerText = titleString;

    const description = document.createElement("div");
    description.className = "flash-description";
    description.innerText = descriptionString;

    // Declare arrow function here to clearTimeout function when user closes the flash message
    const deleteFlashMessageTimeout = () => deleteFlashMessage(flashMessage);
    const closeIcon = document.createElement("div");
    closeIcon.className = "flash-close";
    closeIcon.innerText = "\u00D7";
    closeIcon.addEventListener("click", e => {
        clearTimeout(deleteFlashMessageTimeout);
        deleteFlashMessage(flashMessage);
    });
    
    textContainer.appendChild(title);
    textContainer.appendChild(description);

    flashMessage.appendChild(icon);
    flashMessage.appendChild(textContainer);
    flashMessage.appendChild(closeIcon);

    flashMessagesContainer.appendChild(flashMessage);

    setTimeout(() => deleteFlashMessage(flashMessage), flashDisappearDelay);
}

function deleteFlashMessage(flashMessageElement) {
    flashMessageElement.dataset.visibilitystate = "hide";

    flashMessageElement.addEventListener("animationend", e => {
        flashMessagesContainer.removeChild(flashMessageElement);
    });
}

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

// Debug feature: Auto fill all inputs
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