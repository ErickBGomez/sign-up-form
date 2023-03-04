const root = document.documentElement;

// Light and Dark mode
root.className = "light";

// Client-side form Validation
const inputs = document.querySelectorAll("input");


inputs.forEach(input => {
    input.addEventListener("change", e => {
        e.target.dataset.valuestate = validateTextInput(e.target.value);

        console.log(`${e.target.value} ${e.target.dataset.valuestate}`);
    });
});

function validateTextInput(value) {
    if (value.length >= 2 && value.length <= 50) {
        return "valid";
    }
    else if (value.length == 0) {
        return "empty";
    }
    else {
        return "invalid";
    }
}
