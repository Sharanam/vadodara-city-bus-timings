import { initTheme } from "./theme.js";
import {
  getShowPreviousBuses,
  getShowOnlyFavourites,
  getFavouriteRouteIds,
  setFavouriteRouteIds,
} from "./storage.js";
import { renderRoutes } from "./render.js";
import { initControls } from "./controls.js";

const REFRESH_INTERVAL_MS = 60_000;

async function loadData() {
  const response = await fetch("data/routes.json");
  if (!response.ok) throw new Error(`Failed to load route data: ${response.status}`);
  return response.json();
}

async function main() {
  initTheme();

  const container = document.getElementById("routes");
  const prefs = {
    showPreviousBuses: getShowPreviousBuses(),
    showOnlyFavourites: getShowOnlyFavourites(),
    favouriteRouteIds: getFavouriteRouteIds(),
  };

  let routes, meta;
  try {
    ({ routes, meta } = await loadData());
  } catch (error) {
    container.textContent = "Could not load bus schedule data. Please try again later.";
    console.error(error);
    return;
  }

  const lastUpdated = document.getElementById("last-updated");
  if (meta.lastUpdated) lastUpdated.textContent = `Schedule data last updated: ${meta.lastUpdated}`;

  const rerender = () =>
    renderRoutes(container, routes, prefs, {
      onToggleFavourite: (routeId) => {
        if (prefs.favouriteRouteIds.has(routeId)) prefs.favouriteRouteIds.delete(routeId);
        else prefs.favouriteRouteIds.add(routeId);
        setFavouriteRouteIds(prefs.favouriteRouteIds);
        rerender();
      },
    });
  rerender();

  initControls({
    onShowPreviousBusesChange: (value) => {
      prefs.showPreviousBuses = value;
      rerender();
    },
    onShowOnlyFavouritesChange: (value) => {
      prefs.showOnlyFavourites = value;
      rerender();
    },
  });

  setInterval(rerender, REFRESH_INTERVAL_MS);
}

main();
