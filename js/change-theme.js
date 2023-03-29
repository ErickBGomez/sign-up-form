let currentTheme = "light";

const root = document.documentElement;
const toggleThemeElement = document.querySelector(".theme-container");
const themeIcon = toggleThemeElement.querySelector(".theme-icon");
const themeText = toggleThemeElement.querySelector(".theme-text");

function toggleTheme() {
    currentTheme = (currentTheme == "light") ? "dark" : "light";
    setTheme(currentTheme);
}

function setTheme(newTheme) {
    root.className = newTheme;
    themeIcon.innerText = `${newTheme}_mode`;
    themeText.innerText = `${toCapitalize(newTheme)} theme`;
}

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

toggleThemeElement.addEventListener("click", toggleTheme);

// Initial theme: Light
root.className = "light";