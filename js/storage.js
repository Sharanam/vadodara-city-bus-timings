const KEYS = {
  theme: "vctbs.theme",
  showPreviousBuses: "vctbs.showPreviousBuses",
};

export function getTheme() {
  return localStorage.getItem(KEYS.theme) || "system";
}

export function setTheme(value) {
  localStorage.setItem(KEYS.theme, value);
}

export function getShowPreviousBuses() {
  return localStorage.getItem(KEYS.showPreviousBuses) === "true";
}

export function setShowPreviousBuses(value) {
  localStorage.setItem(KEYS.showPreviousBuses, String(value));
}
