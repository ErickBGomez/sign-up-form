// Text limit count
function updateCounter(inputElement) {
    const textLimitCounter = inputElement.parentElement.querySelector(".text-limit-counter");
    textLimitCounter.innerText = inputElement.value.length.toString();
}

// Using inputs NodeList declared in form-validation.js
inputs.forEach(input => input.addEventListener("input", e => updateCounter(e.target)));