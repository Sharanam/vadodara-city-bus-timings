const KEYS = {
  theme: "vctbs.theme",
  showPreviousBuses: "vctbs.showPreviousBuses",
  favouriteRouteIds: "vctbs.favouriteRouteIds",
  showOnlyFavourites: "vctbs.showOnlyFavourites",
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

export function getFavouriteRouteIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEYS.favouriteRouteIds)) || []);
  } catch {
    return new Set();
  }
}

export function setFavouriteRouteIds(routeIds) {
  localStorage.setItem(KEYS.favouriteRouteIds, JSON.stringify([...routeIds]));
}

export function getShowOnlyFavourites() {
  return localStorage.getItem(KEYS.showOnlyFavourites) === "true";
}

export function setShowOnlyFavourites(value) {
  localStorage.setItem(KEYS.showOnlyFavourites, String(value));
}
