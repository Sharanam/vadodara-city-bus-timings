import { getTheme, setTheme as persistTheme } from "./storage.js";

function apply(theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function initTheme() {
  apply(getTheme());
}

export function setTheme(theme) {
  persistTheme(theme);
  apply(theme);
}
