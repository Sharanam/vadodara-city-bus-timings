import {
  getTheme,
  getShowPreviousBuses,
  setShowPreviousBuses,
  getShowOnlyFavourites,
  setShowOnlyFavourites,
} from "./storage.js";
import { setTheme } from "./theme.js";

export function initControls({ onShowPreviousBusesChange, onShowOnlyFavouritesChange, onThemeChange }) {
  const themeSelect = document.getElementById("theme-select");
  const showPreviousToggle = document.getElementById("show-previous-toggle");
  const showFavouritesToggle = document.getElementById("show-favourites-toggle");

  themeSelect.value = getTheme();
  showPreviousToggle.checked = getShowPreviousBuses();
  showFavouritesToggle.checked = getShowOnlyFavourites();

  themeSelect.addEventListener("change", () => {
    setTheme(themeSelect.value);
    onThemeChange?.(themeSelect.value);
  });

  showPreviousToggle.addEventListener("change", () => {
    setShowPreviousBuses(showPreviousToggle.checked);
    onShowPreviousBusesChange?.(showPreviousToggle.checked);
  });

  showFavouritesToggle.addEventListener("change", () => {
    setShowOnlyFavourites(showFavouritesToggle.checked);
    onShowOnlyFavouritesChange?.(showFavouritesToggle.checked);
  });
}
