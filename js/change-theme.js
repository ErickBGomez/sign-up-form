const root = document.documentElement;
const toggleThemeElement = document.querySelector(".theme-container");

function toggleTheme() {
    root.className = (root.className == "light") ? "dark" : "light";
}

toggleThemeElement.addEventListener("click", toggleTheme);

// Initial theme: Light
root.className = "light";