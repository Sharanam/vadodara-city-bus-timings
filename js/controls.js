import { getTheme, getShowPreviousBuses, setShowPreviousBuses } from "./storage.js";
import { setTheme } from "./theme.js";

export function initControls({ onShowPreviousBusesChange, onThemeChange }) {
  const themeSelect = document.getElementById("theme-select");
  const showPreviousToggle = document.getElementById("show-previous-toggle");

  themeSelect.value = getTheme();
  showPreviousToggle.checked = getShowPreviousBuses();

  themeSelect.addEventListener("change", () => {
    setTheme(themeSelect.value);
    onThemeChange?.(themeSelect.value);
  });

  showPreviousToggle.addEventListener("change", () => {
    setShowPreviousBuses(showPreviousToggle.checked);
    onShowPreviousBusesChange?.(showPreviousToggle.checked);
  });
}
